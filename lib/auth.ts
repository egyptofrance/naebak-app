import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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

// تسجيل حساب جديد مع إنشاء ملف شخصي
export async function signUpWithEmailAndProfile(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: string;
  gender: string;
  birthDate: string;
  nationalId: string;
  governorateId: number;
  address: string;
  councilId?: number | null;
  partyId?: number | null;
  biography?: string;
  education?: string;
  experience?: string;
  promises?: string;
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

    // إنشاء الملف الشخصي في جدول profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        gender: userData.gender,
        birth_date: userData.birthDate,
        national_id: userData.nationalId,
        governorate_id: userData.governorateId,
        address: userData.address,
        role_id: roleData.id,
        council_id: userData.councilId,
        party_id: userData.partyId,
        biography: userData.biography,
        education: userData.education,
        experience: userData.experience,
        promises: userData.promises,
        is_approved: userData.accountType === 'citizen' ? true : false, // المواطنون يتم قبولهم تلقائياً
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      // إذا فشل إنشاء الملف الشخصي، احذف المستخدم من Auth
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error('فشل في إنشاء الملف الشخصي: ' + profileError.message);
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
