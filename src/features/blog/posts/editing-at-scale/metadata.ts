import { devin } from '../../authors';

import type { PostMetadata } from '../../types';

export const metadata: PostMetadata = {
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
};
