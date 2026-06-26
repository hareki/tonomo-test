import { metadata as buildingAReferralEngine } from './building-a-referral-engine/metadata';
import { metadata as masteringReact20FromZeroToHero } from './mastering-react-20-from-zero-to-hero/metadata';
import { metadata as nextjs17EverythingYouNeedToKnow } from './nextjs-17-everything-you-need-to-know/metadata';
import { metadata as pricingOnValueNotHours } from './pricing-on-value-not-hours/metadata';

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
  nextjs17EverythingYouNeedToKnow,
  masteringReact20FromZeroToHero,
];
