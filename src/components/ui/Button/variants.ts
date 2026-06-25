import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `
    inline-flex shrink-0 items-center justify-center rounded-full border whitespace-nowrap
    transition-colors outline-none select-none
    focus-visible:outline-2 focus-visible:outline-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        outline: `
          border-border bg-background font-medium text-foreground
          hover:bg-muted
          focus-visible:outline-ring
        `,
        ghost: `
          border-transparent font-medium
          text-foreground
          hover:bg-muted
          focus-visible:outline-ring
        `,
      },
      size: {
        icon: `
          size-10
          [&_svg:not([class*='size-'])]:size-4.5
        `,
        default: `
          h-10 gap-2 px-4 text-sm
          [&_svg:not([class*='size-'])]:size-4.5
        `,
        sm: `
          h-8 gap-2 px-4 text-xs
          [&_svg:not([class*='size-'])]:size-4
        `,
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  },
);
