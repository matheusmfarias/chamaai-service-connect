
import { createClient } from '@supabase/supabase-js';

// Supabase project URL and anon key
const supabaseUrl = 'https://vanxomunmbtronfwlqwr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnhvbXVubWJ0cm9uZndscXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDM4MDMsImV4cCI6MjA2MTA3OTgwM30.rMDkt11yZA5G27EHPmE4JsR-cJjPgCksLxuVyhCw1Dc';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
