'use client';

import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '@teispace/next-themes';

import { useHydrated } from '@/src/hooks/useHydrated';
import { cn } from '@/src/lib/tailwind/utils';

const OPTIONS = [
  { value: 'light', label: 'Light theme', Icon: IconSun },
  { value: 'system', label: 'System theme', Icon: IconDeviceDesktop },
  { value: 'dark', label: 'Dark theme', Icon: IconMoon },
] as const;

/**
 * Light / system / dark segmented control (see IMG-3). Styled entirely with
 * `currentColor` so it stays legible whether the header is transparent over the
 * hero (white text) or solid (foreground text) - see Rule D. Selection state is
 * only reflected after hydration to avoid a mismatch on the resolved theme.
 */
export function ThemeSegmentedControl({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <RadioGroup
      aria-label='Color theme'
      value={hydrated ? theme : ''}
      onValueChange={(value) => {
        setTheme(value);
      }}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-current/20 bg-current/5 p-0.5',
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <Radio.Root
          key={value}
          value={value}
          aria-label={label}
          className={cn(
            `
              inline-flex size-8 items-center justify-center rounded-full text-current/60
              transition-colors
            `,
            `
              hover:text-current
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
            `,
            'data-checked:bg-current/15 data-checked:text-current',
          )}
        >
          <Icon size={16} stroke={2} aria-hidden />
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
