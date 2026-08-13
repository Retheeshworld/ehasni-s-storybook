import { useEffect, useState } from "react";
import { Reveal, Scene, SceneLabel } from "./Reveal";
import { getAmbience } from "@/lib/audio";
import { her, him } from "@/story/content";

type HeartLetter = {
  n: string;
  tease?: string[];
  lines: string[];
  sign: string;
  cta: string;
};

const letters: HeartLetter[] = [
  {
    n: "01",
    lines: [
      "Do you know what I love most?",
      "It isn't one particular moment.",
      "It's all the little moments that somehow became my favorite memories…",
      "because you were in them.",
    ],
    sign: "— Retheesh ❤️",
    cta: "NEXT HEART →",
  },
  {
    n: "02",
    tease: ["One down…", "Four more little pieces of my heart."],
    lines: [
      "I don't think you realize how often you make me smile without even trying.",
      "Sometimes it's your words.",
      "Sometimes it's your smile.",
      "Sometimes it's simply knowing that you're there.",
      "And honestly… that's pretty special to me.",
    ],
    sign: "— Retheesh ❤️",
    cta: "OPEN THE NEXT ONE →",
  },
  {
    n: "03",
    tease: ["Two down…", "Three little pieces left."],
    lines: [
      "If I could keep one thing forever…",
      "it wouldn't be a photograph.",
      "It wouldn't be a place.",
      "It would be a moment… where we're both laughing,",
      "and for a few seconds, nothing else in the world matters.",
    ],
    sign: "— Retheesh",
    cta: "NEXT ❤️",
  },
  {
    n: "04",
    tease: ["Three down…", "Two left. Stay with me."],
    lines: [
      "There are so many things I haven't told you.",
      "How much I appreciate you.",
      "How much your presence means to me.",
      "How many little memories I secretly keep in my heart.",
      "Maybe I don't say it enough… but you matter to me more than you know.",
    ],
    sign: "— Retheesh ❤️",
    cta: "ONE MORE…",
  },
  {
    n: "05",
    tease: ["Four down…", "This is the last one."],
    lines: [
      `${her}…`,
      "If you ever wonder what my favorite story is…",
      "It's the one where I met you.",
      "I don't know what every future page will look like.",
      "But I know… I want to keep writing them with you.",
      "This isn't the end of our story.",
      "The next page is still waiting.",
      "❤️",
      `Happy Birthday, ${her}.`,
    ],
    sign: `— ${him.split(" ")[0]}`,
    cta: "CLOSE MY HEART ❤️",
  },
];

function GoldenDust({ dense = false }: { dense?: boolean }) {
  const count = dense ? 34 : 18;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="dust-mote"
          style={{
            left: `${(i * 41) % 100}%`,
            top: `${(i * 67) % 100}%`,
            animationDelay: `${(i % 9) * 0.8}s`,
            animationDuration: `${8 + (i % 7)}s`,
          }}
        />
      ))}
    </div>
  );
}

function HeartShape({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`heart-shape ${className}`} aria-hidden>
      <span className="heart-body" />
      <span className="heart-num">{label}</span>
    </span>
  );
}

export function SceneFiveHearts() {
  const [phase, setPhase] = useState<"intro" | "choose" | "reading" | "done">("intro");
  const [unlocked, setUnlocked] = useState(0); // index of the currently openable heart
  const [reading, setReading] = useState<number | null>(null);
  const [opening, setOpening] = useState(false);
  const [thanks, setThanks] = useState<"hidden" | "teaser" | "shown">("hidden");

  useEffect(() => {
    if (phase !== "done") return;
    const t = window.setTimeout(() => setThanks("teaser"), 3000);
    return () => window.clearTimeout(t);
  }, [phase]);

  const openHeart = (i: number) => {
    if (i !== unlocked || opening) return;
    getAmbience().heartbeat();
    if (navigator.vibrate) navigator.vibrate(i === 4 ? [40, 80, 60] : 30);
    setOpening(true);
    setPhase("reading");
    window.setTimeout(
      () => {
        setReading(i);
        setOpening(false);
        getAmbience().chime();
      },
      i === 4 ? 1600 : i === 2 ? 1200 : 900,
    );
  };

  const next = () => {
    const i = reading!;
    setReading(null);
    if (i === 4) {
      setPhase("done");
    } else {
      setUnlocked(i + 1);
      setPhase("choose");
    }
  };

  const current = reading !== null ? letters[reading] : null;
  const isFinal = reading === 4;

  return (
    <Scene id="open-them" className="text-center">
      <SceneLabel>Open Them, One By One ❤️</SceneLabel>
      <div className={`hearts-stage ${opening ? "is-opening" : ""} ${isFinal ? "is-final" : ""}`}>
        <GoldenDust dense={isFinal} />

        {/* INTRO */}
        {phase === "intro" && (
          <div className="relative z-10 flex flex-col items-center">
            <Reveal>
              <p className="font-display text-2xl text-balance sm:text-3xl">
                Some things are difficult to say…
              </p>
            </Reveal>
            <Reveal delay={900} className="mt-6">
              <p className="font-display text-2xl text-balance sm:text-3xl">So I wrote them down.</p>
            </Reveal>
            <Reveal delay={1800} className="mt-8">
              <p className="gold-text font-display text-2xl sm:text-3xl">Open them, one by one.</p>
            </Reveal>
            <Reveal delay={2400} className="mt-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-ink)]">
                Take your time. ❤️
              </p>
            </Reveal>
            <Reveal delay={2900} className="mt-10">
              <button
                className="enter-btn"
                onClick={() => {
                  getAmbience().chime();
                  setPhase("choose");
                }}
              >
                START
              </button>
            </Reveal>
          </div>
        )}

        {/* CHOOSE */}
        {(phase === "choose" || opening) && (
          <div className="relative z-10 flex w-full flex-col items-center">
            {letters[unlocked]?.tease && !opening && (
              <div className="mb-8">
                {letters[unlocked].tease.map((t, i) => (
                  <Reveal key={t} delay={i * 500}>
                    <p className="font-display text-lg text-[var(--ink)]/85 sm:text-xl">{t}</p>
                  </Reveal>
                ))}
              </div>
            )}
            <p className="progress-pill">❤️ {unlocked + 1} / 5</p>
            <div className="hearts-row">
              {letters.map((l, i) => {
                const state = i < unlocked ? "opened" : i === unlocked ? "ready" : "locked";
                return (
                  <button
                    key={l.n}
                    className={`heart-btn is-${state} ${i === 4 ? "is-last" : ""} ${
                      opening && i === unlocked ? "is-bursting" : ""
                    }`}
                    disabled={state !== "ready"}
                    onClick={() => openHeart(i)}
                    aria-label={`Heart ${l.n}`}
                  >
                    <HeartShape label={l.n} />
                    <span className="heart-caption">
                      {state === "ready"
                        ? i === 4
                          ? "THE LAST ONE"
                          : "Open me"
                        : state === "opened"
                          ? "opened"
                          : "locked"}
                    </span>
                    <span className="heart-sparks" aria-hidden>
                      {Array.from({ length: 6 }).map((_, s) => (
                        <i key={s} style={{ animationDelay: `${s * 0.18}s` }} />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* READING */}
        {current && (
          <div className={`relative z-10 w-full ${isFinal ? "final-veil" : ""}`}>
            <div className="letter-glow" aria-hidden />
            <article className="heart-card animate-scale-in">
              <span className="heart-card-num">{current.n}</span>
              {current.lines.map((line, i) => (
                <Reveal key={line + i} delay={300 + i * 650}>
                  <p
                    className={`mt-4 font-display leading-relaxed text-balance ${
                      isFinal && i >= current.lines.length - 2
                        ? "gold-text text-2xl sm:text-3xl"
                        : "text-lg text-[var(--ink)]/90 sm:text-xl"
                    }`}
                  >
                    {line}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={400 + current.lines.length * 650}>
                <p className="mt-8 font-hand text-lg text-[var(--gold-soft)]">{current.sign}</p>
              </Reveal>
              <Reveal delay={700 + current.lines.length * 650}>
                <button className="enter-btn mt-10" onClick={next}>
                  {current.cta}
                </button>
              </Reveal>
            </article>
          </div>
        )}

        {/* DONE */}
        {phase === "done" && (
          <div className="relative z-10 flex flex-col items-center">
            <p className="progress-pill">❤️ 5 / 5</p>
            <Reveal>
              <p className="gold-text mt-6 font-display text-3xl sm:text-4xl">
                YOU OPENED ALL FIVE ❤️
              </p>
            </Reveal>
            {thanks !== "hidden" && (
              <div className="mt-14 flex flex-col items-center">
                <Reveal>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted-ink)]">
                    One last thing…
                  </p>
                </Reveal>
                {thanks === "teaser" ? (
                  <button
                    className="heart-btn is-ready mt-8 scale-90"
                    onClick={() => {
                      getAmbience().chime();
                      if (navigator.vibrate) navigator.vibrate(24);
                      setThanks("shown");
                    }}
                    aria-label="One last heart"
                  >
                    <HeartShape label="❤" />
                    <span className="heart-caption">tap me</span>
                  </button>
                ) : (
                  <article className="heart-card animate-scale-in mt-8">
                    <Reveal>
                      <p className="font-display text-xl text-balance sm:text-2xl">
                        Thank you for opening every little piece of my heart.
                      </p>
                    </Reveal>
                    <Reveal delay={1200}>
                      <p className="gold-text mt-6 font-display text-2xl">
                        Now go enjoy your birthday. ❤️
                      </p>
                    </Reveal>
                  </article>
                )}
              </div>
            )}
            <p className="mt-16 text-[0.6rem] uppercase tracking-[0.35em] text-[var(--muted-ink)]">
              keep scrolling — the countdown begins
            </p>
          </div>
        )}
      </div>
    </Scene>
  );
}
