import education from "../content/education.json";
import type { EducationEntry } from "../content/schema";

export type { EducationEntry };

/** Education history, exactly as provided — no grades or coursework. Edited in `src/content/education.json`. */
export const EDUCATION: EducationEntry[] = education.items;
