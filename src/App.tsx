import { Navbar } from "./components/layout/Navbar";
import { SectionPlaceholder } from "./components/layout/SectionPlaceholder";
import { Hero } from "./components/sections/hero/Hero";
import { NAV_ITEMS } from "./data/navigation";

const REMAINING_SECTIONS = NAV_ITEMS.filter((item) => item.id !== "home");

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-ink-900">
        <Hero />
        {REMAINING_SECTIONS.map((item) => (
          <SectionPlaceholder key={item.id} id={item.id} label={item.label} />
        ))}
      </main>
    </>
  );
}

export default App;
