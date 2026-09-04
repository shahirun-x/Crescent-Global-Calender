import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export async function POST(request: Request) {
  // Rate limit: 3 per IP per hour
  const ip = getClientIP(request);
  const rl = checkRateLimit(`subscribe:${ip}`, 3);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = sanitize(body.name ?? "");
  const email = sanitize(body.email ?? "");
  const role = sanitize(body.role ?? "");

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

  // Check for duplicate
  const { data: existing } = await supabase
    .from("connect_signups")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      ok: true,
      stored: true,
      message: "You're already registered! We'll be in touch.",
    });
  }

  const { error } = await supabase
    .from("connect_signups")
    .insert({ name: name || null, email, role: role || null });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not add you right now. Please try again later.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
