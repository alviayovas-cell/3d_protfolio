type ClassValue = string | number | false | null | undefined;

/** Minimal className joiner — filters falsy values, no external dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
