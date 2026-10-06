import { motion } from "framer-motion";
import { useState } from "react";
import { PROFILE } from "../../../data/profile";
import { useBlink } from "../../../hooks/useBlink";
import { useIntroSpeech } from "../../../hooks/useIntroSpeech";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { cn } from "../../../lib/cn";
import { Badge } from "../../ui/Badge";

/**
 * The source photo is a 1264×843 landscape shot; the frame shows a 520×650 (4:5)
 * window of it starting at source pixel (471, 0), centred on the face. PHOTO_CROP
 * expresses that window as the img's size/offset relative to the frame.
 */
const PHOTO_CROP = {
  width: `${(1264 / 520) * 100}%`,
  left: `${(-471 / 520) * 100}%`,
};

/**
 * Eye positions as a % of the frame, derived by mapping the source image's eye
 * pixels (≈706,128 and ≈756,128) through PHOTO_CROP. Percentages stay correct at
 * any viewport size because the frame is aspect-locked, but change the crop and
 * these need re-deriving.
 */
const FACE_RIG = {
  eyeLineTop: "19.6%",
  leftEyeX: "45.2%",
  rightEyeX: "54.8%",
  eyeWidth: "5%",
  eyeHeight: "1.4%",
};

function Eyelid({ x, closed }: { x: string; closed: boolean }) {
  return (
    <span
      className="absolute rounded-[50%] bg-[#7a5037] blur-[1.5px] transition-transform duration-[70ms] ease-out"
      style={{
        top: FACE_RIG.eyeLineTop,
        left: x,
        width: FACE_RIG.eyeWidth,
        height: FACE_RIG.eyeHeight,
        transform: `translate(-50%, -50%) scaleY(${closed ? 1 : 0})`,
      }}
    />
  );
}

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
  const blinking = useBlink();
  // Subscribed here rather than in Hero so speaking-state changes re-render only the
  // avatar, not the hero copy and the R3F canvas alongside it.
  const { speaking } = useIntroSpeech();

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md"
      style={{ perspective: 1200 }}
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
        {/* Layer 2: continuous idle float — body sway (CSS animation, auto-tamed by prefers-reduced-motion globally) */}
        <div className="animate-[avatar-float_6.5s_ease-in-out_infinite]">
          {/* Layer 2b: idle breathing — slow scale pulse, own cycle length so it doesn't sync with the float */}
          <div className="animate-[avatar-breathe_4.2s_ease-in-out_infinite]">
            {/* Layer 2c: autonomous head drift — independent of the cursor-reactive tilt on Layer 1 */}
            <div
              className="animate-[avatar-head-drift_9s_ease-in-out_infinite]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Layer 3: one-time cinematic entrance */}
              <motion.div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem]"
                initial={{ opacity: 0, scale: 0.88, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute -inset-px rounded-[2.25rem] bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-700),var(--color-ink-500))]" />
                <div className="glass-panel absolute inset-[1.5px] overflow-hidden rounded-[2.2rem]">
                  {!imgFailed ? (
                    <>
                      <img
                        src={PROFILE.avatarSrc}
                        alt={`${PROFILE.displayName} — ${PROFILE.role}`}
                        className="absolute top-0 h-auto max-w-none"
                        style={PHOTO_CROP}
                        onError={() => setImgFailed(true)}
                      />
                      <Eyelid x={FACE_RIG.leftEyeX} closed={blinking} />
                      <Eyelid x={FACE_RIG.rightEyeX} closed={blinking} />
                    </>
                  ) : (
                    <MonogramFallback />
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] shadow-[inset_0_0_60px_rgba(10,10,10,0.06)]" />

                {/*
                  Speaking state (Phase 6): an aura that breathes while the intro plays.
                  Purely a state readout — deliberately not a control, since the intro
                  exposes no mute/pause/replay UI.
                */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -inset-2 rounded-[2.5rem] transition-opacity duration-700 ease-out",
                    speaking
                      ? "opacity-100 animate-[avatar-speaking_1.7s_ease-in-out_infinite]"
                      : "opacity-0",
                  )}
                  style={{ boxShadow: "0 0 55px 10px rgba(10, 10, 10, 0.14)" }}
                />
              </motion.div>

              {/* Floating decorative badges — entrance last, kept outside the frame so they never cross the face */}
              <motion.div
                className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <Badge tone="neutral" icon={<span className="h-1.5 w-1.5 rounded-full bg-status" />}>
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
      </div>
    </div>
  );
}
