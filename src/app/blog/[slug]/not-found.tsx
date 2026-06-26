import Link from 'next/link';

import { H1, H1Tag, Lead } from '@/src/components/ui/Typography';
import { getAllPosts } from '@/src/features/blog-post/queries';

export default function PostNotFound() {
  const posts = getAllPosts();

  return (
    <div
      className={`
        mx-auto max-w-xl px-4 py-20
        sm:px-6
      `}
    >
      <H1Tag className='text-muted-foreground'>404</H1Tag>
      <H1 className='mt-3'>We couldn&rsquo;t find that post</H1>
      <Lead className='mt-5'>
        The link may be broken or the post may have moved. Browse the latest pieces from the journal
        below.
      </Lead>

      <ul className='mt-10 grid gap-3'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={`
                block rounded-lg border border-border bg-card px-4 py-3 font-medium
                transition-colors
                hover:border-foreground/30
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
              `}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
