import { postMetadataItems } from './data';

import type { PostMetadata } from './types';

export function getAllPosts(): PostMetadata[] {
  return postMetadataItems;
}

export function getAllSlugs(): string[] {
  return postMetadataItems.map((post) => post.slug);
}

export function getPost(slug: string): PostMetadata | undefined {
  return postMetadataItems.find((post) => post.slug === slug);
}

/** The other posts, in publication order (newest first), for the related grid. */
export function getRelatedPosts(slug: string, limit = 3): PostMetadata[] {
  return postMetadataItems
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
