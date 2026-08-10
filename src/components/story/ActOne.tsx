import { useState } from "react";
import { Reveal, Scene, SceneLabel } from "./Reveal";
import { getAmbience } from "@/lib/audio";
import { chapterOne, discoveryCards, her } from "@/story/content";

/** SCENE 02 — CURIOSITY */
export function SceneCuriosity() {
  const words = ["A smile.", "A conversation.", "A memory.", "A person."];
  return (
    <Scene id="curiosity">
      <SceneLabel>Scene 02 — Curiosity</SceneLabel>
      <div className="flex flex-col items-center gap-4">
        {words.map((w, i) => (
          <Reveal key={w} delay={i * 260}>
            <span className="drift font-display text-xl text-[var(--ink)]/80 sm:text-2xl" style={{ animationDelay: `${i * 0.8}s` }}>
              {w}
            </span>
          </Reveal>
        ))}
      </div>
      <Reveal delay={500} className="mt-16 max-w-xl text-center">
        <p className="font-display text-2xl leading-relaxed text-balance sm:text-3xl">
          Sometimes, one person can quietly become your favorite part of life.
        </p>
      </Reveal>
      <Reveal delay={900} className="mt-10 text-center">
        <p className="gold-text font-display text-3xl sm:text-4xl">For me, that person is you.</p>
      </Reveal>
    </Scene>
  );
}

/** SCENE 03 — DISCOVERY */
export function SceneDiscovery() {
  const [open, setOpen] = useState<number[]>([]);
  const all = open.length === discoveryCards.length;

  const toggle = (i: number) => {
    if (open.includes(i)) return;
    getAmbience().chime();
    setOpen((o) => [...o, i]);
  };

  return (
    <Scene id="discovery">
      <SceneLabel>Scene 03 — Discovery</SceneLabel>
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Open them, one by one.</h2>
        <p className="mt-3 text-sm text-[var(--muted-ink)]">
          {open.length} / {discoveryCards.length} revealed
        </p>
      </Reveal>

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {discoveryCards.map((c, i) => {
          const isOpen = open.includes(i);
          return (
            <button
              key={c.title}
              onClick={() => toggle(i)}
              className={`memory-card ${isOpen ? "is-open" : ""} ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <span className="card-title">{c.title}</span>
              <span className="card-body">
                {isOpen ? c.back : c.front}
              </span>
              {!isOpen && <span className="card-hint">tap to open</span>}
            </button>
          );
        })}
      </div>

      <div className={`mt-14 text-center transition-all duration-1000 ${all ? "opacity-100" : "translate-y-3 opacity-0"}`}>
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted-ink)]">And this story has a name.</p>
        <p className="gold-text mt-4 font-display text-5xl sm:text-6xl">{her} ❤️</p>
      </div>
    </Scene>
  );
}

/** SCENE 04 — THE FIRST CHAPTER */
export function SceneChapterOne() {
  return (
    <Scene id="chapter-one">
      <Reveal className="text-center">
        <p className="scene-label">Chapter 01</p>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl">The Beginning</h2>
      </Reveal>
      <Reveal delay={300} className="mt-8 text-center">
        <p className="font-display text-xl text-[var(--ink)]/85">Every story has a beginning.</p>
        <p className="gold-text font-display text-2xl">This is ours.</p>
      </Reveal>

      <ol className="timeline mt-16 w-full max-w-lg">
        {chapterOne.map((item, i) => (
          <Reveal as="div" key={item.label} delay={i * 180}>
            <li className="timeline-item">
              <span className="timeline-dot" />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">{item.label}</p>
              <p className="mt-1 font-display text-xl text-[var(--ink)]">{item.value}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Scene>
  );
}
