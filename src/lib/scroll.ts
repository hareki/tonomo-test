function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/** Scroll a heading into view. `scrollIntoView` honors the heading's `scroll-mt`. */
export function scrollToHeading(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
}
