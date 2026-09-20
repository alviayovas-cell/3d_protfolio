import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "../../../data/experience";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/** Roles and responsibilities as a vertical timeline, most recent first. */
export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Where I've <span className="text-gradient">taken the lead</span>
            </>
          }
          description="Project and club roles — what I was responsible for, and what came of it."
        />

        <ol className="relative mt-14 list-none">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[11px] top-3 w-px bg-gradient-to-b from-iris-400/40 via-white/10 to-transparent"
          />

          {EXPERIENCE.map((entry, i) => (
            <li key={entry.id} className="relative pb-6 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-3 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-iris-400/30 bg-ink-900"
              >
                <span className="h-2 w-2 rounded-full bg-iris-400" />
              </span>

              <AnimatedText delay={i * 0.07}>
                <GlassCard interactive padding="lg">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                      <Briefcase size={18} className="text-iris-300" />
                    </span>
                    {entry.period && (
                      <span className="font-display text-sm tracking-[0.12em] text-mist-400">
                        {entry.period}
                      </span>
                    )}
                    {entry.current && <Badge tone="iris">Current</Badge>}
                  </div>

                  <h3 className="mt-4 font-display text-xl text-mist-50 sm:text-2xl">
                    {entry.role}
                  </h3>
                  <p className="mt-1.5 text-sm text-mist-200">{entry.organisation}</p>
                  {entry.detail && (
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mist-600">
                      {entry.detail}
                    </p>
                  )}

                  <ul className="mt-5 list-none space-y-2.5">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-mist-400">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-iris-400/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </AnimatedText>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
