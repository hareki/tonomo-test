import { cn } from '@/src/lib/tailwind/utils';

import { PRIMARY_NAV_LINKS } from './constants';

type NavLinksProps = {
  className?: string;
};

export function NavLinks({ className }: NavLinksProps) {
  return (
    <nav aria-label='Primary' className={cn('items-center gap-7 text-sm font-medium', className)}>
      {PRIMARY_NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`
            text-foreground transition-colors
            hover:text-primary
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
