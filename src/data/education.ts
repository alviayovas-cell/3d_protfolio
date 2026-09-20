import { PROFILE } from "./profile";

/**
 * Education history, exactly as provided — no grades, GPA, coursework or honours are
 * listed, because none were given and none can be verified from anywhere else.
 *
 * The degree entry reuses `PROFILE.education` so the hero badge, the About section
 * and this timeline can never disagree about the same qualification.
 */
export interface EducationEntry {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  /** True while ongoing — drives the "Present" marker. */
  current: boolean;
}

export const EDUCATION: EducationEntry[] = [
  {
    id: "be-cse",
    qualification: PROFILE.education.degree,
    institution: PROFILE.education.institution,
    period: PROFILE.education.years,
    current: true,
  },
  {
    // Dates and location corrected from the résumé (2021–2022, Mayiladuthurai); the
    // original brief said 2023–2024, which conflicted with the résumé's own timeline.
    id: "diploma-computer-application",
    qualification: "Diploma in Computer Applications",
    institution: "CSC Computer Education, Mayiladuthurai",
    period: "2021–2022",
    current: false,
  },
];
