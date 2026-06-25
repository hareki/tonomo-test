import Image from 'next/image';

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

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
