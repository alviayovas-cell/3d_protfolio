import skills from "../content/skills.json";
import type { SkillGroup } from "../content/schema";

export type { SkillGroup };

/** Skill groups, from the résumé as the authoritative list. Edited in `src/content/skills.json`. */
export const SKILL_GROUPS = skills.items as SkillGroup[];
