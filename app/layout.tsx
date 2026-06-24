import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import './styles/index.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tonomo',
  description: 'Tonomo | Real Estate Photography CRM Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`
      ${geistSans.variable}
      ${geistMono.variable}
      h-full antialiased
    `}>
      <body className='flex min-h-full flex-col'>{children}</body>
    </html>
  );
}
