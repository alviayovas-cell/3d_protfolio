import type { ComponentType } from "react";
import { CustomCursor } from "./components/layout/CustomCursor";
import { FloatingContact } from "./components/layout/FloatingContact";
import { Navbar } from "./components/layout/Navbar";
import { SectionPlaceholder } from "./components/layout/SectionPlaceholder";
import { About } from "./components/sections/about/About";
import { Achievements } from "./components/sections/achievements/Achievements";
import { Certifications } from "./components/sections/certifications/Certifications";
import { Contact } from "./components/sections/contact/Contact";
import { Education } from "./components/sections/education/Education";
import { Experience } from "./components/sections/experience/Experience";
import { Hero } from "./components/sections/hero/Hero";
import { LookingFor } from "./components/sections/looking-for/LookingFor";
import { Projects } from "./components/sections/projects/Projects";
import { Resume } from "./components/sections/resume/Resume";
import { Services } from "./components/sections/services/Services";
import { Skills } from "./components/sections/skills/Skills";
import { WorkWithMe } from "./components/sections/work-with-me/WorkWithMe";
import { SECTIONS } from "./data/navigation";

/**
 * Built sections, keyed by section id. The page renders straight from `SECTIONS`, so
 * document order always matches the declared order and anything not yet built falls
 * through to a placeholder.
 */
const COMPONENTS: Record<string, ComponentType> = {
  home: Hero,
  about: About,
  "looking-for": LookingFor,
  services: Services,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  education: Education,
  achievements: Achievements,
  certifications: Certifications,
  resume: Resume,
  "work-with-me": WorkWithMe,
  contact: Contact,
};

function App() {
  return (
    <>
      {/* First thing in the tab order: lets keyboard users skip the nav entirely. */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-iris-500 focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:text-mist-50"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <FloatingContact />
      <main id="main" className="bg-ink-900">
        {SECTIONS.map((item) => {
          const Section = COMPONENTS[item.id];
          return Section ? (
            <Section key={item.id} />
          ) : (
            <SectionPlaceholder key={item.id} id={item.id} label={item.label} />
          );
        })}
      </main>
    </>
  );
}

export default App;
