import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { PROFILE } from "../../data/profile";
import { sectionHref } from "../../lib/routes";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

/**
 * In-app 404 — an unknown /projects/<id>, or any unknown path in dev. On Vercel, paths
 * with no prerendered page get public/404.html instead; this mirrors it.
 */
export function NotFound() {
  useEffect(() => {
    document.title = `Page not found | ${PROFILE.displayName}`;
  }, []);

  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <Container narrow className="text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-iris-400">404 · Not found</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] text-mist-50 sm:text-5xl">
          This page doesn't exist
        </h1>
        <p className="mt-4 text-mist-400">The link may be old or mistyped.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Go to the home page
          </Button>
          <Button href={sectionHref("projects")} variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
            See my projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
