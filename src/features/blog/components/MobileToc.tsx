'use client';

import { useState } from 'react';

import { IconListDetails, IconX } from '@tabler/icons-react';

import { buttonVariants } from '@/src/components/ui/Button/variants';
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

export function MobileToc({ entries }: MobileTocBarProps) {
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
    <Drawer open={open} onOpenChange={setOpen} direction='left'>
      <DrawerTrigger className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        <IconListDetails aria-hidden />
        Table of Contents
      </DrawerTrigger>

      <DrawerContent>
        <div className='flex items-center justify-between border-b border-border px-5 py-4'>
          <DrawerTitle className='text-sm font-semibold tracking-wide uppercase'>
            Table of Contents
          </DrawerTitle>
          <DrawerClose
            aria-label='Close table of contents'
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <IconX aria-hidden />
          </DrawerClose>
        </div>

        <div className='overflow-y-auto p-5'>
          <TocList entries={entries} activeId={activeId} onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
