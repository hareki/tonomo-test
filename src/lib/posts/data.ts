import type { Author, Post } from './types';

const mara: Author = {
  name: 'Mara Whitfield',
  role: 'Studio Operations Lead',
  avatar: 'https://picsum.photos/seed/mara-whitfield/96/96',
};

const devin: Author = {
  name: 'Devin Cole',
  role: 'Founder & Lead Photographer',
  avatar: 'https://picsum.photos/seed/devin-cole/96/96',
};

/**
 * Source of truth for blog metadata. Each post's body lives alongside as an MDX
 * file in `./content/<slug>.mdx`, loaded and rendered by the post page; the
 * table of contents and reading time are derived from that file (see
 * `./content.ts`).
 */
export const posts: Post[] = [
  {
    slug: 'pricing-on-value-not-hours',
    title: 'Pricing on Value, Not Hours',
    subtitle:
      'Why the studios that charge the most rarely talk about how long the work takes, and how to package your services the same way.',
    excerpt:
      'Hourly pricing quietly caps your studio. Here is how to package shoots around the outcome a client actually buys.',
    author: devin,
    publishedAt: '2026-05-12',
    tags: ['Pricing', 'Strategy'],
    cover: {
      src: 'https://picsum.photos/seed/pricing-on-value-cover/1600/900',
      alt: 'A real estate photographer reviewing images on a laptop in a sunlit living room.',
      width: 1600,
      height: 900,
    },
  },
  {
    slug: 'building-a-referral-engine',
    title: 'Building a Referral Engine',
    subtitle:
      'Word of mouth is the cheapest acquisition channel you have. Treat it like a system instead of a happy accident.',
    excerpt:
      'Referrals feel like luck until you build the system behind them. Here is how to make recommendations repeatable.',
    author: mara,
    publishedAt: '2026-04-28',
    tags: ['Growth', 'Clients'],
    cover: {
      src: 'https://picsum.photos/seed/referral-engine-cover/1600/900',
      alt: 'Two colleagues shaking hands across a desk in a bright office.',
      width: 1600,
      height: 900,
    },
  },
  {
    slug: 'the-first-client-call',
    title: 'The First Client Call: A Repeatable Framework',
    subtitle:
      'The discovery call is where the relationship is won or lost. Run it the same way every time and stop leaving the outcome to chance.',
    excerpt:
      'A simple, repeatable structure for discovery calls that builds trust before you ever quote a price.',
    author: mara,
    publishedAt: '2026-04-09',
    tags: ['Sales', 'Process'],
    cover: {
      src: 'https://picsum.photos/seed/first-client-call-cover/1600/900',
      alt: 'A person taking notes during a phone call at a tidy desk.',
      width: 1600,
      height: 900,
    },
  },
  {
    slug: 'editing-at-scale',
    title: 'Editing at Scale',
    subtitle:
      'Fast turnaround is a promise to your clients. Keeping it as you grow is an operations problem, not a talent problem.',
    excerpt:
      'How to keep turnaround fast as volume grows: standardize, build a pipeline, and outsource without losing your look.',
    author: devin,
    publishedAt: '2026-03-22',
    tags: ['Operations', 'Editing'],
    cover: {
      src: 'https://picsum.photos/seed/editing-at-scale-cover/1600/900',
      alt: 'An editing workstation with two monitors showing photo libraries.',
      width: 1600,
      height: 900,
    },
  },
];
