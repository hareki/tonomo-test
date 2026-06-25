'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy for the table of contents. Observes each section element and
 * reports the one nearest the top of the reading area. The asymmetric
 * `rootMargin` defines a thin activation band just below the header, so a
 * heading becomes "active" as it reaches the top of the viewport rather than
 * when it is centered.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length === 0) {
          return;
        }

        const topmost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        );

        setActiveId(topmost.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );

    for (const id of ids) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}
