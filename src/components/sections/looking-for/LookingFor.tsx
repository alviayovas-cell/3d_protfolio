import { Briefcase, GraduationCap, Handshake, Rocket, Users } from "lucide-react";
import type { ComponentType } from "react";
import { LOOKING_FOR, type Opportunity } from "../../../data/lookingFor";
import { AnimatedText } from "../../ui/AnimatedText";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

const ICONS: Record<Opportunity["icon"], ComponentType<{ size?: number; className?: string }>> = {
  freelance: Briefcase,
  internship: GraduationCap,
  collaboration: Users,
  hackathon: Rocket,
  partnership: Handshake,
};

/** What Alvia is open to — sits between About and Services, turning "who I am" into "what's next". */
export function LookingFor() {
  return (
    <section
      id="looking-for"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="What I'm Looking For"
          title={
            <>
              Open to <span className="text-gradient">what's next</span>
            </>
          }
          description="Roles, teams and projects I'd like to be part of right now."
        />

        {/* 3 + 2 on large screens — five cards don't divide evenly, so the last row centres. */}
        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {LOOKING_FOR.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.id}
                className={
                  i < 3
                    ? "lg:col-span-2"
                    : "lg:col-span-2 lg:[&:nth-child(4)]:col-start-2"
                }
              >
                <AnimatedText delay={i * 0.06} className="h-full">
                  <GlassCard interactive padding="lg" className="flex h-full flex-col gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                      <Icon size={20} className="text-iris-300" />
                    </span>
                    <h3 className="font-display text-lg text-mist-50">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-mist-400">{item.description}</p>
                  </GlassCard>
                </AnimatedText>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <p className="text-sm text-mist-400">
            If any of these sound like a fit, I'd be glad to hear about it.
          </p>
          <Button href="#contact" variant="secondary" size="md">
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
