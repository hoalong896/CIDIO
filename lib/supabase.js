// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,             // URL Supabase
  process.env.SUPABASE_SERVICE_ROLE_KEY // Chỉ dùng ở backend
);
