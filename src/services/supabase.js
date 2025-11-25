import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tbgvdqvgutiapzfxzsoj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZ3ZkcXZndXRpYXB6Znh6c29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk0NjIsImV4cCI6MjA3NjIwNTQ2Mn0.eJSpnprYtJK15fB9mkeaNWvrGISELZSIttxgQsvRSN4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
