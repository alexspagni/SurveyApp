// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Get your Supabase URL and Anon Key from Supabase Dashboard (API settings)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,  // Make sure to add this to your .env file
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
