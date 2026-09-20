import { BadgeCheck, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../../../data/certifications";
import { AnimatedText } from "../../ui/AnimatedText";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/** Training and certifications. Only what the résumé documents — nothing fabricated. */
export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Training I've <span className="text-gradient">completed</span>
            </>
          }
        />

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert, i) => (
            <li key={cert.id}>
              <AnimatedText delay={i * 0.08} className="h-full">
                <GlassCard interactive padding="lg" className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                      <BadgeCheck size={20} className="text-iris-300" />
                    </span>
                    <span className="font-display text-xs tracking-[0.12em] text-mist-400">
                      {cert.period}
                    </span>
                  </div>

                  <h3 className="font-display text-lg leading-snug text-mist-50">{cert.title}</h3>
                  <p className="text-sm text-mist-200">{cert.issuer}</p>
                  <p className="text-sm leading-relaxed text-mist-400">{cert.summary}</p>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-iris-300 underline decoration-iris-400/40 underline-offset-4 hover:decoration-iris-400"
                    >
                      Verify credential
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  )}
                </GlassCard>
              </AnimatedText>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
