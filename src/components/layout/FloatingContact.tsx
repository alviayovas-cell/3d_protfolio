import { Mail } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { WhatsappIcon } from "../ui/BrandIcons";

/** wa.me wants the number as bare digits with country code, e.g. 919342805727. */
const WHATSAPP_URL = `https://wa.me/${PROFILE.phone.replace(/\D/g, "")}`;

const bubble =
  "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iris-400 sm:h-14 sm:w-14";

/**
 * Always-visible quick-contact bubbles, bottom-right. Brand colours are fixed rather
 * than themed: WhatsApp green is what makes the button instantly recognisable. Sits
 * below the mobile menu (z-40) so the open menu covers it.
 */
export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-3 sm:bottom-8 sm:right-6 sm:gap-4">
      <a href={`mailto:${PROFILE.email}`} aria-label={`Email ${PROFILE.displayName}`} title="Email me" className={`${bubble} bg-[#0f766e]`}>
        <Mail size={22} strokeWidth={1.75} />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${PROFILE.displayName} on WhatsApp`}
        title="Chat on WhatsApp"
        className={`${bubble} bg-[#25d366]`}
      >
        <WhatsappIcon size={26} />
      </a>
    </div>
  );
}
