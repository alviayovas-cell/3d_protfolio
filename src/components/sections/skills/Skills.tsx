import {
  Brain,
  CircuitBoard,
  Cloud,
  CodeXml,
  Database,
  LayoutDashboard,
  Server,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";
import { SKILL_GROUPS, type SkillGroup } from "../../../data/skills";
import { AnimatedText } from "../../ui/AnimatedText";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

const ICONS: Record<SkillGroup["icon"], ComponentType<{ size?: number; className?: string }>> = {
  languages: CodeXml,
  frontend: LayoutDashboard,
  backend: Server,
  databases: Database,
  ai: Brain,
  embedded: CircuitBoard,
  tools: Wrench,
  cloud: Cloud,
};

/** Eight skill groups, sourced from the résumé — see `src/data/skills.ts` for provenance. */
export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The stack I <span className="text-gradient">actually use</span>
            </>
          }
          description="Grouped by where they sit in a project — from the language up to the deploy."
        />

        {/* 6-col grid, each card spanning 2 → 3 per row. Eight groups leave 2 on the
            last row, so the 7th starts at col 2 and the pair sits centred. */}
        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = ICONS[group.icon];
            // 3 + 3 + 2: shifting the 7th to col 2 centres the trailing pair.
            const startsLastRow = i === SKILL_GROUPS.length - 2;
            return (
              <li
                key={group.id}
                className={startsLastRow ? "lg:col-span-2 lg:col-start-2" : "lg:col-span-2"}
              >
                <AnimatedText delay={(i % 3) * 0.07} className="h-full">
                  <GlassCard interactive padding="lg" className="flex h-full flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                        <Icon size={18} className="text-iris-300" />
                      </span>
                      <h3 className="font-display text-base text-mist-50">{group.title}</h3>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-mist-200"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
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
