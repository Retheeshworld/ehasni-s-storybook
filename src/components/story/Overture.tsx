import { useEffect, useState } from "react";
import { getAmbience } from "@/lib/audio";
import { her } from "@/story/content";

const LINES = [
  "This isn't a birthday website.",
  "It's a story.",
  "A story about a boy who never planned to write a love story…",
  "Until one person walked into his life.",
];

/** OPENING — THE MYSTERY */
export function Overture({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const nameStep = LINES.length;
  const done = step > nameStep;

  useEffect(() => {
    if (step > nameStep) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 1400 : 2800);
    return () => window.clearTimeout(id);
  }, [step, nameStep]);

  const enter = () => {
    getAmbience().heartbeat();
    setLeaving(true);
    window.setTimeout(onEnter, 1200);
  };


  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-y-auto bg-black px-8 transition-opacity duration-[1200ms] ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className={`ember transition-opacity duration-[2500ms] ${step >= 3 ? "opacity-100" : "opacity-0"}`} />
      <div className="relative flex min-h-[16rem] w-full max-w-md flex-col items-center justify-center gap-5 text-center">
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

        <p
          className={`gold-text mt-6 font-display text-5xl tracking-[0.25em] transition-all duration-[2200ms] sm:text-6xl ${
            step >= nameStep ? "opacity-100 blur-0" : "opacity-0 blur-[10px]"
          }`}
        >
          {her.toUpperCase()}
        </p>
      </div>

      <button
        onClick={enter}
        className={`enter-btn mt-14 transition-all duration-1000 ${
          done ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        BEGIN THE STORY <span aria-hidden>→</span>
      </button>
      <p
        className={`mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-ink)] transition-opacity duration-1000 ${
          done ? "opacity-70" : "opacity-0"
        }`}
      >
        best with sound on
      </p>
    </div>
  );
}
