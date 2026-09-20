import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useWebGLSupport } from "../../../hooks/useWebGLSupport";

/*
  Phase 25: three.js + R3F are ~900kB of the bundle and are only ever needed by this
  backdrop — and not at all without WebGL, or under reduced motion. Loading them
  lazily keeps them out of the initial payload entirely for those visitors, and off
  the critical path for everyone else.
*/
const HeroScene = lazy(() =>
  import("../../three/HeroScene").then((m) => ({ default: m.HeroScene })),
);

interface HeroBackdropProps {
  parallax: { x: number; y: number };
}

interface Particle {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  /** Only rendered at sm+ — keeps the mobile particle count low. */
  desktopOnly: boolean;
}

const PARTICLE_COUNT = 28;

/** Generated once at module load — layout is decorative and never needs to change across renders or mounts. */
const PARTICLES: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 6,
  opacity: 0.3 + Math.random() * 0.5,
  desktopOnly: i >= 14,
}));

/**
 * Cinematic layered background: soft violet/blue lighting blooms (CSS, always
 * on) plus a drifting particle/depth layer. That layer is a real R3F scene
 * when WebGL is available, and falls back to lightweight CSS dots otherwise —
 * either way the visual language is the same. Motion is skipped entirely
 * under prefers-reduced-motion.
 */
export function HeroBackdrop({ parallax }: HeroBackdropProps) {
  const reducedMotion = usePrefersReducedMotion();
  const webglSupported = useWebGLSupport();
  /*
    Phase 24: phones and small tablets get the CSS particle layer instead of the R3F
    scene. It isn't only about frame rate — skipping it also means never downloading
    the 884kB three.js chunk on a mobile connection. The lighting blooms, vignette and
    drifting particles all still render, so the hero keeps its look.
  */
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");
  const showParticles = !reducedMotion;
  const useThreeScene = webglSupported && !isSmallScreen;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Lighting blooms */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-iris-600/25 blur-[110px]"
        style={
          reducedMotion
            ? undefined
            : { transform: `translate3d(${parallax.x * -0.6}px, ${parallax.y * -0.6}px, 0)` }
        }
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-azure-600/20 blur-[120px]"
        style={
          reducedMotion
            ? undefined
            : { transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)` }
        }
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-iris-500/10 blur-[130px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4 }}
      />

      {/* Particles + floating depth accents — 3D when WebGL is available, CSS dots otherwise */}
      {showParticles &&
        (useThreeScene ? (
          // No fallback: the CSS blooms above already carry the scene until it loads.
          <Suspense fallback={null}>
            <HeroScene parallax={parallax} />
          </Suspense>
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className={p.desktopOnly ? "particle hidden sm:block" : "particle"}
                style={
                  {
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                    "--particle-duration": `${p.duration}s`,
                    "--particle-delay": `${p.delay}s`,
                    "--particle-opacity": p.opacity,
                  } as React.CSSProperties
                }
              />
            ))}
          </motion.div>
        ))}

      {/* Subtle vignette so foreground text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
    </div>
  );
}
