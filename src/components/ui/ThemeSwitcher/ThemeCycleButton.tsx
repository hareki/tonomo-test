'use client';

import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '@teispace/next-themes';

import { Button } from '@/src/components/ui/Button';
import { useHydrated } from '@/src/hooks/useHydrated';

// Cycle order requested for the compact control: system -> dark -> light -> …
const CYCLE = ['system', 'dark', 'light'] as const;

const META = {
  system: { label: 'System theme', Icon: IconDeviceDesktop },
  dark: { label: 'Dark theme', Icon: IconMoon },
  light: { label: 'Light theme', Icon: IconSun },
} as const;

type ThemeValue = keyof typeof META;

/**
 * Compact theme control for narrow viewports: a single button that cycles
 * system -> dark -> light. Replaces the segmented control below `md`. The icon
 * reflects the current selection only after hydration (it falls back to the
 * system icon during SSR to avoid a resolved-theme mismatch).
 */
export function ThemeCycleButton() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const current: ThemeValue = hydrated && theme && theme in META ? (theme as ThemeValue) : 'system';
  const { label, Icon } = META[current];

  return (
    <Button
      size='icon'
      aria-label={`Color theme: ${label}. Click to change.`}
      onClick={() => {
        const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

        setTheme(next);
      }}
    >
      <Icon aria-hidden />
    </Button>
  );
}
