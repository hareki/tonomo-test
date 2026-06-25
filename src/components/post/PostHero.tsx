import { HEADER_SENTINEL_ID } from '@/src/components/layout/SiteHeader';
import type { PostMetadata } from '@/src/features/blog/types';

import { PostByline } from './PostByline';
import { ShareLinks } from './ShareLinks';

/**
 * Editorial gradient hero. Slides up under the sticky header (`-mt-16`) so the
 * header floats on the gradient, with top padding to keep the title clear of it.
 * Text is always white for contrast against the blue gradient. A zero-height
 * sentinel at the bottom edge tells the header when to switch to its solid state.
 */
export function PostHero({ post, readingMinutes }: { post: PostMetadata; readingMinutes: number }) {
  return (
    <section
      className='
        relative -mt-16 bg-[linear-gradient(135deg,var(--hero-from),var(--hero-via),var(--hero-to))]
        text-white
      '
    >
      <div
        className='
          mx-auto max-w-3xl px-4 pt-28 pb-16 text-center
          sm:px-6 sm:pt-32 sm:pb-20
        '
      >
        {post.tags[0] && (
          <p className='text-sm font-semibold tracking-wide text-white/70 uppercase'>
            {post.tags[0]}
          </p>
        )}

        <h1
          className='
            mt-3 text-4xl font-bold tracking-tight text-balance
            sm:text-5xl
          '
        >
          {post.title}
        </h1>

        <p
          className='
            mx-auto mt-5 max-w-2xl text-lg text-pretty text-white/80
            sm:text-xl
          '
        >
          {post.subtitle}
        </p>

        <div className='mt-8 flex flex-col items-center gap-5'>
          <PostByline post={post} readingMinutes={readingMinutes} />
          <ShareLinks />
        </div>
      </div>

      <div id={HEADER_SENTINEL_ID} aria-hidden className='absolute inset-x-0 bottom-0 h-px' />
    </section>
  );
}
