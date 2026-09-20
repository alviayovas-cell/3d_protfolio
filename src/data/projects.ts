export interface Project {
  id: string;
  name: string;
  /** Short label for the floating cards. */
  category: string;
  /** One-line summary — kept to what the project actually is, no invented metrics. */
  summary: string;
  /**
   * Capabilities, each one lifted from the project's own GitHub description or the
   * résumé. These restate documented facts — not inferred features or claimed outcomes.
   */
  highlights: string[];
  /** Tech actually named in the repo or résumé. Omitted when unknown. */
  stack?: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Real screenshot of the running app, under `public/images/projects/`. */
  screenshot?: string;
  /** Alt text for the screenshot — describes what the capture actually shows. */
  screenshotAlt?: string;
  /** Emblem icon, used when there's no screenshot. */
  icon: "sentinel" | "codesphere" | "airindex" | "zana" | "obe" | "securewipe";
}

/**
 * Single source of truth for project facts, shared by the hero's floating cards
 * (Phase 8) and the Featured Projects case studies (Phase 12).
 *
 * Summaries, stacks and URLs come from the public repos under
 * github.com/alviayovas-cell and from Alvia's résumé. Every URL here was resolved
 * (HTTP 200) before being added, and every screenshot is a real capture of the running
 * app — nothing is a mockup.
 */
export const PROJECTS: Project[] = [
  {
    // From the résumé's Featured Project. No repo, live URL or screenshot: it's
    // in-progress hardware work, so it falls back to the generated emblem.
    id: "sentinel",
    name: "Sentinel",
    category: "Robotics / AI",
    summary:
      "An AI-powered mobile robot that navigates hospital wards to collect and segregate biomedical waste — built by a 6-person team for the Autodesk-sponsored Smart India Hackathon (SIH26115).",
    highlights: [
      "YOLOv8n + MobileNetV2 vision",
      "TensorFlow Lite on edge hardware",
      "ESP32/Arduino segregation",
      "MQTT telemetry",
      "React monitoring dashboard",
    ],
    stack: ["Python", "TensorFlow Lite", "FastAPI", "React", "ESP32"],
    icon: "sentinel",
  },
  {
    id: "codesphere",
    name: "Codesphere",
    category: "Learning Platform",
    summary:
      "A web-based coding learning and assessment platform for CSE students with C programming practice, timed coding rounds, automated code evaluation, smart question randomization and leaderboards.",
    highlights: [
      "C programming practice",
      "Timed coding rounds",
      "Automated code evaluation",
      "Question randomization",
      "Leaderboards",
    ],
    stack: ["TypeScript", "Python", "Docker"],
    repoUrl: "https://github.com/alviayovas-cell/codesphere",
    liveUrl: "https://codesphere-frontend-0kq2.onrender.com",
    screenshot: "/images/projects/codesphere.png",
    screenshotAlt:
      "Codesphere admin dashboard showing student, problem and coding-round counts alongside recent rounds.",
    icon: "codesphere",
  },
  {
    id: "airindex-india",
    name: "AirIndex India",
    category: "Price Intelligence",
    summary:
      "Real-time airfare price intelligence for India — collects, analyses and visualises flight fare data to calculate an experimental Airfare Price Index across major domestic routes and booking windows.",
    highlights: [
      "Real-time fare data",
      "Experimental price index",
      "Domestic routes",
      "Booking-window analysis",
    ],
    stack: ["TypeScript", "Python", "FastAPI", "MongoDB"],
    repoUrl: "https://github.com/alviayovas-cell/airindex-india",
    liveUrl: "https://airindex-india.vercel.app",
    screenshot: "/images/projects/airindex-india.png",
    screenshotAlt:
      "AirIndex India analytics dashboard showing the airfare price index, daily change, routes tracked and an index trend chart.",
    icon: "airindex",
  },
  {
    id: "zana-ai",
    name: "Zana AI",
    category: "Voice Assistant",
    summary:
      "Web-based personal AI voice assistant with natural-language interaction, music control, voice input and AI-powered tools.",
    highlights: ["Natural-language interaction", "Voice input", "Music control", "AI-powered tools"],
    stack: ["Python", "FastAPI", "TypeScript"],
    repoUrl: "https://github.com/alviayovas-cell/zana-ai",
    liveUrl: "https://zana-ai-kappa.vercel.app",
    screenshot: "/images/projects/zana-ai.png",
    screenshotAlt:
      "Zana AI chat interface with the assistant greeting, voice controls and a music player bar.",
    icon: "zana",
  },
  {
    id: "obe-ai",
    name: "OBE-AI / CO-PO",
    category: "Academic AI",
    summary:
      "An AI-powered academic tool that turns uploaded syllabi into measurable Course Outcomes, then generates editable CO-PO-PSO mapping matrices with score averaging and a faculty review step.",
    highlights: [
      "Syllabus to Course Outcomes",
      "CO-PO-PSO matrices",
      "Score averaging",
      "Faculty review step",
    ],
    stack: ["TypeScript", "AI tooling"],
    liveUrl: "https://co-po-lake.vercel.app",
    screenshot: "/images/projects/obe-ai.png",
    screenshotAlt:
      "OBE-AI faculty dashboard listing course outcome and PO mapping status for a Data Structures subject.",
    icon: "obe",
  },
  {
    id: "securewipe",
    name: "SecureWipe",
    category: "Security",
    summary:
      "A secure data wiping platform for trustworthy IT asset recycling — NIST 800-88 and DoD 5220.22-M compliant wipe workflows, tamper-proof digital certificates with SHA-256 verification, and full audit trails.",
    highlights: [
      "NIST 800-88 workflows",
      "DoD 5220.22-M compliant",
      "SHA-256 certificates",
      "Audit trails",
    ],
    stack: ["TypeScript", "Next.js", "Firebase"],
    repoUrl: "https://github.com/alviayovas-cell/secure_data_wiping",
    liveUrl: "https://secure-data-wiping-jmb7.vercel.app",
    // The landing page, not the dashboard: the dashboard capture showed a real
    // signed-in account (another person's name and device records).
    screenshot: "/images/projects/securewipe.png",
    screenshotAlt:
      "SecureWipe landing page headed 'Certified Data Erasure You Can Prove', with NIST 800-88 and DoD 5220.22-M compliance badges.",
    icon: "securewipe",
  },
];
