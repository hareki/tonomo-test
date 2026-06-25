import type { ReactNode } from 'react';

import { cn } from '@/src/lib/tailwind/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full bg-muted px-2 py-0.5 text-2xs font-semibold tracking-wider text-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
