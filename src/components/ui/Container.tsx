import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Narrower reading width, for text-heavy sections. */
  narrow?: boolean;
}

/**
 * Consistent max-width + responsive gutter used across every section.
 * Built with createElement (not JSX) for the dynamic tag — with R3F's global
 * JSX.IntrinsicElements augmentation in the project, `<Tag>` for a generic
 * ElementType resolves `children` against every three.js element too and
 * TS narrows it to `never`; createElement isn't affected.
 */
export function Container({ as: Tag = "div", children, className, narrow = false }: ContainerProps) {
  return createElement(
    Tag,
    { className: cn("mx-auto w-full px-5 sm:px-8 lg:px-12", narrow ? "max-w-3xl" : "max-w-7xl", className) },
    children,
  );
}
