/**
 * The site's pages. There's no client-side router: every page is a real HTML file
 * (`/` and `/projects/<id>/`, prerendered by scripts/content-plugin.ts), links between
 * them are ordinary full page loads, and the app just reads the path once on startup.
 */
export type Route = { page: "home" } | { page: "project"; id: string } | { page: "not-found" };

const PROJECT_PATH = /^\/projects\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/;

export function routeFor(pathname: string): Route {
  if (pathname === "/" || pathname === "/index.html") return { page: "home" };
  const project = PROJECT_PATH.exec(pathname);
  if (project) return { page: "project", id: project[1] };
  return { page: "not-found" };
}

export const ROUTE = routeFor(window.location.pathname);

/** Link to a home-page section — a plain anchor on the home page, a page load elsewhere. */
export const sectionHref = (id: string) => (ROUTE.page === "home" ? `#${id}` : `/#${id}`);

export const projectHref = (id: string) => `/projects/${id}`;
