import type { ComponentPropsWithoutRef } from 'react';

import { IconLink } from '@tabler/icons-react';

import { H2, H3, H4 } from '@/src/components/ui/Typography';
import { cn } from '@/src/lib/tailwind/utils';

const HEADINGS = { 2: H2, 3: H3, 4: H4 } as const;

type HeadingLevel = keyof typeof HEADINGS;

type HeadingLinkProps = {
  level: HeadingLevel;
} & ComponentPropsWithoutRef<'h2'>;

/**
 * Article heading that reveals a self-link on hover. `rehype-slug` gives every
 * heading an `id`, which spreads onto the element (the scroll/anchor target) and
 * drives the `#id` href. `scroll-mt` keeps a jumped-to heading clear of the
 * sticky header (and, below `lg`, the mobile table-of-contents bar beneath it).
 * The slide/fade self-link is pure CSS driven by the heading's `group` hover.
 */
export function HeadingLink({ level, id, className, children, ...props }: HeadingLinkProps) {
  const Heading = HEADINGS[level];

  return (
    <Heading
      id={id}
      className={cn(
        `
          group scroll-mt-28
          lg:scroll-mt-24
        `,
        className,
      )}
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label='Link to this section'
          className={cn(`
            ml-2 inline-flex -translate-x-1 align-middle text-muted-foreground opacity-0 transition
            duration-200 ease-out
            group-hover:translate-x-0 group-hover:opacity-100
            hover:text-foreground
            focus-visible:translate-x-0 focus-visible:opacity-100
            motion-reduce:translate-x-0 motion-reduce:transition-none
          `)}
        >
          <IconLink aria-hidden size='0.8em' stroke={2} />
        </a>
      )}
    </Heading>
  );
}
