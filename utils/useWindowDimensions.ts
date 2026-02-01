import { useState, useEffect, useCallback } from "react";
import type { WindowDimensions } from "../types";

/**
 * Throttle function to limit execution frequency
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastRan = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan || now - lastRan >= delay) {
      func.apply(this, args);
      lastRan = now;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastRan = Date.now();
      }, delay - (now - lastRan));
    }
  };
}

/**
 * Hook to get window dimensions with throttled resize listener
 * @param throttleMs - Throttle delay in milliseconds (default: 150ms)
 */
export default function useWindowDimensions(
  throttleMs: number = 150
): WindowDimensions {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = useCallback((): WindowDimensions => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return { width, height };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions
  );

  useEffect(() => {
    if (!hasWindow) return;

    const handleResize = throttle(() => {
      setWindowDimensions(getWindowDimensions());
    }, throttleMs);

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow, getWindowDimensions, throttleMs]);

  return windowDimensions;
}
