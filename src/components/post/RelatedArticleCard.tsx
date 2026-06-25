import { ViewTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '@/src/components/ui/Avatar';
import { H3 } from '@/src/components/ui/Typography';
import { formatPublishedDate } from '@/src/lib/posts/queries';
import type { Post } from '@/src/lib/posts/types';

/**
 * A real, navigable card for another post. The cover shares its `name` with the
 * destination article's cover, so clicking it morphs the thumbnail up into the
 * full cover instead of cutting between unrelated pages.
 */
export function RelatedArticleCard({ post }: { post: Post }) {
  return (
    <article className='group flex flex-col'>
      <Link
        href={`/blog/${post.slug}`}
        className='
          flex flex-col rounded-xl
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring
        '
      >
        <ViewTransition name={`post-cover-${post.slug}`} share='morph'>
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            width={post.cover.width}
            height={post.cover.height}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='aspect-video w-full rounded-xl object-cover'
          />
        </ViewTransition>

        <H3
          className='
            mt-4 text-lg text-pretty transition-colors
            group-hover:text-primary
          '
        >
          {post.title}
        </H3>
        <p className='mt-2 line-clamp-3 text-sm/6 text-muted-foreground'>{post.excerpt}</p>
      </Link>

      <div className='mt-4 flex items-center justify-between gap-3 text-sm'>
        <span className='flex items-center gap-2 font-medium'>
          <Avatar src={post.author.avatar} alt='' size={24} />
          {post.author.name}
        </span>
        <time dateTime={post.publishedAt} className='text-muted-foreground'>
          {formatPublishedDate(post.publishedAt)}
        </time>
      </div>
    </article>
  );
}
