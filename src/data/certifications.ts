import certifications from "../content/certifications.json";
import type { Certification } from "../content/schema";

export type { Certification };

/**
 * Training and certifications, verbatim from the résumé. Add `credentialUrl` to an entry
 * and its card links to it. Edited in `src/content/certifications.json`.
 */
export const CERTIFICATIONS = certifications.items as Certification[];
