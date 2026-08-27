const PRODUCTION_URL = "https://crescent-global-calender.vercel.app";

// Resolve the public site URL. `NEXT_PUBLIC_SITE_URL` overrides the production
// default (for a custom domain or a preview deployment), but only when it holds
// a real, non-localhost value. This is deliberately defensive:
//   * `.trim() || fallback` catches an env var that is present but empty or
//     whitespace-only (Vercel stores such a value as "" rather than undefined,
//     so a bare `process.env.X || fallback` would still yield "" — falsy, but a
//     `.replace()` chained onto `undefined` would have thrown instead).
//   * the localhost guard stops a stray `http://localhost:3000` (e.g. copied
//     from .env.example into the Vercel dashboard) from poisoning canonical and
//     OG tags on the live site.
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return PRODUCTION_URL;
  const normalized = raw.replace(/\/+$/, "");
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalized)) {
    return PRODUCTION_URL;
  }
  return normalized;
}

export const SITE_URL = resolveSiteUrl();

export const site = {
  name: "Crescent Global",
  tagline: "One Crescent. One Community. One Global Network.",
  description:
    "A unified digital portal for the Crescent ecosystem — a glossary, guide and coordination layer across educational, healthcare and community institutions in India and beyond.",
  url: SITE_URL,
  contactEmail: "connect@crescentglobal.org",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/institutions", label: "Institutions" },
  { href: "/calendar", label: "Central Calendar" },
  { href: "/news", label: "News & Events" },
  { href: "/connect", label: "Crescent Connect" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const categoryMeta: Record<
  string,
  { label: string; blurb: string }
> = {
  education: {
    label: "Education",
    blurb: "Schools, colleges and a deemed university spanning school-age to doctoral study.",
  },
  healthcare: {
    label: "Healthcare",
    blurb: "Hospitals and nursing education serving communities across Tamil Nadu.",
  },
  community: {
    label: "Community",
    blurb: "Children's homes, welfare programmes and outreach for underprivileged families.",
  },
  innovation: {
    label: "Innovation",
    blurb: "Incubation, research and enterprise support for students and alumni.",
  },
};

export function formatDateRange(start: string, end?: string | null): string {
  const s = new Date(start + "T00:00:00");
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  if (!end || end === start) return fmt(s);
  const e = new Date(end + "T00:00:00");
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    })}`;
  }
  return `${fmt(s)} – ${fmt(e)}`;
}
