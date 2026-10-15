import { z } from "zod";

/**
 * Shape of every editable content file in `src/content/`. This is the one place that
 * says what each field is:
 *
 * - The app imports only the *types* (`import type`), so zod never reaches the bundle.
 * - The content Vite plugin (`scripts/content-plugin.ts`) runs these schemas over each
 *   JSON file at dev and build time. A bad edit — from the admin panel or by hand —
 *   fails the build, and Vercel keeps serving the last good deploy.
 * - The `*_ICONS` lists are the options the admin panel offers for each icon field.
 *
 * `note` fields are provenance notes for the maintainer (where a fact came from, why
 * a link is missing). They're never rendered.
 */

const url = z.url({ protocol: /^https?$/ });
/** Site-relative asset path, e.g. `/images/projects/codesphere.webp`. */
const sitePath = z.string().regex(/^\/[^\s]*$/, "must start with / (a path on this site)");
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use lowercase-words-with-dashes");
const text = z.string().trim().min(1);
const note = z.string().optional();

/** Makes `{ items: [...] }` — the list wrapper the admin panel edits — with unique ids. */
const list = <T extends z.ZodObject<{ id: typeof id }>>(item: T) =>
  z.object({
    items: z
      .array(item)
      .refine((items) => new Set(items.map((i) => i.id)).size === items.length, "every id must be unique"),
  });

export const PROJECT_ICONS = ["sentinel", "codesphere", "airindex", "zana", "obe", "securewipe", "leettrack"] as const;
export const SERVICE_ICONS = ["fullstack", "ai", "backend", "tools", "data", "cloud"] as const;
export const SKILL_ICONS = ["languages", "frontend", "backend", "databases", "ai", "embedded", "tools", "cloud"] as const;
export const ACHIEVEMENT_ICONS = ["award", "lead", "events"] as const;
export const OPPORTUNITY_ICONS = ["freelance", "internship", "collaboration", "hackathon", "partnership"] as const;

export const profileSchema = z.object({
  firstName: text,
  lastName: text,
  /** Legal/résumé name, e.g. "Alvia Yovas S". */
  fullName: text,
  /** The name used in headings and the page title. */
  displayName: text,
  role: text,
  secondaryRole: text,
  /** Cycled by the hero's typing line ("I'm a …"). */
  roles: z.array(text).min(1),
  greeting: text,
  tagline: text,
  email: z.email(),
  /** Optional: remove it and the phone row and WhatsApp button disappear. */
  phone: z.string().regex(/^\+?[\d\s-]{7,}$/, "digits, spaces and an optional leading +").optional(),
  location: text,
  /** Drives the "Available for work" badge on the photo. */
  availableForWork: z.boolean(),
  social: z.object({ github: url, linkedin: url, instagram: url }),
  /** AvatarStage's crop and blink positions are tuned to this exact photo. */
  avatarSrc: sitePath,
  /** JPEG/PNG copy of the photo for structured data (some crawlers skip WebP). */
  avatarShareSrc: sitePath,
});

export const aboutSchema = z.object({
  bio: z.array(text).min(1),
  stats: z.array(z.object({ label: text, value: text })),
  focusAreas: z.array(text),
});

export const projectSchema = z.object({
  id,
  name: text,
  /** Short label shown above the project name. */
  category: text,
  /** One-line summary — what the project actually is, no invented metrics. */
  summary: text,
  highlights: z.array(text),
  stack: z.array(text).optional(),
  repoUrl: url.optional(),
  liveUrl: url.optional(),
  /** Real screenshot of the running app, under `public/images/projects/`. */
  screenshot: sitePath.optional(),
  screenshotAlt: z.string().optional(),
  /** Emblem shown when there's no screenshot; a generic folder icon if omitted. */
  icon: z.enum(PROJECT_ICONS).optional(),
  note,
}).refine((p) => !p.screenshot || !!p.screenshotAlt?.trim(), {
  message: "a screenshot needs alt text describing what it shows",
  path: ["screenshotAlt"],
});

export const skillGroupSchema = z.object({
  id,
  icon: z.enum(SKILL_ICONS),
  title: text,
  /** Where these came from — a provenance note, not rendered. */
  source: z.string().optional(),
  skills: z.array(text).min(1),
});

export const experienceSchema = z.object({
  id,
  role: text,
  organisation: text,
  /** Extra context shown next to the organisation, e.g. a sponsor or problem id. */
  detail: z.string().optional(),
  /** Leave empty when no dates can be supported. */
  period: z.string(),
  current: z.boolean(),
  points: z.array(text),
  note,
});

export const educationSchema = z.object({
  id,
  qualification: text,
  institution: text,
  period: text,
  /** True while ongoing — drives the "Present" marker, and the ongoing entry feeds the
   *  About card and the photo badge. */
  current: z.boolean(),
  note,
});

export const certificationSchema = z.object({
  id,
  title: text,
  issuer: text,
  period: text,
  summary: text,
  credentialUrl: url.optional(),
});

export const achievementSchema = z.object({
  id,
  icon: z.enum(ACHIEVEMENT_ICONS),
  kind: z.enum(["Achievement", "Leadership"]),
  title: text,
  context: text,
});

export const serviceSchema = z.object({
  id,
  icon: z.enum(SERVICE_ICONS),
  title: text,
  description: text,
});

export const opportunitySchema = z.object({
  id,
  icon: z.enum(OPPORTUNITY_ICONS),
  title: text,
  description: text,
});

export const resumeSchema = z.object({
  /** Set false to fall back to the "request by email" CTA. */
  available: z.boolean(),
  path: sitePath,
  downloadName: z.string().regex(/\.pdf$/i, "must end in .pdf"),
});

/** File name (in `src/content/`) → schema. The content plugin validates each one. */
export const CONTENT_SCHEMAS = {
  "profile.json": profileSchema,
  "about.json": aboutSchema,
  "projects.json": list(projectSchema),
  "skills.json": list(skillGroupSchema),
  "experience.json": list(experienceSchema),
  "education.json": list(educationSchema).refine((e) => e.items.length > 0, "add at least one entry"),
  "certifications.json": list(certificationSchema),
  "achievements.json": list(achievementSchema),
  "services.json": list(serviceSchema),
  "lookingFor.json": list(opportunitySchema),
  "resume.json": resumeSchema,
} as const;

export type Profile = z.infer<typeof profileSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ExperienceEntry = z.infer<typeof experienceSchema>;
export type EducationEntry = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
export type Resume = z.infer<typeof resumeSchema>;
