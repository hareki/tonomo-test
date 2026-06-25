import type { ReactNode } from 'react';

/**
 * Wraps the rendered MDX body and owns its vertical rhythm. The adjacent-sibling
 * variants translate the old block model directly: every block sits `mt-5` below
 * the previous one, and each `h2` opens a new section with the wider `mt-12`
 * gap. Centralizing it here keeps the MDX component map free of spacing.
 */
export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <div
      className='
        [&>*+*]:mt-5
        [&>*+h2]:mt-12
      '
    >
      {children}
    </div>
  );
}
