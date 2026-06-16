import { createClient } from '@supabase/supabase-js';

// grabs url & keys from hidden file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Key in the ignition to connect to the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);