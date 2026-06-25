'use client';

import Link from 'next/link';

import { ThemeSegmentedControl } from '@/src/components/ui/ThemeSegmentedControl';
import { TonomoLogo } from '@/src/components/ui/TonomoLogo';
import { useScrolledPast } from '@/src/hooks/useScrolledPast';
import { cn } from '@/src/lib/tailwind/cn';

import { NavLinks } from './NavLinks';

import type { Route } from 'next';

/** Id of the sentinel the hero renders at its bottom edge. */
export const HEADER_SENTINEL_ID = 'header-sentinel';

/**
 * Sticky site header. Over the hero it is transparent with white text; once the
 * hero scrolls past it switches to a solid, blurred background with foreground
 * text so it never becomes unreadable over the article body (Rule D). The logo,
 * nav, and theme control all inherit `currentColor`, so they recolor with it.
 */
export function SiteHeader() {
  const solid = useScrolledPast(HEADER_SENTINEL_ID);

  return (
    <header
      data-solid={solid}
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        solid
          ? 'border-b border-border bg-background/80 text-foreground backdrop-blur-md'
          : 'border-b border-transparent text-white',
      )}
      style={{ viewTransitionName: 'site-header' }}
    >
      <div
        className={`
          mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4
          sm:px-6
          lg:px-8
        `}
      >
        <Link
          // `/` has no page of its own; the proxy redirects it to a random post.
          href={'/' as Route}
          aria-label='Tonomo Journal, home'
          className={`
            rounded-sm
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current
          `}
        >
          <TonomoLogo className='h-5 w-auto' />
        </Link>

        <NavLinks
          className='
            hidden
            md:flex
          '
        />

        <ThemeSegmentedControl />
      </div>
    </header>
  );
}
