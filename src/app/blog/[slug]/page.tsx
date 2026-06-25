import { ViewTransition } from 'react';

import { notFound } from 'next/navigation';

import { ArticleBody } from '@/src/components/post/ArticleBody';
import { CoverImage } from '@/src/components/post/CoverImage';
import { PostHero } from '@/src/components/post/PostHero';
import { PostLayout } from '@/src/components/post/PostLayout';
import { RelatedArticles } from '@/src/components/post/RelatedArticles';
import { TableOfContents } from '@/src/components/post/TableOfContents';
import { getPostAnalysis } from '@/src/features/blog/content';
import { getAllSlugs, getPost, getRelatedPosts } from '@/src/features/blog/queries';

import type { Metadata } from 'next';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
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

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(`@/src/features/blog/content/${slug}.mdx`);
  const { toc, minutes } = await getPostAnalysis(slug);
  const related = getRelatedPosts(post.slug);

  return (
    // Keyed by slug so post-to-post navigation (same dynamic route) remounts and
    // the `.page` fade/rise fires; the cover's shared morph runs alongside it.
    <ViewTransition key={post.slug} enter='page' exit='page' default='none'>
      <PostHero post={post} readingMinutes={minutes} />

      <PostLayout
        article={
          <div className='space-y-10'>
            <CoverImage slug={post.slug} image={post.cover} priority />
            <ArticleBody>
              <Content />
            </ArticleBody>
          </div>
        }
        sidebar={<TableOfContents entries={toc} />}
      />

      <RelatedArticles posts={related} />
    </ViewTransition>
  );
}
