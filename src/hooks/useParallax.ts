import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface ParallaxOptions {
  /** Max travel in px at the viewport edge. */
  strength?: number;
}

/**
 * Normalized (-1..1) cursor offset from viewport center, eased to 0 when
 * unavailable. Disabled on touch devices and when reduced motion is on —
 * both simply return a fixed {x:0, y:0}.
 */
export function useParallax({ strength = 16 }: ParallaxOptions = {}): { x: number; y: number } {
  const reducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setOffset({ x: nx * strength, y: ny * strength });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, strength]);

  return reducedMotion ? { x: 0, y: 0 } : offset;
}
