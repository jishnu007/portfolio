import { useState, useEffect, useRef } from "react";
import type { ScrollDirection, UseScrollDirectionOptions } from "../types";

const SCROLL_UP: ScrollDirection = "up";
const SCROLL_DOWN: ScrollDirection = "down";

/**
 * Hook to detect scroll direction with throttling using requestAnimationFrame
 * @param options - Configuration options
 * @returns Current scroll direction ("up" or "down")
 */
const useScrollDirection = ({
  initialDirection = SCROLL_DOWN,
  thresholdPixels = 0,
}: Partial<UseScrollDirectionOptions> = {}): ScrollDirection => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(initialDirection);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    // Initialize with current scroll position
    lastScrollYRef.current = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollYRef.current) < thresholdPixels) {
        // Haven't exceeded the threshold
        tickingRef.current = false;
        return;
      }

      setScrollDir(
        scrollY > lastScrollYRef.current ? SCROLL_DOWN : SCROLL_UP
      );
      lastScrollYRef.current = scrollY > 0 ? scrollY : 0;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateScrollDir);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPixels]);

  return scrollDir;
};

export default useScrollDirection;
