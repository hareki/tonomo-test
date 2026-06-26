'use client';

import type { ComponentProps } from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/src/lib/tailwind/utils';

/**
 * Thin styled wrapper over `vaul` (the same headless-primitive + own-styling
 * approach used elsewhere, mirroring shadcn's pattern without installing it).
 * Side drawers read vaul's `data-vaul-drawer-direction`, so a single `Content`
 * styles both the left (nav) and right (table of contents) panels.
 */
const { Root, Trigger, Close, Title } = DrawerPrimitive;

export const Drawer = Root;
export const DrawerTrigger = Trigger;
export const DrawerClose = Close;
export const DrawerTitle = Title;

export function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className='fixed inset-0 z-50 bg-black/40' />
      <DrawerPrimitive.Content
        // Each drawer carries a Title; it has no separate description, so opt out
        // of the dialog's description wiring to keep the a11y warning quiet.
        aria-describedby={undefined}
        className={cn(
          'fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col bg-background outline-none',
          // Direction-aware: vaul stamps the drawer's side on the content node.
          `
            border-border
            data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:border-r
            data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:border-l
          `,
          className,
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}
