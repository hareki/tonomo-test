function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToHeading(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
}
