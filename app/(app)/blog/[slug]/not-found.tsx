import Link from 'next/link';

import { HEADER_SENTINEL_ID } from '@/app/components/layout/SiteHeader';
import { getAllPosts } from '@/app/lib/posts/queries';

export default function PostNotFound() {
  const posts = getAllPosts();

  return (
    <div>
      <section
        className='
          relative -mt-16
          bg-[linear-gradient(135deg,var(--hero-from),var(--hero-via),var(--hero-to))] text-white
        '
      >
        <div
          className='
            mx-auto max-w-3xl px-4 pt-32 pb-20 text-center
            sm:px-6
          '
        >
          <p className='text-sm font-semibold tracking-wide text-white/70 uppercase'>404</p>
          <h1
            className='
              mt-3 text-4xl font-bold tracking-tight text-balance
              sm:text-5xl
            '
          >
            We couldn&rsquo;t find that article
          </h1>
          <p className='mx-auto mt-5 max-w-xl text-lg text-pretty text-white/80'>
            The link may be broken or the post may have moved. Browse the latest pieces from the
            journal below.
          </p>
        </div>
        <div id={HEADER_SENTINEL_ID} aria-hidden className='absolute inset-x-0 bottom-0 h-px' />
      </section>

      <div
        className='
          mx-auto max-w-xl px-4 py-16
          sm:px-6
        '
      >
        <ul className='grid gap-3'>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className='
                  block rounded-lg border border-border bg-card px-4 py-3 font-medium
                  transition-colors
                  hover:border-foreground/30
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
                '
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
