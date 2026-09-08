import { useState } from "react";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** One-time WebGL capability check — gates the R3F scene vs the CSS-only fallback, checked synchronously so there's no flash of one then the other. */
export function useWebGLSupport(): boolean {
  const [supported] = useState(() => (typeof window !== "undefined" ? detectWebGL() : false));
  return supported;
}
