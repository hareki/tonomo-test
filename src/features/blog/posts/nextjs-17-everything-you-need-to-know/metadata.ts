import { mara } from '../../authors';

import type { PostMetadata } from '../../types';

export const metadata: PostMetadata = {
  slug: 'nextjs-17-everything-you-need-to-know',
  title: 'Next.js 17 Beta: Everything You Need to Know',
  subtitle:
    'Turbopack is now the default, the cache is opt-in, and server actions got a complete overhaul - here is a practical rundown of every breaking change and new primitive.',
  excerpt:
    'A no-fluff guide to the Next.js 17 release: what changed, what broke, and which new APIs are actually worth adopting today.',
  author: mara,
  publishedAt: '2026-04-09',
  tags: ['Engineering', 'Next.js'],
  cover: {
    src: 'https://picsum.photos/seed/nextjs-17-cover/1600/900',
    alt: 'A terminal running a Next.js dev server with a browser preview on the right.',
    width: 1600,
    height: 900,
  },
};
