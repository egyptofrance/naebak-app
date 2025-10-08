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
export async function signInWithEmailAndPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}

// Sign up with email and profile
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
  try {
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          governorate_id: formData.governorateId,
          city: formData.city,
          village: formData.village,
          dob: formData.dob,
          gender: formData.gender,
          job_title: formData.jobTitle,
          account_type: formData.accountType,
          council_id: formData.councilId,
          party_id: formData.partyId,
          is_independent: formData.isIndependent,
          electoral_symbol_id: formData.electoralSymbolId,
          electoral_number: formData.electoralNumber,
          district: formData.district,
          committee: formData.committee,
        }
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'فشل في إنشاء الحساب' };
    }

    return { 
      user: authData.user, 
      error: null,
      message: 'تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.'
    };
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      user: null, 
      error: 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.' 
    };
  }
}
