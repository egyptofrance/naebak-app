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
      return { success: false, error: error.message };
    }

    // إذا تم إنشاء المستخدم بنجاح
    if (data.user) {
      // إنشاء سجل المستخدم في جدول users
      try {
        const { error: userError } = await supabase
          .from('users')
          .insert({
            auth_id: data.user.id,
            email: email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (userError && userError.code !== '23505') { // 23505 = unique violation (user already exists)
          console.warn('Failed to create user record:', userError);
        }
      } catch (insertError) {
        console.warn('Error creating user record:', insertError);
      }

      // إذا لم يكن هناك session (يحتاج email confirmation)
      if (!data.session) {
        return { 
          success: true, 
          user: data.user,
          session: null,
          needsEmailConfirmation: true
        };
      }

      // إذا كان هناك session (تم تسجيل الدخول تلقائياً)
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

    // Check if user exists in users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, auth_id')
      .eq('auth_id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking user:', checkError);
      return { success: false, error: 'خطأ في التحقق من بيانات المستخدم' };
    }

    let userData;

    if (existingUser) {
      // Update existing user
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          gender: data.gender,
          dob: data.dateOfBirth,
          governorate_id: data.governorateId,
          constituency: data.constituency, // استخدام constituency بدلاً من constituency_id
          updated_at: new Date().toISOString()
        })
        .eq('auth_id', user.id)
        .select()
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
        return { success: false, error: 'فشل في تحديث الملف الشخصي: ' + updateError.message };
      }

      userData = updatedUser;
    } else {
      // Create new user record
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          auth_id: user.id,
          email: user.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          gender: data.gender,
          dob: data.dateOfBirth,
          governorate_id: data.governorateId,
          constituency: data.constituency,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return { success: false, error: 'فشل في إنشاء الملف الشخصي: ' + insertError.message };
      }

      userData = newUser;
    }

    return { success: true, data: userData };
  } catch (error: any) {
    console.error('Unexpected error in completeProfile:', error);
    return { success: false, error: 'حدث خطأ غير متوقع: ' + (error.message || 'خطأ غير معروف') };
  }
}
