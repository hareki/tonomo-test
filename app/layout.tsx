import { Poppins } from 'next/font/google';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import type { Metadata } from 'next';
import './styles/index.css';

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
      <body className='flex min-h-full flex-col'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
