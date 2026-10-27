/** Shared site constants. */
export const SITE_NAME = "QPrive";
export const TAGLINE = "Turn one-time shoppers into members who come back.";

// Marketing domain. Also set in astro.config.mjs (`site`), public/robots.txt
// and public/sitemap.xml — change all four together.
// PLACEHOLDER until the marketing domain is confirmed.
export const SITE_URL = "https://qprive.com";

// Live App Store listing. Every primary CTA on the site points here.
// PLACEHOLDER until the listing is published.
export const APP_STORE_URL = "https://apps.shopify.com/qprive";

// Single inbox for support and contact. Every mailto: and the Organization
// schema in Base.astro read from HERE — never hard-code an address anywhere
// else. Shared with the other QDN apps; confirm before launch.
export const SUPPORT_EMAIL = "hello@qdn.vn";

// Primary nav.
export const NAV = [
  ["/pricing", "Pricing"],
  ["/faqs", "FAQs"],
  ["/support", "Support"],
] as const;

// "Features" nav dropdown — one page per job the "What you get" tabs on the
// home page describe (components/Offer.astro), in the same order.
export const FEATURES_NAV = [
  ["/features/plans-benefits", "Plans & benefits"],
  ["/features/recurring-billing", "Billing & retries"],
  ["/features/storefront", "Storefront & checkout"],
  ["/features/members", "Members & analytics"],
] as const;
