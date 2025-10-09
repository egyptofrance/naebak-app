import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/lib/supabase';

const supabase = createClientComponentClient();

// تسجيل الدخول
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

// تسجيل حساب جديد
export async function signUp(email: string, password: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء إنشاء الحساب' };
  }
}

// تسجيل الخروج
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الخروج' };
  }
}

// تسجيل حساب جديد مع إنشاء ملف شخصي - طبقاً لقاعدة البيانات الحقيقية
export async function signUpWithEmailAndProfile(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: string;
  gender: string;
  birthDate: string;
  governorateId: number;
  city?: string;
  village?: string;
  councilId?: number | null;
  partyId?: number | null;
  district?: string;
}) {
  try {
    // إنشاء الحساب في Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('فشل في إنشاء المستخدم');
    }

    // الحصول على role_id من اسم النوع
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', userData.accountType)
      .single();

    if (roleError) {
      throw new Error('نوع الحساب غير صحيح');
    }

    // إنشاء المستخدم في جدول users - طبقاً للمخطط الحقيقي
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .insert({
        auth_id: authData.user.id,
        role_id: roleData.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        dob: userData.birthDate, // dob في قاعدة البيانات
        governorate_id: userData.governorateId,
        city: userData.city || null,
        village: userData.village || null,
        total_points: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (userError) {
      // إذا فشل إنشاء المستخدم، احذف المستخدم من Auth
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error('فشل في إنشاء المستخدم: ' + userError.message);
    }

    // إذا كان المستخدم مرشح أو نائب، أنشئ ملف في جدول profiles
    if (userData.accountType === 'candidate' || userData.accountType === 'mp') {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: userRecord.id,
          council_id: userData.councilId || null,
          party_id: userData.partyId || null,
          district: userData.district || null,
          is_independent: userData.partyId === 1, // إذا كان الحزب "مستقل"
          created_at: new Date().toISOString()
        });

      if (profileError) {
        // إذا فشل إنشاء الملف الشخصي، احذف المستخدم
        await supabase.from('users').delete().eq('id', userRecord.id);
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('فشل في إنشاء الملف الشخصي: ' + profileError.message);
      }
    }

    return { success: true, user: authData.user };
  } catch (error: any) {
    return { success: false, error: error.message || 'حدث خطأ أثناء إنشاء الحساب' };
  }
}

// الحصول على المستخدم الحالي
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

// الحصول على بيانات المستخدم الكاملة من جدول users
export async function getUserProfile(authId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        roles(name),
        governorates(name),
        profiles(
          council_id,
          party_id,
          district,
          is_independent,
          councils(name),
          parties(name)
        )
      `)
      .eq('auth_id', authId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Update user role (Step 3 of registration)
export async function updateUserRole(data: any): Promise<{success: boolean, error?: string, data?: any}> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'المستخدم غير مسجل الدخول' };
    }

    // Get role ID from role name
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', data.role)
      .single();

    if (roleError) {
      return { success: false, error: 'الدور المحدد غير صحيح' };
    }

    // Update user's role
    const { data: userData, error: updateError } = await supabase
      .from('users')
      .update({
        role_id: roleData.id,
        bio: data.bio || null,
        updated_at: new Date().toISOString()
      })
      .eq('auth_id', user.id)
      .select()
      .single();

    if (updateError) {
      return { success: false, error: 'فشل في تحديث الدور' };
    }

    // If role is deputy or candidate, create additional profile
    if (data.role === 'deputy' || data.role === 'candidate') {
      const profileTable = data.role === 'deputy' ? 'deputy_profiles' : 'candidate_profiles';
      
      const { error: profileError } = await supabase
        .from(profileTable)
        .insert({
          user_id: userData.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.warn('Failed to create additional profile:', profileError);
      }
    }

    return { success: true, data: userData };
  } catch (error) {
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
}

// Get all governorates
export async function getGovernorates(): Promise<{success: boolean, error?: string, data?: any[]}> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('governorates')
      .select('id, name')
      .order('name');

    if (error) {
      return { success: false, error: 'فشل في تحميل المحافظات' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تحميل المحافظات' };
  }
}

// Get constituencies for a specific governorate
export async function getConstituencies(governorateId: number): Promise<{success: boolean, error?: string, data?: any[]}> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('constituencies')
      .select('id, name')
      .eq('governorate_id', governorateId)
      .order('name');

    if (error) {
      return { success: false, error: 'فشل في تحميل الدوائر الانتخابية' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تحميل الدوائر الانتخابية' };
  }
}

// Complete user profile (Step 2 of registration) - Updated function
export async function completeProfile(data: any): Promise<{success: boolean, error?: string, data?: any}> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'المستخدم غير مسجل الدخول' };
    }

    // Update user profile
    const { data: userData, error: updateError } = await supabase
      .from('users')
      .update({
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        national_id: data.nationalId,
        gender: data.gender,
        dob: data.dateOfBirth,
        governorate_id: data.governorateId,
        constituency_id: data.constituencyId,
        updated_at: new Date().toISOString()
      })
      .eq('auth_id', user.id)
      .select()
      .single();

    if (updateError) {
      return { success: false, error: 'فشل في تحديث الملف الشخصي' };
    }

    return { success: true, data: userData };
  } catch (error) {
    return { success: false, error: 'حدث خطأ غير متوقع' };
  }
}
