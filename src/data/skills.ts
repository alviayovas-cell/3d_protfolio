/**
 * Skills, taken from Alvia's résumé (`public/resume.pdf`) as the authoritative list,
 * cross-checked against the public repos under github.com/alviayovas-cell.
 *
 * The résumé supersedes anything previously inferred from repository contents — an
 * earlier version of this file guessed at the stack from dependency manifests and got
 * some of it wrong (it listed C, which the résumé doesn't claim, and missed the whole
 * embedded/IoT side). Where a tool appears only in the repos and not the résumé, the
 * `source` note says so.
 */
export interface SkillGroup {
  id: string;
  /** Matches an icon in the Skills section's ICONS map. */
  icon: "languages" | "frontend" | "backend" | "databases" | "ai" | "embedded" | "tools" | "cloud";
  title: string;
  /** Where these came from — kept in code as a provenance note, not rendered. */
  source: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    icon: "languages",
    title: "Languages",
    source: "Résumé — Languages. Matches repo language stats (TypeScript/Python dominant).",
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    icon: "frontend",
    title: "Frontend",
    source: "Résumé — Frontend. Next.js/shadcn confirmed in secure_data_wiping; R3F in this portfolio.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive UI",
      "Three.js / R3F",
    ],
  },
  {
    id: "backend",
    icon: "backend",
    title: "Backend & APIs",
    source: "Résumé — Backend & APIs. FastAPI confirmed in airindex-india and zana-ai requirements.",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "MQTT", "JWT auth"],
  },
  {
    id: "databases",
    icon: "databases",
    title: "Databases & Cloud",
    source: "Résumé — Databases & Cloud. MongoDB via motor/pymongo; Firebase in secure_data_wiping.",
    skills: ["MongoDB", "MySQL", "Firebase", "AWS"],
  },
  {
    id: "ai-data",
    icon: "ai",
    title: "Applied AI / ML",
    source: "Résumé — Applied AI/ML and the Sentinel vision pipeline; anthropic SDK in airindex-india.",
    skills: [
      "TensorFlow Lite",
      "YOLOv8",
      "MobileNetV2",
      "Anthropic Claude API",
      "Speech recognition",
    ],
  },
  {
    id: "embedded",
    icon: "embedded",
    title: "Embedded / IoT",
    source: "Résumé — Embedded/IoT, used on the Sentinel robotics project.",
    skills: ["ESP32", "Arduino", "Raspberry Pi", "Jetson Nano"],
  },
  {
    id: "tools",
    icon: "tools",
    title: "Tools",
    source: "Résumé — Tools. Docker and pytest additionally observed in the repos.",
    skills: ["Git & GitHub", "VS Code", "Docker", "pytest", "Cursor / Claude Code"],
  },
  {
    id: "deployment",
    icon: "cloud",
    title: "Deployment",
    source: "Repo evidence: live Vercel deployments; 'fits Render's free plan' in airindex requirements.",
    skills: ["Vercel", "Render", "Docker deployment"],
  },
];
