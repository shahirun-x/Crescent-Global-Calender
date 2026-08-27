import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const role = body.role?.trim() ?? "";

  if (!emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("connect_signups")
    .upsert({ email, role: role || null }, { onConflict: "email" });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not add you right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
