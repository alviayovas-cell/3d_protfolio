/**
 * Training and certifications, taken verbatim from Alvia's résumé.
 *
 * No credential IDs or verification URLs are shown because none were listed. Add
 * `credentialUrl` here if one exists and the card will link to it.
 */
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  period: string;
  summary: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "full-stack-sla",
    title: "Full Stack Web Development",
    issuer: "SLA (Virtual)",
    period: "Jan 2025 – Jul 2025",
    summary:
      "HTML, CSS, JavaScript, React, Node.js and Express.js with database integration, plus REST APIs and authentication basics.",
  },
  {
    id: "dca-csc",
    title: "Diploma in Computer Applications (DCA)",
    issuer: "CSC, Nagapattinam",
    period: "Jan 2021 – Jan 2022",
    summary:
      "Fundamentals of computer systems, MS Office, basic programming and internet technologies.",
  },
];
