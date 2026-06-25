'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Activation line (px from the top of the viewport). A heading counts as
 * "passed" once its top crosses this line; the active entry is the *last* heading
 * that has passed it. Kept in step with the headings' `scroll-mt` so a jumped-to
 * heading resolves to itself.
 */
const ACTIVATION_OFFSET = 96;

/** How long to trust a click before letting the observer take over again (ms). */
const CLICK_LOCK_FALLBACK = 700;

type ActiveSection = {
  activeId: string | undefined;
  /** Mark a clicked entry active immediately and hold it until the scroll settles. */
  selectActive: (id: string) => void;
};

/**
 * Scroll-spy for the table of contents. The active entry is the last heading
 * whose top has passed the activation line (reading document order), which keeps
 * nested, closely-spaced headings resolving to the correct item instead of the
 * topmost one in a band. `selectActive` lets a click win: it pins the clicked id
 * and suppresses the observer until scrolling ends, so clicking an `h3` can't be
 * overridden by its parent `h2` mid-scroll.
 */
export function useActiveSection(ids: string[]): ActiveSection {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);
  const lockedRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const computeActive = () => {
      // While a click is in flight, the pinned id wins.
      if (lockedRef.current) {
        return;
      }

      let current = ids[0];

      for (const id of ids) {
        const element = document.getElementById(id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
          current = id; // keep advancing to the last heading above the line
        } else {
          break; // ids are in document order, so the rest are below the line
        }
      }

      setActiveId(current);
    };

    // The observer is just a cheap trigger: it fires as each heading crosses the
    // activation line, and `computeActive` reads live positions to decide.
    const observer = new IntersectionObserver(computeActive, {
      rootMargin: `-${ACTIVATION_OFFSET}px 0px 0px 0px`,
      threshold: [0, 1],
    });

    for (const id of ids) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    computeActive();

    return () => {
      observer.disconnect();
    };
  }, [ids]);

  // Release the click lock once the (smooth) scroll finishes. `scrollend` is the
  // precise signal; the fallback timer covers browsers that don't emit it.
  useEffect(() => {
    const unlock = () => {
      lockedRef.current = false;
    };

    window.addEventListener('scrollend', unlock);

    return () => {
      window.removeEventListener('scrollend', unlock);
      clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  const selectActive = (id: string) => {
    setActiveId(id);
    lockedRef.current = true;
    clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
    }, CLICK_LOCK_FALLBACK);
  };

  return { activeId, selectActive };
}
