import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your actual Supabase URL and anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getNewsItems() {
  const { data: newsItems, error } = await supabase
    .from("news")
    .select("id, text")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
  return newsItems;
}

export async function getNewsSettings() {
  const { data: settings, error } = await supabase
    .from("news_settings")
    .select("direction, speed_seconds")
    .single();

  if (error) {
    console.error("Error fetching news settings:", error);
    return null;
  }
  return settings;
}

