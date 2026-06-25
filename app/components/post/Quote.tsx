import type { ReactNode } from 'react';

import { Blockquote } from '@/app/components/ui/Typography';

type QuoteProps = {
  cite?: string;
  children: ReactNode;
};

/**
 * A pull quote with optional attribution. Authored in MDX as `<Quote cite="…">`
 * so the citation travels with the quote; a plain `>` blockquote (no cite) maps
 * to {@link Blockquote} directly via the MDX component map.
 */
export function Quote({ cite, children }: QuoteProps) {
  return (
    <figure className='space-y-2'>
      <Blockquote>{children}</Blockquote>
      {cite && (
        <figcaption className='pl-5 text-sm text-muted-foreground'>
          <cite className='not-italic'>{cite}</cite>
        </figcaption>
      )}
    </figure>
  );
}
