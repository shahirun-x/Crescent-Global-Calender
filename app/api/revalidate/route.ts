import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Revalidation not configured." },
      { status: 500 }
    );
  }

  let body: { secret?: string; paths?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (body.secret !== secret) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret." },
      { status: 401 }
    );
  }

  const paths = body.paths ?? ["/", "/calendar", "/news", "/institutions"];
  const revalidated: string[] = [];

  for (const path of paths) {
    try {
      revalidatePath(path);
      revalidated.push(path);
    } catch {
      // path may not exist — skip
    }
  }

  return NextResponse.json({ ok: true, revalidated });
}
