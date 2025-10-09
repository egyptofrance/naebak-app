import { createClient } from '@/lib/supabase';

const supabase = createClient();

// تسجيل الدخول
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('SignIn error:', error);
      
      // معالجة أخطاء محددة من Supabase لتسجيل الدخول
      if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid email or password')) {
        return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من البيانات والمحاولة مرة أخرى.' };
      } else if (error.message.includes('Email not confirmed')) {
        return { success: false, error: 'يرجى تأكيد بريدك الإلكتروني أولاً من خلال الرابط المرسل إليك.' };
      } else if (error.message.includes('Too many requests')) {
        return { success: false, error: 'تم تجاوز عدد المحاولات المسموح. يرجى المحاولة لاحقاً.' };
      } else if (error.message.includes('Invalid email')) {
        return { success: false, error: 'البريد الإلكتروني غير صحيح. يرجى التحقق من صحة البريد الإلكتروني.' };
      } else {
        return { success: false, error: `خطأ في تسجيل الدخول: ${error.message}` };
      }
    }

    if (data.user) {
      // فحص نوع المستخدم من قاعدة البيانات
      const { data: userData, error: userError } = await supabase
        .from('user_profiles')
        .select('user_type, account_status, is_profile_complete')
        .eq('id', data.user.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        return { success: false, error: 'حدث خطأ أثناء جلب بيانات المستخدم' };
      }

      return { 
        success: true, 
        user: data.user,
        userData: userData,
        needsUserTypeSelection: !userData.user_type,
        needsApproval: userData.user_type && userData.account_status === 'pending'
      };
    }

    return { success: false, error: 'فشل في تسجيل الدخول' };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

// تسجيل الخروج
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('SignOut error:', error);
      return { success: false, error: `خطأ في تسجيل الخروج: ${error.message}` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الخروج' };
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

// الحصول على بيانات المستخدم الكاملة من Auth metadata
export async function getUserProfile(authId?: string) {
  try {
    const supabase = createClient();
    
    // Get current user if no authId provided
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }

    if (!user) {
      throw new Error('المستخدم غير مسجل الدخول');
    }

    // If authId provided, make sure it matches current user (security check)
    if (authId && authId !== user.id) {
      throw new Error('غير مصرح بالوصول لهذا الملف الشخصي');
    }

    // Return user data with metadata
    const profileData = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      ...user.user_metadata
    };

    return { success: true, data: profileData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
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
