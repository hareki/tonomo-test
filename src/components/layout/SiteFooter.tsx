import { TonomoLogo } from '@/src/components/icons/TonomoLogo';

import { Badge } from '../ui/Badge';

// Static so the footer stays prerenderable under Cache Components (reading the
// live clock in a server component would opt every post page out of static).
const COPYRIGHT_YEAR = 2026;

const FOOTER_LINKS = [
  { label: 'Terms and Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

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
            <p>© {COPYRIGHT_YEAR} Tonomo Journal. A technical-test demo.</p>
          </div>
        </div>

        <nav aria-label='Footer' className='flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium'>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                text-muted-foreground transition-colors
                hover:text-foreground
                focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-ring
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
