import { type NextRequest, NextResponse } from 'next/server';

import { getRandomSlug } from '@/src/features/blog-post/queries';

/**
 * The site has no landing page; `/` sends each visitor to a random post. Doing
 * this in middleware (rather than a page) keeps it a clean per-request 307 and
 * sidesteps Partial Prerendering, which would otherwise serve a static shell and
 * postpone the redirect.
 */
export function proxy(request: NextRequest) {
  const slug = getRandomSlug();

  return NextResponse.redirect(new URL(`/blog/${slug}`, request.url));
}

export const config = {
  matcher: '/',
};
