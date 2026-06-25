import type { ReactNode } from 'react';

import { SiteFooter } from '@/app/components/layout/SiteFooter';
import { SiteHeader } from '@/app/components/layout/SiteHeader';

/**
 * Shared shell for every reader-facing route: a skip link, the sticky header,
 * the main landmark, and the footer. The root `/` redirect lives outside this
 * group, so it never pays for the shell it would only flash before redirecting.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-dvh flex-col'>
      <a
        href='#main-content'
        className='
          sr-only rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg
          outline-2 outline-ring
          focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4
          focus-visible:z-100
        '
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id='main-content' className='flex-1'>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
