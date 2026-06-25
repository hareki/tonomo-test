import Image from 'next/image';

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/**
 * A captioned body image. Explicit `width`/`height` reserve space (no layout
 * shift) and `h-auto w-full` keeps the intrinsic aspect ratio. Authored in MDX
 * as `<Figure ... />` because plain markdown images can't carry dimensions.
 */
export function Figure({ src, alt, width, height, caption }: FigureProps) {
  return (
    <figure className='space-y-2'>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes='(max-width: 1024px) 100vw, 768px'
        className='h-auto w-full rounded-xl object-cover'
      />
      {caption && (
        <figcaption className='text-center text-sm text-muted-foreground'>{caption}</figcaption>
      )}
    </figure>
  );
}
