import { metadata as buildingAReferralEngine } from './building-a-referral-engine/metadata';
import { metadata as editingAtScale } from './editing-at-scale/metadata';
import { metadata as pricingOnValueNotHours } from './pricing-on-value-not-hours/metadata';
import { metadata as theFirstClientCall } from './the-first-client-call/metadata';

import type { PostMetadata } from '../types';

/**
 * Source of truth for blog metadata, aggregated from each post's own
 * `posts/<slug>/metadata.ts`. Each post's body lives beside its metadata as
 * `posts/<slug>/content.mdx`, loaded and rendered by the post page; the table of
 * contents and reading time are derived from that file (see `../content.ts`).
 *
 * Order here is the display order returned by `getAllPosts`.
 */
export const postMetadataItems: PostMetadata[] = [
  pricingOnValueNotHours,
  buildingAReferralEngine,
  theFirstClientCall,
  editingAtScale,
];
