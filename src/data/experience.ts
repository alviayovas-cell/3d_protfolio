/**
 * Roles and responsibilities, taken verbatim from Alvia's résumé
 * (`public/resume.pdf`). None of these are salaried employment, and the section
 * doesn't imply otherwise: each entry names its organisation — a hackathon team, a
 * college club, a department — so the nature of the role is clear on its face.
 *
 * Every bullet restates a line from the résumé. Nothing is inflated and no metric
 * appears here that isn't written there.
 */
export interface ExperienceEntry {
  id: string;
  role: string;
  organisation: string;
  /** Extra context shown next to the organisation, e.g. a sponsor or problem id. */
  detail?: string;
  period: string;
  current: boolean;
  points: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "sentinel-system-lead",
    role: "System Lead",
    organisation: "Sentinel — Autonomous Biomedical Waste Collection Robot",
    detail: "Smart India Hackathon · SIH26115 · Autodesk-sponsored",
    period: "2026",
    current: true,
    points: [
      "Leading a 6-person team designing an AI-powered mobile robot that navigates hospital wards to collect and segregate biomedical waste.",
      "Architecting the vision pipeline — YOLOv8n, MobileNetV2 and TensorFlow Lite — for waste-type classification on Raspberry Pi and Jetson Nano hardware.",
      "Specifying the ESP32/Arduino-driven segregation mechanism and the MQTT telemetry link to a FastAPI backend and React monitoring dashboard.",
      "Took the project from problem statement to a working concept prototype for the college-level round, ahead of the national Grand Finale.",
    ],
  },
  {
    id: "aws-club-technical-lead",
    role: "Technical Lead",
    organisation: "AWS Club, Jeppiaar Engineering College",
    // The résumé gives no dates for the club roles, so none are shown — the "Current"
    // badge carries the only timing claim that can be supported.
    period: "",
    current: true,
    points: [
      "Lead technical sessions and hands-on workshops on AWS cloud fundamentals for club members.",
      "Plan the club's technical roadmap and coordinate cloud-focused events and projects with the core team.",
    ],
  },
  {
    id: "department-events",
    role: "Event Coordinator",
    organisation: "Department activities, Jeppiaar Engineering College",
    period: "",
    current: false,
    points: [
      "Organised and coordinated coding competitions and hackathons at department level.",
      "Coordinated a department symposium — event planning, scheduling and team collaboration.",
    ],
  },
];
