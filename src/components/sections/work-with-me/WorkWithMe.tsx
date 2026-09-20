import { Clock, MessagesSquare, Wrench } from "lucide-react";
import { AnimatedText } from "../../ui/AnimatedText";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";
import { InquiryForm } from "./InquiryForm";

/**
 * How working together actually goes. Phrased as intent and approach — it describes
 * what Alvia will do, not a track record of clients he hasn't had.
 */
const HOW_IT_WORKS = [
  {
    icon: MessagesSquare,
    title: "Tell me the problem",
    body: "Send over what you're trying to build. If it's still vague, that's fine — the first conversation is for pinning it down.",
  },
  {
    icon: Wrench,
    title: "I scope it honestly",
    body: "You get a straight answer on what's doable, what it takes, and where I'd need help. If it isn't a fit, I'll say so.",
  },
  {
    icon: Clock,
    title: "Build and stay in touch",
    body: "Work in visible increments, with something you can look at early rather than a long silence and a big reveal.",
  },
];

export function WorkWithMe() {
  return (
    <section
      id="work-with-me"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Work With Me"
          title={
            <>
              Got something you <span className="text-gradient">need built?</span>
            </>
          }
          description="Freelance projects, collaborations and partnerships — here's how it works and how to start."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <ul className="list-none space-y-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title}>
                <AnimatedText delay={i * 0.07} className="h-full">
                  <GlassCard padding="lg" className="flex h-full gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                      <step.icon size={20} className="text-iris-300" />
                    </span>
                    <div>
                      <h3 className="font-display text-base text-mist-50">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{step.body}</p>
                    </div>
                  </GlassCard>
                </AnimatedText>
              </li>
            ))}
          </ul>

          <AnimatedText delay={0.1}>
            <GlassCard padding="lg" className="lg:p-8">
              <h3 className="font-display text-xl text-mist-50">Start a project</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">
                Fill this in and it'll open your email app with everything filled out.
              </p>
              <div className="mt-6">
                <InquiryForm />
              </div>
            </GlassCard>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
