import { devin } from '../../authors';

import type { PostMetadata } from '../../types';

export const metadata: PostMetadata = {
  slug: 'automating-gallery-delivery',
  title: 'Automating Gallery Delivery',
  subtitle:
    'A small watch-and-ship script removes the most error-prone step in the studio: getting finished galleries to the client the same way every time.',
  excerpt:
    'Wire up a tiny Node pipeline that watches your export folder, optimizes every frame, and pings the client the moment a gallery is ready.',
  author: devin,
  publishedAt: '2026-03-22',
  tags: ['Engineering', 'Automation'],
  cover: {
    src: 'https://picsum.photos/seed/automating-gallery-delivery-cover/1600/900',
    alt: 'A terminal window beside a grid of exported property photos.',
    width: 1600,
    height: 900,
  },
};
