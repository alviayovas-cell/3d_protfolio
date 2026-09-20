import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface ScrollParallaxOptions {
  /** Max travel in px at the extremes of the element's pass through the viewport. */
  strength?: number;
}

/**
 * Element-scoped scroll parallax: returns a -1..1 progress value for how far the
 * element has travelled through the viewport, and the px offset to apply.
 *
 * Driven by IntersectionObserver plus a rAF-throttled scroll listener, so it only
 * does work while the element is actually on screen. Returns 0 under reduced motion,
 * which collapses every consumer to a static layout.
 */
export function useScrollParallax<T extends HTMLElement>({
  strength = 40,
}: ScrollParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const element = ref.current;
    if (!element) return;

    let visible = false;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 when the element's centre is at the viewport centre, ±1 at the edges.
      const centre = rect.top + rect.height / 2;
      const progress = (centre - viewport / 2) / (viewport / 2 + rect.height / 2);
      setOffset(Math.max(-1, Math.min(1, progress)) * strength);
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) measure();
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion, strength]);

  return { ref, offset: reducedMotion ? 0 : offset };
}
