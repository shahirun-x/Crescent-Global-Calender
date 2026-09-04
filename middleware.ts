import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify token with Supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("sb-access-token");
    return response;
  }

  return NextResponse.next();
}
