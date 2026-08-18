import { useEffect, useRef, useState } from "react";
import { Reveal, Scene, SceneLabel } from "./Reveal";
import { PhotoViewer } from "./PhotoViewer";
import { getAmbience } from "@/lib/audio";
import { doors, happyCards, letter, photos, reasons } from "@/story/content";
import { BlueCat, BlueCatDoor, type CatMood } from "./BlueCatDoor";

/** Scene 09 doors: A Memory, A Secret, A Surprise */
const DOOR_MOODS: CatMood[] = ["memory", "secret", "surprise"];

/** SCENE 05 — THE MEMORY MONTAGE */
export function SceneMontage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Scene id="montage" full={false}>
      <SceneLabel>Scene 05 — The Memory Montage</SceneLabel>
      <Reveal className="mb-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Then came the memories…</h2>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-ink)]">swipe · tap to enlarge</p>
      </Reveal>

      <div className="filmstrip w-screen max-w-none">
        {photos.map((p, i) => (
          <button key={p.src} className="film-frame" onClick={() => setOpen(i)}>
            <img src={p.src} alt={p.caption} loading="lazy" className="kenburns" />
            <span className="film-caption">{p.caption}</span>
          </button>
        ))}
      </div>

      <PhotoViewer photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Scene>
  );
}

/** SCENE 06 — THE HAPPY MOMENTS */
export function SceneHappy() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Scene id="happy">
      <SceneLabel>Scene 06 — The Happy Moments</SceneLabel>
      <Reveal className="mb-12 max-w-xl text-center">
        <h2 className="font-display text-3xl leading-snug text-balance sm:text-4xl">
          And then… there were the moments that made me smile.
        </h2>
      </Reveal>
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {happyCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 120}>
            <button
              className={`happy-card ${open === i ? "is-open" : ""}`}
              onClick={() => {
                getAmbience().chime();
                setOpen(open === i ? null : i);
              }}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="mt-3 block font-display text-xl">{c.title}</span>
              <span className="happy-body">{c.text}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </Scene>
  );
}

/** SCENE 07 — THE EMOTIONAL PAUSE */
export function ScenePause() {
  const lines = [
    "But somewhere between all those moments…",
    "You became more than just a memory.",
    "You became a part of my story.",
  ];
  return (
    <Scene id="pause" className="text-center">
      <div className="soft-light" />
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * 700} className="my-8">
          <p className="font-display text-2xl leading-relaxed text-balance text-[var(--ink)]/90 sm:text-3xl">{l}</p>
        </Reveal>
      ))}
      <Reveal delay={2400} className="mt-12">
        <p className="gold-text font-display text-xl sm:text-2xl">
          And that's something I'll always be grateful for.
        </p>
      </Reveal>
    </Scene>
  );
}

/** SCENE 08 — THE LOVE LETTER */
export function SceneLetter() {
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!opened) return;
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setTyped(letter.slice(0, i));
      if (i >= letter.length && timer.current) window.clearInterval(timer.current);
    }, 26);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [opened]);

  return (
    <Scene id="letter">
      <SceneLabel>Scene 08 — The Love Letter</SceneLabel>
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Something I've always wanted to say…</h2>
      </Reveal>

      {!opened ? (
        <Reveal delay={200} className="flex flex-col items-center">
          <div className="envelope" aria-hidden>
            <span className="envelope-flap" />
            <span className="envelope-seal">R</span>
          </div>
          <button
            className="enter-btn mt-10"
            onClick={() => {
              getAmbience().chime();
              setOpened(true);
            }}
          >
            OPEN LETTER 💌
          </button>
        </Reveal>
      ) : (
        <article className="letter-paper animate-scale-in">
          <p className="whitespace-pre-line font-hand text-[1.05rem] leading-8 text-[#3a2419]">
            {typed}
            <span className="caret" />
          </p>
        </article>
      )}
    </Scene>
  );
}

/** SCENE 09 — INTERACTIVE LOVE */
export function SceneDoors({ onSecret }: { onSecret: () => void }) {
  const [open, setOpen] = useState<number[]>([]);
  return (
    <Scene id="doors">
      <SceneLabel>Scene 09 — Let's Play A Little Game…</SceneLabel>
      <Reveal className="mb-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Choose a door.</h2>
      </Reveal>
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {doors.map((d, i) => {
          const isOpen = open.includes(i);
          return (
            <button
              key={d.n}
              className={`door ${isOpen ? "is-open" : ""}`}
              onClick={() => {
                if (isOpen) return;
                getAmbience().chime();
                setOpen((o) => [...o, i]);
                if (i === 1) onSecret();
              }}
            >
              <span className="door-panel">
                <BlueCat size={58} excited={isOpen} mood={DOOR_MOODS[i] ?? "memory"} />
                <span className="text-2xl">🚪</span>
                <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">
                  Door {d.n}
                </span>
                <span className="mt-1 block font-display text-xl">{d.kind}</span>
              </span>
              <span className="door-inside">{d.reveal}</span>
            </button>
          );
        })}
      </div>
    </Scene>
  );
}

/** SCENE 10 — THE SECRET ROOM */
export function SceneSecretRoom({ unlocked }: { unlocked: boolean }) {
  return (
    <Scene id="secret-room" className="text-center">
      <div className={`secret-room ${unlocked ? "is-unlocked" : ""}`}>
        {!unlocked ? (
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted-ink)]">
            🔒 Something here is still locked… open Door 02.
          </p>
        ) : (
          <>
            <Reveal>
              <p className="font-display text-2xl leading-relaxed text-balance sm:text-3xl">
                You found something I wasn't planning to show you…
              </p>
            </Reveal>
            <div className="my-12 flex flex-wrap justify-center gap-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="tiny-star" style={{ animationDelay: `${i * 0.24}s` }} />
              ))}
            </div>
            <Reveal delay={400}>
              <p className="font-display text-xl text-[var(--ink)]/85">
                There are some feelings that are difficult to explain.
              </p>
            </Reveal>
            <Reveal delay={800}>
              <p className="gold-text mt-4 font-display text-2xl">
                So I turned mine into this little world for you.
              </p>
            </Reveal>
          </>
        )}
      </div>
    </Scene>
  );
}

/** Scene 11 reason cards cycle through warm tones */
const REASON_MOODS: CatMood[] = ["smile", "love", "moment", "memory", "love", "surprise"];

/** SCENE 11 — REASONS */
export function SceneReasons() {
  return (
    <Scene id="reasons">
      <SceneLabel>Scene 11 — Reasons</SceneLabel>
      <Reveal className="mb-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Reasons Why You Are Special</h2>
      </Reveal>
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {reasons.map((r, i) => (
          <Reveal key={r} delay={i * 90} className={i === reasons.length - 1 ? "col-span-2 sm:col-span-3" : ""}>
            <div className="reason-card">
              <BlueCat size={46} mood={REASON_MOODS[i % REASON_MOODS.length]} />
              <span className="reason-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-lg leading-snug">{r}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <BlueCatDoor
        line="One last door… this one is from Retheesh. ❤️"
        mood="love"
        doorLabel="A door from Retheesh"
        message="Happy birthday, Ehasni. You are my favorite reason to smile — today and every chapter after this."
      />
    </Scene>
  );
}

/** SCENE 12 — THE PROMISE */
export function ScenePromise() {
  const lines = [
    "I can't predict what tomorrow will bring.",
    "But I know one thing…",
    "I want to keep creating beautiful memories.",
  ];
  return (
    <Scene id="promise" className="text-center">
      <SceneLabel>Scene 12 — The Promise</SceneLabel>
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * 600} className="my-7">
          <p className="font-display text-2xl leading-relaxed text-balance sm:text-3xl">{l}</p>
        </Reveal>
      ))}
      <Reveal delay={2000} className="mt-10">
        <p className="gold-text font-display text-3xl sm:text-4xl">One chapter at a time.</p>
      </Reveal>
    </Scene>
  );
}
