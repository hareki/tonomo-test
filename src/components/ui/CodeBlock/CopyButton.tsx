'use client';

import { useEffect, useRef, useState } from 'react';

import { IconCheck, IconCopy } from '@tabler/icons-react';

import { cn } from '@/src/lib/tailwind/utils';

type CopyButtonProps = {
  code: string;
};

/**
 * Copy-to-clipboard button for a code block. The raw source is passed down from
 * the (server-rendered) CodeBlock, so this stays a tiny client island that only
 * owns the clipboard write and the brief "Copied" confirmation.
 */
export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      /* Clipboard unavailable (e.g. insecure context); nothing to do. */
    }
  };

  const Icon = copied ? IconCheck : IconCopy;

  return (
    <button
      type='button'
      onClick={handleCopy}
      className={cn(
        `
          inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium
          text-muted-foreground transition-colors
          hover:bg-background hover:text-foreground
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
        `,
        copied && 'text-foreground',
      )}
    >
      <Icon size={14} stroke={2} aria-hidden />
      <span aria-live='polite'>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
