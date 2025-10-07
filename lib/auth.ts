import { createBrowserClient } from '@supabase/ssr';

// Client-side Supabase client
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
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

// Sign up with email, password, and profile (for all account types)
export async function signUpWithEmailAndProfile(formData: {
  // البيانات الأساسية
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
  
  // البيانات السياسية
  accountType: 'citizen' | 'mp' | 'candidate';
  councilId?: number;
  partyId?: number;
  isIndependent?: boolean;
  electoralSymbolId?: number;
  electoralNumber?: string;
  district?: string;
  committee?: string;
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

  if (!authData.user) {
    return { user: null, error: 'فشل في إنشاء الحساب' };
  }

  // 2. Determine role_id based on accountType
  let roleId = 3; // citizen
  if (formData.accountType === 'mp') roleId = 4;
  if (formData.accountType === 'candidate') roleId = 5;

  // 3. Create record in users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      auth_id: authData.user.id,
      role_id: roleId,
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
    console.error('User creation error:', userError);
    return { user: null, error: 'فشل في إنشاء حساب المستخدم' };
  }

  // 4. If MP or Candidate, create profile
  if (formData.accountType !== 'citizen') {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: userData.id,
        council_id: formData.councilId || null,
        party_id: formData.partyId || null,
        is_independent: formData.isIndependent || false,
        electoral_symbol_id: formData.electoralSymbolId || null,
        electoral_number: formData.electoralNumber || null,
        district: formData.district || null,
        committee: formData.committee || null,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail the whole registration if profile creation fails
      // The user can update their profile later
    }
  }

  return { user: userData, error: null };
}
