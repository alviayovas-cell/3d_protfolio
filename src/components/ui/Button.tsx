import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris-400 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-iris-500 to-azure-500 text-mist-50 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(139,92,246,0.55)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_32px_-6px_rgba(139,92,246,0.75)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "glass-panel text-mist-50 hover:border-iris-400/50 hover:bg-white/[0.06] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-mist-200 hover:text-mist-50 hover:bg-white/5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
