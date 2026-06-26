import { ViewTransition } from 'react';

import { notFound } from 'next/navigation';

import { SiteMobileBar } from '@/src/components/layout/SiteMobileBar';
import { CoverImage } from '@/src/features/blog-post/components/CoverImage';
import { PostBody } from '@/src/features/blog-post/components/PostBody';
import { PostHeader } from '@/src/features/blog-post/components/PostHeader';
import { PostLayout } from '@/src/features/blog-post/components/PostLayout';
import { RelatedPosts } from '@/src/features/blog-post/components/RelatedPosts';
import { TableOfContents } from '@/src/features/blog-post/components/TableOfContents';
import { getPostAnalysis } from '@/src/features/blog-post/content';
import { getAllSlugs, getPost, getRelatedPosts } from '@/src/features/blog-post/queries';

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

  const { default: Content } = await import(`@/src/features/blog-post/data/${slug}/content.mdx`);
  const { toc, minutes } = await getPostAnalysis(slug);
  const related = getRelatedPosts(post.slug);

  return (
    // Keyed by slug so post-to-post navigation (same dynamic route) remounts and
    // the `.page` fade fires; the cover's shared morph runs alongside it.
    <ViewTransition key={post.slug} enter='page' exit='page' default='none'>
      <SiteMobileBar slug={slug} />

      <PostLayout
        article={
          <div className='space-y-8'>
            <CoverImage slug={post.slug} image={post.cover} />
            <div className='max-w-prose space-y-8'>
              <PostHeader post={post} readingMinutes={minutes} />
              <hr className='border-border' />
              <PostBody>
                <Content />
              </PostBody>
            </div>
          </div>
        }
        sidebar={<TableOfContents entries={toc} />}
      />

      <RelatedPosts posts={related} />
    </ViewTransition>
  );
}
