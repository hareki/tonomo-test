import { ViewTransition } from 'react';

import Image from 'next/image';

import type { Image as PostImage } from '@/src/features/blog/types';

type CoverImageProps = {
  /** Used to pair this cover with the related-card cover for the shared morph. */
  slug: string;
  image: PostImage;
  priority?: boolean;
};

/**
 * The article cover. Explicit intrinsic dimensions plus `h-auto w-full` keep the
 * aspect ratio and reserve space, so there is no clipping or layout shift. The
 * shared `name` lets it morph from the related-card thumbnail on navigation.
 */
export function CoverImage({ slug, image, priority }: CoverImageProps) {
  return (
    <ViewTransition name={`post-cover-${slug}`} share='morph'>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes='(max-width: 1024px) 100vw, 768px'
        className='h-auto w-full rounded-xl object-cover'
      />
    </ViewTransition>
  );
}
