# Sweetbay Restaurant & Bar: concept rebuild

"Magnolia After Dark". A rebuild of sweetbayrestaurant.com (Leonardtown, MD) built with Next.js 16, Tailwind v4,
GSAP + ScrollTrigger + SplitText, Lenis and Motion. Every page is statically generated.

> **Concept mode is on** (`NEXT_PUBLIC_CONCEPT=true`, the default). Pages are `noindex`, the footer reads
> "Concept by Lee Enterprises Unlimited", and every menu notes that dish photography is AI-generated concept imagery.
> Set `NEXT_PUBLIC_CONCEPT=false` for launch to remove all three.

> **Concept footage: replace with real drone footage before launch.** The hero flight is Option C (generated with
> Higgsfield, ending on a dusk relight of the restaurant's real storefront photo). See "Hero footage" below.

## Status (2026-10-26)

- Live (concept): https://sweetbay-restaurant-concept.vercel.app (Vercel project `sweetbay-restaurant-concept`, team leu; every push to `claude/wonderful-bardeen-td1m7f` deploys).
- Content diff: 657 lines, 8 links, 3 titles checked, **0 missing** (`_source/diff-report.txt`).
- QA: 28 Playwright states at 390×844 and 1440×900, 0 console errors, 0 horizontal overflow.
- Lighthouse mobile, production: Accessibility 100 and Best Practices 100 on every page. SEO 69 only because concept
  mode sets `noindex`; with `NEXT_PUBLIC_CONCEPT=false` SEO is 100. Performance 81–93 with applied 4G throttling
  (LCP 1.9–2.2 s on most pages, 3.3 s on the menus, CLS ≤ 0.01) and 70–91 under Lighthouse's simulated model, which
  varies run to run here. Remaining cost is the motion stack (GSAP, Motion, Lenis) and the Fraunces web font.
- Higgsfield: 182 credits used (plan 164, ceiling 205). Rejected takes and why are in `higgsfield/rejected/` locally.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

| Script | What it does |
|---|---|
| `npm run images` | Builds AVIF/WebP sets (640/960/1440/2048), blur placeholders and loop MP4s from `higgsfield/raw/` into `public/menu`, `public/loops`, and writes `content/media.json`. |
| `npm run frames` | Joins the hero clips in `higgsfield/raw/clips/` and cuts the scroll-scrub frames into `public/frames/{desktop,mobile}` plus `manifest.json`. Keeps desktop under 15 MB. |
| `npm run content:diff` | After `next build`, checks every line scraped from the live site (`_source/*.txt`) against the prerendered pages. Writes `_source/diff-report.txt`. Must report `Missing: 0`. |
| `npm run qa` | Playwright screenshots of the hero (0/50/100%), menus, dish sheet and cocktails at 390×844 and 1440×900, plus console errors and horizontal overflow. Output in `qa/out/`. Needs `npm start` running on port 3100 (`BASE=...` to change). |

## Where things live

- `content/` holds all copy and data: `menu.ts`, `site.ts`, `reviews.ts`, `hours.ts`, `media.json` (generated). Components never hard-code content.
- `_source/` holds the scraped live site, `inventory.md` (every addition and intentional difference) and the diff report.
- `higgsfield/` holds `shots.mjs` (every prompt), `SHOTLIST.md`, raw outputs and rejected takes.
- `components/menu/` is the menu system (switcher, filters, rail, plate stage, rows, dish sheet).
- `components/home/Hero.tsx` is the scroll-scrubbed canvas engine.

## Signature details

- **Theme follows the menu.** Switching Dinner and Lunch crossfades the whole page from Night to Day (View Transitions API, CSS fallback) and updates the URL without a reload. Chicken Piccata's price rolls $26 to $22.
- **Deep links.** `/menus/dinner#pan-roasted-duck-breast` opens that dish sheet directly. Esc, arrows, swipe down.
- **Live status chip** computed in America/New_York from `content/hours.ts`.
- **Print** a menu page for a clean two-column paper menu.
- Reduced motion turns off the scrub, Lenis, grain, loops and preloader; the full menu is always server-rendered text.

## Hero footage

Current: Option C. Higgsfield Nano Banana 2.1 keyframes (bay, town square, Washington Street, and a dusk relight of
`public/real/Sweetbay-outside-street-scene-1.jpg`) bridged with Kling 4.0 first/last-frame clips.

To upgrade, drop new MP4s into `higgsfield/raw/clips/` with the same names and run `npm run frames`:

- **Option A (best): real drone footage.** Check B4UFLY/LAANC first; Southern Maryland has military airspace nearby
  (NAS Patuxent River). Commercial flights need a Part 107 certificate.
- **Option B: Google Earth Studio** (needs your Google login, so it could not run from the build session).
  1. New project at earth.google.com/studio, 1920×1080, 30 fps, about 15 s.
  2. Keyframe beats 1-3 over the real coordinates: Breton Bay south of town, then the town square, then Washington St
     descending toward 22680 Washington St (38.29061, -76.63606). Set the time of day to dusk.
  3. Export the image sequence, encode to MP4, and keep the Google Earth attribution visible in a corner the page UI
     does not cover (bottom left works).
  4. Re-run the Higgsfield bridge clip (first frame = last Earth Studio frame, last frame = `hero-storefront-dusk`),
     prompt in `higgsfield/shots.mjs`.

## Before a real launch

1. Real dish photography to replace the AI concept plates (`higgsfield/raw/` → `npm run images`; names are item slugs).
2. Written permission to use the restaurant's photos and logo.
3. Option A drone footage (or Option B) for the hero.
4. `NEXT_PUBLIC_CONCEPT=false` and `NEXT_PUBLIC_SITE_URL=https://sweetbayrestaurant.com`.
5. The `TODO(hunter)` items: grep for them.
