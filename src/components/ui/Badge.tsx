import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  tone?: "iris" | "azure" | "neutral";
}

// All three tones are white pills with the system border now — in a monochrome scheme
// the only thing that should ever colour a badge is its status dot.
const tones = {
  iris: "border-ink-600 bg-ink-800 text-mist-50",
  azure: "border-ink-600 bg-ink-800 text-mist-200",
  neutral: "border-ink-600 bg-ink-800 text-mist-200",
};

export function Badge({ children, className, icon, tone = "iris" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
