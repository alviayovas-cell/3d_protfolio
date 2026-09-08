import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  tone?: "iris" | "azure" | "neutral";
}

const tones = {
  iris: "border-iris-400/30 bg-iris-500/10 text-iris-300",
  azure: "border-azure-400/30 bg-azure-500/10 text-azure-300",
  neutral: "border-white/10 bg-white/5 text-mist-200",
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
