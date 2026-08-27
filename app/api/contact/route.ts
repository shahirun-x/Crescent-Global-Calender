import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

interface Body {
  name?: string;
  email?: string;
  message?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || !emailRe.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please check your name, email and message." },
      { status: 422 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    // No database configured — the client falls back to a mailto: link.
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not save your message. Please email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
