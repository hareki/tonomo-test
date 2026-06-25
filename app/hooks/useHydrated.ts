'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {
  // No external store to subscribe to; hydration state never changes back.
};

/**
 * True only after client-side hydration, `false` during SSR and the first paint.
 * Lets components defer reading client-only values (like the resolved theme)
 * until it is safe to, without a setState-in-effect mount flag.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
