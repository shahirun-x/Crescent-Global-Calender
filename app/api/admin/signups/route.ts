import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase-server";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const { data, error } = await supabase
    .from("connect_signups")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
