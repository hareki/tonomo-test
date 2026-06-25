'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

/** Height of the sticky header in px; the transition line sits at its bottom edge. */
const HEADER_OFFSET = 64;

/**
 * Reports whether the page has scrolled past a sentinel element (looked up by id).
 * Used to flip the header from its transparent over-hero state to a solid,
 * legible one (Rule D). Defaults to `false` so a freshly loaded page, sitting at
 * the top with the hero in view, renders transparent without a flash.
 *
 * Re-subscribes on navigation: the header persists across routes, but each post
 * renders its own sentinel, so the observer must re-attach to the new element.
 */
export function useScrolledPast(sentinelId: string): boolean {
  const [scrolledPast, setScrolledPast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);

    // Every route in the shell renders a hero with a sentinel; if one is ever
    // missing the header simply stays in its default (transparent) state.
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolledPast(!entry.isIntersecting);
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [sentinelId, pathname]);

  return scrolledPast;
}
