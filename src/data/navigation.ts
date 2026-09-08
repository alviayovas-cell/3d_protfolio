export interface NavItem {
  id: string;
  label: string;
}

/** Order drives both the nav links and the section order in the page. */
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export const SECTION_IDS: string[] = NAV_ITEMS.map((item) => item.id);
