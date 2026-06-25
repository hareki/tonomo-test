import { Poppins } from 'next/font/google';

import { SiteFooter } from '@/src/components/layout/SiteFooter';
import { SiteHeader } from '@/src/components/layout/SiteHeader';
import { ThemeProvider } from '@/src/providers/ThemeProvider';

import type { Metadata } from 'next';
import '../styles/index.css';

// Poppins is the site's single typeface. It isn't a variable font, so the
// weights actually used by the design tokens have to be listed explicitly, and
// italic is included so `Blockquote` renders a true italic rather than a faux one.
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Tonomo Journal',
    template: '%s · Tonomo Journal',
  },
  description: 'Field notes on running a profitable real estate media studio.',
};

/**
 * The single shell for every rendered route: a skip link, the sticky header,
 * the main landmark, and the footer. `/` never reaches here because the proxy
 * redirects it to a random post before any layout renders, so the shell only
 * ever wraps real content.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`
        ${poppins.variable}
        h-full antialiased
      `}
    >
      <body className='flex min-h-dvh flex-col'>
        <ThemeProvider>
          <a
            href='#main-content'
            className={`
              sr-only rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground
              shadow-lg outline-2 outline-ring
              focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4
              focus-visible:z-100
            `}
          >
            Skip to content
          </a>

          <SiteHeader />

          <main id='main-content' className='flex-1'>
            {children}
          </main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
