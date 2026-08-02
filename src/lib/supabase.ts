import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://evaxbwuhlnpwnmphzysq.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_JkWNRcw60a5euPsLlGCPFg_6x8KVbq4';

export const supabase = createClient(supabaseUrl, supabaseKey);
