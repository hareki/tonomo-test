'use client';

import { useState } from 'react';

import { IconListDetails, IconX } from '@tabler/icons-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/components/ui/Drawer';
import type { TocEntry } from '@/src/features/blog/types';
import { useActiveSection } from '@/src/hooks/useActiveSection';
import { scrollToHeading } from '@/src/lib/scroll';

import { TocList } from './TocList';

type MobileTocBarProps = {
  entries: TocEntry[];
};

export function MobileTocBar({ entries }: MobileTocBarProps) {
  const [open, setOpen] = useState(false);
  const { activeId, selectActive } = useActiveSection(entries.map((entry) => entry.id));

  if (entries.length === 0) {
    return null;
  }

  const handleSelect = (id: string) => {
    setOpen(false);
    // Let the drawer finish closing (and release its scroll lock) before
    // scrolling, then pin the clicked entry as the scroll begins.
    setTimeout(() => {
      selectActive(id);
      scrollToHeading(id);
      history.replaceState(null, '', `#${id}`);
    }, 350);
  };

  return (
    <div
      className={`
        sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur-md
        lg:hidden
      `}
    >
      <div
        className={`
          mx-auto flex max-w-6xl px-4 py-2.5
          sm:px-6
        `}
      >
        <Drawer open={open} onOpenChange={setOpen} direction='left'>
          <DrawerTrigger
            className={`
              inline-flex items-center gap-2 rounded-full border border-border bg-background px-4
              py-2 text-sm font-medium text-foreground transition-colors
              hover:bg-muted
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
            `}
          >
            <IconListDetails size={18} stroke={2} aria-hidden />
            Table of Contents
          </DrawerTrigger>

          <DrawerContent>
            <div className='flex items-center justify-between border-b border-border px-5 py-4'>
              <DrawerTitle className='text-sm font-semibold tracking-wide uppercase'>
                Table of Contents
              </DrawerTitle>
              <DrawerClose
                aria-label='Close table of contents'
                className={`
                  inline-flex size-8 items-center justify-center rounded-full text-muted-foreground
                  transition-colors
                  hover:bg-muted hover:text-foreground
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
                `}
              >
                <IconX size={18} stroke={2} aria-hidden />
              </DrawerClose>
            </div>

            <div className='overflow-y-auto p-5'>
              <TocList entries={entries} activeId={activeId} onSelect={handleSelect} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
