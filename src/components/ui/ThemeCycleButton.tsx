'use client';

import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '@teispace/next-themes';

import { useHydrated } from '@/src/hooks/useHydrated';
import { cn } from '@/src/lib/tailwind/utils';

// Cycle order requested for the compact control: system -> dark -> light -> …
const CYCLE = ['system', 'dark', 'light'] as const;

const META = {
  system: { label: 'System theme', Icon: IconDeviceDesktop },
  dark: { label: 'Dark theme', Icon: IconMoon },
  light: { label: 'Light theme', Icon: IconSun },
} as const;

type ThemeValue = keyof typeof META;

type ThemeCycleButtonProps = {
  className?: string;
};

/**
 * Compact theme control for narrow viewports: a single button that cycles
 * system -> dark -> light. Replaces the segmented control below `md`. The icon
 * reflects the current selection only after hydration (it falls back to the
 * system icon during SSR to avoid a resolved-theme mismatch).
 */
export function ThemeCycleButton({ className }: ThemeCycleButtonProps) {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const current: ThemeValue = hydrated && theme && theme in META ? (theme as ThemeValue) : 'system';
  const { label, Icon } = META[current];

  return (
    <button
      type='button'
      aria-label={`Color theme: ${label}. Click to change.`}
      onClick={() => {
        const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

        setTheme(next);
      }}
      className={cn(
        `
          inline-flex size-9 items-center justify-center rounded-full border border-current/20
          bg-current/5 text-current/70 transition-colors
          hover:bg-current/10 hover:text-current
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
        `,
        className,
      )}
    >
      <Icon size={18} stroke={2} aria-hidden />
    </button>
  );
}
