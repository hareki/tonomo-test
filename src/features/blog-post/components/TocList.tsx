// No 'use client' boundary: this is only imported by client components
// (TableOfContents, MobileTocBar), so it joins their client bundle and can take
// the `onSelect` callback without tripping the serializable-props boundary rule.
import { useEffect, useRef, useState } from 'react';

import type { TocEntry } from '@/src/features/blog-post/types';
import { cn } from '@/src/lib/tailwind/utils';

// Left padding per nesting level (relative to the shallowest heading present).
// Tailwind needs literal class names, so deeper levels clamp to the last entry.
const INDENT_BY_LEVEL = ['pl-4', 'pl-8', 'pl-12'];

type TocListProps = {
  entries: TocEntry[];
  activeId: string | undefined;
  /** Called with the entry id when a link is clicked (anchor default is prevented). */
  onSelect: (id: string) => void;
};

export function TocList({ entries, activeId, onSelect }: TocListProps) {
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
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(entry.id);
                }}
                className={cn(
                  'block py-1.5 text-sm/snug transition-colors',
                  INDENT_BY_LEVEL[level],
                  isActive
                    ? 'text-primary'
                    : `
                      text-muted-foreground
                      hover:text-primary
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
  );
}
