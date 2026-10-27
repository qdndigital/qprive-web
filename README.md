# QPrive — Marketing Website

Public landing page for the **QPrive** Shopify app (memberships & subscriptions). Built with **Astro + Tailwind**, deploys as static HTML to **Netlify**. Same stack and design system as `qsortby-web`.

This folder is standalone — it is **not** part of the Qmember pnpm/Turborepo workspace and has its own `package.json`.

## Stack

- [Astro](https://astro.build) 4 — static output, zero client framework
- Tailwind CSS 3 (design tokens in `tailwind.config.mjs`)
- Self-hosted font in `public/fonts/`: **Be Vietnam Pro** (static, one file per weight — see `src/styles/fonts.css`)
- Tokens follow the QDN brand v1.0 palette (paper `#F4F1EA`, ink `#1E1E1A`, green `#00A36B`), synced from `qsortby-web` @ `871ea3e`

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Deploy to Netlify

New site → connect the repo → build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero with a live billing-run mockup, "What you get" tabs, pain-point grid, Free plan + setup steps, CTA |
| `/features/plans-benefits` | Plans, pricing styles, the four benefit types |
| `/features/recurring-billing` | Billing schedule, retry rules, out-of-stock rules, past orders |
| `/features/storefront` | Theme blocks, app embed, checkout gift, customer account |
| `/features/members` | Member list, contract actions, self-service, analytics |
| `/pricing` | Free plan, "What's included" table, how billing works |
| `/faqs` | Categorized FAQ (also written as FAQPage JSON-LD) |
| `/support` | Contact form (Netlify Forms) + support info |
| `/thank-you` | Form fallback target (`noindex`) |
| `/privacy`, `/terms` | Privacy Policy and Terms of Service (needed for the App Store listing) |

Header nav: **Features ▾** (`FEATURES_NAV` in `src/consts.ts`), Pricing, FAQs, Support.

- `src/components/MembersShot.astro` — CSS-only app window on the home hero; `public/assets/app.js` animates its rows (`#js-run`), switches the tabs, opens the Features dropdown and submits the support form.
- `src/components/Offer.astro` — the "What you get" tabs; each links to its `/features/*` page. Its pictures (`PurchaseOptions`, `RetryTimeline`, `StorefrontMap`, `MemberCard`) are reused as the feature-page heroes.
- `src/faqs.ts` — FAQ categories for `/faqs` and the FAQPage schema.
- `src/components/Logo.astro` / `public/favicon.svg` — QPrive mark: the shared QDN "Q" body with two circles in the tail. A proposal; swap in the official mark when there is one.
- `src/plans.ts` — pricing + the "What's included" table. Mirrors `APP_BILLING_ENABLED` in `Qmember/packages/core/services/appBilling.ts`: the app is listed as free, so the site shows one Free plan. Flip `BILLING_ENABLED` when the app does.
- Every claim on the site is taken from `Qmember/docs/USER_GUIDE.md`, the extensions in `Qmember/apps/shopify/extensions`, and (for `/privacy`) the access scopes, Prisma schema and GDPR handlers in the app. Keep it that way — App Store listing content must match the installed app.

## ⚠️ Update before publishing

Placeholders — search and replace:

- **`src/consts.ts`** → `APP_STORE_URL` (`https://apps.shopify.com/qprive`), `SUPPORT_EMAIL` (`hello@qdn.vn`, shared with the other QDN apps), `SITE_URL`.
- **Domain** (`https://qprive.com`) → `astro.config.mjs` `site`, `src/consts.ts` `SITE_URL`, `public/robots.txt`, `public/sitemap.xml`.
- No OG share image yet (Twitter card is `summary`). Add `public/assets/og.png` (1200×630) and wire `og:image` in `src/layouts/Base.astro`.
- `/support` and `/thank-you` promise a reply **within one business day** (same promise as the other QDN apps) — confirm the team can keep it.
- `/privacy` and `/terms` describe the app as of 27 Oct 2026 — have them reviewed before publishing, and update them whenever scopes, stored data or sub-processors change.
