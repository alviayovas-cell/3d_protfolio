import { motion } from "framer-motion";
import { useState } from "react";
import { PROFILE } from "../../../data/profile";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { Badge } from "../../ui/Badge";

interface AvatarStageProps {
  parallax: { x: number; y: number };
}

/** Editorial monogram shown until the real avatar asset is present at PROFILE.avatarSrc. */
function MonogramFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
      <div className="relative flex h-[70%] w-[70%] items-center justify-center rounded-full border border-white/[0.06]">
        <div className="absolute inset-4 rounded-full border border-iris-400/20" />
        <span className="font-display text-6xl font-semibold text-gradient sm:text-7xl">AY</span>
      </div>
    </div>
  );
}

/** The hero's visual centerpiece: framed portrait with idle float, cursor parallax, and cinematic entrance. */
export function AvatarStage({ parallax }: AvatarStageProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md"
      style={reducedMotion ? undefined : { perspective: 1200 }}
    >
      {/* Layer 1: cursor parallax — translate for depth, a slight 3D tilt so the avatar feels like it's turning toward the cursor */}
      <div
        style={
          reducedMotion
            ? undefined
            : {
                transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0) rotateY(${parallax.x * 0.15}deg) rotateX(${parallax.y * -0.15}deg)`,
                transformStyle: "preserve-3d",
              }
        }
        className="transition-transform duration-300 ease-out"
      >
        {/* Layer 2: continuous idle float (CSS animation, auto-tamed by prefers-reduced-motion globally) */}
        <div className="animate-[avatar-float_6.5s_ease-in-out_infinite]">
          {/* Layer 3: one-time cinematic entrance */}
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem]"
            initial={{ opacity: 0, scale: 0.88, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -inset-px rounded-[2.25rem] bg-gradient-to-br from-iris-400/40 via-white/10 to-azure-400/40" />
            <div className="glass-panel absolute inset-[1.5px] overflow-hidden rounded-[2.2rem]">
              {!imgFailed ? (
                <img
                  src={PROFILE.avatarSrc}
                  alt={`${PROFILE.displayName} — ${PROFILE.role}`}
                  // Source photo has a solid letterboxed strip along its bottom edge — zoom
                  // in slightly and anchor to the top so that band is cropped out of view
                  // instead of touching the actual asset.
                  className="h-[130%] w-full object-cover object-top"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <MonogramFallback />
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] shadow-[inset_0_0_60px_rgba(139,92,246,0.15)]" />
          </motion.div>

          {/* Floating decorative badges — entrance last, kept outside the frame so they never cross the face */}
          <motion.div
            className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge tone="iris" icon={<span className="h-1.5 w-1.5 rounded-full bg-iris-300 shadow-[0_0_8px_2px_rgba(167,139,250,0.7)]" />}>
              Available for work
            </Badge>
          </motion.div>

          <motion.div
            className="absolute -bottom-3 -left-4 sm:-bottom-4 sm:-left-6"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge tone="neutral">{PROFILE.education.years} · CSE</Badge>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
