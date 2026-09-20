import { PROJECTS } from "../../../data/projects";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { cn } from "../../../lib/cn";

interface FloatingProjectCardsProps {
  parallax: { x: number; y: number };
}

/**
 * Where each card sits relative to the avatar frame, and how far forward it floats.
 *
 * `depth` is a real `translateZ` inside AvatarStage's `perspective: 1200` context —
 * so nearer cards genuinely render larger and swing further under cursor parallax,
 * rather than being scaled by hand. Positions dodge the face (upper-centre of the
 * frame) and the two existing corner badges.
 */
interface CardSlot {
  /** Percentages of the avatar frame; negative values sit outside its edge. */
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  depth: number;
  floatDuration: string;
  floatDelay: string;
}

const SLOTS: CardSlot[] = [
  { left: "-24%", top: "14%", depth: 40, floatDuration: "7.5s", floatDelay: "0s" },
  // Right-side cards hug the frame: pushing them further out overflows the viewport
  // at the xl breakpoint, since the avatar column already sits against the gutter.
  { right: "-13%", top: "46%", depth: 62, floatDuration: "8.4s", floatDelay: "-2.1s" },
  { left: "-28%", top: "58%", depth: 78, floatDuration: "6.8s", floatDelay: "-4.3s" },
  { right: "-11%", top: "73%", depth: 34, floatDuration: "9.1s", floatDelay: "-1.2s" },
  { left: "16%", bottom: "-13%", depth: 92, floatDuration: "7.9s", floatDelay: "-3.4s" },
];

export function FloatingProjectCards({ parallax }: FloatingProjectCardsProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    /*
      Hidden below xl: the ring needs room on both sides of the avatar that narrow
      viewports don't have, and Phase 12's Projects section carries the same content
      for everyone. aria-hidden would drop five real links from the accessibility
      tree, so the list stays semantic and simply isn't rendered on small screens.

      z-30 matters too: the avatar's tilt/entrance layers each flatten into their own
      rendering context, so translateZ alone doesn't decide paint order — without an
      explicit z-index the cards render *behind* the frame and get clipped mid-word.
    */
    <ul className="pointer-events-none absolute inset-0 z-30 hidden list-none xl:block">
      {PROJECTS.map((project, i) => {
        const slot = SLOTS[i];
        if (!slot) return null;

        // Nearer cards (higher depth) travel further with the cursor — parallax by depth.
        const shift = slot.depth / 60;
        const transform = reducedMotion
          ? `translateZ(${slot.depth}px)`
          : `translate3d(${parallax.x * shift}px, ${parallax.y * shift}px, ${slot.depth}px)`;

        return (
          <li
            key={project.id}
            className="absolute"
            style={{
              left: slot.left,
              right: slot.right,
              top: slot.top,
              bottom: slot.bottom,
              transform,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={cn(
                "transition-transform duration-300 ease-out",
                !reducedMotion && "animate-[project-card-float_var(--float-duration)_ease-in-out_infinite]",
              )}
              style={
                {
                  "--float-duration": slot.floatDuration,
                  animationDelay: slot.floatDelay,
                } as React.CSSProperties
              }
            >
              <a
                href="#projects"
                /*
                  Not `.glass-panel`: at only 5% white it vanishes where a card
                  overlaps the bright wall in the avatar photo. These sit over both
                  the dark hero and the lit portrait, so they need an opaque base.
                */
                className="pointer-events-auto group block w-[9.5rem] rounded-2xl border border-ink-600 bg-ink-800 px-3.5 py-2.5 shadow-[0_10px_30px_-18px_rgba(10,10,10,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-mist-400 hover:shadow-[0_14px_38px_-18px_rgba(10,10,10,0.45)] focus-visible:-translate-y-1 focus-visible:border-mist-400"
                aria-label={`${project.name} — ${project.summary}`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-iris-400 transition-colors duration-300 group-hover:bg-azure-400" />
                  <span className="truncate font-display text-[0.8rem] font-semibold text-mist-50">
                    {project.name}
                  </span>
                </span>
                <span className="mt-0.5 block text-[0.6rem] uppercase tracking-[0.16em] text-mist-600">
                  {project.category}
                </span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
