import { H2 } from '@/src/components/ui/Typography';
import type { PostMetadata } from '@/src/features/blog-post/types';

import { RelatedPostCard } from './RelatedPostCard';

type RelatedPostsProps = {
  posts: PostMetadata[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby='related-heading'
      className={`
        mx-auto mt-16 max-w-6xl px-4
        sm:px-6
        lg:px-8
      `}
    >
      {/* Divider between the post body and the related section. */}
      <hr className='border-border' />

      <H2 id='related-heading' className='mt-12'>
        Related Posts
      </H2>
      <div
        className={`
          mt-10 grid grid-cols-1 gap-x-8 gap-y-12
          sm:grid-cols-2
          lg:grid-cols-3
        `}
      >
        {posts.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
