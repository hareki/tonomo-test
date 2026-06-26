import { ViewTransition } from 'react';

import Image from 'next/image';

import type { Image as PostImage } from '@/src/features/blog-post/types';

type CoverImageProps = {
  /** Used to pair this cover with the related-card cover for the shared morph. */
  slug: string;
  image: PostImage;
};

export function CoverImage({ slug, image }: CoverImageProps) {
  return (
    <ViewTransition name={`post-cover-${slug}`} share='morph'>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        loading='eager'
        fetchPriority='high'
        sizes='(max-width: 1024px) 100vw, 768px'
        className='h-auto w-full rounded-xl object-cover'
      />
    </ViewTransition>
  );
}
