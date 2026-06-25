import { H2 } from '@/app/components/ui/Typography';
import type { Post } from '@/app/lib/posts/types';

import { RelatedArticleCard } from './RelatedArticleCard';

export function RelatedArticles({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby='related-heading'
      className='
        mx-auto mt-24 max-w-6xl px-4
        sm:px-6
        lg:px-8
      '
    >
      <H2 id='related-heading' className='text-center'>
        Related Articles
      </H2>
      <div
        className='
          mt-10 grid grid-cols-1 gap-x-8 gap-y-12
          sm:grid-cols-2
          lg:grid-cols-3
        '
      >
        {posts.map((post) => (
          <RelatedArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
