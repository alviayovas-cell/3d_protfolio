import achievements from "../content/achievements.json";
import type { Achievement } from "../content/schema";

export type { Achievement };

/** Achievements and leadership roles, exactly as provided. Edited in `src/content/achievements.json`. */
export const ACHIEVEMENTS = achievements.items as Achievement[];
