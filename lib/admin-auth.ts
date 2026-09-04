import { cookies } from "next/headers";
import { getServiceSupabase } from "./supabase-server";

export interface AdminUser {
  id: string;
  email: string;
}

/**
 * Check if the current request is from an authenticated admin.
 * Reads the sb-access-token cookie set by the browser Supabase client
 * and verifies it server-side with the service role key.
 * Returns the admin user or null.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  if (!accessToken) return null;

  const supabase = getServiceSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email ?? "",
  };
}
