import { supabase } from '@/lib/supabase';

// Get current user
export async function getCurrentUser() {
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  // Get user details from users table
  const { data: userData } = await supabase
    .from('users')
    .select('*, roles(*)')
    .eq('auth_id', user.id)
    .single();

  return userData;
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  if (data.user) {
    // Get user details from users table
    const { data: userData } = await supabase
      .from('users')
      .select('*, roles(*)')
      .eq('auth_id', data.user.id)
      .single();

    return {
      user: userData,
      error: null,
    };
  }

  return { user: null, error: 'فشل تسجيل الدخول' };
}

// Sign up with email and create profile
export async function signUpWithEmailAndProfile(formData: {
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
  accountType: 'citizen' | 'mp' | 'candidate';
  councilId?: number;
  partyId?: number;
  isIndependent?: boolean;
  electoralSymbolId?: number;
  electoralNumber?: string;
  district?: string;
  committee?: string;
}) {
  

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

  // Determine role_id based on account type
  let roleId = 3; // Default: Citizen
  if (formData.accountType === 'mp') {
    roleId = 4; // MP
  } else if (formData.accountType === 'candidate') {
    roleId = 5; // Candidate
  }

  // 2. Create record in users table
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
    return { user: null, error: 'فشل في إنشاء حساب المستخدم: ' + userError.message };
  }

  // 3. Create profile for MP or Candidate
  if (formData.accountType === 'mp' || formData.accountType === 'candidate') {
    const profileData: any = {
      user_id: userData.id,
      council_id: formData.councilId,
      party_id: formData.isIndependent ? null : formData.partyId,
      is_independent: formData.isIndependent || false,
      district: formData.district || '',
      committee: formData.committee || '',
    };

    // Add candidate-specific fields
    if (formData.accountType === 'candidate') {
      profileData.electoral_symbol_id = formData.electoralSymbolId;
      profileData.electoral_number = formData.electoralNumber;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert(profileData);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Delete user if profile creation fails
      await supabase.from('users').delete().eq('id', userData.id);
      return { user: null, error: 'فشل في إنشاء الملف الشخصي: ' + profileError.message };
    }
  }

  return { user: userData, error: null };
}

// Sign out
export async function signOut() {
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

// Reset password
export async function resetPassword(email: string) {
  
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

// Update password
export async function updatePassword(newPassword: string) {
  
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
