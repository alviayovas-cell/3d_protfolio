/**
 * What Alvia is open to. These are statements of intent, not claims of past work —
 * nothing here asserts experience that isn't documented elsewhere on the site.
 */
export interface Opportunity {
  id: string;
  /** Matches an icon in the section's ICONS map. */
  icon: "freelance" | "internship" | "collaboration" | "hackathon" | "partnership";
  title: string;
  description: string;
}

export const LOOKING_FOR: Opportunity[] = [
  {
    id: "freelance",
    icon: "freelance",
    title: "Freelance",
    description:
      "Web apps, AI features and internal tools built end to end, on a per-project basis.",
  },
  {
    id: "internships",
    icon: "internship",
    title: "Internships",
    description:
      "Software, AI/ML or full-stack internships where I can contribute to real work and learn from a team.",
  },
  {
    id: "collaborations",
    icon: "collaboration",
    title: "Collaborations",
    description:
      "Teaming up with other developers and designers on side projects worth actually shipping.",
  },
  {
    id: "hackathons",
    icon: "hackathon",
    title: "Hackathons",
    description:
      "Joining teams for hackathons — fast prototyping, tight deadlines, problems worth solving.",
  },
  {
    id: "partnerships",
    icon: "partnership",
    title: "Project Partnerships",
    description:
      "Longer-term partnerships on products that need an AI or full-stack build behind them.",
  },
];
