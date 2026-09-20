/**
 * Achievements and leadership roles, exactly as provided in the brief.
 *
 * No years, team sizes, problem statements, event names or responsibilities are
 * listed beyond what was given — those weren't supplied and can't be verified. The
 * only addition is expanding "SIH" to its full name, which is a fact about the
 * acronym rather than a claim about the achievement.
 */
export interface Achievement {
  id: string;
  /** Matches an icon in the section's ICONS map. */
  icon: "award" | "lead" | "events";
  /** Achievement vs. leadership — derived from what each item is, not embellishment. */
  kind: "Achievement" | "Leadership";
  title: string;
  context: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "sih",
    icon: "award",
    kind: "Achievement",
    title: "2× SIH Internal Winner",
    context: "Smart India Hackathon — winner of the internal round, twice.",
  },
  {
    id: "aws-lead",
    icon: "lead",
    kind: "Leadership",
    title: "AWS Technical Lead",
    context: "Technical lead for the AWS club at college.",
  },
  {
    id: "event-coordinator",
    icon: "events",
    kind: "Leadership",
    title: "Technical Event Coordinator & Participant",
    context: "Coordinating technical events, and taking part in them.",
  },
];
