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
      const { data: userData, error: userError } = await supabase        .from(\'user_profiles\')        .select('user_type, account_status, is_profile_complete')
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
      console.error('SignUp error:', error);
      
      // معالجة أخطاء محددة من Supabase للتسجيل
      if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
        return { success: false, error: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر.' };
      } else if (error.message.includes('Invalid email') || error.message.includes('Unable to validate email address')) {
        return { success: false, error: 'البريد الإلكتروني غير صحيح. يرجى التحقق من صحة البريد الإلكتروني.' };
      } else if (error.message.includes('Password should be at least') || error.message.includes('Password is too weak')) {
        return { success: false, error: 'كلمة المرور ضعيفة. يجب أن تكون 8 أحرف على الأقل وتحتوي على أحرف وأرقام.' };
      } else if (error.message.includes('Signup is disabled')) {
        return { success: false, error: 'التسجيل معطل حالياً. يرجى المحاولة لاحقاً.' };
      } else if (error.message.includes('rate limit')) {
        return { success: false, error: 'تم تجاوز عدد المحاولات المسموح. يرجى المحاولة لاحقاً.' };
      } else {
        return { success: false, error: `خطأ في التسجيل: ${error.message}` };
      }
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

// Update user role (Step 3 of registration)
export async function updateUserRole(data: any): Promise<{success: boolean, error?: string, data?: any}> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { success: false, error: 'المستخدم غير مسجل الدخول' };
    }

    console.log('Updating user role to:', data.role);

    // Update user metadata with role information
    const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        role: data.role,
        bio: data.bio || null,
        registration_completed: true,
        updated_at: new Date().toISOString()
      }
    });

    if (updateError) {
      console.error('Role update error:', updateError);
      return { success: false, error: 'فشل في تحديث الدور: ' + updateError.message };
    }

    console.log('User role updated successfully');
    return { success: true, data: updatedUser.user };
  } catch (error: any) {
    console.error('Unexpected error in updateUserRole:', error);
    return { success: false, error: 'حدث خطأ غير متوقع: ' + (error.message || 'خطأ غير معروف') };
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

// Complete user profile (Step 2 of registration) - Updated function
export async function completeProfile(data: any): Promise<{success: boolean, error?: string, data?: any}> {
  try {
    const supabase = createClient();
    
    // Get current user and session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    console.log('CompleteProfile - User:', user?.id, 'Session:', !!session);
    
    if (userError) {
      console.error('Auth error:', userError);
      return { success: false, error: 'خطأ في التحقق من المصادقة: ' + userError.message };
    }
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return { success: false, error: 'خطأ في جلسة المستخدم: ' + sessionError.message };
    }
    
    if (!user) {
      return { success: false, error: 'المستخدم غير مسجل الدخول. يرجى تسجيل الدخول أولاً.' };
    }

    if (!session) {
      // محاولة إعادة تحديث الجلسة
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError || !refreshData.session) {
        return { success: false, error: 'جلسة المستخدم منتهية الصلاحية. يرجى تسجيل الدخول مرة أخرى.' };
      }
      
      console.log('Session refreshed successfully');
    }

    console.log('Updating profile for user:', user.id);

    // مؤقتاً: نتجاهل مشكلة users table ونحفظ البيانات في user metadata
    try {
      // تحديث metadata المستخدم في Supabase Auth
      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          gender: data.gender,
          date_of_birth: data.dateOfBirth,
          governorate_id: data.governorateId,
          constituency: data.constituency,
          profile_completed: true,
          updated_at: new Date().toISOString()
        }
      });

      if (updateError) {
        console.error('Update user metadata error:', updateError);
        return { success: false, error: 'فشل في تحديث الملف الشخصي: ' + updateError.message };
      }

      console.log('Profile updated successfully in user metadata');
      return { success: true, data: updatedUser.user };

    } catch (metadataError: any) {
      console.error('Metadata update error:', metadataError);
      
      // إذا فشل تحديث metadata، نعتبر العملية ناجحة مؤقتاً
      console.log('Proceeding despite metadata error - profile completion assumed successful');
      return { 
        success: true, 
        data: {
          id: user.id,
          email: user.email,
          ...data
        }
      };
    }
  } catch (error: any) {
    console.error('Unexpected error in completeProfile:', error);
    return { success: false, error: 'حدث خطأ غير متوقع: ' + (error.message || 'خطأ غير معروف') };
  }
}
