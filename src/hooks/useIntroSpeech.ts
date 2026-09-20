import { useEffect, useSyncExternalStore } from "react";
import {
  getIntroSpeaking,
  getIntroSpeakingServer,
  startIntro,
  subscribeToIntro,
} from "../lib/introSpeech";

/**
 * Kicks off the one-time spoken intro and reports whether it's currently speaking,
 * so the avatar can change state while it talks. All the lifecycle lives in the
 * controller — this hook never cancels on unmount, which is what keeps StrictMode's
 * double-mount from silencing the intro.
 */
export function useIntroSpeech(): { speaking: boolean } {
  const speaking = useSyncExternalStore(subscribeToIntro, getIntroSpeaking, getIntroSpeakingServer);

  useEffect(() => {
    startIntro();
  }, []);

  return { speaking };
}
