import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { AnimatedText } from "./AnimatedText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section title pattern: small tracked eyebrow + large display heading. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <AnimatedText
          as="p"
          className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-iris-400"
        >
          {eyebrow}
        </AnimatedText>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-mist-400 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
