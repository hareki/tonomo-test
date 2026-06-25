import { cn } from '@/src/lib/tailwind/utils';

import { PRIMARY_NAV_LINKS } from './constants';

type NavLinksProps = {
  className?: string;
};

/**
 * Primary navigation (desktop). Links inherit `currentColor` so they track the
 * header text color. The same destinations render vertically in the mobile nav
 * drawer (see `NavMenuButton`).
 */
export function NavLinks({ className }: NavLinksProps) {
  return (
    <nav aria-label='Primary' className={cn('items-center gap-7 text-sm font-medium', className)}>
      {PRIMARY_NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`
            text-current/80 transition-colors
            hover:text-current
            focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-current
          `}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
