import type { ReactNode } from "react";
import { Container } from "../ui/Container";

interface SectionPlaceholderProps {
  id: string;
  label: string;
  children?: ReactNode;
}

/**
 * TEMPORARY stand-in for a real section — gives the navbar's anchor links
 * and active-section observer something to target. Each of these gets
 * replaced by its real section component in later phases.
 */
export function SectionPlaceholder({ id, label, children }: SectionPlaceholderProps) {
  return (
    <section id={id} className="flex min-h-screen scroll-mt-24 items-center border-t border-white/[0.04]">
      <Container>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-mist-600">
          {label} — coming in a later phase
        </p>
        {children}
      </Container>
    </section>
  );
}
