'use client';

import { IconMenu2, IconX } from '@tabler/icons-react';

import { buttonVariants } from '@/src/components/ui/Button/variants';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/components/ui/Drawer';

import { HEADER_LINKS } from './constants';
import { NavLink } from '../ui/NavLink';

export function NavMenuButton() {
  return (
    <Drawer direction='left'>
      <DrawerTrigger aria-label='Open navigation menu' className={buttonVariants({ size: 'icon' })}>
        <IconMenu2 aria-hidden />
      </DrawerTrigger>

      <DrawerContent>
        <div className='flex items-center justify-between border-b border-border px-5 py-4'>
          <DrawerTitle className='text-sm font-semibold tracking-wide uppercase'>Menu</DrawerTitle>
          <DrawerClose
            aria-label='Close navigation menu'
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <IconX aria-hidden />
          </DrawerClose>
        </div>

        <nav aria-label='Primary' className='flex flex-col p-3'>
          {HEADER_LINKS.map((link) => (
            <DrawerClose key={link.label} asChild>
              <NavLink href={link.href} className='px-3 py-2.5'>
                {link.label}
              </NavLink>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
