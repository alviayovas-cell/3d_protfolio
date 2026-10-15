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
 * 2. Pages — index.html is a template. The home page and one page per project
 *    (/projects/<id>/index.html) are rendered from it, each with its own title,
 *    description, canonical URL, structured data (JSON-LD) and static crawler summary
 *    inside #root, so what search engines read can't drift from what the page shows.
 * 3. sitemap.xml — every page, emitted on build with today's date as `lastmod`.
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

interface Content {
  profile: Profile;
  about: About;
  projects: Project[];
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  resume: Resume;
}

function loadContent(): Content {
  return {
    profile: load<Profile>("profile.json"),
    about: load<About>("about.json"),
    projects: load<{ items: Project[] }>("projects.json").items,
    skills: load<{ items: SkillGroup[] }>("skills.json").items,
    experience: load<{ items: ExperienceEntry[] }>("experience.json").items,
    education: load<{ items: EducationEntry[] }>("education.json").items,
    resume: load<Resume>("resume.json"),
  };
}

/** One prerendered HTML page: `/` or `/projects/<id>`. */
interface Page {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  jsonLd: object[];
  /** Static HTML for #root — what crawlers that don't run JavaScript read. */
  summary: string;
}

const projectPath = (id: string) => `/projects/${id}`;
const absolute = (p: string) => `${SITE_URL}${p}`;

/** Trims to a search-snippet length at a word boundary. */
function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[\s,;:—–-]+$/, "")}…`;
}

const li = (items: string[]) => items.map((i) => `<li>${i}</li>`).join("");
const link = (href: string, label: string) => `<a href="${esc(href)}">${esc(label)}</a>`;

function homePage(c: Content): Page {
  const { profile, about, projects, skills, experience, education, resume } = c;
  const ongoing = education.find((e) => e.current) ?? education[0];
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.displayName,
    jobTitle: profile.role,
    url: `${SITE_URL}/`,
    image: absolute(profile.avatarShareSrc),
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

  const projectItems = projects.map((p) => {
    const links = [p.liveUrl && link(p.liveUrl, "Live site"), p.repoUrl && link(p.repoUrl, "Source")].filter(Boolean);
    return `${link(projectPath(p.id), p.name)} — ${esc(p.summary)}${links.length ? ` (${links.join(" · ")})` : ""}`;
  });
  const contact = [
    link(`mailto:${profile.email}`, profile.email),
    link(profile.social.github, "GitHub"),
    link(profile.social.linkedin, "LinkedIn"),
    link(profile.social.instagram, "Instagram"),
    ...(resume.available ? [link(resume.path, "Résumé")] : []),
  ];

  return {
    path: "/",
    title: `${profile.displayName} | ${profile.role}`,
    description: profile.seoDescription,
    ogType: "website",
    jsonLd: [person, website],
    summary: `<main class="static-summary">
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
      </main>`,
  };
}

function projectPage(c: Content, project: Project, index: number): Page {
  const { profile, projects } = c;
  const url = absolute(projectPath(project.id));
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const facts = [project.category, project.role, project.period, project.team].filter((f): f is string => !!f);
  const links = [
    project.liveUrl && link(project.liveUrl, "Live site"),
    project.repoUrl && link(project.repoUrl, "Source code"),
  ].filter(Boolean);

  const work = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    genre: project.category,
    description: project.summary,
    url,
    ...(project.screenshot && { image: absolute(project.screenshot) }),
    ...(project.stack?.length && { keywords: project.stack.join(", ") }),
    ...((project.liveUrl || project.repoUrl) && { sameAs: [project.liveUrl, project.repoUrl].filter(Boolean) }),
    author: { "@type": "Person", name: profile.fullName, url: `${SITE_URL}/` },
    isPartOf: { "@type": "WebSite", name: profile.displayName, url: `${SITE_URL}/` },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: profile.displayName, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  const overview = (project.overview ?? []).map((p) => `<p>${esc(p)}</p>`).join("\n        ");
  const stack = project.stack?.length ? `<h2>Tech stack</h2>\n        <p>${esc(project.stack.join(", "))}</p>` : "";
  return {
    path: projectPath(project.id),
    title: `${project.name} — ${project.category} | ${profile.displayName}`,
    description: clip(project.summary),
    ogType: "article",
    jsonLd: [work, breadcrumbs],
    summary: `<main class="static-summary">
        <p>${link("/", profile.displayName)} / ${link("/#projects", "Projects")}</p>
        <h1>${esc(project.name)}</h1>
        <p>${facts.map(esc).join(" · ")}</p>
        <p>${esc(project.summary)}</p>
        ${overview}
        <h2>What it does</h2>
        <ul>${li(project.highlights.map(esc))}</ul>
        ${stack}
        ${links.length ? `<p>${links.join(" · ")}</p>` : ""}
        <p>Built by ${link("/", profile.fullName)}, ${esc(profile.role)}. More projects: ${link(projectPath(prev.id), prev.name)} · ${link(projectPath(next.id), next.name)}</p>
      </main>`,
  };
}

function allPages(c: Content): Page[] {
  return [homePage(c), ...c.projects.map((p, i) => projectPage(c, p, i))];
}

/** Fills index.html's tokens and markers for one page. */
function renderPage(template: string, page: Page, profile: Profile) {
  const jsonLd = page.jsonLd
    .map((data) => `<script type="application/ld+json">\n${jsonForScript(data)}\n    </script>`)
    .join("\n    ");
  return template
    .replaceAll("__PAGE_TITLE__", esc(page.title))
    .replaceAll("__PAGE_DESCRIPTION__", esc(page.description))
    .replaceAll("__PAGE_URL__", absolute(page.path))
    .replaceAll("__OG_TYPE__", page.ogType)
    .replaceAll("__SITE_AUTHOR__", esc(profile.fullName))
    .replaceAll("__SITE_URL__", SITE_URL)
    // Written whole, not as a token in href: Vite's dev server rewrites link hrefs it
    // takes for relative paths before this plugin runs.
    .replace("<!-- content:canonical -->", `<link rel="canonical" href="${absolute(page.path)}" />`)
    .replace("<!-- content:jsonld -->", jsonLd)
    .replace("<!-- content:summary -->", page.summary);
}

function buildSitemap(pages: Page[]) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url>\n    <loc>${absolute(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function contentPlugin(): Plugin {
  /** index.html after Vite has injected the built asset tags, before any page is filled in. */
  let template: string | undefined;

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

    transformIndexHtml: {
      // After Vite's own transforms, so the captured template already has the asset tags.
      order: "post",
      handler(html, ctx) {
        template = html;
        const content = loadContent();
        const pages = allPages(content);
        // In dev every path falls back to index.html; render the requested page's head too.
        const requested = (ctx.originalUrl ?? "/").split(/[?#]/)[0].replace(/\/$/, "") || "/";
        const page = pages.find((p) => p.path === requested) ?? pages[0];
        return renderPage(html, page, content.profile);
      },
    },

    configureServer(server) {
      server.middlewares.use("/admin/config.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(buildCmsConfig(), null, 2));
      });
    },

    generateBundle: {
      // After Vite has emitted index.html, so `template` has been captured.
      order: "post",
      handler() {
        if (!template) throw new Error("content plugin: the index.html template was not captured");
        const content = loadContent();
        const pages = allPages(content);
        for (const page of pages.slice(1)) {
          this.emitFile({
            type: "asset",
            fileName: `${page.path.slice(1)}/index.html`,
            source: renderPage(template, page, content.profile),
          });
        }
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap(pages) });
        this.emitFile({ type: "asset", fileName: "admin/config.json", source: JSON.stringify(buildCmsConfig(), null, 2) });
      },
    },
  };
}
