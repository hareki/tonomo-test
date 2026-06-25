import { Avatar } from '@/app/components/ui/Avatar';
import { formatPublishedDate } from '@/app/lib/posts/queries';
import type { Post } from '@/app/lib/posts/types';

function Separator() {
  return (
    <span aria-hidden className='text-current/40'>
      ·
    </span>
  );
}

/**
 * Author, publication date, and reading time on one byline row (Rule B: author
 * lives beside the date rather than in the sidebar). Inherits `currentColor`, so
 * it reads as white in the hero.
 */
export function PostByline({ post, readingMinutes }: { post: Post; readingMinutes: number }) {
  return (
    <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm'>
      <span className='flex items-center gap-2 font-medium'>
        <Avatar src={post.author.avatar} alt='' size={28} />
        {post.author.name}
      </span>
      <Separator />
      <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
      <Separator />
      <span>{readingMinutes} min read</span>
    </div>
  );
}
