import projects from "../content/projects.json";
import type { Project } from "../content/schema";

export type { Project };

/**
 * Project facts for the Featured Projects section, edited in `src/content/projects.json`.
 * Summaries, stacks and URLs come from the public repos under github.com/alviayovas-cell
 * and the résumé; screenshots are real captures of the running apps, never mockups.
 * Array order is display order.
 */
export const PROJECTS = projects.items as Project[];
