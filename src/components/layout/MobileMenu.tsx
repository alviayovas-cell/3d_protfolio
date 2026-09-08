import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { NAV_ITEMS } from "../../data/navigation";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { cn } from "../../lib/cn";

interface MobileMenuProps {
  open: boolean;
  activeId: string;
  onClose: () => void;
}

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: CINEMATIC_EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: CINEMATIC_EASE } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: CINEMATIC_EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

/** Fullscreen, touch-friendly nav overlay for below the `xl` breakpoint. */
export function MobileMenu({ open, activeId, onClose }: MobileMenuProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-ink-950/97 backdrop-blur-2xl xl:hidden"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="h-20 shrink-0" aria-hidden="true" />
          <motion.nav
            className="flex flex-1 flex-col items-center justify-center gap-1 overflow-y-auto py-8"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                variants={itemVariants}
                className={cn(
                  "px-6 py-3 font-display text-2xl font-medium tracking-tight transition-colors",
                  activeId === item.id ? "text-gradient" : "text-mist-200 hover:text-mist-50",
                )}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
