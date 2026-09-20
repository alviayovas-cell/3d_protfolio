/** Single source of truth for identity/contact facts reused across the site (hero, footer, contact, SEO). */
export const PROFILE = {
  firstName: "Alvia",
  lastName: "Yovas",
  fullName: "Alvia Yovas S",
  displayName: "Alvia Yovas",
  role: "AI & Full Stack Developer",
  secondaryRole: "Computer Science Engineering Student",
  greeting: "Hello, I'm",
  tagline:
    "Computer Science Engineering student building intelligent applications, modern web experiences, and practical solutions with AI and full-stack technologies.",
  email: "alviayovas@gmail.com",
  /** From the résumé, which is published on the site anyway. Remove this line and the
   *  Contact section drops the phone row automatically. */
  phone: "+91 93428 05727",
  location: "Chennai, India",
  social: {
    github: "https://github.com/alviayovas-cell",
    linkedin: "https://www.linkedin.com/in/alviayovas",
    instagram: "https://instagram.com/alvia_yovas",
  },
  education: {
    degree: "B.E. Computer Science and Engineering",
    institution: "Jeppiaar Engineering College",
    years: "2024–2028",
  },
  /** Swap in the real asset at this path once available — every consumer reads from here. */
  avatarSrc: "/images/alvia-avatar.png",
} as const;
