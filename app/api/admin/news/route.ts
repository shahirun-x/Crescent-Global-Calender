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
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

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
    summary: sanitize(body.summary ?? ""),
    content: sanitize(body.content ?? ""),
    institution_id: body.institution_id || null,
    institution_name: sanitize(body.institution_name ?? ""),
    published_at: body.published_at || new Date().toISOString().split("T")[0],
    image_url: body.image_url || null,
  };

  const { data, error } = await supabase.from("news").insert(row).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/news");
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

  for (const key of ["title", "summary", "content", "institution_name"] as const) {
    if (typeof fields[key] === "string") fields[key] = sanitize(fields[key]);
  }

  const { data, error } = await supabase.from("news").update(fields).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/news");
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/news");
  return NextResponse.json({ ok: true });
}
