import Link from 'next/link';

import { TonomoLogo } from '@/src/components/icons/TonomoLogo';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/tailwind/utils';

import { HEADER_LINKS } from './constants';
import { NavMenuButton } from './NavMenuButton';
import { NavLink } from '../ui/NavLink';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

import type { Route } from 'next';

type NavLinksProps = {
  className?: string;
};

export function HeaderLinks({ className }: NavLinksProps) {
  return (
    <nav aria-label='Primary' className={cn('items-center gap-7 text-sm font-medium', className)}>
      {HEADER_LINKS.map((link) => (
        <NavLink key={link.label} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header
      className={`
        sticky top-0 z-50 border-b border-border bg-background/80 text-foreground backdrop-blur-md
      `}
      style={{ viewTransitionName: 'site-header' }}
    >
      <div
        className={`
          mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4
          sm:px-6
          lg:px-8
        `}
      >
        <div className='flex flex-col items-end gap-1.5'>
          <Link
            // `/` has no page of its own; the proxy redirects it to a random post.
            href={'/' as Route}
            aria-label='Tonomo Journal, home'
            className={`
              rounded-sm
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current
            `}
          >
            <TonomoLogo className='h-5 w-auto' />
          </Link>
          <Badge>Technical Test</Badge>
        </div>

        <HeaderLinks
          className={`
            hidden
            md:flex
          `}
        />

        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <div className='md:hidden'>
            <NavMenuButton />
          </div>
        </div>
      </div>
    </header>
  );
}
