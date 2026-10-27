/**
 * FAQ — SINGLE SOURCE for both the categorized <details> list on /faqs and
 * the FAQPage structured data in Base.astro.
 *
 * `a` is HTML (bold, italics, links). Base.astro strips tags before writing
 * the schema, because FAQPage acceptedAnswer.text must be plain prose.
 *
 * Every answer must match what the app does today — see
 * Qmember/docs/USER_GUIDE.md.
 */

export interface FaqItem {
  /** The question, exactly as a merchant would ask it. */
  q: string;
  /** The answer as HTML. */
  a: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Getting Started',
    items: [
      {
        q: 'What does QPrive do?',
        a: 'QPrive turns one-time shoppers into recurring members. You create subscription plans with member pricing, attach perks, and QPrive bills your members automatically on the schedule you set — retrying failed payments, applying member discounts at checkout, and keeping everyone’s status up to date.',
      },
      {
        q: 'Do I need to write any code?',
        a: 'No. Plans, benefits, billing rules and the storefront are all set up from the QPrive dashboard and your Shopify theme editor. The one theme step is turning the QPrive app embed on and clicking Save.',
      },
      {
        q: 'How long does setup take?',
        a: 'Most stores finish in under 15 minutes. An onboarding checklist walks you through it — set your billing rules, create a plan (or start from the one-click sample plan and benefit), and turn on the app embed.',
      },
      {
        q: 'What gets set up automatically when I install?',
        a: 'Webhooks, the membership settings storage, the checkout discount and the customer data fields. You can confirm each one under <b>Settings → Setup summary</b>.',
      },
    ],
  },
  {
    title: 'Plans & Benefits',
    items: [
      {
        q: 'How can I price a plan?',
        a: 'Three ways: a percentage off, an amount off, or a fixed member price. A plan can offer several delivery options — every <i>N</i> weeks, months or years — each with its own discount.',
      },
      {
        q: 'What kinds of perks can I give members?',
        a: 'Four: a <b>discount</b> (whole order or chosen products, with an optional minimum quantity or amount), <b>free shipping</b>, a <b>gift</b> product, or a member <b>label</b>.',
      },
      {
        q: 'If I change a plan’s discount or benefits, do existing members get it?',
        a: 'Yes. Changing a plan’s discount or the benefits attached to it re-syncs every member on that plan, so live members get the update without you touching them.',
      },
      {
        q: 'How do member discounts reach checkout?',
        a: 'Through a Shopify checkout discount that QPrive installs for you. It checks whether the customer is an active member and applies their perks to the cart lines and to delivery — so there are no codes to send, and nothing for a non-member to reuse.',
      },
    ],
  },
  {
    title: 'Billing & Payments',
    items: [
      {
        q: 'How often are members billed?',
        a: 'On the delivery frequency you set per plan. QPrive charges each member automatically on their billing date, and every successful charge becomes a Shopify order.',
      },
      {
        q: 'What happens when a payment fails?',
        a: 'QPrive retries on the schedule you set under <b>Settings → Billing attempts</b> — up to 10 attempts, 1 to 14 days apart — then skips, pauses or cancels the subscription, whichever you chose, and sends a notification each time.',
      },
      {
        q: 'What if a product is out of stock on billing day?',
        a: 'Out-of-stock failures have their own retry rules — attempts, days between and a final action — and QPrive emails you an inventory alert so you can restock.',
      },
      {
        q: 'A customer was charged but I don’t see an order — why?',
        a: 'Check the member’s <b>Past orders</b>. “Order not created” means that charge failed, and the cycle is going through your billing-attempt rules.',
      },
    ],
  },
  {
    title: 'Members & Customers',
    items: [
      {
        q: 'Can customers manage their own subscription?',
        a: 'Yes. From their Shopify customer account, members can pause or resume, skip the next order, change their delivery address, and see the price summary and past orders. Cancelled subscriptions stay visible as read-only.',
      },
      {
        q: 'What can I do from a member’s page?',
        a: 'See their contracts, benefits, past and upcoming orders, orders count and total spent — and pause, resume or cancel a contract, or skip a single upcoming cycle.',
      },
      {
        q: 'Why does a member show as Inactive?',
        a: 'They have no active contract — they may have paused or cancelled, or never completed a subscription purchase.',
      },
    ],
  },
  {
    title: 'Pricing & Data',
    items: [
      {
        q: 'Is QPrive really free?',
        a: 'Yes. QPrive is free while we launch on the App Store, with every feature on. If paid plans arrive later, they’ll be billed through Shopify and shown on our <a href="/pricing">pricing page</a> and the listing first.',
      },
      {
        q: 'What happens to subscriptions if I uninstall?',
        a: 'Shopify cancels active subscription charges automatically when an app is removed. Your plan and benefit setup is part of the app — re-installing restores access to the dashboard.',
      },
      {
        q: 'What data does QPrive keep, and for how long?',
        a: 'Only what it needs to run your membership program. Store data is deleted when you uninstall, and customer data is deleted on Shopify’s redaction requests. The details are in our <a href="/privacy">Privacy Policy</a>.',
      },
    ],
  },
];

/** Every question, flat — for the FAQPage schema. */
export const FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
