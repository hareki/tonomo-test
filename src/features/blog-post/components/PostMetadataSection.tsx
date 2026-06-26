import { IconCalendar, IconClock } from '@tabler/icons-react';

import { Avatar } from '@/src/components/ui/Avatar';
import { formatPublishedDate } from '@/src/features/blog-post/queries';
import type { PostMetadata } from '@/src/features/blog-post/types';

type PostBylineProps = {
  post: PostMetadata;
  readingMinutes: number;
};

export function PostMetadataSection({ post, readingMinutes }: PostBylineProps) {
  return (
    <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground'>
      <span className='inline-flex items-center gap-2 font-medium text-foreground'>
        <Avatar src={post.author.avatar} alt='' size={28} />
        {post.author.name}
      </span>
      <span className='inline-flex items-center gap-1.5'>
        <IconCalendar className='size-4' aria-hidden />
        <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
      </span>
      <span className='inline-flex items-center gap-1.5'>
        <IconClock className='size-4' aria-hidden />
        {readingMinutes} {readingMinutes === 1 ? 'min' : 'mins'} read
      </span>
    </div>
  );
}
