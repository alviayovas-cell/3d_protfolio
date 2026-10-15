import resume from "../content/resume.json";
import type { Resume } from "../content/schema";

/** Résumé asset, edited in `src/content/resume.json`. Set `available` to false to fall back to the "request by email" CTA. */
export const RESUME: Resume = resume;
