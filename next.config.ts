import createMDX from '@next/mdx';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    viewTransition: true,
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

// Plugins are named as strings so they survive the Turbopack boundary (functions
// can't be passed to the Rust bundler). rehype-slug adds ids to headings, which
// the table of contents anchors against; remark-gfm enables GitHub-flavored
// markdown in post bodies.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug'],
  },
});

export default withMDX(nextConfig);
