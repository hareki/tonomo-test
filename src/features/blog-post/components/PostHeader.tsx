import { H1, H1Tag, Lead } from '@/src/components/ui/Typography';
import type { PostMetadata } from '@/src/features/blog-post/types';

import { PostMetadataSection } from './PostMetadataSection';

type PostHeaderProps = {
  post: PostMetadata;
  readingMinutes: number;
};

export function PostHeader({ post, readingMinutes }: PostHeaderProps) {
  return (
    <header>
      {post.tags[0] && <H1Tag>{post.tags[0]}</H1Tag>}

      <H1 className='mt-3'>{post.title}</H1>

      <Lead className='mt-4 text-pretty'>{post.subtitle}</Lead>

      <div className='mt-6'>
        <PostMetadataSection post={post} readingMinutes={readingMinutes} />
      </div>
    </header>
  );
}
