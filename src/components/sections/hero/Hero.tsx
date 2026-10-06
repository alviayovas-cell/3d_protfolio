import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { PROFILE } from "../../../data/profile";
import { useParallax } from "../../../hooks/useParallax";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { AnimatedText } from "../../ui/AnimatedText";
import { AvatarStage } from "./AvatarStage";
import { HeroBackdrop } from "./HeroBackdrop";

/** Cinematic full-bleed hero: dark-to-lit entrance, editorial name reveal, avatar as the visual anchor. */
export function Hero() {
  const parallax = useParallax({ strength: 18 });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-ink-950 pt-20 pb-16 sm:pb-20 lg:pb-12"
    >
      <HeroBackdrop parallax={parallax} />

      {/* Dark-screen entrance veil — fades away to reveal the lit scene */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-ink-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      <Container className="relative z-10">
        {/*
          Mobile stacks Text → Avatar → CTA (per the mobile-experience spec).
          Desktop arranges Text+CTA as a left column beside the Avatar via
          named grid areas, so the CTA can sit visually with the text on
          desktop while still trailing the avatar on mobile.
        */}
        <div
          className="grid gap-12 [grid-template-areas:'text'_'avatar'_'cta'] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-x-12 lg:gap-y-8 lg:[grid-template-areas:'text_avatar'_'cta_avatar']"
        >
          {/* Text block */}
          <div className="[grid-area:text] text-center lg:text-left">
            <AnimatedText
              as="p"
              mode="block"
              delay={0.7}
              className="font-display text-sm font-medium uppercase tracking-[0.35em] text-mist-400"
            >
              {PROFILE.greeting}
            </AnimatedText>

            {/*
              Space Grotesk ships weights 300–700 only, so `font-extrabold` (800) would
              synthesise or silently fall back — 700 is the heaviest honest weight for
              this family. Size lands at 64px on desktop.
            */}
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-[-0.035em] text-mist-50 sm:text-6xl lg:text-[4rem]">
              {/* The gradient used to separate the two names; in monochrome they need a gap. */}
              <AnimatedText as="span" mode="words" delay={0.85} className="block mr-[0.22em]">
                {PROFILE.firstName.toUpperCase()}
              </AnimatedText>
              <AnimatedText as="span" mode="words" delay={0.95} className="block text-gradient">
                {PROFILE.lastName.toUpperCase()}
              </AnimatedText>
            </h1>

            <AnimatedText
              as="p"
              mode="block"
              delay={1.3}
              className="mt-6 font-display text-lg font-medium uppercase tracking-[0.18em] text-iris-300 sm:text-xl"
            >
              {PROFILE.role}
            </AnimatedText>

            <AnimatedText
              as="p"
              mode="block"
              delay={1.5}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg lg:mx-0"
            >
              {PROFILE.tagline}
            </AnimatedText>
          </div>

          {/* Avatar block — spans both rows on desktop so it sits beside text + CTA together */}
          <div className="[grid-area:avatar] lg:self-center">
            <AvatarStage parallax={parallax} />
          </div>

          {/* CTA block */}
          <motion.div
            className="[grid-area:cta] flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Equal widths so the pair reads as one centred unit rather than two ragged pills. */}
            <Button href="#projects" variant="primary" size="lg" icon={<ArrowRight size={18} />} className="w-full max-w-xs sm:w-60">
              View My Work
            </Button>
            <Button href="#contact" variant="secondary" size="lg" icon={<Mail size={18} />} className="w-full max-w-xs sm:w-60">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
