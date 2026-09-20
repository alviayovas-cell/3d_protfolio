/**
 * Résumé asset. Lives at `public/resume.pdf`; set `available` to false to fall back
 * to the "request by email" CTA if the file is ever removed.
 */
export const RESUME = {
  available: true,
  path: "/resume.pdf",
  downloadName: "Alvia-Yovas-Resume.pdf",
} as const;
