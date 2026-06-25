'use client';

import { ThemeProvider as NextThemesProvider } from '@teispace/next-themes';

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Class-free theme provider: toggles `data-theme` on <html> and lets the OS
 * preference drive the `system` option. The library injects a blocking script
 * so the correct theme is applied before paint (no flash of wrong theme).
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute='data-theme' defaultTheme='system' enableSystem>
      {children}
    </NextThemesProvider>
  );
}
