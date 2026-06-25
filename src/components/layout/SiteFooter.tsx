import { TonomoLogo } from '@/src/components/ui/TonomoLogo';

// Static so the footer stays prerenderable under Cache Components (reading the
// live clock in a server component would opt every post page out of static).
const COPYRIGHT_YEAR = 2026;

const FOOTER_LINKS = [
  { label: 'Journal', href: '#' },
  { label: 'Field Guides', href: '#' },
  { label: 'Playbooks', href: '#' },
  { label: 'About', href: '#' },
];

export function SiteFooter() {
  return (
    <footer className='mt-24 border-t border-border bg-card'>
      <div
        className='
          mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12
          sm:px-6
          md:flex-row md:items-start md:justify-between
          lg:px-8
        '
      >
        <div className='max-w-sm space-y-3'>
          <TonomoLogo className='h-5 w-auto text-foreground' />
          <p className='text-sm/6 text-muted-foreground'>
            Field notes on running a profitable real estate media studio: pricing, process, and the
            craft of fast turnaround.
          </p>
        </div>

        <nav aria-label='Footer' className='flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium'>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className='
                text-muted-foreground transition-colors
                hover:text-foreground
                focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-ring
              '
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className='border-t border-border'>
        <div
          className='
            mx-auto max-w-6xl px-4 py-6 text-xs/5 text-muted-foreground
            sm:px-6
            lg:px-8
          '
        >
          <p>© {COPYRIGHT_YEAR} Tonomo Journal. A technical-test demo.</p>
          <p className='mt-1'>
            The wordmark and favicon are tonomo&rsquo;s own brand assets, reused here for this
            exercise.
          </p>
        </div>
      </div>
    </footer>
  );
}
