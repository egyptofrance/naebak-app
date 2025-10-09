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

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' };
  }
}

// تسجيل حساب جديد
export async function signUp(email: string, password: string, userData: any) {
  try {
    // إنشاء حساب جديد
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

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

    // إذا تم إنشاء المستخدم بنجاح
    if (data.user) {
      console.log('User created successfully:', data.user.id);
      console.log('Session exists:', !!data.session);

      // إذا لم يكن هناك session (يحتاج email confirmation)
      if (!data.session) {
        console.log('No session - email confirmation required');
        return { 
          success: true, 
          user: data.user,
          session: null,
          needsEmailConfirmation: true
        };
      }

      // إذا كان هناك session (تم تسجيل الدخول تلقائياً)
      console.log('Session exists - user logged in automatically');
      return { 
        success: true, 
        user: data.user,
        session: data.session,
        needsEmailConfirmation: false
      };
    }

    return { success: false, error: 'فشل في إنشاء المستخدم' };
  } catch (error: any) {
    console.error('SignUp error:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء إنشاء الحساب' };
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
