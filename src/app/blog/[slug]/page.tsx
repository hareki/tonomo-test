import { ViewTransition } from 'react';

import { notFound } from 'next/navigation';

import { CoverImage } from '@/src/components/post/CoverImage';
import { MobileTocBar } from '@/src/components/post/MobileTocBar';
import { PostBody } from '@/src/components/post/PostBody';
import { PostHeader } from '@/src/components/post/PostHeader';
import { PostLayout } from '@/src/components/post/PostLayout';
import { RelatedPosts } from '@/src/components/post/RelatedPosts';
import { TableOfContents } from '@/src/components/post/TableOfContents';
import { getPostAnalysis } from '@/src/features/blog/content';
import { getAllSlugs, getPost, getRelatedPosts } from '@/src/features/blog/queries';

import type { Metadata } from 'next';

type Params = { slug: string };

type PostPageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.cover.src }],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/src/features/blog/posts/${slug}/content.mdx`);
  const { toc, minutes } = await getPostAnalysis(slug);
  const related = getRelatedPosts(post.slug);

  return (
    // Keyed by slug so post-to-post navigation (same dynamic route) remounts and
    // the `.page` fade fires; the cover's shared morph runs alongside it.
    <ViewTransition key={post.slug} enter='page' exit='page' default='none'>
      {/* Mobile-only secondary header with the table-of-contents drawer trigger. */}
      <MobileTocBar entries={toc} />

      <PostLayout
        article={
          <div className='space-y-8'>
            {/* Banner: shares the content column's width, never spanning the sidebar. */}
            <CoverImage slug={post.slug} image={post.cover} priority />
            <PostHeader post={post} readingMinutes={minutes} />
            <hr className='border-border' />
            <PostBody>
              <Content />
            </PostBody>
          </div>
        }
        sidebar={<TableOfContents entries={toc} />}
      />

      <RelatedPosts posts={related} />
    </ViewTransition>
  );
}
