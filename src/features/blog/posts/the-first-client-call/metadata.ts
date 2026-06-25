import { mara } from '../../authors';

import type { PostMetadata } from '../../types';

export const metadata: PostMetadata = {
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
};
