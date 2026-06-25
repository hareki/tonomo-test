import { cn } from '@/src/lib/tailwind/cn';

/**
 * Primary navigation. These are intentionally generic placeholder destinations
 * (not tonomo's real menu) and are non-functional for this exercise, so they
 * render as plain hash anchors. Colors inherit `currentColor` so the links track
 * the header's transparent/solid states.
 */
const LINKS = [
  { label: 'Journal', href: '#' },
  { label: 'Field Guides', href: '#' },
  { label: 'Playbooks', href: '#' },
  { label: 'About', href: '#' },
];

export function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label='Primary' className={cn('items-center gap-7 text-sm font-medium', className)}>
      {LINKS.map((link) => (
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
