import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sgymfpbnlbqeelbfiguc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNneW1mcGJubGJxZWVsYmZpZ3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNDgyODQsImV4cCI6MjA1MDkyNDI4NH0.1TriuQfF99YycEgGowmiZskXWX08dMzyIpn9bOeswsM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);