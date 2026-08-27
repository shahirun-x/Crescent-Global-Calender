# Crescent Global

A modern, lightweight, responsive portal that unifies the **Crescent ecosystem** —
schools, colleges, a university, hospitals and community initiatives across India
and beyond. It is a **glossary, guide and coordination layer**; it supplements,
and does not replace, each institution's own website.

## Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | Next.js 15 (App Router, TypeScript)              |
| Styling     | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Data        | Supabase (PostgreSQL) — optional, with fallback   |
| Animation   | Framer Motion (subtle, respects reduced-motion)   |
| Deployment  | Vercel-ready (`vercel.json` included)             |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

The site **runs with zero configuration** — every page falls back to the bundled
seed data in [`lib/seed.ts`](lib/seed.ts). To enable the live database and the
contact / early-access forms, set:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Supabase setup

1. Create a project at <https://supabase.com>.
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) then
   [`supabase/seed.sql`](supabase/seed.sql).
3. Copy the project URL and `anon` key into `.env.local`.

Tables: `institutions`, `events`, `news`, `contacts`, `connect_signups`.
Row-level security allows public **read** on content tables and public **insert**
on the two form tables only.

## Pages

| Route           | Rendering | Notes                                              |
| --------------- | --------- | -------------------------------------------------- |
| `/`             | ISR 1h    | Hero, ecosystem, live events, journey timeline     |
| `/institutions` | ISR 24h   | Filter by pillar / search; cards link out          |
| `/calendar`     | ISR 10m   | **Top-level nav.** Today / Week / Month / Year     |
| `/news`         | ISR 10m   | Unified news stream, filter by institution         |
| `/connect`      | Static    | Crescent Connect — Phase 2 "coming soon" + signup  |
| `/about`        | ISR 24h   | Vision, mission, full timeline, CGOM note          |
| `/contact`      | Static    | Contact form (Supabase, or `mailto:` fallback)     |

## Editing content

- **Without Supabase:** edit [`lib/seed.ts`](lib/seed.ts).
- **With Supabase:** edit rows in the dashboard; pages revalidate on the ISR
  schedule above.
- Institution `external_url` values marked `// TODO verify` in `lib/seed.ts`
  should be confirmed against each official website.

## Accessibility & performance

- Mobile-first, tested at 375 / 768 / 1024 / 1440 px.
- Skip-link, semantic landmarks, `aria-current`, focus-visible rings, `aria-live`
  result counts, `prefers-reduced-motion` honoured.
- No external fonts or UI libraries; inline SVG logo; minimal client JS
  (only the interactive filters and forms are client components).

## Deploy to Vercel

Push to a Git repo, import into Vercel, add the environment variables, deploy.
`next build` output is static + ISR — no server configuration required.
