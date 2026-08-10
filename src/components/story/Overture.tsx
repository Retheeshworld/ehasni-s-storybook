import { useEffect, useState } from "react";
import { getAmbience } from "@/lib/audio";

const LINES = [
  "I made something for you…",
  "But before you see it…",
  "I want you to remember something.",
  "Every beautiful story begins with a moment.",
];

/** SCENE 01 — THE MYSTERY */
export function Overture({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (step >= LINES.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 1600 : 2900);
    return () => window.clearTimeout(id);
  }, [step]);

  const enter = () => {
    const a = getAmbience();
    a.heartbeat();
    a.start();
    setLeaving(true);
    window.setTimeout(onEnter, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black px-8 transition-opacity duration-[1200ms] ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="ember" />
      <div className="relative flex min-h-[14rem] w-full max-w-md flex-col items-center justify-center gap-5 text-center">
        {LINES.map((line, i) => (
          <p
            key={line}
            className={`font-display text-balance text-2xl leading-snug text-[var(--ink)] transition-all duration-[1600ms] sm:text-3xl ${
              step > i ? "opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[6px]"
            } ${step > i + 1 && i < 2 ? "hidden" : ""}`}
          >
            {line}
          </p>
        ))}
      </div>

      <button
        onClick={enter}
        className={`enter-btn mt-14 transition-all duration-1000 ${
          step >= LINES.length ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        ENTER THE STORY <span aria-hidden>→</span>
      </button>
      <p
        className={`mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-ink)] transition-opacity duration-1000 ${
          step >= LINES.length ? "opacity-70" : "opacity-0"
        }`}
      >
        best with sound on
      </p>
    </div>
  );
}
