/**
 * Smooth-scroll helpers. Smoothness is opt-in here: the global
 * `scroll-behavior: smooth` was removed so route changes (e.g. clicking a
 * related-post card) reset scroll instantly and don't fight the cover morph.
 * These helpers reintroduce smoothness only for in-page actions, and fall back
 * to an instant jump under reduced-motion.
 */
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

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}
