import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

function sanitize(s: string): string {
  return s.replace(/[<>]/g, "").trim();
}

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const { data, error } = await supabase
    .from("institutions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const body = await request.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  for (const key of ["name", "location", "city", "description", "external_url", "parent_org"] as const) {
    if (typeof fields[key] === "string") fields[key] = sanitize(fields[key]);
  }

  const { data, error } = await supabase
    .from("institutions")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/institutions");
  return NextResponse.json({ data });
}
