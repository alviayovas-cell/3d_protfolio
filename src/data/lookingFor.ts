import lookingFor from "../content/lookingFor.json";
import type { Opportunity } from "../content/schema";

export type { Opportunity };

/** What Alvia is open to — statements of intent, not claims of past work. Edited in `src/content/lookingFor.json`. */
export const LOOKING_FOR = lookingFor.items as Opportunity[];
