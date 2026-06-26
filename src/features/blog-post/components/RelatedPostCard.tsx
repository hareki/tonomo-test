import { ViewTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '@/src/components/ui/Avatar';
import { H3 } from '@/src/components/ui/Typography';
import { formatPublishedDate } from '@/src/features/blog-post/queries';
import type { PostMetadata } from '@/src/features/blog-post/types';

type RelatedPostCardProps = {
  post: PostMetadata;
};

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  return (
    <article className='group'>
      <Link
        href={`/blog/${post.slug}`}
        className={`
          flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm
          transition-shadow
          hover:shadow-md
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
          dark:shadow-none
        `}
      >
        <ViewTransition name={`post-cover-${post.slug}`} share='morph'>
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            width={post.cover.width}
            height={post.cover.height}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='aspect-video w-full object-cover'
          />
        </ViewTransition>

        <div className='flex flex-1 flex-col justify-between p-5'>
          <div>
            <H3
              className={`
                text-lg text-pretty transition-colors
                group-hover:text-primary
              `}
            >
              {post.title}
            </H3>
            <p className='mt-2 line-clamp-3 text-sm/6 text-muted-foreground'>{post.excerpt}</p>
          </div>

          <div className='mt-4 flex items-center justify-between gap-3 text-sm'>
            <span className='flex items-center gap-2 font-medium'>
              <Avatar src={post.author.avatar} alt='' size={24} />
              {post.author.name}
            </span>
            <time dateTime={post.publishedAt} className='text-muted-foreground'>
              {formatPublishedDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
