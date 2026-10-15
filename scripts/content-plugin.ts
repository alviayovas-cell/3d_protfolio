import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { buildCmsConfig } from "./cms-config.ts";
import { z } from "zod";
import {
  CONTENT_SCHEMAS,
  type About,
  type EducationEntry,
  type ExperienceEntry,
  type Profile,
  type Project,
  type Resume,
  type SkillGroup,
} from "../src/content/schema.ts";

/**
 * Keeps everything derived from `src/content/*.json` in step with it:
 *
 * 1. Validation — every content file is checked against its schema at dev and build
 *    time. A bad edit shows the dev error overlay locally, and on Vercel it fails the
 *    build so the last good deploy stays live.
 * 2. index.html — the page title, structured data (JSON-LD) and the static crawler
 *    summary inside #root are generated from the content, so what search engines read
 *    can't drift from what the page shows.
 * 3. sitemap.xml — emitted on build with today's date as `lastmod`.
 * 4. admin/config.json — the /admin panel's config, generated from scripts/cms-config.ts
 *    (served by the dev server, emitted on build).
 */

export const SITE_URL = "https://www.alviayovas.in";

const CONTENT_DIR = fileURLToPath(new URL("../src/content/", import.meta.url));
const PUBLIC_DIR = fileURLToPath(new URL("../public/", import.meta.url));
type ContentFile = keyof typeof CONTENT_SCHEMAS;

/** Reads and validates one content file; throws a readable error naming every bad field. */
function load<T>(file: ContentFile): T {
  const raw = readFileSync(path.join(CONTENT_DIR, file), "utf8");
  return validate(file, raw) as T;
}

function validate(file: ContentFile, raw: string): unknown {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    throw new Error(`src/content/${file} is not valid JSON: ${(err as Error).message}`);
  }
  const result = CONTENT_SCHEMAS[file].safeParse(json);
  if (!result.success) {
    throw new Error(`src/content/${file} has invalid content:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

/** Every site path the content points at must be a real file in `public/` — a typo would otherwise ship a broken image. */
function assertAssetsExist() {
  const profile = load<Profile>("profile.json");
  const resume = load<Resume>("resume.json");
  const paths = [
    ["profile.json → avatarSrc", profile.avatarSrc],
    ["profile.json → avatarShareSrc", profile.avatarShareSrc],
    ...load<{ items: Project[] }>("projects.json").items.flatMap((p) =>
      p.screenshot ? [[`projects.json → ${p.id}.screenshot`, p.screenshot]] : [],
    ),
    ...(resume.available ? [["resume.json → path", resume.path]] : []),
  ];
  const missing = paths.filter(([, p]) => !existsSync(path.join(PUBLIC_DIR, decodeURI(p))));
  if (missing.length) {
    const list = missing.map(([where, p]) => `  ${where}: ${p}`).join("\n");
    throw new Error(`Content points at files that don't exist in public/:\n${list}`);
  }
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON for a <script> block — `<` escaped so content can never close the tag early. */
const jsonForScript = (value: unknown) => JSON.stringify(value, null, 2).replace(/</g, "\\u003c");

function buildHead(profile: Profile, education: EducationEntry[], skills: SkillGroup[]) {
  const ongoing = education.find((e) => e.current) ?? education[0];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.displayName,
    jobTitle: profile.role,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}${profile.avatarShareSrc}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0].trim(), addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: ongoing.institution },
    knowsAbout: skills.flatMap((g) => g.skills),
    sameAs: Object.values(profile.social),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.displayName,
    alternateName: [profile.fullName, new URL(SITE_URL).hostname.replace(/^www\./, "")],
    url: `${SITE_URL}/`,
  };
  return [person, website]
    .map((data) => `<script type="application/ld+json">\n${jsonForScript(data)}\n    </script>`)
    .join("\n    ");
}

function buildSummary(
  profile: Profile,
  about: About,
  projects: Project[],
  skills: SkillGroup[],
  experience: ExperienceEntry[],
  education: EducationEntry[],
  resume: Resume,
) {
  const li = (items: string[]) => items.map((i) => `<li>${i}</li>`).join("");
  const link = (href: string, label: string) => `<a href="${esc(href)}">${esc(label)}</a>`;
  const projectItems = projects.map((p) => {
    const links = [p.liveUrl && link(p.liveUrl, "Live site"), p.repoUrl && link(p.repoUrl, "Source")].filter(Boolean);
    return `<strong>${esc(p.name)}</strong> — ${esc(p.summary)}${links.length ? ` (${links.join(" · ")})` : ""}`;
  });
  const contact = [
    link(`mailto:${profile.email}`, profile.email),
    link(profile.social.github, "GitHub"),
    link(profile.social.linkedin, "LinkedIn"),
    link(profile.social.instagram, "Instagram"),
    ...(resume.available ? [link(resume.path, "Résumé")] : []),
  ];
  return `<main class="static-summary">
        <h1>${esc(profile.displayName)}</h1>
        <p><strong>${esc(profile.role)}</strong> · ${esc(profile.secondaryRole)} · ${esc(profile.location)}</p>
        <p>${esc(profile.tagline)}</p>
        <h2>About</h2>
        ${about.bio.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
        <h2>Projects</h2>
        <ul>${li(projectItems)}</ul>
        <h2>Skills</h2>
        <p>${esc(skills.flatMap((g) => g.skills).join(", "))}</p>
        <h2>Experience</h2>
        <ul>${li(experience.map((e) => `${esc(e.role)} — ${esc(e.organisation)}`))}</ul>
        <h2>Education</h2>
        <ul>${li(education.map((e) => `${esc(e.qualification)}, ${esc(e.institution)} (${esc(e.period)})`))}</ul>
        <h2>Contact</h2>
        <p>${contact.join(" · ")}</p>
      </main>`;
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
}

export function contentPlugin(): Plugin {
  return {
    name: "portfolio-content",
    // Before Vite's JSON plugin, so `transform` sees the raw file.
    enforce: "pre",

    buildStart() {
      // Validate every file, including any no module happens to import.
      for (const file of Object.keys(CONTENT_SCHEMAS) as ContentFile[]) {
        this.addWatchFile(path.join(CONTENT_DIR, file));
        load(file);
      }
      assertAssetsExist();
    },

    transform(code, id) {
      const file = path.relative(CONTENT_DIR, id.split("?")[0]) as ContentFile;
      if (file in CONTENT_SCHEMAS) validate(file, code);
      return null;
    },

    transformIndexHtml(html) {
      const profile = load<Profile>("profile.json");
      const about = load<About>("about.json");
      const projects = load<{ items: Project[] }>("projects.json").items;
      const skills = load<{ items: SkillGroup[] }>("skills.json").items;
      const experience = load<{ items: ExperienceEntry[] }>("experience.json").items;
      const education = load<{ items: EducationEntry[] }>("education.json").items;
      const resume = load<Resume>("resume.json");

      const title = `${profile.displayName} | ${profile.role}`;
      return html
        .replaceAll("__SITE_TITLE__", esc(title))
        .replaceAll("__SITE_AUTHOR__", esc(profile.fullName))
        .replaceAll("__SITE_URL__", SITE_URL)
        .replace("<!-- content:jsonld -->", buildHead(profile, education, skills))
        .replace("<!-- content:summary -->", buildSummary(profile, about, projects, skills, experience, education, resume));
    },

    configureServer(server) {
      server.middlewares.use("/admin/config.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(buildCmsConfig(), null, 2));
      });
    },

    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap() });
      this.emitFile({ type: "asset", fileName: "admin/config.json", source: JSON.stringify(buildCmsConfig(), null, 2) });
    },
  };
}
