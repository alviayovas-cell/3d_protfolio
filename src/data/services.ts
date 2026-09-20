/**
 * What Alvia offers to build. Descriptions deliberately name *capabilities*, not
 * specific vendors or tools — the concrete stack belongs in Phase 13 (Skills), where
 * it can be listed accurately rather than implied here.
 */
export interface Service {
  id: string;
  /** Matches an icon in the section's ICONS map. */
  icon: "fullstack" | "ai" | "backend" | "tools" | "data" | "cloud";
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: "full-stack",
    icon: "fullstack",
    title: "Full Stack Web Development",
    description:
      "Complete web applications, front to back — interfaces, the APIs behind them, and the data layer underneath.",
  },
  {
    id: "ai-applications",
    icon: "ai",
    title: "AI Applications",
    description:
      "Products built around AI: assistants, natural-language interfaces, and workflows that use models to do real work.",
  },
  {
    id: "backend",
    icon: "backend",
    title: "Backend & API Development",
    description:
      "APIs, server-side logic, authentication and database design — built to be maintained, not just demoed.",
  },
  {
    id: "developer-tools",
    icon: "tools",
    title: "Developer Tools",
    description:
      "Internal tooling that removes repetitive work: dashboards, generators and automation around a team's own process.",
  },
  {
    id: "data-analytics",
    icon: "data",
    title: "Data & Analytics",
    description:
      "Turning raw data into something usable — processing pipelines and views that answer an actual question.",
  },
  {
    id: "cloud-deployment",
    icon: "cloud",
    title: "Cloud & Deployment",
    description:
      "Getting a project live and keeping it there: environments, deployment pipelines and hosting setup.",
  },
];
