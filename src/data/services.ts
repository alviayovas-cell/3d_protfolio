import services from "../content/services.json";
import type { Service } from "../content/schema";

export type { Service };

/** What Alvia offers to build — capabilities, not vendors. Edited in `src/content/services.json`. */
export const SERVICES = services.items as Service[];
