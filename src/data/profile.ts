import profile from "../content/profile.json";
import type { Profile } from "../content/schema";
import { EDUCATION } from "./education";

/** The ongoing degree (or the first entry) — what the About card and photo badge show. */
const ongoing = EDUCATION.find((e) => e.current) ?? EDUCATION[0];

/**
 * Single source of truth for identity/contact facts reused across the site (hero,
 * footer, contact, SEO). Edited in `src/content/profile.json` — or from the admin panel.
 * `education` is derived from the education list so the two can never disagree.
 */
export const PROFILE = {
  ...(profile as Profile),
  education: { degree: ongoing.qualification, institution: ongoing.institution, years: ongoing.period },
};
