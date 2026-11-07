import { createClient } from "@supabase/supabase-js";

let client;

export function supabase() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error("SUPABASE_URL yoki SUPABASE_SERVICE_ROLE_KEY sozlanmagan");
    }

    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}