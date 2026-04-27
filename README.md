# Lumina Vou — Production site

Premium solar engineering for the Pacific. React + Vite + TypeScript, styled with Tailwind CSS and shadcn/ui patterns, with subtle Framer Motion choreography throughout.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v3** with brand tokens (Sun, Earth, Canvas, Zap, Electric)
- **shadcn/ui**-style component primitives (`Button`, `Card`, `Input`, `Slot`)
- **Framer Motion** for hero entry, scroll-reveal sections, mobile drawer, and the chart bars on `/learn-the-math`
- **React Router** (HashRouter) so the static build works inside Odoo's website module without server-side rewrites
- **Lucide React** icons (with inline SVG brand glyphs for Instagram/LinkedIn)
- **Fraunces** (display) + **Manrope** (body) via Google Fonts

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for production

```bash
npm run build
```

The output is a static site in `dist/`. It contains `index.html`, hashed JS/CSS, and the favicon — no server runtime needed. Current bundle weighs ~142 KB gzipped.

## Deploying to Odoo

Two ways:

**Option A — Embed in Odoo Website (recommended).** Build the site (`npm run build`), then upload the contents of `dist/` to a folder in your Odoo website's `/static/` directory (for example `/lumina_vou_static/`). Create a single Odoo page that loads `index.html` from that folder, or set Odoo to serve `index.html` as the homepage. Because the project uses **HashRouter** and `base: "./"` in `vite.config.ts`, every internal link works regardless of subpath.

**Option B — Separate subdomain.** Host the `dist/` folder on any static host (Netlify, Cloudflare Pages, an S3 bucket, etc.) and point `app.luminavou.com` at it. Then link to it from your Odoo-driven main site. This is simpler operationally and keeps the React app cleanly separated.

For the contact form (`/contact`) and the email-capture on the home page CTA band — these currently set local success state for the demo. To wire them up to Odoo CRM:

1. Create an Odoo CRM webhook or a small HTTP endpoint on your Odoo instance.
2. In `src/pages/Contact.tsx` and `src/pages/Home.tsx`, replace the `setSubmitted(true)` line with a `fetch()` call to that endpoint, then set submitted on success.
3. Pass the form fields as JSON; map them to `crm.lead` fields on the Odoo side.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero, marquee, intelligent infrastructure section, asymmetric feature grid, testimonial, CTA band |
| `/solutions` | Three product detail blocks (Tiles, Storage, Insights) + 3-step engineering process |
| `/sustainability` | Four pillars + YTD stat strip + link to Impact Report |
| `/our-impact` | Three case studies with capacity / storage / saving stats |
| `/about` | Origin story, values grid, team |
| `/contact` | Full contact form with property type select |
| `/login` | Customer portal sign-in (placeholder, ready to wire) |
| `/learn-the-math` | Interactive solar payback calculator with 25-year cumulative chart |
| `/impact-report` | 2024 highlights + downloadable PDF (placeholder) |
| `/privacy-policy` | Full readable policy |
| `/terms-of-service` | Full readable terms |
| `*` | Branded 404 |

## Brand tokens (in `tailwind.config.js`)

```
sun       #b35535   Primary CTAs, accents
earth     #453526   Body type, dark sections
canvas    #faf1e8   Page background
zap       #73bcbc   Secondary accent (teal)
electric  #edd45e   Highlight accent (yellow)
```

## Motion philosophy

Subtle, never showy. Implemented via:

- One choreographed page-load on the hero (eyebrow → heading → paragraph → CTAs)
- A reusable `<Reveal>` component for scroll-triggered fade-up on every section
- Card hover-lift via Tailwind transition utilities
- Animated underline on nav links
- Image scale on hover for media cards
- Staggered bar-chart animation on `/learn-the-math`

Framer Motion respects `prefers-reduced-motion` by default, so users with that system setting will get static rendering automatically.

## Project layout

```
src/
  components/
    ui/           shadcn-style primitives (Button, Card, Input, Slot)
    AppLayout.tsx
    Header.tsx
    Footer.tsx
    Logo.tsx
    PageHeader.tsx
    Reveal.tsx
  lib/
    utils.ts      cn() helper
  pages/
    Home.tsx, Solutions.tsx, Sustainability.tsx, OurImpact.tsx,
    About.tsx, Contact.tsx, Login.tsx, LearnTheMath.tsx,
    ImpactReport.tsx, PrivacyPolicy.tsx, TermsOfService.tsx, NotFound.tsx
  App.tsx         Routes
  main.tsx        Mount
  index.css       Tailwind layers + base styles + grain + nav-link util
```
