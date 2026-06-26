import { type ComponentProps } from 'react';

import Link from 'next/link';

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink(props: NavLinkProps) {
  return (
    <Link
      className={`
        text-foreground transition-colors
        hover:text-primary
        focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-current
      `}
      {...props}
    />
  );
}
