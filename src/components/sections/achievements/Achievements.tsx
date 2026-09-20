import { CloudCog, Megaphone, Trophy } from "lucide-react";
import type { ComponentType } from "react";
import { ACHIEVEMENTS, type Achievement } from "../../../data/achievements";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

const ICONS: Record<Achievement["icon"], ComponentType<{ size?: number; className?: string }>> = {
  award: Trophy,
  lead: CloudCog,
  events: Megaphone,
};

/** Wins and leadership roles — three cards, evenly gridded. */
export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Achievements & Leadership"
          title={
            <>
              Wins and <span className="text-gradient">responsibilities</span>
            </>
          }
        />

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.id}>
                <AnimatedText delay={i * 0.08} className="h-full">
                  <GlassCard interactive padding="lg" className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                        <Icon size={20} className="text-iris-300" />
                      </span>
                      <Badge tone={item.kind === "Achievement" ? "iris" : "neutral"}>
                        {item.kind}
                      </Badge>
                    </div>

                    <h3 className="font-display text-lg leading-snug text-mist-50">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-mist-400">{item.context}</p>
                  </GlassCard>
                </AnimatedText>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
