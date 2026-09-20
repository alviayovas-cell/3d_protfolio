import { Camera, Cpu, MonitorSmartphone } from "lucide-react";

/**
 * Sentinel has no screenshot — it's in-progress hardware, and a stock robot photo
 * would imply a prototype that isn't Alvia's. This draws the pipeline he actually
 * specified instead, straight from the résumé: vision on edge hardware, an
 * ESP32-driven segregation mechanism, and MQTT telemetry to a FastAPI/React monitor.
 *
 * Original artwork, accurate to the documented design, and more informative than a
 * photograph would have been.
 */
const STAGES = [
  {
    icon: Camera,
    label: "Vision",
    parts: ["YOLOv8n", "MobileNetV2", "TensorFlow Lite"],
  },
  {
    icon: Cpu,
    label: "Edge & control",
    parts: ["Raspberry Pi", "Jetson Nano", "ESP32 / Arduino"],
  },
  {
    icon: MonitorSmartphone,
    label: "Monitoring",
    parts: ["FastAPI", "React dashboard"],
  },
];

export function SentinelDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div aria-hidden="true" className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-iris-600/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full bg-azure-600/20 blur-3xl" />

      <p className="relative font-display text-[0.65rem] uppercase tracking-[0.2em] text-mist-600">
        System pipeline
      </p>

      <ol className="relative mt-4 list-none space-y-2.5">
        {STAGES.map((stage, i) => (
          <li key={stage.label}>
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-iris-400/25 bg-iris-500/10">
                <stage.icon size={16} className="text-iris-300" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm text-mist-100">{stage.label}</span>
                <span className="block truncate text-[0.7rem] text-mist-600">
                  {stage.parts.join(" · ")}
                </span>
              </span>
            </div>

            {i < STAGES.length - 1 && (
              <div aria-hidden="true" className="flex items-center gap-2 pl-[1.15rem] pt-1.5">
                <span className="h-4 w-px bg-gradient-to-b from-iris-400/50 to-azure-400/30" />
                <span className="text-[0.6rem] uppercase tracking-[0.16em] text-mist-600">
                  {i === 0 ? "classify" : "MQTT"}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
