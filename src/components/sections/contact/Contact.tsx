import { Mail, MapPin, Phone } from "lucide-react";
import { PROFILE } from "../../../data/profile";
import { AnimatedText } from "../../ui/AnimatedText";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../../ui/BrandIcons";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/**
 * Contact details, all from `PROFILE`. The phone row renders only when
 * `PROFILE.phone` is set — it came from the résumé, so removing that field is all it
 * takes to pull the number off the site.
 */
const SOCIALS = [
  { key: "github", label: "GitHub", handle: "alviayovas-cell", href: PROFILE.social.github, Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", handle: "alviayovas", href: PROFILE.social.linkedin, Icon: LinkedinIcon },
  { key: "instagram", label: "Instagram", handle: "alvia_yovas", href: PROFILE.social.instagram, Icon: InstagramIcon },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's <span className="text-gradient">talk</span>
            </>
          }
          description="The fastest way to reach me is email — I read everything that comes in."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedText>
            <GlassCard padding="lg" className="flex h-full flex-col justify-between gap-6 lg:p-8">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-iris-400/25 bg-iris-500/10">
                  <Mail size={20} className="text-iris-300" />
                </span>
                <h3 className="mt-4 font-display text-xl text-mist-50">Email</h3>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-1.5 inline-block break-all text-base text-mist-200 underline decoration-iris-400/40 underline-offset-4 transition-colors hover:text-mist-50 hover:decoration-iris-400"
                >
                  {PROFILE.email}
                </a>

                {PROFILE.phone && (
                  <p className="mt-5 flex items-center gap-2 text-sm text-mist-400">
                    <Phone size={16} className="text-iris-300" aria-hidden="true" />
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-mist-100"
                    >
                      {PROFILE.phone}
                    </a>
                  </p>
                )}

                <p className="mt-3 flex items-center gap-2 text-sm text-mist-400">
                  <MapPin size={16} className="text-iris-300" aria-hidden="true" />
                  {PROFILE.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href={`mailto:${PROFILE.email}`} variant="primary" size="md" icon={<Mail size={16} />} iconPosition="left">
                  Email me
                </Button>
                <Button href="#work-with-me" variant="secondary" size="md">
                  Start a project
                </Button>
              </div>
            </GlassCard>
          </AnimatedText>

          <AnimatedText delay={0.08}>
            <GlassCard padding="lg" className="h-full lg:p-8">
              <h3 className="font-display text-xl text-mist-50">Elsewhere</h3>
              <ul className="mt-5 list-none space-y-3">
                {SOCIALS.map(({ key, label, handle, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-iris-400/40 hover:bg-white/[0.05]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors group-hover:border-iris-400/30">
                        <Icon size={16} className="text-iris-300" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-mist-100">{label}</span>
                        <span className="block text-xs text-mist-600">{handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </AnimatedText>
        </div>

        <p className="mt-12 text-center text-xs text-mist-600">
          © {new Date().getFullYear()} {PROFILE.fullName}. Built with React, TypeScript and Three.js.
        </p>
      </Container>
    </section>
  );
}
