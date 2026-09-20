import { Download, Eye, FileText, Mail } from "lucide-react";
import { PROFILE } from "../../../data/profile";
import { RESUME } from "../../../data/resume";
import { AnimatedText } from "../../ui/AnimatedText";
import { Button } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { GlassCard } from "../../ui/GlassCard";
import { SectionHeading } from "../../ui/SectionHeading";

/**
 * View / Download the résumé.
 *
 * The buttons are only rendered when `RESUME.available` is true — shipping "Download
 * Resume" that 404s is worse than saying the file isn't up yet, so the unavailable
 * state falls back to an email CTA instead.
 */
export function Resume() {
  return (
    <section
      id="resume"
      className="relative scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          eyebrow="Resume"
          title={
            <>
              The <span className="text-gradient">short version</span>
            </>
          }
        />

        <AnimatedText className="mt-14">
          <GlassCard padding="lg" className="lg:p-9">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-iris-400/25 bg-iris-500/10">
                  <FileText size={24} className="text-iris-300" />
                </span>
                <div>
                  <h3 className="font-display text-xl text-mist-50">
                    {PROFILE.fullName} — {PROFILE.role}
                  </h3>
                  <p className="mt-1 text-sm text-mist-400">
                    {RESUME.available
                      ? "Full background, skills and projects in one page."
                      : "The PDF isn't posted yet — email me and I'll send it straight over."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {RESUME.available ? (
                  <>
                    <Button
                      href={RESUME.path}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="primary"
                      size="md"
                      icon={<Eye size={16} />}
                      iconPosition="left"
                    >
                      View Resume
                    </Button>
                    <Button
                      href={RESUME.path}
                      download={RESUME.downloadName}
                      variant="secondary"
                      size="md"
                      icon={<Download size={16} />}
                      iconPosition="left"
                    >
                      Download Resume
                    </Button>
                  </>
                ) : (
                  <Button
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Resume request")}`}
                    variant="primary"
                    size="md"
                    icon={<Mail size={16} />}
                    iconPosition="left"
                  >
                    Request resume
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        </AnimatedText>
      </Container>
    </section>
  );
}
