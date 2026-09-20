import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/** Elements that should make the cursor react. */
const INTERACTIVE = "a, button, input, select, textarea, [role='button'], label";

/**
 * A subtle two-part cursor: a small solid dot that tracks exactly, and a ring that
 * eases behind it and swells over interactive elements.
 *
 * Desktop only. It never mounts on touch/coarse-pointer devices, and it never hides
 * the real cursor until it is actually running — losing the system cursor and getting
 * nothing back would be a serious usability regression. Positions are written
 * straight to the DOM in a rAF loop rather than through React state, so moving the
 * mouse doesn't re-render the app on every frame.
 */
export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Decide once whether this device gets a custom cursor at all.
  useEffect(() => {
    if (reducedMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(finePointer.matches);
    update();
    finePointer.addEventListener("change", update);
    return () => finePointer.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      show();
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const isInteractive = !!target?.closest?.(INTERACTIVE);
      ring.dataset.active = isInteractive ? "true" : "false";
    };

    // Leaving the window or switching tabs should take the cursor with it.
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    frame = requestAnimationFrame(tick);

    // Only now hide the system cursor — if this effect never ran, it stays visible.
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden xl:block">
      <div
        ref={ringRef}
        data-active="false"
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-iris-400/50 opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:border-iris-300 data-[active=true]:bg-iris-400/10"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-iris-300 opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
