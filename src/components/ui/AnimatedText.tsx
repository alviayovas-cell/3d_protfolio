import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { cn } from "../../lib/cn";

type Tag = "div" | "p" | "span" | "h1" | "h2" | "h3";

interface AnimatedTextProps {
  as?: Tag;
  children: ReactNode;
  className?: string;
  /** Stagger delay index — use for sequencing multiple AnimatedText siblings. */
  delay?: number;
  /** "words" splits text into staggered words (string children only); "block" fades the whole element. */
  mode?: "words" | "block";
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const block: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/** Scroll/entrance reveal for headings and copy. Splits into words for a cinematic line-reveal, or fades as one block. */
export function AnimatedText({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  mode = "block",
}: AnimatedTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[Tag];

  /*
    Reduced motion bypasses the reveal entirely rather than just shortening it. These
    variants start at opacity 0 and are driven by JS, so the global CSS
    `prefers-reduced-motion` rule — which only tames CSS animations — can't reach them.
    Left as-is, a reduced-motion visitor still gets every fade-up, and anything whose
    in-view trigger never fires stays permanently invisible.
  */
  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (mode === "words" && typeof children === "string") {
    const words = children.split(" ");
    return (
      <MotionTag
        className={cn("inline-block overflow-hidden", className)}
        variants={container}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden [&+&]:ml-[0.25em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={block}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </MotionTag>
  );
}
