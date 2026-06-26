import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/src/lib/tailwind/utils';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function H1<T extends ElementType = 'h1'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Comp = as ?? 'h1';

  return (
    <Comp
      data-slot='h1'
      className={cn(
        `
          text-4xl font-bold tracking-tight text-balance
          sm:text-5xl
        `,
        className,
      )}
      {...props}
    />
  );
}

export function H1Tag<T extends ElementType = 'p'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'p';

  return (
    <Comp
      data-slot='tag'
      className={cn('text-sm font-semibold tracking-wide text-primary uppercase', className)}
      {...props}
    />
  );
}

export function H2<T extends ElementType = 'h2'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Comp = as ?? 'h2';

  return (
    <Comp
      data-slot='h2'
      className={cn(
        `
          text-2xl font-bold tracking-tight text-balance
          sm:text-3xl
        `,
        className,
      )}
      {...props}
    />
  );
}

export function H3<T extends ElementType = 'h3'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Comp = as ?? 'h3';

  return (
    <Comp
      data-slot='h3'
      className={cn('text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

export function H4<T extends ElementType = 'h4'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Comp = as ?? 'h4';

  return (
    <Comp
      data-slot='h4'
      className={cn(
        'text-sm font-semibold tracking-wide text-muted-foreground uppercase',
        className,
      )}
      {...props}
    />
  );
}

export function Lead<T extends ElementType = 'p'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'p';

  return (
    <Comp
      data-slot='lead'
      className={cn(
        `
          text-lg text-muted-foreground
          sm:text-xl
        `,
        className,
      )}
      {...props}
    />
  );
}

export function P<T extends ElementType = 'p'>({ as, className, ...props }: PolymorphicProps<T>) {
  const Comp = as ?? 'p';

  return (
    <Comp
      data-slot='p'
      className={cn('text-[1.0625rem]/8 text-foreground/90', className)}
      {...props}
    />
  );
}

export function Blockquote<T extends ElementType = 'blockquote'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'blockquote';

  return (
    <Comp
      data-slot='blockquote'
      className={cn(
        `
          border-l-2 border-primary pl-5 font-heading-italic text-lg/8 font-medium text-foreground
          italic
          sm:text-xl
        `,
        className,
      )}
      {...props}
    />
  );
}

export function List<T extends ElementType = 'ul'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'ul';

  return (
    <Comp
      data-slot='list'
      className={cn(
        `
          space-y-2 pl-5 text-[1.0625rem]/8 text-foreground/90
          marker:text-muted-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode<T extends ElementType = 'code'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'code';

  return (
    <Comp
      data-slot='inline-code'
      className={cn(
        `
          rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium
          text-inline-code-foreground
        `,
        className,
      )}
      {...props}
    />
  );
}

export function InlineLink<T extends ElementType = 'a'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Comp = as ?? 'a';

  return (
    <Comp
      data-slot='inline-link'
      target='_blank'
      rel='noopener noreferrer'
      referrerPolicy='no-referrer'
      className={cn(
        `
          relative inline cursor-pointer font-medium text-primary
          after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left
          after:scale-x-0 after:bg-current after:transition-transform after:duration-300
          after:ease-out
          hover:after:scale-x-100
          focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-current
          motion-reduce:after:transition-none
        `,
        className,
      )}
      {...props}
    />
  );
}
