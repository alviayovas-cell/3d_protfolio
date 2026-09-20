export interface SectionItem {
  id: string;
  label: string;
  /**
   * Whether this section gets a top-level nav link. The page has more sections than
   * a single nav row can hold — at 11 items it already spanned the full width at
   * 1280px — so supporting sections stay anchorable and reachable by scrolling and
   * in-page CTAs, without crowding the nav.
   */
  inNav: boolean;
}

/** Document order for the whole page. `App.tsx` renders straight from this. */
export const SECTIONS: SectionItem[] = [
  { id: "home", label: "Home", inNav: true },
  { id: "about", label: "About", inNav: true },
  { id: "looking-for", label: "Looking For", inNav: false },
  { id: "services", label: "Services", inNav: true },
  { id: "projects", label: "Projects", inNav: true },
  { id: "skills", label: "Skills", inNav: true },
  { id: "experience", label: "Experience", inNav: true },
  { id: "education", label: "Education", inNav: true },
  { id: "achievements", label: "Achievements", inNav: true },
  { id: "certifications", label: "Certifications", inNav: false },
  { id: "resume", label: "Resume", inNav: true },
  { id: "work-with-me", label: "Work With Me", inNav: false },
  { id: "contact", label: "Contact", inNav: true },
];

/** What the navbar and mobile menu render. */
export const NAV_ITEMS: SectionItem[] = SECTIONS.filter((item) => item.inNav);

/** Ids the active-section observer tracks — nav entries only, since it drives the nav. */
export const SECTION_IDS: string[] = NAV_ITEMS.map((item) => item.id);

/** Every section id on the page, in order. */
export const ALL_SECTION_IDS: string[] = SECTIONS.map((item) => item.id);
