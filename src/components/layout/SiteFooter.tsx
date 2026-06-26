import { TonomoLogo } from '@/src/components/icons/TonomoLogo';
import { cn } from '@/src/lib/tailwind/utils';

import { FOOTER_LINKS } from './constants';
import { Badge } from '../ui/Badge';
import { NavLink } from '../ui/NavLink';
import { InlineLink } from '../ui/Typography';

const COPYRIGHT_YEAR = 2026;

type FooterLinksProps = {
  className?: string;
};

export function FooterLinks({ className }: FooterLinksProps) {
  return (
    <nav
      aria-label='Footer'
      className={cn('flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium', className)}
    >
      {FOOTER_LINKS.map((link) => (
        <NavLink key={link.label} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className='mt-24 border-t border-border bg-card'>
      <div
        className={`
          mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12
          sm:px-6
          md:flex-row md:items-start md:justify-between
          lg:px-8
        `}
      >
        <div className='max-w-md space-y-3'>
          <div className='flex items-center gap-2'>
            <TonomoLogo className='h-5 w-auto text-foreground' />
            <Badge>Technical Test</Badge>
          </div>
          <div className='text-xs/5 text-muted-foreground'>
            <p>
              © {COPYRIGHT_YEAR} Tonomo Journal. A technical-test demo by{' '}
              <InlineLink href='https://github.com/hareki'>Tu Nguyen</InlineLink>
            </p>
          </div>
        </div>

        <FooterLinks />
      </div>
    </footer>
  );
}
