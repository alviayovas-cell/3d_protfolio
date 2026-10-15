import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import { PROJECTS } from "../../../data/projects";
import { cn } from "../../../lib/cn";
import { projectHref } from "../../../lib/routes";
import { AnimatedText } from "../../ui/AnimatedText";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";
import { ProjectVisual } from "./ProjectVisual";

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
                    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-7 lg:grid-cols-2 lg:gap-12">
                      {/* Visual trails the copy on mobile so the text leads every card. */}
                      <div className={cn("order-2", flipped ? "lg:order-1" : "lg:order-2")}>
                        <ProjectVisual project={project} index={i} />
                      </div>

                      <div className={cn("order-1", flipped ? "lg:order-2" : "lg:order-1")}>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-sm font-semibold tabular-nums text-iris-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <Badge tone="neutral">{project.category}</Badge>
                        </div>

                        <h3 className="mt-4 font-display text-2xl text-mist-50 sm:text-3xl">
                          <a href={projectHref(project.id)} className="transition-colors hover:text-mist-200">
                            {project.name}
                          </a>
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

                        {!!project.stack?.length && (
                          <p className="mt-4 font-display text-[0.7rem] uppercase tracking-[0.18em] text-mist-600">
                            {project.stack.join(" · ")}
                          </p>
                        )}

                        {/* External links only where a real, resolved URL exists. */}
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
                          <Button
                            href={projectHref(project.id)}
                            variant="ghost"
                            size="md"
                            icon={<ArrowRight size={16} />}
                          >
                            Project details<span className="sr-only"> — {project.name}</span>
                          </Button>
                        </div>
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
