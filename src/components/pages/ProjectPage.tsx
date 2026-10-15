import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FolderGit2, Mail } from "lucide-react";
import { useEffect } from "react";
import { PROFILE } from "../../data/profile";
import { PROJECTS } from "../../data/projects";
import { projectHref, sectionHref } from "../../lib/routes";
import { AnimatedText } from "../ui/AnimatedText";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { GlassCard } from "../ui/GlassCard";
import { ProjectVisual } from "../sections/projects/ProjectVisual";
import { NotFound } from "./NotFound";

/**
 * A project's own page at /projects/<id>. Everything comes from src/content/projects.json:
 * the card facts (summary, highlights, stack, links, screenshot) plus the optional
 * long-form fields (overview, role, period, team) — each block renders only when it has
 * content, so a project with just the basics still gets a complete, honest page.
 *
 * The HTML for each page, with its own title, description and structured data, is
 * prerendered at build time by scripts/content-plugin.ts; this component takes over
 * once the app loads.
 */
export function ProjectPage({ id }: { id: string }) {
  const index = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[index];

  // The prerendered HTML already has the right title; this keeps dev (and any stale
  // cache) honest too.
  useEffect(() => {
    if (project) document.title = `${project.name} — ${project.category} | ${PROFILE.displayName}`;
  }, [project]);

  if (!project) return <NotFound />;

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const facts = [
    ["Role", project.role],
    ["When", project.period],
    ["Team", project.team],
  ].filter((f): f is [string, string] => !!f[1]);

  return (
    <article className="relative pb-24 pt-28 sm:pt-32">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] text-mist-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" className="transition-colors hover:text-mist-200">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href={sectionHref("projects")} className="transition-colors hover:text-mist-200">
                Projects
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-mist-400">
              {project.name}
            </li>
          </ol>
        </nav>

        <header className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-semibold tabular-nums text-iris-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Badge tone="neutral">{project.category}</Badge>
            </div>

            <AnimatedText
              as="h1"
              mode="words"
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-mist-50 sm:text-5xl lg:text-6xl"
            >
              {project.name}
            </AnimatedText>

            <p className="mt-5 text-base leading-relaxed text-mist-400 sm:text-lg">{project.summary}</p>

            {facts.length > 0 && (
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-display text-[0.7rem] uppercase tracking-[0.18em] text-mist-600">{label}</dt>
                    <dd className="mt-1 text-sm text-mist-100">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="primary"
                    size="lg"
                    icon={<ArrowUpRight size={18} />}
                  >
                    Visit live site
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    variant="secondary"
                    size="lg"
                    icon={<FolderGit2 size={18} />}
                    iconPosition="left"
                  >
                    View source
                  </Button>
                )}
              </div>
            )}
          </div>

          <div>
            <ProjectVisual project={project} index={index} priority />
          </div>
        </header>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            {!!project.overview?.length && (
              <GlassCard padding="lg">
                <h2 className="font-display text-xl text-mist-50 sm:text-2xl">Overview</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-mist-400">
                  {project.overview.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </GlassCard>
            )}

            <GlassCard padding="lg">
              <h2 className="font-display text-xl text-mist-50 sm:text-2xl">What it does</h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base text-mist-200">
                    <Check size={18} className="mt-1 shrink-0 text-iris-400" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="space-y-6">
            {!!project.stack?.length && (
              <GlassCard padding="lg">
                <h2 className="font-display text-xl text-mist-50 sm:text-2xl">Tech stack</h2>
                <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-mist-200">
                      {tech}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            <GlassCard padding="lg">
              <h2 className="font-display text-xl text-mist-50 sm:text-2xl">Want something like this?</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">
                I take on freelance projects, collaborations and internships.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={sectionHref("work-with-me")} variant="primary" size="md" icon={<ArrowRight size={16} />}>
                  Start a project
                </Button>
                <Button href={`mailto:${PROFILE.email}`} variant="secondary" size="md" icon={<Mail size={16} />} iconPosition="left">
                  Email me
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>

        {PROJECTS.length > 1 && (
          <nav aria-label="More projects" className="mt-16 grid gap-4 sm:grid-cols-2">
            <a href={projectHref(prev.id)} className="group">
              <GlassCard interactive className="h-full">
                <span className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-mist-600">
                  <ArrowLeft size={14} aria-hidden="true" /> Previous project
                </span>
                <span className="mt-2 block font-display text-xl text-mist-50">{prev.name}</span>
                <span className="mt-1 block text-sm text-mist-400">{prev.category}</span>
              </GlassCard>
            </a>
            <a href={projectHref(next.id)} className="group text-right">
              <GlassCard interactive className="h-full">
                <span className="flex items-center justify-end gap-2 font-display text-xs uppercase tracking-[0.18em] text-mist-600">
                  Next project <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className="mt-2 block font-display text-xl text-mist-50">{next.name}</span>
                <span className="mt-1 block text-sm text-mist-400">{next.category}</span>
              </GlassCard>
            </a>
          </nav>
        )}

        <p className="mt-16 text-center text-xs text-mist-600">
          <a href={sectionHref("projects")} className="transition-colors hover:text-mist-200">
            ← All projects
          </a>
          <span className="mx-3">·</span>© {new Date().getFullYear()} {PROFILE.fullName}
        </p>
      </Container>
    </article>
  );
}
