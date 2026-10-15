import experience from "../content/experience.json";
import type { ExperienceEntry } from "../content/schema";

export type { ExperienceEntry };

/**
 * Roles and responsibilities, verbatim from the résumé — none are salaried employment,
 * and each names its organisation so the nature of the role is clear. Edited in
 * `src/content/experience.json`.
 */
export const EXPERIENCE: ExperienceEntry[] = experience.items;
