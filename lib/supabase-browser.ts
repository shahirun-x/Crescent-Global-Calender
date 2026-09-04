"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Browser-side Supabase client (anon key, persists session in localStorage).
 * Used for admin login and authenticated client-side operations.
 */
export function getBrowserSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  client = createClient(url, anonKey);
  return client;
}
