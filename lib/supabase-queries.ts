import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Role {
  id: number;
  name: string;
}

export interface Governorate {
  id: number;
  name: string;
}

export interface Council {
  id: number;
  name: string;
}

export interface Party {
  id: number;
  name: string;
}

export interface Symbol {
  id: number;
  name: string;
  icon_path: string | null;
}

export interface ComplaintType {
  id: number;
  name: string;
}

export interface User {
  id: string;
  auth_id: string | null;
  role_id: number | null;
  first_name: string | null;
  last_name: string | null;
  dob: string | null;
  governorate_id: number | null;
  city: string | null;
  village: string | null;
  phone: string | null;
  whatsapp: string | null;
  avatar: string | null;
  job_title: string | null;
  email: string | null;
  gender: string | null;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  user_id: string;
  council_id: number | null;
  party_id: number | null;
  is_independent: boolean;
  electoral_symbol_id: number | null;
  electoral_number: string | null;
  district: string | null;
  committee: string | null;
  banner_path: string | null;
  slug: string | null;
  created_at: string;
}

// Query functions

/**
 * جلب جميع الأدوار
 */
export async function getRoles(): Promise<Role[]> {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching roles:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب جميع المحافظات
 */
export async function getGovernorates(): Promise<Governorate[]> {
  const { data, error } = await supabase
    .from('governorates')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching governorates:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب جميع المجالس
 */
export async function getCouncils(): Promise<Council[]> {
  const { data, error } = await supabase
    .from('councils')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching councils:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب جميع الأحزاب
 */
export async function getParties(): Promise<Party[]> {
  const { data, error } = await supabase
    .from('parties')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching parties:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب جميع الرموز الانتخابية
 */
export async function getSymbols(): Promise<Symbol[]> {
  const { data, error } = await supabase
    .from('symbols')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب جميع أنواع الشكاوى
 */
export async function getComplaintTypes(): Promise<ComplaintType[]> {
  const { data, error } = await supabase
    .from('complaint_types')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching complaint types:', error);
    return [];
  }

  return data || [];
}

/**
 * جلب مستخدم بواسطة auth_id
 */
export async function getUserByAuthId(authId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

/**
 * جلب مستخدم بواسطة id
 */
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

/**
 * جلب profile مستخدم
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    // Profile قد لا يكون موجود للمواطنين
    return null;
  }

  return data;
}

/**
 * جلب مستخدم مع profile
 */
export async function getUserWithProfile(userId: string) {
  const user = await getUserById(userId);
  if (!user) return null;

  const profile = await getUserProfile(userId);

  return {
    ...user,
    profile,
  };
}

/**
 * جلب اسم الدور بواسطة role_id
 */
export async function getRoleName(roleId: number): Promise<string | null> {
  const { data, error } = await supabase
    .from('roles')
    .select('name')
    .eq('id', roleId)
    .single();

  if (error) {
    console.error('Error fetching role name:', error);
    return null;
  }

  return data?.name || null;
}
