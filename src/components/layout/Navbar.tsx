import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS, SECTION_IDS } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

/** Premium sticky nav: transparent over the hero, blurred glass once scrolled, with a live active-section indicator. */
export function Navbar() {
  const scrolled = useScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className={cn("flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20")}>
            <a
              href="#home"
              className="font-display text-lg font-semibold tracking-tight text-mist-50"
            >
              ALVIA <span className="text-gradient">YOVAS</span>
            </a>

            <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    // whitespace-nowrap: a two-word label ("Looking For") otherwise wraps
                    // inside its link, making it taller than its neighbours and throwing
                    // the whole row out of alignment. Tighter padding pays for the width.
                    "relative whitespace-nowrap px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors",
                    activeId === item.id ? "text-mist-50" : "text-mist-400 hover:text-mist-100",
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeId === item.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-iris-400/30 bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="relative z-50 -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-mist-50 transition-colors hover:bg-ink-700 xl:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} activeId={activeId} onClose={() => setMenuOpen(false)} />
    </>
  );
}
