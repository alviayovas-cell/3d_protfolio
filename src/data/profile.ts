/** Single source of truth for identity/contact facts reused across the site (hero, footer, contact, SEO). */
export const PROFILE = {
  firstName: "Alvia",
  lastName: "Yovas",
  fullName: "Alvia Yovas S",
  displayName: "Alvia Yovas",
  role: "AI & Full Stack Developer",
  secondaryRole: "Computer Science Engineering Student",
  /** Cycled by the hero's typing line ("I'm a …"). */
  roles: ["AI & Full Stack Developer", "Full Stack Web Developer", "Applied AI Builder", "Embedded & IoT Tinkerer"],
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
  /** AvatarStage's crop and blink positions are tuned to this exact photo. */
  avatarSrc: "/images/alvia-avatar.jpg",
} as const;
