import { createClient } from '@/lib/supabase';

const supabase = createClient();

// تسجيل حساب جديد - استخدام ميزات Supabase المدمجة
export async function signUp(email: string, password: string, metadata: any = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...metadata,
        account_type: null,
        profile_completed: false
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    // Supabase يتولى جميع التحققات تلقائياً
    return { success: false, error: error.message };
  }

  return { 
    success: true, 
    user: data.user,
    session: data.session,
    needsEmailConfirmation: !data.session
  };
}

// تسجيل الدخول - استخدام ميزات Supabase المدمجة
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('SignIn error:', error);
    return { success: false, error: error.message };
  }

  if (data.user) {
    console.log('SignIn successful, user data:', data.user);
    console.log('User metadata:', data.user.user_metadata);
    
    const accountType = data.user.user_metadata?.account_type;
    const profileCompleted = data.user.user_metadata?.profile_completed;
    
    console.log('Account type:', accountType);
    console.log('Profile completed:', profileCompleted);
    console.log('Needs account setup:', !accountType);
    console.log('Needs profile completion:', accountType && !profileCompleted);

    return { 
      success: true, 
      user: data.user,
      session: data.session,
      needsAccountSetup: !accountType,
      needsProfileCompletion: accountType && !profileCompleted
    };
  }

  return { success: false, error: 'فشل في تسجيل الدخول' };
}

// تحديد نوع الحساب - استخدام ميزات Supabase المدمجة
export async function setAccountType(accountType: 'citizen' | 'candidate' | 'mp') {
  const { data, error } = await supabase.auth.updateUser({
    data: { account_type: accountType }
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data.user };
}

// إكمال الملف الشخصي - استخدام ميزات Supabase المدمجة
export async function completeProfile(profileData: any) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...profileData,
      profile_completed: true
    }
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data.user };
}

// تسجيل الخروج


// الحصول على المستخدم الحالي - استخدام ميزات Supabase المدمجة
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// الحصول على بيانات المستخدم الكاملة - استخدام ميزات Supabase المدمجة
export async function getUserProfile(authId?: string) {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return { success: false, error: 'المستخدم غير مسجل الدخول' };
  }

  if (authId && authId !== user.id) {
    return { success: false, error: 'غير مصرح بالوصول' };
  }

  return { 
    success: true, 
    data: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      ...user.user_metadata
    }
  };
}

// Get all governorates (static data)
export function getGovernorates(): {success: boolean, data: any[]} {
  const governorates = [
    { id: 1, name: 'القاهرة' },
    { id: 2, name: 'الجيزة' },
    { id: 3, name: 'الإسكندرية' },
    { id: 4, name: 'الدقهلية' },
    { id: 5, name: 'البحر الأحمر' },
    { id: 6, name: 'البحيرة' },
    { id: 7, name: 'الفيوم' },
    { id: 8, name: 'الغربية' },
    { id: 9, name: 'الإسماعيلية' },
    { id: 10, name: 'المنوفية' },
    { id: 11, name: 'المنيا' },
    { id: 12, name: 'القليوبية' },
    { id: 13, name: 'الوادي الجديد' },
    { id: 14, name: 'السويس' },
    { id: 15, name: 'أسوان' },
    { id: 16, name: 'أسيوط' },
    { id: 17, name: 'بني سويف' },
    { id: 18, name: 'بورسعيد' },
    { id: 19, name: 'دمياط' },
    { id: 20, name: 'الشرقية' },
    { id: 21, name: 'جنوب سيناء' },
    { id: 22, name: 'كفر الشيخ' },
    { id: 23, name: 'مطروح' },
    { id: 24, name: 'الأقصر' },
    { id: 25, name: 'قنا' },
    { id: 26, name: 'شمال سيناء' },
    { id: 27, name: 'سوهاج' }
  ];

  return { success: true, data: governorates };
}


// تسجيل الخروج - استخدام ميزات Supabase المدمجة
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true };
}
