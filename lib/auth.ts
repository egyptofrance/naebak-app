import { createClient } from '@/lib/supabase';
import { 
  BasicRegistrationData, 
  ProfileCompletionData, 
  RoleSelectionData,
  LoginData 
} from '@/lib/validations/auth';

export interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

// Sign up with email and password (Step 1)
export async function signUp(data: BasicRegistrationData): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: { 
        user: authData.user,
        needsEmailConfirmation: !authData.session 
      } 
    };
  } catch (error) {
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
}

// Complete user profile (Step 2)
export async function completeProfile(data: ProfileCompletionData): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'المستخدم غير مصادق عليه' };
    }

    // Insert profile data
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: user.id,
        email: user.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        national_id: data.nationalId,
        birth_date: data.birthDate,
        gender: data.gender,
        governorate_id: data.governorateId,
        constituency_id: data.constituencyId,
        role: 'citizen', // Default role, will be updated in step 3
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء حفظ البيانات' };
  }
}

// Update user role (Step 3)
export async function updateUserRole(data: RoleSelectionData): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'المستخدم غير مصادق عليه' };
    }

    // Update user role and bio
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        role: data.role,
        bio: data.bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تحديث الدور' };
  }
}

// Sign in
export async function signIn(data: LoginData): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: authData };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

// Sign out
export async function signOut(): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الخروج' };
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const supabase = createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء جلب بيانات المستخدم' };
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء جلب الملف الشخصي' };
  }
}

// Reset password
export async function resetPassword(email: string): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور' };
  }
}

// Update password
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تحديث كلمة المرور' };
  }
}

// Upload file to storage
export async function uploadFile(
  bucket: string, 
  fileName: string, 
  file: File
): Promise<AuthResult> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء رفع الملف' };
  }
}

// Get governorates
export async function getGovernorates() {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .order('name');

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء جلب المحافظات' };
  }
}

// Get constituencies by governorate
export async function getConstituencies(governorateId: number) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('councils')
      .select('*')
      .eq('governorate_id', governorateId)
      .order('name');

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء جلب الدوائر الانتخابية' };
  }
}
