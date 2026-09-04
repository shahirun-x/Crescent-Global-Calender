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
    .from("events")
    .select("*")
    .order("date_start", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const body = await request.json();
  const row = {
    title: sanitize(body.title ?? ""),
    date_start: body.date_start,
    date_end: body.date_end || null,
    institution_id: body.institution_id || null,
    institution_name: sanitize(body.institution_name ?? ""),
    category: body.category,
    location: sanitize(body.location ?? ""),
    description: sanitize(body.description ?? ""),
    is_featured: body.is_featured ?? false,
  };

  const { data, error } = await supabase.from("events").insert(row).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/calendar");
  return NextResponse.json({ data }, { status: 201 });
}

export async function PUT(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const body = await request.json();
  const { id, ...fields } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Sanitize string fields
  for (const key of ["title", "institution_name", "location", "description"] as const) {
    if (typeof fields[key] === "string") fields[key] = sanitize(fields[key]);
  }

  const { data, error } = await supabase.from("events").update(fields).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/calendar");
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/calendar");
  return NextResponse.json({ ok: true });
}
