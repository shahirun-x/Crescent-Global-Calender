import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

export const runtime = "nodejs";

interface Body {
  name?: string;
  email?: string;
  message?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export async function POST(request: Request) {
  // Rate limit: 3 submissions per IP per hour
  const ip = getClientIP(request);
  const rl = checkRateLimit(`contact:${ip}`, 3);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Body;
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
  const message = sanitize(body.message ?? "");

  if (name.length < 2 || !emailRe.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please check your name, email and message." },
      { status: 422 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not save your message. Please email us directly.",
      },
      { status: 500 }
    );
  }

  // Optional: send email notification via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Crescent Global <noreply@crescentglobal.org>",
          to: "connect@crescentglobal.org",
          subject: `New contact form: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
    } catch {
      // Email is optional — don't fail the submission
    }
  }

  return NextResponse.json({ ok: true, stored: true });
}
