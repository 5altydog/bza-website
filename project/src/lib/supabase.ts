import { createClient } from '@supabase/supabase-js';

// These should be set in your environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-project-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseAircraft {
  id: string;
  name: string;
  model: string;
  price: number;
  capacity: string;
  avionics: string;
  description: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  background_image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// Check if user is admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();

  return !error && !!data;
};