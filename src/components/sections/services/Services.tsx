import { Blocks, Brain, ChartColumn, Cloud, Server, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { SERVICES, type Service } from "../../../data/services";
import { AnimatedText } from "../../ui/AnimatedText";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

const ICONS: Record<Service["icon"], ComponentType<{ size?: number; className?: string }>> = {
  fullstack: Blocks,
  ai: Brain,
  backend: Server,
  tools: Wrench,
  data: ChartColumn,
  cloud: Cloud,
};

/** What Alvia can build for people — six capabilities, evenly gridded 1 / 2 / 3 up. */
export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I can <span className="text-gradient">build for you</span>
            </>
          }
          description="The kinds of work I take on, whether it's a full product or one piece of it."
        />

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <li key={service.id}>
                {/* Stagger resets per row so cards don't cascade too slowly down a 3-wide grid. */}
                <AnimatedText delay={(i % 3) * 0.08} className="h-full">
                  <GlassCard interactive padding="lg" className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                        <Icon size={20} className="text-iris-300" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-sm font-semibold tabular-nums text-mist-800"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg leading-snug text-mist-50">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-mist-400">{service.description}</p>
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
