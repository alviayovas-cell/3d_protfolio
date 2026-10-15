import { Bot, ChartNoAxesColumn, CodeXml, FolderGit2, Mic, Plane, ShieldCheck, Target } from "lucide-react";
import type { ComponentType } from "react";
import type { Project } from "../../../data/projects";
import { useScrollParallax } from "../../../hooks/useScrollParallax";
import { SentinelDiagram } from "./SentinelDiagram";

const ICONS: Record<NonNullable<Project["icon"]>, ComponentType<{ size?: number; className?: string }>> = {
  sentinel: Bot,
  codesphere: CodeXml,
  airindex: Plane,
  zana: Mic,
  obe: Target,
  securewipe: ShieldCheck,
  leettrack: ChartNoAxesColumn,
};

/**
 * A real capture of the running app, in a browser-style frame. Only rendered for
 * projects that actually have one — the frame is honest here precisely because the
 * content inside it is a genuine screenshot, not a mockup.
 */
function ProjectShot({ project, priority = false }: { project: Project; priority?: boolean }) {
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
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
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
  // New projects added from the admin panel may not pick an emblem.
  const Icon = project.icon ? ICONS[project.icon] : FolderGit2;
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

/**
 * The visual for a project, shared by the home-page cards and the project pages: the
 * real screenshot when there is one, Sentinel's system diagram, or a generated emblem.
 * `priority` loads the screenshot immediately — for a page's main image, above the fold.
 */
export function ProjectVisual({ project, index, priority = false }: { project: Project; index: number; priority?: boolean }) {
  if (project.screenshot) return <ProjectShot project={project} priority={priority} />;
  if (project.id === "sentinel") return <SentinelDiagram />;
  return <ProjectEmblem project={project} index={index} />;
}
