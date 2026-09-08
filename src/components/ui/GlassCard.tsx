import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Adds hover lift + border glow — use for interactive cards. */
  interactive?: boolean;
  /** Adds inner padding scale; "none" for custom layouts. */
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

// Built with createElement (not JSX) for the dynamic tag — see Container.tsx for why.
export function GlassCard({
  as: Tag = "div",
  children,
  className,
  interactive = false,
  padding = "md",
  ...rest
}: GlassCardProps) {
  return createElement(
    Tag,
    {
      className: cn(
        "glass-panel rounded-2xl",
        paddings[padding],
        interactive &&
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-iris-400/40 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_-16px_rgba(139,92,246,0.4)]",
        className,
      ),
      ...rest,
    },
    children,
  );
}
