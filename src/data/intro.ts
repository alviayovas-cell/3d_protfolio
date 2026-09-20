import { PROFILE } from "./profile";

/**
 * The spoken introduction. Written to be *heard*, not read — "A.I." is spelled with
 * periods so speech engines say the letters instead of rhyming it with "hay", and the
 * whole script is kept under ~15s because Chrome silently cuts long utterances off.
 */
export const INTRO_SPEECH = {
  text:
    `Hi, I'm ${PROFILE.displayName}. I'm an A.I. and full stack developer based in ${PROFILE.location}. ` +
    `I build intelligent applications and modern web experiences — from A.I. powered platforms ` +
    `to complete full stack products. Feel free to look around.`,
  /** Preferred voice locales, best first; falls back to the browser default if none match. */
  preferredLocales: ["en-IN", "en-GB", "en-US", "en"],
  rate: 0.98,
  pitch: 1,
  volume: 1,
} as const;
