/**
 * Pricing — SINGLE SOURCE OF TRUTH for the marketing site.
 *
 * The app is the real authority: Qmember/packages/core/services/appBilling.ts.
 *
 *   - APP_BILLING_ENABLED is `false` there while the app goes through its first
 *     App Store review, listed as free. Mirror it here. Listing content must
 *     match the installed app, so the site must not print a paid tier the app
 *     can't sell.
 *   - When the app turns billing back on, set BILLING_ENABLED to true and fill
 *     in PRO from the same file (PRO_PRICE, PRO_TRIAL_DAYS). Both plans unlock
 *     the same features today, so Pro's bullets should say what it adds once
 *     the app starts to gate anything — not before.
 */
export const BILLING_ENABLED = false;

export interface Plan {
  /** Plan name as shown to merchants — matches FREE_PLAN / PRO_PLAN in the app. */
  name: string;
  /** Display price, USD/month. */
  price: string;
  /** Who it's for — one line, sits under the price. */
  desc: string;
  features: string[];
  /** Ribbon text, or null. Only one plan should carry one. */
  badge?: string;
  /** true → render as the visually emphasised card. */
  feat?: boolean;
}

const FREE: Plan = {
  name: "Free",
  price: "$0",
  desc: "Every feature in the app. No card, no trial clock.",
  features: [
    "Unlimited membership plans and benefits",
    "Automatic recurring billing",
    "Failed-payment retries and out-of-stock rules",
    "Member discounts, free shipping and gifts at checkout",
    "Customer self-service in the Shopify account",
    "Storefront blocks + app embed",
    "Members, recurring revenue and churn analytics",
    "Email support",
  ],
  badge: "Free while we launch",
  feat: true,
};

// Kept for when billing comes back on (see the note at the top).
const PRO: Plan = {
  name: "Pro",
  price: "$79",
  desc: "For stores that run membership as a core revenue line.",
  features: ["Everything in Free"],
};

export const PLANS: Plan[] = BILLING_ENABLED ? [FREE, PRO] : [FREE];

/** "What's included" table on /pricing. `cells` has one entry per plan in
 *  PLANS; '✓' / '—' render as yes/no marks, anything else as literal text.
 *  Add a column to every row when billing comes back on. */
export const MATRIX: { label: string; cells: string[] }[] = [
  { label: 'Membership plans', cells: ['Unlimited'] },
  { label: 'Benefits — discount, free shipping, gift, label', cells: ['Unlimited'] },
  { label: 'Pricing — percentage off, amount off, fixed price', cells: ['✓'] },
  { label: 'Several delivery options per plan', cells: ['✓'] },
  { label: 'Automatic recurring billing', cells: ['✓'] },
  { label: 'Failed-payment retries', cells: ['0–10'] },
  { label: 'Out-of-stock retry rules + inventory alerts', cells: ['✓'] },
  { label: 'Member discounts at checkout (no codes)', cells: ['✓'] },
  { label: 'Theme blocks + app embed', cells: ['8 + embed'] },
  { label: 'Member gift in checkout', cells: ['✓'] },
  { label: 'Customer-account self-service', cells: ['✓'] },
  { label: 'Member management — pause, resume, cancel, skip', cells: ['✓'] },
  { label: 'Analytics & reports', cells: ['✓'] },
  { label: 'Support', cells: ['Email'] },
];

for (const row of MATRIX) {
  if (row.cells.length !== PLANS.length) {
    throw new Error(`MATRIX row "${row.label}" has ${row.cells.length} cells; PLANS has ${PLANS.length}.`);
  }
}
