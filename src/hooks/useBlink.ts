import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const BLINK_DURATION_MS = 160;
const MIN_INTERVAL_MS = 2600;
const MAX_INTERVAL_MS = 6200;

function nextDelay(): number {
  return MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);
}

/** Drives a periodic, human-feeling blink on a random interval. Off entirely under prefers-reduced-motion. */
export function useBlink(): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let closeTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      closeTimeout = setTimeout(() => {
        setBlinking(true);
        openTimeout = setTimeout(() => {
          setBlinking(false);
          scheduleNext();
        }, BLINK_DURATION_MS);
      }, nextDelay());
    };

    scheduleNext();
    return () => {
      clearTimeout(closeTimeout);
      clearTimeout(openTimeout);
    };
  }, [reducedMotion]);

  return reducedMotion ? false : blinking;
}
