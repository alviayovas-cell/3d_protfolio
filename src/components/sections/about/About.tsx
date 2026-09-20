import { GraduationCap, MapPin } from "lucide-react";
import { ABOUT } from "../../../data/about";
import { PROFILE } from "../../../data/profile";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/** Bio, quick facts, and highlight stats — the "who I am" read right after the hero. */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Building with <span className="text-gradient">purpose</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Bio + quick facts */}
          <div>
            <div className="space-y-5">
              {ABOUT.bio.map((paragraph, i) => (
                <AnimatedText
                  key={paragraph.slice(0, 16)}
                  as="p"
                  delay={i * 0.1}
                  className="text-base leading-relaxed text-mist-400 sm:text-lg"
                >
                  {paragraph}
                </AnimatedText>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GlassCard padding="sm" className="flex items-center gap-3">
                <GraduationCap size={18} className="shrink-0 text-iris-400" />
                <span className="text-sm text-mist-200">
                  {PROFILE.education.degree}
                  <span className="block text-xs text-mist-600">
                    {PROFILE.education.institution} &middot; {PROFILE.education.years}
                  </span>
                </span>
              </GlassCard>
              <GlassCard padding="sm" className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-iris-400" />
                <span className="text-sm text-mist-200">{PROFILE.location}</span>
              </GlassCard>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {ABOUT.focusAreas.map((area) => (
                <Badge key={area} tone="neutral">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Highlight stats */}
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            {ABOUT.stats.map((stat) => (
              <GlassCard key={stat.label} interactive className="text-center lg:text-left">
                <p className="font-display text-3xl font-semibold text-gradient sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mist-600 sm:text-sm">
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
