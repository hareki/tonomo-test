import type { ReactNode } from 'react';

type PostLayoutProps = {
  article: ReactNode;
  sidebar: ReactNode;
};

/**
 * The two-column reading layout. On desktop the article sits on the left and the
 * sidebar on the right (Rule A: TOC deliberately on the right). The sidebar is
 * sticky while reading. On mobile the single column keeps the article first and
 * stacks the sidebar below it (Rule C).
 */
export function PostLayout({ article, sidebar }: PostLayoutProps) {
  return (
    <div
      className='
        mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-12 px-4
        sm:px-6
        lg:mt-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-8
      '
    >
      <article className='min-w-0'>
        <div className='max-w-2xl'>{article}</div>
      </article>

      <aside aria-label='Article sidebar' className='lg:sticky lg:top-24 lg:self-start'>
        {sidebar}
      </aside>
    </div>
  );
}
