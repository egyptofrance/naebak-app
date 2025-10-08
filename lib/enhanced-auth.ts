import { supabase, supabaseAdmin } from '@/lib/supabase';

// Enhanced user type with complete profile information
export interface EnhancedUser {
  id: number;
  auth_id: string;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  governorate_id?: number;
  city?: string;
  village?: string;
  dob?: string;
  gender?: string;
  job_title?: string;
  is_active: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  roles: {
    id: number;
    name: string;
  };
  governorate?: {
    id: number;
    name: string;
  };
  profile?: {
    id: number;
    council_id?: number;
    party_id?: number;
    is_independent: boolean;
    district?: string;
    committee?: string;
    electoral_symbol_id?: number;
    electoral_number?: string;
    council?: {
      id: number;
      name: string;
    };
    party?: {
      id: number;
      name: string;
    };
  };
}

// Get current user with complete profile information
export async function getEnhancedCurrentUser(): Promise<EnhancedUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    // Get user details with all related data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        roles (
          id,
          name
        ),
        governorates (
          id,
          name
        )
      `)
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return null;
    }

    // Get profile data for MPs and candidates
    if (userData.role_id === 4 || userData.role_id === 5) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select(`
          *,
          councils (
            id,
            name
          ),
          parties (
            id,
            name
          )
        `)
        .eq('user_id', userData.id)
        .single();

      if (profileData) {
        userData.profile = profileData;
      }
    }

    return userData as EnhancedUser;
  } catch (error) {
    console.error('Error fetching enhanced user:', error);
    return null;
  }
}

// Check if user account is approved
export async function checkUserApproval(userId: number): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('is_approved, role_id')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return false;
    }

    // Citizens are automatically approved
    if (data.role_id === 3) {
      return true;
    }

    return data.is_approved;
  } catch (error) {
    console.error('Error checking user approval:', error);
    return false;
  }
}

// Approve user account (admin only)
export async function approveUserAccount(userId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        is_approved: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء الموافقة على الحساب' };
  }
}

// Reject user account (admin only)
export async function rejectUserAccount(userId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        is_approved: false,
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء رفض الحساب' };
  }
}

// Get pending user approvals (admin only)
export async function getPendingApprovals(): Promise<EnhancedUser[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        roles (
          id,
          name
        ),
        governorates (
          id,
          name
        )
      `)
      .eq('is_approved', false)
      .in('role_id', [4, 5]) // Only MPs and candidates need approval
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending approvals:', error);
      return [];
    }

    // Get profile data for each user
    const usersWithProfiles = await Promise.all(
      data.map(async (user) => {
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`
            *,
            councils (
              id,
              name
            ),
            parties (
              id,
              name
            )
          `)
          .eq('user_id', user.id)
          .single();

        return {
          ...user,
          profile: profileData
        };
      })
    );

    return usersWithProfiles as EnhancedUser[];
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    return [];
  }
}

// Create manager account (admin only)
export async function createManagerAccount(managerData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  governorateId: number;
}): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: managerData.email,
      password: managerData.password,
      email_confirm: true
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || 'فشل في إنشاء حساب المصادقة' };
    }

    // Create record in users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        auth_id: authData.user.id,
        role_id: 2, // Manager role
        first_name: managerData.firstName,
        last_name: managerData.lastName,
        email: managerData.email,
        phone: managerData.phone,
        governorate_id: managerData.governorateId,
        is_active: true,
        is_approved: true
      })
      .select()
      .single();

    if (userError) {
      // Delete auth user if user creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: 'فشل في إنشاء بيانات المدير: ' + userError.message };
    }

    return { success: true, user: userData };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء إنشاء حساب المدير' };
  }
}

// Get all managers (admin only)
export async function getManagers(): Promise<EnhancedUser[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        roles (
          id,
          name
        ),
        governorates (
          id,
          name
        )
      `)
      .eq('role_id', 2) // Manager role
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching managers:', error);
      return [];
    }

    return data as EnhancedUser[];
  } catch (error) {
    console.error('Error fetching managers:', error);
    return [];
  }
}

// Deactivate manager account (admin only)
export async function deactivateManager(managerId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', managerId)
      .eq('role_id', 2); // Ensure it's a manager

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء إلغاء تفعيل المدير' };
  }
}

// Activate manager account (admin only)
export async function activateManager(managerId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', managerId)
      .eq('role_id', 2); // Ensure it's a manager

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تفعيل المدير' };
  }
}

// Update user profile
export async function updateUserProfile(userId: number, profileData: Partial<EnhancedUser>): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تحديث الملف الشخصي' };
  }
}

// Get user statistics for dashboard
export async function getUserStatistics(userId: number, roleId: number) {
  try {
    const stats: any = {};

    if (roleId === 3) { // Citizen
      // Get citizen statistics
      const [complaintsResult, messagesResult, ratingsResult] = await Promise.all([
        supabase.from('complaints').select('id, status').eq('user_id', userId),
        supabase.from('messages').select('id, is_read').eq('sender_id', userId),
        supabase.from('ratings').select('id').eq('user_id', userId)
      ]);

      stats.totalComplaints = complaintsResult.data?.length || 0;
      stats.pendingComplaints = complaintsResult.data?.filter(c => c.status === 'pending').length || 0;
      stats.resolvedComplaints = complaintsResult.data?.filter(c => c.status === 'resolved').length || 0;
      stats.totalMessages = messagesResult.data?.length || 0;
      stats.unreadMessages = messagesResult.data?.filter(m => !m.is_read).length || 0;
      stats.totalRatings = ratingsResult.data?.length || 0;
    } else if (roleId === 4 || roleId === 5) { // MP or Candidate
      // Get MP/Candidate statistics
      const [complaintsResult, messagesResult, ratingsResult] = await Promise.all([
        supabase.from('complaints').select('id, status').eq('assigned_to', userId),
        supabase.from('messages').select('id, is_read').eq('recipient_id', userId),
        supabase.from('ratings').select('id, rating').eq('target_user_id', userId)
      ]);

      stats.totalComplaints = complaintsResult.data?.length || 0;
      stats.pendingComplaints = complaintsResult.data?.filter(c => c.status === 'pending').length || 0;
      stats.resolvedComplaints = complaintsResult.data?.filter(c => c.status === 'resolved').length || 0;
      stats.totalMessages = messagesResult.data?.length || 0;
      stats.unreadMessages = messagesResult.data?.filter(m => !m.is_read).length || 0;
      stats.totalRatings = ratingsResult.data?.length || 0;
      
      if (ratingsResult.data && ratingsResult.data.length > 0) {
        const totalRating = ratingsResult.data.reduce((sum, r) => sum + r.rating, 0);
        stats.averageRating = totalRating / ratingsResult.data.length;
      } else {
        stats.averageRating = 0;
      }
    }

    return stats;
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    return {};
  }
}
