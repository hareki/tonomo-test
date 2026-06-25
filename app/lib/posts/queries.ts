import { posts } from './data';

import type { Post } from './types';

export function getAllPosts(): Post[] {
  return posts;
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** The other posts, in publication order (newest first), for the related grid. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  return posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getRandomSlug(): string {
  const slugs = getAllSlugs();

  return slugs[Math.floor(Math.random() * slugs.length)];
}

export function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
