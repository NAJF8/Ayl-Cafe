# Ayl Cafe — أيل كافيه

Premium digital menu for Ayl Cafe: cinematic opening experience, a photo hero matching the
cafe's real site, a mobile-first bilingual (Arabic RTL / English) menu with light/dark themes
and WhatsApp ordering.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                 routes: / (home + opening) and /menu (menu + cart)
  components/
    motion/            DeerMotif — the abstract Ayl deer line-art motif
    opening/           OpeningExperience — the cinematic intro
    layout/            NavBar, Footer
    home/              Hero, BrandStory, LocationSection
    menu/              CategoryNav, ProductCard, ProductGrid, ProductDetailDrawer,
                        CartDrawer, CartButton, CartDrawerContext, MenuEntryTransition
  data/                brand.ts, categories.ts, products.ts, settings.ts — all editable content
  lib/                 cart-context.tsx, whatsapp.ts, format.ts, theme-context.tsx,
                       language-context.tsx
public/assets/
  brand/               real Ayl Cafe logo mark + wordmark (from aylcafe.iq)
  menu/                generic cup/glass placeholders — swap for real product photos
  hero/                real Ayl Cafe background photo (home-bg.jpg, from aylcafe.iq);
                       drop opening/menu video files here too
```

## Theme and language

- **Light/dark mode** — `ThemeToggle` in the nav flips a `data-theme` attribute on `<html>`;
  every color is a CSS variable, so no component needs theme-specific classes. Dark palette is
  defined in `globals.css` under `:root[data-theme="dark"]`.
- **Arabic/English** — `LanguageToggle` in the nav switches `useLanguage()`'s `lang` and updates
  `<html lang/dir>` live. Every piece of bilingual content already has `...Ar`/`...En` fields in
  `src/data/*`; components call `pick(ar, en)` to render the active language. Default is Arabic.
- Both choices persist in `localStorage` and are also picked up from `prefers-color-scheme` on
  first visit for the theme.

## Current status

- **Brand identity, logo, colors, tagline, address, hours**: real, pulled from aylcafe.iq and
  @aylcafe.iq on 2026-11-26.
- **Menu (7 categories, 50 items, prices)**: real, transcribed from the official e-menu PDF
  (aylcafe.iq/ar/e-menu). No items or prices are invented.
- **Product photos**: still generic SVG placeholders — no real product photography was provided.
- **WhatsApp ordering number**: not set. The cafe's public contact number on Instagram
  (0781 112 2849) was found but not assumed to be the right number for order messages — confirm
  it and set `socialLinks.whatsapp` in `src/data/settings.ts` to enable the WhatsApp checkout
  button.
- **Google Maps link**: not set — none was published by the cafe; don't invent one.

## Updating brand identity and content (no code changes needed)

- **Brand name, tagline, description, logo paths** — `src/data/brand.ts`
- **Colors** — CSS variables in `src/app/globals.css` (`--color-primary`, `--color-background`,
  `--color-text`, etc.). Everything in the UI reads from these tokens.
- **Categories** — `src/data/categories.ts`
- **Products, prices, options, photos** — `src/data/products.ts`. Replace the placeholder
  `/assets/menu/*.svg` paths with real photography (`.webp`/`.avif` recommended).
- **Instagram, WhatsApp number, location, hours** — `src/data/settings.ts`
- **Opening media (video/image instead of the built-in deer motif)** — set
  `desktopVideo` / `mobileVideo` / `desktopImage` / `mobileImage` / `posterImage` in
  `src/data/settings.ts` (`openingMedia`) and drop files into `public/assets/hero/`.

All of this is placeholder content today (no real Ayl Cafe assets were available at build time).
Nothing elsewhere in the app hardcodes brand text, colors, or product data — swap these files and
the whole site updates.

## Opening experience

`src/components/opening/OpeningExperience.tsx` shows once per browser session (via
`sessionStorage`), then is skippable with the on-screen button. If `openingMedia` in
`settings.ts` has a video/image configured, that's used instead of the built-in animated
deer motif. `prefers-reduced-motion` is respected: it renders only a short fade, never the
full animated sequence.

The deer motif (`src/components/motion/DeerMotif.tsx`) is abstract line geometry — antlers and a
silhouette line, not a literal/cartoon deer — intentionally, per the brand direction.

## Ordering

The cart is local-only (React context + `localStorage`, no backend). Checkout builds a
pre-filled WhatsApp message (`src/lib/whatsapp.ts`) and opens `wa.me` with the order text —
set `socialLinks.whatsapp` in `settings.ts` to enable it.

## Security notes

- No backend, no auth, no database, no file uploads, no third-party SDKs — the main OWASP
  categories that apply to a static Next.js site were reviewed:
  - No secrets/API keys in the repo or client bundle (`npm run build` output inspected).
  - No `dangerouslySetInnerHTML`, no `eval`.
  - The WhatsApp order message and all user-entered text (order notes) are length-capped and
    passed through `encodeURIComponent` before being placed in a URL.
  - `localStorage`/`sessionStorage` access is wrapped in `try/catch` (private browsing, quota).
  - Security headers (CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
    `Permissions-Policy`) are set in `next.config.ts`. The CSP's `script-src` allows
    `'unsafe-inline'` because Next.js injects inline hydration data; `'unsafe-eval'` is added
    only in development (React dev tooling needs it) and is never present in the production
    build.
  - `npm audit` reports 0 vulnerabilities at time of writing.
- If a backend, CMS, or payment integration is added later, re-run a full security review
  (the `web-app-penetration-testing` skill / Strix) against that surface specifically.

## Verification run

- `npx tsc --noEmit` — no errors
- `npm run lint` — 0 errors (3 `<img>`-vs-`next/image` warnings, intentional while images are
  placeholder SVGs; switch to `next/image` once real photography is in place)
- `npm run build` — production build succeeds, all routes statically prerendered
- Verified in-browser at 390px (mobile) and desktop widths: opening → hero → menu → category
  switch → product detail → add to cart → cart drawer, all working; RTL layout (logical
  `start`/`end` spacing, right-aligned text, mirrored drawer) confirmed throughout.
