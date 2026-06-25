'use client';

import { IconMenu2, IconX } from '@tabler/icons-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/components/ui/Drawer';

import { PRIMARY_NAV_LINKS } from './constants';

/**
 * Compact navigation for narrow viewports: a burger button that opens a left
 * drawer holding the primary links (the same destinations the desktop `NavLinks`
 * renders inline). Shown in place of the inline nav below `md`.
 */
export function NavMenuButton() {
  return (
    <Drawer direction='left'>
      <DrawerTrigger
        aria-label='Open navigation menu'
        className={`
          inline-flex size-9 items-center justify-center rounded-full border border-current/20
          text-current/70 transition-colors
          hover:bg-current/10 hover:text-current
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
        `}
      >
        <IconMenu2 size={18} stroke={2} aria-hidden />
      </DrawerTrigger>

      <DrawerContent>
        <div className='flex items-center justify-between border-b border-border px-5 py-4'>
          <DrawerTitle className='text-sm font-semibold tracking-wide uppercase'>Menu</DrawerTitle>
          <DrawerClose
            aria-label='Close navigation menu'
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

        <nav aria-label='Primary' className='flex flex-col p-3'>
          {PRIMARY_NAV_LINKS.map((link) => (
            <DrawerClose key={link.label} asChild>
              <a
                href={link.href}
                className={`
                  rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors
                  hover:bg-muted
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
                `}
              >
                {link.label}
              </a>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
