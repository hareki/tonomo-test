import Link from 'next/link';

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
      <p className='text-sm font-semibold tracking-wide text-muted-foreground uppercase'>404</p>
      <h1
        className={`
          mt-3 text-4xl font-bold tracking-tight text-balance
          sm:text-5xl
        `}
      >
        We couldn&rsquo;t find that post
      </h1>
      <p className='mt-5 text-lg text-pretty text-muted-foreground'>
        The link may be broken or the post may have moved. Browse the latest pieces from the journal
        below.
      </p>

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
