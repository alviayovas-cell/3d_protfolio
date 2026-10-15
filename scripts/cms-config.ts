import {
  ACHIEVEMENT_ICONS,
  OPPORTUNITY_ICONS,
  PROJECT_ICONS,
  SERVICE_ICONS,
  SKILL_ICONS,
} from "../src/content/schema.ts";

/**
 * Sveltia CMS configuration for the /admin panel, served as /admin/config.json by the
 * content plugin. Built here rather than hand-written so the icon
 * choices always match the schema, and so every field mirrors `src/content/schema.ts`.
 * If you add a field to the schema, add it here too.
 *
 * Docs: https://sveltiacms.app/en/docs
 */

const REPO = "alviayovas-cell/3d_protfolio";
const SITE_URL = "https://www.alviayovas.in";

type Field = Record<string, unknown>;

const ID_PATTERN = ["^[a-z0-9]+(-[a-z0-9]+)*$", "Lowercase words joined by dashes, e.g. my-project"];
const URL_PATTERN = ["^https?://\\S+$", "A full link starting with https://"];

const id = (example: string): Field => ({
  name: "id",
  label: "ID",
  hint: `Unique, lowercase-with-dashes (e.g. \`${example}\`). Used internally — change it rarely.`,
  pattern: ID_PATTERN,
});
const str = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: "string", ...extra });
const text = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: "text", ...extra });
const optional = (field: Field): Field => ({ ...field, required: false });
const url = (name: string, label: string, extra: Field = {}): Field =>
  str(name, label, { pattern: URL_PATTERN, ...extra });
const bool = (name: string, label: string, hint: string): Field => ({ name, label, widget: "boolean", hint, default: false });
const select = (name: string, label: string, options: readonly string[], extra: Field = {}): Field => ({
  name,
  label,
  widget: "select",
  options: [...options],
  ...extra,
});
const strings = (name: string, label: string, extra: Field = {}): Field => ({
  name,
  label,
  widget: "list",
  hint: "One per row. Drag to reorder.",
  ...extra,
});
const note = optional(text("note", "Internal note", { hint: "For your reference only — never shown on the site." }));

/** A content file holding `{ items: [...] }`, edited as a reorderable list. */
const listFile = (
  name: string,
  label: string,
  singular: string,
  summary: string,
  fields: Field[],
) => ({
  name,
  label,
  file: `src/content/${name}.json`,
  fields: [
    {
      name: "items",
      label,
      label_singular: singular,
      widget: "list",
      summary,
      collapsed: true,
      hint: "Drag items to change the order they appear on the site.",
      fields,
    },
  ],
});

export function buildCmsConfig() {
  return {
    backend: {
      name: "github",
      repo: REPO,
      branch: "main",
      // Sign-in goes through the site's own /api/auth → GitHub → /api/callback functions.
      base_url: SITE_URL,
      auth_endpoint: "api/auth",
      // The repo is public, so the token doesn't need access to private repositories.
      auth_scope: "public_repo",
      commit_messages: {
        create: "Content: create {{collection}} “{{slug}}” (admin)",
        update: "Content: update {{slug}} (admin)",
        delete: "Content: delete {{collection}} “{{slug}}” (admin)",
        uploadMedia: "Content: upload {{path}} (admin)",
        deleteMedia: "Content: delete {{path}} (admin)",
      },
    },
    site_url: SITE_URL,
    display_url: SITE_URL,
    media_folder: "/public/images/uploads",
    public_folder: "/images/uploads",
    media_libraries: {
      default: {
        config: {
          // Uploads are converted to WebP and capped in size, matching the existing images.
          max_file_size: 8_000_000,
          transformations: {
            raster_image: { format: "webp", quality: 82, width: 1600, height: 1600 },
          },
        },
      },
    },
    output: {
      // A cleared optional field is left out of the JSON rather than saved as "".
      omit_empty_optional_fields: true,
    },
    collections: [
      {
        name: "content",
        label: "Site content",
        description: "Every section of the portfolio. Saving publishes to the live site in about a minute.",
        files: [
          {
            name: "profile",
            label: "Profile",
            file: "src/content/profile.json",
            fields: [
              bool("availableForWork", "Available for work", "Shows the green “Available for work” badge on your photo."),
              str("firstName", "First name"),
              str("lastName", "Last name"),
              str("fullName", "Full name", { hint: "As on your résumé, e.g. “Alvia Yovas S”. Used in search results." }),
              str("displayName", "Display name", { hint: "The name used in headings and the page title." }),
              str("role", "Role", { hint: "Main title, e.g. “AI & Full Stack Developer”. Also part of the page title." }),
              str("secondaryRole", "Secondary role"),
              strings("roles", "Rotating roles", { hint: "The hero cycles through these. One per row.", min: 1 }),
              str("greeting", "Greeting", { hint: "Small text above your name, e.g. “Hello, I'm”." }),
              text("tagline", "Tagline", { hint: "One or two sentences under your role." }),
              text("seoDescription", "Search description", {
                hint: "How the home page is described in Google results and link previews. Aim for about 150 characters.",
              }),
              str("email", "Email", { type: "email" }),
              optional(
                str("phone", "Phone", {
                  hint: "With country code, e.g. +91 93428 05727. Leave empty to hide the phone row and the WhatsApp button.",
                  pattern: ["^\\+?[\\d\\s-]{7,}$", "Digits, spaces and an optional leading +"],
                }),
              ),
              str("location", "Location", { hint: "City, Country — e.g. Chennai, India." }),
              {
                name: "social",
                label: "Social links",
                widget: "object",
                fields: [url("github", "GitHub"), url("linkedin", "LinkedIn"), url("instagram", "Instagram")],
              },
              str("avatarSrc", "Photo (display)", {
                readonly: true,
                hint: "The hero's crop and blink animation are tuned to this exact photo, so it can't be swapped here.",
              }),
              str("avatarShareSrc", "Photo (search results)", { readonly: true }),
            ],
          },
          {
            name: "about",
            label: "About",
            file: "src/content/about.json",
            fields: [
              { name: "bio", label: "Bio paragraphs", widget: "list", field: text("paragraph", "Paragraph"), min: 1 },
              {
                name: "stats",
                label: "Stats",
                label_singular: "Stat",
                widget: "list",
                summary: "{{value}} {{label}}",
                fields: [str("value", "Value", { hint: "e.g. 10+" }), str("label", "Label", { hint: "e.g. Projects Shipped" })],
              },
              strings("focusAreas", "Focus areas"),
            ],
          },
          listFile(
            "projects",
            "Projects",
            "Project",
            "{{name}} — {{category}}",
            [
              id("my-project"),
              str("name", "Name"),
              str("category", "Category", { hint: "Short label above the name, e.g. “Learning Platform”." }),
              text("summary", "Summary", { hint: "What the project is, in one or two sentences." }),
              strings("highlights", "Highlights", { hint: "Short feature tags, one per row." }),
              optional(strings("stack", "Tech stack", { hint: "Technologies, one per row." })),
              optional(url("liveUrl", "Live site link")),
              optional(url("repoUrl", "Source code link", { hint: "Leave empty for private repositories." })),
              optional({
                name: "screenshot",
                label: "Screenshot",
                widget: "image",
                media_folder: "/public/images/projects",
                public_folder: "/images/projects",
                hint: "A real capture of the running app (wide, around 16:9). Converted to WebP automatically.",
              }),
              optional(text("screenshotAlt", "Screenshot description", { hint: "Required with a screenshot: describe what it shows, for screen readers and Google." })),
              optional(
                select("icon", "Emblem (when there's no screenshot)", PROJECT_ICONS, {
                  hint: "Leave empty for a generic folder icon.",
                }),
              ),
              optional({
                name: "overview",
                label: "Overview (project page)",
                widget: "list",
                field: text("paragraph", "Paragraph"),
                hint: "The story on the project's own page — the problem, what you built, how, and what came of it. One paragraph per item. Shown only on /projects/…",
              }),
              optional(str("role", "My role (project page)", { hint: "e.g. System Lead, Solo developer, Frontend lead." })),
              optional(str("period", "When (project page)", { hint: "e.g. 2025 or Jan – Mar 2026." })),
              optional(str("team", "Team (project page)", { hint: "e.g. 6-person team, Solo." })),
              note,
            ],
          ),
          listFile(
            "skills",
            "Skills",
            "Skill group",
            "{{title}}",
            [
              id("frontend"),
              str("title", "Group title"),
              select("icon", "Icon", SKILL_ICONS),
              strings("skills", "Skills", { min: 1 }),
              optional(text("source", "Source note", { hint: "Where these came from — never shown on the site." })),
            ],
          ),
          listFile(
            "experience",
            "Experience",
            "Role",
            "{{role}} — {{organisation}}",
            [
              id("my-role"),
              str("role", "Role"),
              str("organisation", "Organisation"),
              optional(str("detail", "Extra detail", { hint: "Shown next to the organisation, e.g. a sponsor or problem ID." })),
              optional(str("period", "Period", { hint: "e.g. 2026 or Jan 2025 – Jul 2025. Leave empty if there are no dates." })),
              bool("current", "Current", "Shows the “Current” badge."),
              strings("points", "What you did", { hint: "One responsibility or result per row." }),
              note,
            ],
          ),
          listFile(
            "education",
            "Education",
            "Qualification",
            "{{qualification}} ({{period}})",
            [
              id("be-cse"),
              str("qualification", "Qualification"),
              str("institution", "Institution"),
              str("period", "Period", { hint: "e.g. 2024–2028" }),
              bool("current", "Ongoing", "Shows “Present”. The ongoing entry also feeds the About card and the badge on your photo."),
              note,
            ],
          ),
          listFile(
            "certifications",
            "Certifications",
            "Certification",
            "{{title}} — {{issuer}}",
            [
              id("my-certification"),
              str("title", "Title"),
              str("issuer", "Issuer"),
              str("period", "Period"),
              text("summary", "Summary"),
              optional(url("credentialUrl", "Credential link", { hint: "If set, the card links to it." })),
            ],
          ),
          listFile(
            "achievements",
            "Achievements",
            "Achievement",
            "{{title}}",
            [
              id("my-achievement"),
              select("kind", "Type", ["Achievement", "Leadership"]),
              select("icon", "Icon", ACHIEVEMENT_ICONS),
              str("title", "Title"),
              text("context", "Context"),
            ],
          ),
          listFile(
            "services",
            "Services",
            "Service",
            "{{title}}",
            [id("my-service"), select("icon", "Icon", SERVICE_ICONS), str("title", "Title"), text("description", "Description")],
          ),
          listFile(
            "lookingFor",
            "Looking For",
            "Opportunity",
            "{{title}}",
            [id("freelance"), select("icon", "Icon", OPPORTUNITY_ICONS), str("title", "Title"), text("description", "Description")],
          ),
          {
            name: "resume",
            label: "Résumé",
            file: "src/content/resume.json",
            fields: [
              bool("available", "Show the résumé", "When off, the section asks visitors to request it by email instead."),
              {
                name: "path",
                label: "Résumé PDF",
                widget: "file",
                media_folder: "/public/files",
                public_folder: "/files",
                hint: "Upload a new PDF to replace the current one.",
              },
              str("downloadName", "Download file name", {
                hint: "The name visitors' downloads are saved as.",
                pattern: ["\\.pdf$", "Must end in .pdf"],
              }),
            ],
          },
        ],
      },
    ],
  };
}
