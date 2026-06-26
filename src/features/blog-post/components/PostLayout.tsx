import type { ReactNode } from 'react';

type PostLayoutProps = {
  article: ReactNode;
  sidebar: ReactNode;
};

export function PostLayout({ article, sidebar }: PostLayoutProps) {
  return (
    <div
      className={`
        mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-12 px-4
        sm:px-6
        lg:mt-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-8
      `}
    >
      <article>
        <div className='mx-auto max-w-2xl'>{article}</div>
      </article>

      <aside
        className={`
          hidden
          lg:sticky lg:top-24 lg:block lg:self-start
        `}
      >
        {sidebar}
      </aside>
    </div>
  );
}
