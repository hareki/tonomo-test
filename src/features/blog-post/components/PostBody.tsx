import type { ReactNode } from 'react';

type PostBodyProps = {
  children: ReactNode;
};

/**
 * Wraps the rendered MDX body and owns its vertical rhythm. The adjacent-sibling
 * variants translate the old block model directly: every block sits `mt-5` below
 * the previous one, and each heading opens its section with more air above than
 * below so it binds to the content it introduces (`mt-12`/`mt-10`/`mt-8` for
 * h2/h3/h4). Centralizing it here keeps the MDX component map free of spacing.
 */
export function PostBody({ children }: PostBodyProps) {
  return (
    <div
      className={`
        [&>*+*]:mt-5
        [&>*+h2]:mt-12
        [&>*+h3]:mt-10
        [&>*+h4]:mt-8
      `}
    >
      {children}
    </div>
  );
}
