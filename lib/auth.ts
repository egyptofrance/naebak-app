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
