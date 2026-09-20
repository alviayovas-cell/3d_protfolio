import { GraduationCap } from "lucide-react";
import { EDUCATION } from "../../../data/education";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/** Education as a vertical timeline, most recent first. */
export function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Where I'm <span className="text-gradient">studying</span>
            </>
          }
        />

        <ol className="relative mt-14 list-none">
          {/* The rail sits behind the markers; inset so it lines up with their centres. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[11px] top-3 w-px bg-gradient-to-b from-iris-400/40 via-white/10 to-transparent"
          />

          {EDUCATION.map((entry, i) => (
            <li key={entry.id} className="relative pl-10 pb-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-3 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-iris-400/30 bg-ink-900"
              >
                <span className="h-2 w-2 rounded-full bg-iris-400" />
              </span>

              <AnimatedText delay={i * 0.08}>
                <GlassCard interactive padding="lg">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                      <GraduationCap size={18} className="text-iris-300" />
                    </span>
                    <span className="font-display text-sm tracking-[0.12em] text-mist-400">
                      {entry.period}
                    </span>
                    {entry.current && <Badge tone="iris">Present</Badge>}
                  </div>

                  <h3 className="mt-4 font-display text-xl text-mist-50 sm:text-2xl">
                    {entry.qualification}
                  </h3>
                  <p className="mt-1.5 text-sm text-mist-400">{entry.institution}</p>
                </GlassCard>
              </AnimatedText>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
