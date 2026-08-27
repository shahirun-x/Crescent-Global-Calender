export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

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
