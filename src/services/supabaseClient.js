import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = 'https://patgfkrfbcsnaxsubpaa.supabase.co';
const supabaseAnonKey = Constants?.expoConfig?.extra?.supabaseAnonKey || process.env.SUPABASE_KEY;

if (!supabaseAnonKey) {
  console.warn('Supabase anon key is not defined. Register and login actions will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey ?? '');
