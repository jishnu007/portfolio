import { useEffect, useRef } from "react";

/**
 * Hook for throttled scroll event handling
 * @param callback - Function to call on scroll
 * @param delay - Throttle delay in milliseconds (default: 100ms)
 * @param element - Element to attach scroll listener to (default: window)
 */
export function useThrottledScroll(
  callback: () => void,
  delay: number = 100,
  element?: HTMLElement | null
): void {
  const callbackRef = useRef(callback);
  const lastRanRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement = element || window;
    if (!targetElement) return;

    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastRan = now - lastRanRef.current;

      if (timeSinceLastRan >= delay) {
        callbackRef.current();
        lastRanRef.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callbackRef.current();
          lastRanRef.current = Date.now();
        }, delay - timeSinceLastRan);
      }
    };

    targetElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, element]);
}
