import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Client-side Supabase client
export const createClient = () => {
  return createClientComponentClient();
};

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  if (data.user) {
    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, role_id, first_name, last_name, email')
      .eq('auth_id', data.user.id)
      .single();

    if (userError) {
      return { user: null, error: 'فشل في جلب بيانات المستخدم' };
    }

    // Get role name
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('name')
      .eq('id', userData.role_id)
      .single();

    if (roleError) {
      return { user: null, error: 'فشل في جلب دور المستخدم' };
    }

    return {
      user: {
        ...userData,
        role: roleData.name,
      },
      error: null,
    };
  }

  return { user: null, error: 'فشل تسجيل الدخول' };
}

// Sign up with email and password
export async function signUpWithEmail(formData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;
  governorateId: number;
  city: string;
  village: string;
  dob: string;
  gender: string;
  jobTitle: string;
}) {
  const supabase = createClient();

  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (authError) {
    return { user: null, error: authError.message };
  }

  if (authData.user) {
    // 2. Create record in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        auth_id: authData.user.id,
        role_id: 3, // citizen role
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        governorate_id: formData.governorateId,
        city: formData.city,
        village: formData.village,
        dob: formData.dob,
        gender: formData.gender,
        job_title: formData.jobTitle,
      })
      .select()
      .single();

    if (userError) {
      return { user: null, error: 'فشل في إنشاء حساب المستخدم' };
    }

    return { user: userData, error: null };
  }

  return { user: null, error: 'فشل في إنشاء الحساب' };
}

// Sign out
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}

// Reset password
export async function resetPassword(email: string) {
  const supabase = createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { error: error ? error.message : null };
}

// Update password
export async function updatePassword(newPassword: string) {
  const supabase = createClient();
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return { error: error ? error.message : null };
}

// Get current user
export async function getCurrentUser() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error: error ? error.message : 'لم يتم العثور على المستخدم' };
  }

  // Get user data from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, role_id, first_name, last_name, email')
    .eq('auth_id', user.id)
    .single();

  if (userError) {
    return { user: null, error: 'فشل في جلب بيانات المستخدم' };
  }

  // Get role name
  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('name')
    .eq('id', userData.role_id)
    .single();

  if (roleError) {
    return { user: null, error: 'فشل في جلب دور المستخدم' };
  }

  return {
    user: {
      ...userData,
      role: roleData.name,
    },
    error: null,
  };
}

// Get user role
export async function getUserRole(userId: string) {
  const supabase = createClient();
  
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role_id')
    .eq('auth_id', userId)
    .single();

  if (userError) {
    return { role: null, error: 'فشل في جلب بيانات المستخدم' };
  }

  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('name')
    .eq('id', userData.role_id)
    .single();

  if (roleError) {
    return { role: null, error: 'فشل في جلب دور المستخدم' };
  }

  return { role: roleData.name, error: null };
}

// Get governorates
export async function getGovernorates() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('governorates')
    .select('id, name')
    .order('name');

  return { governorates: data || [], error: error ? error.message : null };
}
