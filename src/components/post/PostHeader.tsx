import { H1, Lead } from '@/src/components/ui/Typography';
import type { PostMetadata } from '@/src/features/blog/types';

import { PostByline } from './PostByline';

type PostHeaderProps = {
  post: PostMetadata;
  readingMinutes: number;
};

export function PostHeader({ post, readingMinutes }: PostHeaderProps) {
  return (
    <header>
      {post.tags[0] && (
        <p className='text-sm font-semibold tracking-wide text-primary uppercase'>{post.tags[0]}</p>
      )}

      <H1 className='mt-3'>{post.title}</H1>

      <Lead className='mt-4 text-pretty'>{post.subtitle}</Lead>

      <div className='mt-6'>
        <PostByline post={post} readingMinutes={readingMinutes} />
      </div>
    </header>
  );
}
