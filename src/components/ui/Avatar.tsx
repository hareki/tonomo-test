import Image from 'next/image';

import { cn } from '@/src/lib/tailwind/utils';

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

/** Round, fixed-size author image. Decorative ring adapts to the theme. */
export function Avatar({ src, alt, size = 40, className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full object-cover ring-1 ring-black/10', className)}
    />
  );
}
