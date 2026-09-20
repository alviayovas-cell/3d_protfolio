import { ArrowUpRight, Bot, CodeXml, FolderGit2, Mic, Plane, ShieldCheck, Target } from "lucide-react";
import type { ComponentType } from "react";
import { PROJECTS, type Project } from "../../../data/projects";
import { useScrollParallax } from "../../../hooks/useScrollParallax";
import { cn } from "../../../lib/cn";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";
import { SentinelDiagram } from "./SentinelDiagram";

const ICONS: Record<Project["icon"], ComponentType<{ size?: number; className?: string }>> = {
  sentinel: Bot,
  codesphere: CodeXml,
  airindex: Plane,
  zana: Mic,
  obe: Target,
  securewipe: ShieldCheck,
};

/**
 * A real capture of the running app, in a browser-style frame. Only rendered for
 * projects that actually have one — the frame is honest here precisely because the
 * content inside it is a genuine screenshot, not a mockup.
 */
function ProjectShot({ project }: { project: Project }) {
  const { ref, offset } = useScrollParallax<HTMLDivElement>({ strength: 18 });
  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-950 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]"
    >
      {/* Chrome bar — signals "this is an app screenshot" without faking a URL. */}
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-white/[0.06] bg-ink-900/80 px-3.5 py-2.5"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.07]" />
      </div>
      <div className="overflow-hidden">
        {/*
          The captures are full-window, so each one includes the real browser's URL
          bar. Nudging the image up hides it — otherwise it sits inside the frame's own
          chrome bar and reads as a doubled window. Percentage margins resolve against
          the container's *width*, so ~3.2% ≈ the 60px of chrome in a ~1920px capture.
        */}
        <img
          src={project.screenshot}
          alt={project.screenshotAlt ?? `${project.name} interface`}
          loading="lazy"
          decoding="async"
          width={1920}
          height={960}
          className="block w-full transition-transform duration-500 ease-out"
          style={{
            marginTop: "-3.2%",
            transform: `translate3d(0, ${offset * 0.35}px, 0) scale(1.04)`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Fallback for projects with no screenshot: a generated emblem, deliberately not a
 * mocked-up browser frame — that would imply a capture that doesn't exist.
 */
function ProjectEmblem({ project, index }: { project: Project; index: number }) {
  const Icon = ICONS[project.icon];
  // Phase 23: the emblem drifts against the scroll, giving each card depth as it passes.
  const { ref, offset } = useScrollParallax<HTMLDivElement>({ strength: 26 });
  return (
    /*
      Kept deliberately short (16/9, not 4/3): a tall, near-empty panel reads as a
      screenshot that failed to load. A dot grid and an oversized index give it enough
      texture to look like a designed title card rather than a gap.
    */
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex aspect-[16/9] items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 lg:aspect-[16/10]"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute -left-10 -top-12 h-44 w-44 rounded-full bg-iris-600/25 blur-3xl" />
      <div className="absolute -bottom-14 -right-10 h-48 w-48 rounded-full bg-azure-600/20 blur-3xl" />

      <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-semibold leading-none tabular-nums text-white/[0.05]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* The inner group carries the parallax so the frame itself stays put. */}
      <div
        className="relative flex items-center gap-4"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-iris-400/25 bg-iris-500/10 backdrop-blur-sm">
          <Icon size={26} className="text-iris-300" />
        </span>
        <span className="font-display text-lg font-semibold leading-tight text-mist-200/90">
          {project.name}
        </span>
      </div>
    </div>
  );
}

/** Case-study style presentation of the projects, alternating sides for editorial rhythm. */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Things I've <span className="text-gradient">built</span>
            </>
          }
          description="Robotics, applied AI, full-stack platforms and security tooling."
        />

        <ol className="mt-14 list-none space-y-6">
          {PROJECTS.map((project, i) => {
            const flipped = i % 2 === 1;
            return (
              <li key={project.id}>
                <AnimatedText>
                  <GlassCard padding="lg" className="lg:p-9">
                    <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-12">
                      {/* Visual trails the copy on mobile so the text leads every card. */}
                      <div className={cn("order-2", flipped ? "lg:order-1" : "lg:order-2")}>
                        {project.screenshot ? (
                          <ProjectShot project={project} />
                        ) : project.id === "sentinel" ? (
                          <SentinelDiagram />
                        ) : (
                          <ProjectEmblem project={project} index={i} />
                        )}
                      </div>

                      <div className={cn("order-1", flipped ? "lg:order-2" : "lg:order-1")}>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-semibold tabular-nums text-iris-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <Badge tone="neutral">{project.category}</Badge>
                        </div>

                        <h3 className="mt-4 font-display text-2xl text-mist-50 sm:text-3xl">
                          {project.name}
                        </h3>

                        <p className="mt-3 text-base leading-relaxed text-mist-400">
                          {project.summary}
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-2 text-xs">
                          {project.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-mist-200"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        {project.stack && (
                          <p className="mt-4 font-display text-[0.7rem] uppercase tracking-[0.18em] text-mist-600">
                            {project.stack.join(" · ")}
                          </p>
                        )}

                        {/* Only rendered where a real, resolved URL exists — see projects.ts. */}
                        {(project.liveUrl || project.repoUrl) && (
                          <div className="mt-6 flex flex-wrap items-center gap-3">
                            {project.liveUrl && (
                              <Button
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                variant="primary"
                                size="md"
                                icon={<ArrowUpRight size={16} />}
                              >
                                <span className="sr-only">{project.name} — </span>Live site
                              </Button>
                            )}
                            {project.repoUrl && (
                              <Button
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                variant="secondary"
                                size="md"
                                icon={<FolderGit2 size={16} />}
                                iconPosition="left"
                              >
                                <span className="sr-only">{project.name} — </span>Source
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </AnimatedText>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
