import { INTRO_SPEECH } from "../data/intro";

/**
 * Plays the hero introduction once per page visit, with no visible controls.
 *
 * Deliberately a module-level singleton rather than effect-owned state: React
 * StrictMode mounts effects twice in dev, and an effect that spoke on mount and
 * cancelled on cleanup would either double-speak or never speak at all. The
 * controller owns its own lifecycle; the hook only subscribes to it.
 *
 * Autoplay is the other constraint — browsers refuse speech before a user gesture.
 * We attempt it anyway, detect the refusal (error event *or* silence), then retry
 * on the first activating gesture. Every failure path is silent: speech is a
 * flourish, and it must never surface an error or block the page.
 */

type Listener = () => void;

/** Gestures that actually grant user activation — scroll and wheel do not, so they're omitted. */
const GESTURE_EVENTS = ["pointerdown", "touchend", "keydown", "click"] as const;

/** Let the hero entrance animation land before the voice starts. */
const START_DELAY_MS = 2200;
/** If `onstart` hasn't fired by now, treat it as a blocked autoplay. */
const AUTOPLAY_PROBE_MS = 700;
/** Chrome stops synthesis after ~15s unless nudged. */
const KEEPALIVE_MS = 8000;
/** Non-activating gestures can burn attempts; cap the retries so we can't loop forever. */
const MAX_ATTEMPTS = 8;

const listeners = new Set<Listener>();
let speaking = false;
let phase: "idle" | "armed" | "speaking" | "done" = "idle";
let kickedOff = false;
let attempts = 0;
let keepAliveId: ReturnType<typeof setInterval> | undefined;

function emit() {
  for (const listener of listeners) listener();
}

function setSpeaking(next: boolean) {
  if (speaking === next) return;
  speaking = next;
  emit();
}

function synth(): SpeechSynthesis | undefined {
  return typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis
    : undefined;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = synth()?.getVoices() ?? [];
  if (voices.length === 0) return undefined;
  for (const locale of INTRO_SPEECH.preferredLocales) {
    const match = voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith(locale.toLowerCase()));
    if (match) return match;
  }
  return undefined;
}

function stopKeepAlive() {
  if (keepAliveId !== undefined) {
    clearInterval(keepAliveId);
    keepAliveId = undefined;
  }
}

function finish() {
  phase = "done";
  stopKeepAlive();
  setSpeaking(false);
  window.removeEventListener("keydown", onEscape);
  window.removeEventListener("pagehide", cancelIntro);
}

function onEscape(event: KeyboardEvent) {
  // No visible control, but leaving no way at all to stop autoplaying audio is
  // hostile (and a WCAG 1.4.2 problem). Escape is the invisible escape hatch.
  if (event.key === "Escape" && phase === "speaking") cancelIntro();
}

function cancelIntro() {
  try {
    synth()?.cancel();
  } catch {
    /* nothing to recover — we're stopping anyway */
  }
  finish();
}

function disarmGestureRetry(handler: () => void) {
  for (const type of GESTURE_EVENTS) window.removeEventListener(type, handler);
}

function armGestureRetry() {
  if (phase === "done" || phase === "armed") return;
  if (attempts >= MAX_ATTEMPTS) {
    finish();
    return;
  }
  phase = "armed";
  const handler = () => {
    disarmGestureRetry(handler);
    if (phase === "armed") {
      phase = "idle";
      attemptSpeak();
    }
  };
  for (const type of GESTURE_EVENTS) {
    window.addEventListener(type, handler, { passive: true });
  }
}

function attemptSpeak() {
  const speech = synth();
  if (!speech || phase === "done" || phase === "speaking") return;
  attempts += 1;

  let didStart = false;
  let utterance: SpeechSynthesisUtterance;
  try {
    utterance = new SpeechSynthesisUtterance(INTRO_SPEECH.text);
    const voice = pickVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = INTRO_SPEECH.rate;
    utterance.pitch = INTRO_SPEECH.pitch;
    utterance.volume = INTRO_SPEECH.volume;
  } catch {
    // Missing constructor, or a voice the engine rejects — stay silent, don't retry.
    finish();
    return;
  }

  utterance.onstart = () => {
    didStart = true;
    phase = "speaking";
    setSpeaking(true);
    stopKeepAlive();
    keepAliveId = setInterval(() => {
      try {
        speech.resume();
      } catch {
        /* keepalive is best-effort */
      }
    }, KEEPALIVE_MS);
  };

  utterance.onend = finish;

  utterance.onerror = () => {
    // Blocked before it ever spoke → wait for a gesture. Failed mid-sentence → let it go.
    if (didStart) finish();
    else armGestureRetry();
  };

  try {
    speech.cancel();
    speech.speak(utterance);
  } catch {
    armGestureRetry();
    return;
  }

  // Some browsers block silently: no start, no error. Probe for that.
  setTimeout(() => {
    if (didStart || phase === "speaking" || phase === "done") return;
    try {
      speech.cancel();
    } catch {
      /* ignore */
    }
    armGestureRetry();
  }, AUTOPLAY_PROBE_MS);
}

/** Idempotent — safe to call from every mount, including StrictMode's double-invoke. */
export function startIntro() {
  if (kickedOff) return;
  kickedOff = true;
  if (!synth()) return; // no SpeechSynthesis (or SSR): the site just stays silent

  window.addEventListener("keydown", onEscape);
  window.addEventListener("pagehide", cancelIntro);
  setTimeout(attemptSpeak, START_DELAY_MS);
}

export function subscribeToIntro(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getIntroSpeaking() {
  return speaking;
}

/** Server snapshot for useSyncExternalStore — nothing is ever speaking during SSR. */
export function getIntroSpeakingServer() {
  return false;
}
