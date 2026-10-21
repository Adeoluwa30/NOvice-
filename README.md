# Adeoluwa Adeoye, Portfolio

A custom, multi-page portfolio for **Adeoluwa Adeoye**, interface & experience designer.
Editorial layout, oversized condensed typography, scroll-driven motion, and three themes.

Live design references: [Russell Numo](https://www.russellnumo.nl/) (layout language) and the
previous [Figma site](https://adeoluwaadeoye.figma.site/) (content + brand).

## Stack

- **React 19** + **Vite 7**
- **React Router**, SPA with `/work/:slug` case studies
- **Motion** (Framer Motion), reveals, page transitions, scroll-linked typography and parallax
- **Lenis**, smooth scrolling (disabled for reduced-motion users)
- Plain CSS design tokens, no UI framework, so the typography stays pixel-controlled

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home, marquee hero, selected work, manifesto, capabilities, experience |
| `/work` | Full project index |
| `/work/chef4me-user` | Chef4me User, mobile app, 2025 |
| `/work/chef4me-chef` | Chef4me Chef, chef web app, 2025 |
| `/work/brandit` | Brandit, e-commerce, 2024 |
| `/work/chef4me-web` | Chef4me Web, user marketplace, 2024 |
| `/work/bubble` | Bubble, legal case management, 2023 |
| `/about` | Bio, journey, principles |
| `/contact` | Email, WhatsApp-style message composer, FAQ |
| `*` | 404 with a way back |

## Theming

Three themes live in `src/styles/main.css` under `[data-theme="dark|light|brand"]`:
**Night** (default), **Day** and **AdE** (the full-crimson brand theme). The chosen theme is stored
in `localStorage` and applied before paint by a tiny script in `index.html`, so there is no flash.

Brand colour: `#E3063B` (sampled from the logo).

Switching theme cross-fades the palette instead of swapping instantly. The `theme-anim` class is
applied to `<html>` for 520ms by `useTheme`, so only the colours transition and hover/motion
transitions are untouched.

Every route change plays a short page transition: an `AnimatePresence` fade for the content plus a
sheet that sweeps up with the page name (`src/components/RouteWipe.jsx`). Both respect reduced motion.

## Typography

- **Display**, the stack is `"Bunky", "Big Shoulders Display", …`.
  Bunky is a commercial typeface and is not bundled. If you own a webfont licence, drop the files in
  `public/fonts/` and add an `@font-face` block at the top of `src/styles/main.css`; the display stack
  will pick it up automatically. Until then the site falls back to **Big Shoulders Display** (OFL),
  which carries the same tall, condensed uppercase personality.
- **Body**, **Raleway** (OFL), self-hosted.

Only these two families ship with the site. All fonts are self-hosted in `public/fonts/`
(latin subsets) for performance and privacy.

## Content

All copy and project data live in:

- `src/site.js`, profile, bio, capabilities, experience, FAQ
- `src/data/projects.js`, the five case studies, chapter copy, imagery, next-project chain

Project thumbnails live in `public/assets/thumbs/` (3:2 WebP) and are the product shots from the
previous portfolio. `chef-user.webp` keeps a transparent background so the phone sits on the card
surface in every theme.

Case-study imagery was cropped from the original case-study PDFs at 2× and exported as WebP in
`public/assets/<project>/`. Tavens and PAD are intentionally excluded.

## Sharing and contact

- `public/assets/og.jpg` is the 1200×630 link preview (portrait, name, role). It is referenced with an
  absolute URL in `index.html`. If the production domain changes, update `og:url`, `og:image`,
  `twitter:image` and the canonical link there and in `src/hooks/usePageMeta.js`.
- WhatsApp: set `whatsapp` in `src/site.js` to the number in international format, digits only
  (for example `"2348012345678"`). Until then the contact composer opens a pre-filled email instead.

> **Contact email:** `src/site.js` currently uses `deoluwadeoye1@gmail.com`. Update the `email` field
> there if you'd rather use a custom-domain address.

## Deploy

Vercel-ready (`vercel.json` includes SPA rewrites + immutable caching for fonts and assets):

```bash
npm i -g vercel
vercel --prod
```

Or import the GitHub repo in Vercel, framework preset **Vite**, build `npm run build`, output `dist`.

### Custom domain

1. Add the domain in Vercel → Project → Settings → Domains.
2. At your registrar, point the apex `A` record to Vercel's IP and `www` `CNAME` to
   `cname.vercel-dns.com` (Vercel shows the exact values).
3. Vercel provisions the certificate automatically once DNS resolves.

## Accessibility & performance notes

- Reduced-motion is respected (loader, marquees, reveals, parallax and scroll-word effects disabled).
- Marquees are duplicated for looping but hidden from assistive tech.
- Images are lazy-loaded except the first project covers and the active case-study hero.
- Custom cursor is only enabled for fine pointers.
