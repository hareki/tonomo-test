'use client';

import { useEffect, useRef, useState } from 'react';

import { useActiveSection } from '@/app/hooks/useActiveSection';
import type { TocEntry } from '@/app/lib/posts/types';
import { cn } from '@/app/lib/tailwind/cn';

// Left padding per nesting level (relative to the shallowest heading present).
// Tailwind needs literal class names, so deeper levels clamp to the last entry.
const INDENT_BY_LEVEL = ['pl-4', 'pl-8', 'pl-12'];

/**
 * Sticky, scroll-synced table of contents. Supports nested headings (`h2`–`h4`)
 * with depth-based indentation. The active entry (the section nearest the top of
 * the viewport) is highlighted and marked `aria-current` for assistive tech; a
 * single indicator bar slides down the left rail to it via `transform` instead
 * of the highlight teleporting between entries. Anchor links rely on the
 * sections' `scroll-mt` for header-aware scrolling.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const activeId = useActiveSection(entries.map((entry) => entry.id));

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const [animate, setAnimate] = useState(false);

  // Position the indicator over the active item and keep it aligned across
  // reflow (font load, window/container resize). `offsetTop`/`offsetHeight` are
  // relative to the positioned `containerRef`, which is the items' offset parent.
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !activeId) {
      return;
    }

    const measure = () => {
      const item = itemsRef.current[activeId];

      if (item) {
        setIndicator({ top: item.offsetTop, height: item.offsetHeight });
      }
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [activeId]);

  // Enable the sliding transition only after the first position is committed, so
  // the bar appears in place instead of swooping from the top on initial load.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  const minDepth = entries.length > 0 ? Math.min(...entries.map((entry) => entry.depth)) : 0;

  return (
    <nav aria-label='Table of contents'>
      <p className='mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
        On this page
      </p>
      <div ref={containerRef} className='relative'>
        <span
          aria-hidden
          className={cn(
            'absolute top-0 left-0 w-0.5 rounded-full bg-primary',
            animate &&
              `
                transition-[transform,height] duration-300 ease-out
                motion-reduce:transition-none
              `,
          )}
          style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }}
        />
        <ul className='border-l-2 border-border/60'>
          {entries.map((entry) => {
            const isActive = entry.id === activeId;
            const level = Math.min(entry.depth - minDepth, INDENT_BY_LEVEL.length - 1);

            return (
              <li
                key={entry.id}
                ref={(el) => {
                  itemsRef.current[entry.id] = el;
                }}
              >
                <a
                  href={`#${entry.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'block py-1.5 text-sm/snug transition-colors',
                    INDENT_BY_LEVEL[level],
                    isActive
                      ? 'font-medium text-foreground'
                      : `
                        text-muted-foreground
                        hover:text-foreground
                      `,
                  )}
                >
                  {entry.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
