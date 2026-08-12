import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  finalStructure,
  generationRules,
  globalVideoStyle,
  videoPrompts,
  voiceoverScript,
} from "@/story/videoPrompts";

const title = "Creator Panel — Cinematic Video Prompts for Ehasni's Story";
const description =
  "Edit, copy and export the 12 cinematic AI video prompts, global style, voiceover script and final edit structure for Ehasni's birthday movie.";

export const Route = createFileRoute("/creator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatorPanel,
});

const STORE_KEY = "creator-video-prompts-v1";

type Draft = { style: string; scenes: Record<string, string>; voiceover: string };

const initialDraft = (): Draft => ({
  style: globalVideoStyle,
  scenes: Object.fromEntries(videoPrompts.map((p) => [p.id, p.prompt])),
  voiceover: voiceoverScript,
});

function CreatorPanel() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) setDraft({ ...initialDraft(), ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORE_KEY, JSON.stringify(draft));
  }, [draft, hydrated]);

  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
  };

  const fullPrompt = (id: string) => {
    const scene = videoPrompts.find((p) => p.id === id)!;
    return `${draft.scenes[id]}\n\nSTYLE: ${draft.style}\n\nDURATION: ${scene.duration}s. No text, no subtitles, no watermark.`;
  };

  const exportAll = () => {
    const body = [
      "GLOBAL VIDEO STYLE",
      draft.style,
      "",
      ...videoPrompts.flatMap((p) => [
        `SCENE ${p.n} — ${p.title.toUpperCase()} (${p.duration}s)`,
        draft.scenes[p.id],
        "",
      ]),
      "VOICEOVER",
      draft.voiceover,
      "",
      "FINAL VIDEO STRUCTURE",
      ...finalStructure,
      "",
      "RULES",
      ...generationRules,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ehasni-story-video-prompts.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const box =
    "w-full rounded-xl border border-[var(--ink)]/15 bg-black/40 p-4 text-sm leading-relaxed text-[var(--ink)]/85 outline-none focus:border-[var(--gold,#d9b46a)]/60";
  const btn =
    "rounded-full border border-[var(--ink)]/25 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-[var(--ink)]/80 transition hover:border-[var(--ink)]/60 hover:text-[var(--ink)]";

  return (
    <main className="min-h-screen bg-[var(--cine-deep)] px-5 py-16 text-[var(--ink)]">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[var(--muted-ink)]">Creator Panel</p>
        <h1 className="gold-text mt-4 font-display text-4xl sm:text-5xl">AI Video Story Prompts</h1>
        <p className="mt-4 text-sm text-[var(--muted-ink)]">
          Every prompt below is editable before generation and saved on this device. Copy a scene into your video
          generator, or export the whole script.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className={btn} onClick={exportAll}>
            Export all
          </button>
          <button className={btn} onClick={() => setDraft(initialDraft())}>
            Reset to defaults
          </button>
          <Link to="/" className={btn}>
            Back to the story
          </Link>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl">Global video style</h2>
          <p className="mt-1 text-xs text-[var(--muted-ink)]">Appended to every scene prompt when copied.</p>
          <textarea
            className={`${box} mt-4 min-h-40`}
            value={draft.style}
            onChange={(e) => setDraft((d) => ({ ...d, style: e.target.value }))}
          />
          <button className={`${btn} mt-3`} onClick={() => copy("style", draft.style)}>
            {copied === "style" ? "Copied ✓" : "Copy style"}
          </button>
        </section>

        <section className="mt-16 flex flex-col gap-10">
          <h2 className="font-display text-2xl">The 12 scenes</h2>
          {videoPrompts.map((p) => (
            <article key={p.id} className="rounded-2xl border border-[var(--ink)]/10 bg-white/[0.02] p-5">
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl">
                  <span className="gold-text">Scene {p.n}</span> — {p.title}
                </h3>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">
                  {p.duration} seconds
                </span>
              </header>
              <textarea
                className={`${box} mt-4 min-h-44`}
                value={draft.scenes[p.id] ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, scenes: { ...d.scenes, [p.id]: e.target.value } }))}
              />
              <div className="mt-3 flex flex-wrap gap-3">
                <button className={btn} onClick={() => copy(p.id, fullPrompt(p.id))}>
                  {copied === p.id ? "Copied ✓" : "Copy with style"}
                </button>
                <button className={btn} onClick={() => copy(`${p.id}-raw`, draft.scenes[p.id] ?? "")}>
                  {copied === `${p.id}-raw` ? "Copied ✓" : "Copy scene only"}
                </button>
                <button
                  className={btn}
                  onClick={() =>
                    setDraft((d) => ({ ...d, scenes: { ...d.scenes, [p.id]: p.prompt } }))
                  }
                >
                  Reset scene
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl">Voiceover story</h2>
          <textarea
            className={`${box} mt-4 min-h-80`}
            value={draft.voiceover}
            onChange={(e) => setDraft((d) => ({ ...d, voiceover: e.target.value }))}
          />
          <button className={`${btn} mt-3`} onClick={() => copy("vo", draft.voiceover)}>
            {copied === "vo" ? "Copied ✓" : "Copy voiceover"}
          </button>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl">Final video structure</h2>
          <ol className="mt-4 flex flex-col gap-3 text-sm text-[var(--ink)]/85">
            {finalStructure.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="gold-text font-display">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 mb-24">
          <h2 className="font-display text-2xl">Generation rules</h2>
          <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-[var(--ink)]/85">
            {generationRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
