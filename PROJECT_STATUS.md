# Crescent Global — Project Status & Roadmap

> **Last updated:** 31 August 2026
> **Repo:** https://github.com/shahirun-x/Crescent-Global-Calender
> **Live:** https://crescent-global-calender.vercel.app/
> **Latest commit:** `621589d` (map tiles fix + hero image)
> **Client:** Crescent Global Outreach Mission (CGOM)
> **Developer:** Shahirun (shahirun-x)
> **Build tool:** Claude Code (Sonnet)

---

## What This Project Is

A unified digital portal called **Crescent Global** that **supplements** (not replaces) the individual websites of institutions under the Crescent ecosystem. It acts as a **glossary, guide, and coordination layer** across 15+ educational, healthcare, and community institutions spread across Tamil Nadu and globally — helping **unify and channelise their collective efforts for the betterment of the alma mater**.

Key concept: one website to connect, coordinate, and unify everything "Crescent" under a single digital roof.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.5 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (@theme tokens) |
| Database | Supabase (PostgreSQL + pgvector) |
| Animation | Framer Motion |
| Maps | Leaflet + react-leaflet (OpenStreetMap/CARTO tiles) |
| Deployment | Vercel (Hobby plan) |
| Analytics | @vercel/analytics |
| Images | next/image + Unsplash CDN |
| Auth | None yet (Phase 2 — Crescent Connect) |

---

## Architecture

```
app/
├── page.tsx              → Homepage (ISR 1h)
├── institutions/page.tsx → All 15 institutions (ISR 24h)
├── calendar/page.tsx     → Central Calendar (ISR 10m)
├── news/page.tsx         → Unified news stream (ISR 10m)
├── connect/page.tsx      → Crescent Connect placeholder (Static)
├── about/page.tsx        → Vision, mission, timeline (ISR 24h)
├── contact/page.tsx      → Contact form (Static)
├── api/contact/          → Form submission endpoint
├── api/connect/          → Early access signup endpoint
├── sitemap.ts            → Auto-generated sitemap
├── robots.ts             → SEO robots config
└── opengraph-image/      → Dynamic OG image generation

components/
├── Hero.tsx              → Homepage hero with Unsplash parallax bg
├── Calendar.tsx          → Interactive month/week calendar grid
├── CalendarExplorer.tsx  → Unified state container (filters + calendar + list)
├── InstitutionMap.tsx    → Leaflet map with clustering
├── InstitutionMapCard.tsx→ next/dynamic SSR-false wrapper for map
├── InstitutionCard.tsx   → Institution card with category header bar
├── EcosystemGrid.tsx     → Five-pillar cards with category gradients
├── EventStrip.tsx        → Homepage upcoming events strip
├── Timeline.tsx          → 1967→2024 journey timeline
├── Navbar.tsx            → Top navigation
└── Footer.tsx            → Site footer

lib/
├── site.ts               → SITE_URL, map tile URL constants
├── seed.ts               → Single source of truth (15 institutions, events, news, timeline)
├── data.ts               → Supabase-first with seed fallback
├── dates.ts              → Date helpers + RangeKey type
└── eventCategories.ts    → Category colors (dot, soft, glow, border)

supabase/
├── schema.sql            → 5 tables with RLS (institutions, events, news, contacts, connect_signups)
└── seed.sql              → Production seed data
```

---

## What's DONE ✅

### Core Pages (all 7 live)
- [x] Homepage — hero, ecosystem grid, events strip, audiences, timeline, Connect CTA
- [x] Institutions page — 15 institutions with filter by pillar + search
- [x] Central Calendar — interactive month/week grid + event list with unified filters
- [x] News & Events — unified stream with institution filter
- [x] Crescent Connect — Phase 2 "coming soon" + early access signup
- [x] About / Our Journey — vision, mission, 1967→2024 timeline, CGOM note
- [x] Contact — form with Supabase or mailto fallback

### Central Calendar
- [x] Month view with day grid (Mon–Sun, 5/6 weeks)
- [x] Week view (columns on desktop, vertical list on mobile)
- [x] Month/Week iOS-style sliding pill toggle
- [x] Category-colored event dots (8px with glow)
- [x] Hover tooltips (smart positioning — above/below based on row)
- [x] Click to select day → filters event list below
- [x] Red accent circle on selected day, Crescent blue on today
- [x] Tap animation (scale 0.95 → 1.0)
- [x] Weekend column shading, current week highlight
- [x] Swipe left/right to change months (mobile touch)
- [x] Synced with category filters + time range toggles
- [x] Prev/next arrows + Today button

### Interactive Map
- [x] Leaflet + CARTO Dark Matter tiles (no API key)
- [x] All 15 institutions plotted with lat/lng
- [x] Custom category-colored markers (12px, white border)
- [x] Proximity clustering (Chennai 3, Vandalur 3, Kilakarai 5, Madurai 3, Nagore 1)
- [x] Hover tooltip (name + city), click popup (full details + website link)
- [x] Scroll zoom disabled (Ctrl+scroll to zoom, pinch on mobile)
- [x] Placed on homepage + institutions page
- [x] Category legend

### Visual Design
- [x] Hero with Unsplash campus photo + parallax scroll + dark overlay
- [x] Crescent blue (#1a3a6b) + white + red accent palette
- [x] Ecosystem pillar cards with category gradient backgrounds
- [x] Event strip cards with category-colored left borders
- [x] Institution cards with 8px category header bars
- [x] Calendar with premium styling (gradients, shadows, glow dots)
- [x] Inline SVG logo/favicon
- [x] No external fonts or UI libs

### SEO & Performance
- [x] metadataBase hardcoded to production URL
- [x] Canonical, OG, Twitter meta on all pages
- [x] Dynamic /opengraph-image generation
- [x] /sitemap.xml + /robots.txt
- [x] PWA manifest
- [x] SSG/ISR on all pages (17/17 static, only 2 API routes dynamic)
- [x] Shared JS: ~154 kB, Leaflet lazy-loaded
- [x] Vercel Analytics installed

### Accessibility
- [x] `<html lang="en">`, skip-to-content link
- [x] Semantic landmarks, aria-current, aria-live
- [x] Focus-visible rings
- [x] prefers-reduced-motion honoured
- [x] Mobile tap targets ≥ 44px

### Data
- [x] 15 institutions with real descriptions, URLs, categories, lat/lng
- [x] 10 seeded events across categories
- [x] 6 seeded news items
- [x] 10 timeline entries (1967–2024)
- [x] Supabase schema + seed SQL ready
- [x] Fallback to seed data when no Supabase configured

---

## What's PENDING 🔲

### High Priority — Before Client Demo

- [ ] **Verify all institution URLs** — 5 institutions still fall back to Google search ("Search online" button): Muthu Zulaikha Public School, Yousuf Zulaikha Hospital, Madurai Crescent School, Nagore Crescent School, Children's Homes. Confirm with client if these have websites or if search fallback is acceptable.
- [ ] **CIIC (Innovation Centre) confirmation** — Claude Code added "Crescent Innovation & Incubation Centre" so the Innovation pillar has content. Confirm with client whether this should stay or be removed.
- [ ] **Real campus photos** — Replace the Unsplash hero image with actual Crescent campus photography. Ideally get 3-5 photos from the client for hero rotation, institution cards, and about page.
- [ ] **Content review with client** — All institution descriptions, event details, and timeline entries need client sign-off. Currently seeded from the concept document.
- [ ] **Mobile responsive audit** — Full testing across iPhone SE, iPhone 14, Galaxy S series, iPad. Check: hero text sizing, map touch behavior, calendar swipe, navbar hamburger menu, institution cards grid.
- [ ] **Custom domain** — Purchase domain and configure in Vercel (Settings → Domains). DNS propagation takes ~24h.

### Medium Priority — Post-Demo Polish

- [ ] **Supabase connection** — Set up production Supabase project, run schema.sql + seed.sql, add env vars to Vercel (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY). Currently running on seed fallback.
- [ ] **Admin panel / CMS** — Client needs a way to add events, news, and update institution data without code changes. Options: Supabase dashboard (technical), custom admin page (better), or headless CMS integration.
- [ ] **Contact form backend** — Currently falls back to mailto: without Supabase. Wire up to Supabase + email notification (Resend or similar).
- [ ] **Connect signup backend** — Same as above — early access signups need to be stored and confirmable.
- [ ] **News content** — The 6 seeded news items are placeholder-level. Need real news content from client or a feed integration.
- [ ] **Events: real data** — The 10 seeded events are representative but fictional. Client needs to populate with actual upcoming events.
- [ ] **Lighthouse audit** — Run against production build, target 90+ across all four metrics. Fix any performance/accessibility issues.
- [ ] **Error pages** — Custom 404 and 500 pages matching the site design.
- [ ] **Loading states** — Skeleton loaders for calendar, map, and institution cards during client-side hydration.

### Phase 2 — Crescent Connect (Future)

- [ ] **Authentication** — Supabase Auth with email/password + Google OAuth
- [ ] **User profiles** — Role-based: Student, Alumni, Faculty, Management, Parent, Entrepreneur, Well-wisher
- [ ] **People directory** — Searchable directory with filters by institution, batch year, role
- [ ] **Alumni chapters** — Geographic chapters (Chennai, Bangalore, Dubai, Singapore, etc.)
- [ ] **Mentorship matching** — Alumni-to-student mentorship requests
- [ ] **Job board** — Alumni posting opportunities for Crescent graduates
- [ ] **Messaging** — Direct messaging between connected members
- [ ] **Notifications** — Event reminders, chapter updates, new connections

### Phase 3 — Advanced Features (Future)

- [ ] **Resource mobilization** — Donation/fundraising pages for specific causes
- [ ] **Shared document library** — Common resources across institutions
- [ ] **Multi-language support** — Tamil and Arabic alongside English
- [ ] **Institution dashboards** — Each institution gets a mini-dashboard showing their events, news, and Connect members
- [ ] **Mobile app** — React Native wrapper or PWA enhancement
- [ ] **API for institutions** — REST API so institutions can push events/news from their own systems

---

## Commits History

| Commit | Description |
|--------|------------|
| `2612541` | Initial full build — all 7 pages, 15 institutions, seed data |
| `ae0229e` | SEO fix — production URL in metadata + real institution URLs |
| `77f23bb` | Hardened SITE_URL resolution against empty/localhost env var |
| `b46fd62` | Interactive month/week calendar with filters and click behavior |
| `f5d8a2f` | Calendar polish — compact grid, tooltip fix, premium styling |
| `7b13252` | Interactive institution map + hero image + visual warmth |
| `621589d` | Fix map tiles (CARTO CDN) + fix hero image (Unsplash 404) |
| latest | Vercel Analytics added |

---

## Key Decisions Log

1. **Supplements, not replaces** — The portal is a layer above existing institution websites. Each institution card links OUT to their official site.
2. **Central Calendar as top-level nav** — Not buried under Events. It's the #1 feature.
3. **Seed data fallback** — Site runs with zero Supabase config. lib/data.ts tries Supabase first, falls back to lib/seed.ts.
4. **No external UI libraries** — Tailwind + Framer Motion only. Full design control, minimal bundle.
5. **Leaflet over Google Maps** — Free, no API key, open source. CARTO Dark Matter tiles for premium look.
6. **CalendarExplorer as unified state container** — Calendar grid + filters + event list share one client parent for synchronized state.
7. **Alumni CTA card stays bold** — Not tinted like pillar cards. Different element, different purpose.
8. **SITE_URL hardcoded** — Production URL fallback baked into code. Env var optional, only needed for custom domain.

---

## Environment Variables

### Required for full functionality (set in Vercel dashboard)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional
```
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com  # only after buying domain
```

### Not needed (handled in code)
```
# No Google Maps API key needed (using Leaflet + CARTO)
# No Unsplash API key needed (direct CDN URLs)
# No analytics key needed (Vercel Analytics auto-detects)
```

---

## File to share with client

For client communication, the key message is:

> We've built a fully functional Crescent Global portal — 7 pages, 15 institutions mapped, an interactive Central Calendar with month/week views, category filtering, and a dark-themed map showing all institution locations across Tamil Nadu. The site runs on seed data right now and is ready for your review. Next steps are: your content review, real campus photos, Supabase database setup, and domain purchase.
