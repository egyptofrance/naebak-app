import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your actual Supabase URL and anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getNewsItems() {
  try {
    // Return empty array if Supabase is not configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase not configured, returning empty news items");
      return [];
    }

    const { data: newsItems, error } = await supabase
      .from("news")
      .select("id, text")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news items:", error);
      return [];
    }
    return newsItems || [];
  } catch (error) {
    console.error("Error fetching news items:", error);
    return [];
  }
}

export async function getNewsSettings() {
  try {
    // Return default settings if Supabase is not configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase not configured, returning default news settings");
      return { direction: "rtl", speed_seconds: 30 };
    }

    const { data: settings, error } = await supabase
      .from("news_settings")
      .select("direction, speed_seconds")
      .single();

    if (error) {
      console.error("Error fetching news settings:", error);
      return { direction: "rtl", speed_seconds: 30 };
    }
    return settings || { direction: "rtl", speed_seconds: 30 };
  } catch (error) {
    console.error("Error fetching news settings:", error);
    return { direction: "rtl", speed_seconds: 30 };
  }
}

