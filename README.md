# Landtech — `frontend-static`

A fully **static** Next.js 14 site (App Router, TypeScript, Tailwind) with **GSAP ScrollTrigger** scenes wired through **Lenis** smooth scroll. Builds via `output: 'export'` to a folder of plain HTML/CSS/JS that you can drop on Netlify, Vercel (as static), Cloudflare Pages, S3 + CloudFront, or GitHub Pages.

This is the **phase 1 design deliverable** — content is hard-coded TypeScript so the client can review the design before approving the dynamic build. When approved, the existing dynamic stack in this repo (`frontend/` + `backend/`) takes over with a small migration described at the bottom.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS (luxury palette: ink / gold / cream)
- Manrope font (200–800 weights via `next/font/google`)
- **GSAP 3** + **ScrollTrigger** for scroll-driven scenes
- **Lenis** for inertial smooth scrolling, ticked into `gsap.ticker`
- React Hook Form + Zod for the lead form
- Lucide icons
- `@react-google-maps/api` for the optional map view

## Run

```bash
cd frontend-static
cp .env.example .env.local            # set brand vars + (optionally) leads endpoint + maps key
npm install
npm run dev                           # http://localhost:3000
```

## Build (static export)

```bash
npm run build       # emits ./out/
npm run start       # serves ./out via `npx serve`
```

The `out/` directory is the entire deployable. Drop it on:

- **Netlify drop**: drag `out/` onto app.netlify.com/drop.
- **Vercel**: connect this folder as a project — `output: 'export'` is auto-detected.
- **GitHub Pages**: push `out/` to a `gh-pages` branch (or set Pages to serve from a folder).
- **S3 + CloudFront**: `aws s3 sync out s3://your-bucket --delete`. Set `index.html` as the default root and add a `404.html` rewrite.

`trailingSlash: true` is set so directory-style hosts (S3 etc.) serve `/projects/skyline-residences/` cleanly.

## Environment

| Var | Notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL (used for OG/sitemap). |
| `NEXT_PUBLIC_BRAND_NAME` / `_PHONE` / `_EMAIL` | Brand metadata shown in nav, footer, contact page. |
| `NEXT_PUBLIC_LEADS_ENDPOINT` | Where the lead form POSTs. **If unset**, the form just shows the thank-you state — no submission goes anywhere. Wire it later to Formspree, Web3Forms, or your own backend in one line. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Optional. If unset, `MapView` falls back to a static "View on Google Maps" link. |

## Editing content

All content lives in TypeScript files under `content/`. Edit + redeploy.

- `content/site.ts` — brand, hero copy, marquee strings, "why us" pillars, counter stats, about copy.
- `content/projects.ts` — array of `Project` entries. `slug` becomes the URL.
- `content/properties.ts` — array of `Property` entries. `projectSlug` (optional) links a property to its parent project for the "Available residences" cross-reference.

The TS shapes match the backend models in `backend/src/models/*.js` so the migration to dynamic later is a swap, not a port.

## Animations

GSAP wiring lives in three places:

- `lib/gsap.ts` — registers `ScrollTrigger` once, exposes `gsap`, `useGsap` (a `useLayoutEffect` + `gsap.context` hook with auto-revert on unmount), and a `splitWords` DOM helper.
- `components/LenisProvider.tsx` + `components/GsapProvider.tsx` — the smooth-scroll/ScrollTrigger bridge. Mounted once in `app/layout.tsx`. Both no-op under `prefers-reduced-motion`.
- Animated components: `Hero` (entry + optional pinned scrub), `SplitWords`, `ScrollReveal`, `ImageReveal` (clip-path mask wipe), `Counter`, `HorizontalScroll` (Binghatti-style pinned horizontal), `Marquee`.

ScrollTrigger never imports at module top level outside `'use client'` files, so the static build pipeline never executes it server-side.

## Pages

- `/` — hero (pinned + scrubbed), gold marquee, featured projects (`ImageReveal` mask-wipe cards), featured properties (horizontal scroll), why-Landtech 3-up with `Counter` stats, lead-form CTA.
- `/projects` — index, ScrollReveal-staggered.
- `/projects/[slug]` — fullscreen pinned hero, overview, highlights, unit-types table, gallery, related properties, map + lead form.
- `/properties` — short hero, client-side filter (`PropertyFilter`), filtered grid.
- `/properties/[slug]` — hero, stats, description, amenities, gallery, map, sticky aside with lead form.
- `/about` — pinned hero, practice copy, counter stats.
- `/contact` — short hero, contact info + lead form.
- `/sitemap.xml`, `/robots.txt` — built statically from `content/`.
- `/404` — not-found.

## Migration to dynamic (when client approves)

The two-line migration to wire this into the existing `backend/` Express + MongoDB:

1. **`next.config.mjs`**: remove `output: 'export'` and `images.unoptimized: true`. Add the `/api/proxy/:path*` rewrite from `frontend/next.config.mjs`.
2. **Each `app/page.tsx`**: replace `import { projects } from '@/content/projects'` with `await api.get('/projects')` (and the `Property` equivalent). The shapes already match.

The lead form is already pointed at `NEXT_PUBLIC_LEADS_ENDPOINT` — set it to `/api/proxy/leads` and it works against the existing Express controller without code changes. Generally the `content/` directory is then deleted.

## Replace before launch

- Real photography (currently Unsplash CDN URLs in `content/projects.ts` + `content/properties.ts`).
- Real phone / email / brand vars in `.env.local`.
- A real `og-default.jpg` in `public/` for OG share previews (referenced by per-page metadata).
- Production lead-form endpoint.
