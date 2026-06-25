'use client';

import type { TocEntry } from '@/src/features/blog/types';
import { useActiveSection } from '@/src/hooks/useActiveSection';
import { scrollToHeading } from '@/src/lib/scroll';

import { TocList } from './TocList';

type TableOfContentsProps = {
  entries: TocEntry[];
};

export function TableOfContents({ entries }: TableOfContentsProps) {
  const { activeId, selectActive } = useActiveSection(entries.map((entry) => entry.id));

  const handleSelect = (id: string) => {
    selectActive(id);
    scrollToHeading(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav aria-label='Table of contents'>
      <p className='mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
        Table of Contents
      </p>

      <TocList entries={entries} activeId={activeId} onSelect={handleSelect} />
    </nav>
  );
}
