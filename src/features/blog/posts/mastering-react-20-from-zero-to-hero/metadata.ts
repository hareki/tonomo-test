import { devin } from '../../authors';

import type { PostMetadata } from '../../types';

export const metadata: PostMetadata = {
  slug: 'mastering-react-20-from-zero-to-hero',
  title: 'Mastering React 20 from Zero to Hero: In-Depth Analysis',
  subtitle:
    'React 20 rewrites the rules on concurrent rendering and server components - here is everything you need to go from your first component to production-ready apps.',
  excerpt:
    'A practical walkthrough of React 20 core concepts: the new compiler, server actions, fine-grained reactivity, and the patterns that actually matter in a real codebase.',
  author: devin,
  publishedAt: '2026-03-22',
  tags: ['Engineering', 'React'],
  cover: {
    src: 'https://picsum.photos/seed/mastering-react-20-cover/1600/900',
    alt: 'A code editor open to a React component with a browser preview beside it.',
    width: 1600,
    height: 900,
  },
};
