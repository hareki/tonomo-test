import { IconCalendar, IconClock } from '@tabler/icons-react';

import { Avatar } from '@/src/components/ui/Avatar';
import { formatPublishedDate } from '@/src/features/blog/queries';
import type { PostMetadata } from '@/src/features/blog/types';

type PostBylineProps = {
  post: PostMetadata;
  readingMinutes: number;
};

export function PostByline({ post, readingMinutes }: PostBylineProps) {
  return (
    <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground'>
      <span className='inline-flex items-center gap-2 font-medium text-foreground'>
        <Avatar src={post.author.avatar} alt='' size={28} />
        {post.author.name}
      </span>
      <span className='inline-flex items-center gap-1.5'>
        <IconCalendar size={16} stroke={2} aria-hidden />
        <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
      </span>
      <span className='inline-flex items-center gap-1.5'>
        <IconClock size={16} stroke={2} aria-hidden />
        {readingMinutes} min read
      </span>
    </div>
  );
}
