import { useEffect, useState } from "react";
import { Reveal, Scene, SceneLabel } from "./Reveal";
import { PhotoViewer } from "./PhotoViewer";
import { getAmbience } from "@/lib/audio";
import { birthday, birthdayLong, her, him, photos } from "@/story/content";

export function Confetti({ count = 60 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 12) * 0.45}s`,
            animationDuration: `${5 + (i % 6)}s`,
            background:
              i % 3 === 0 ? "var(--gold)" : i % 3 === 1 ? "var(--blush)" : "var(--burgundy-light)",
            transform: `rotate(${i * 23}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/** SCENE 13 — THE COUNTDOWN */
export function SceneCountdown() {
  const [n, setN] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = document.getElementById("countdown");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!armed) return;
    let v = 5;
    setN(5);
    getAmbience().heartbeat();
    const id = window.setInterval(() => {
      v -= 1;
      if (v <= 0) {
        setN(0);
        window.clearInterval(id);
      } else {
        setN(v);
        getAmbience().heartbeat();
      }
    }, 1100);
    return () => window.clearInterval(id);
  }, [armed]);

  return (
    <Scene id="countdown" className="text-center">
      <p className="font-display text-2xl text-[var(--ink)]/85">There is still one thing left…</p>
      <div className="mt-14 grid h-40 place-items-center">
        {n !== null && n > 0 && (
          <span key={n} className="count-number">{n}</span>
        )}
        {n === 0 && <span className="text-xs uppercase tracking-[0.4em] text-[var(--muted-ink)]">keep scrolling</span>}
      </div>
      <div className={`blackout ${n === 0 ? "is-on" : ""}`} />
    </Scene>
  );
}

/** SCENE 14 — THE BIRTHDAY REVEAL */
export function SceneBirthday() {
  return (
    <Scene id="birthday" className="relative text-center">
      <Confetti />
      <div className="glow-burst" />
      <Reveal>
        <h2 className="birthday-title">HAPPY BIRTHDAY</h2>
      </Reveal>
      <Reveal delay={400}>
        <p className="gold-text mt-4 font-display text-4xl sm:text-6xl">{her} ❤️</p>
      </Reveal>
      <Reveal delay={800}>
        <p className="mt-8 text-sm tracking-[0.45em] text-[var(--muted-ink)]">{birthday}</p>
      </Reveal>
      <Reveal delay={1200}>
        <p className="mt-10 font-display text-xl text-[var(--ink)]/85">Today, the world celebrates you.</p>
      </Reveal>
    </Scene>
  );
}

/** SCENE 15 — THE SECRET GIFT */
export function SceneGift() {
  const [open, setOpen] = useState(false);
  return (
    <Scene id="gift" className="relative text-center">
      <SceneLabel>Scene 15 — The Secret Gift</SceneLabel>
      {!open ? (
        <>
          <Reveal>
            <p className="font-display text-2xl">But wait…</p>
            <p className="gold-text mt-2 font-display text-xl">Your real surprise is inside.</p>
          </Reveal>
          <Reveal delay={300} className="mt-12 flex flex-col items-center">
            <div className="giftbox" aria-hidden>
              <span className="gift-lid" />
              <span className="gift-ribbon" />
            </div>
            <button
              className="enter-btn mt-12"
              onClick={() => {
                getAmbience().chime();
                setOpen(true);
              }}
            >
              OPEN IT 🎁
            </button>
          </Reveal>
        </>
      ) : (
        <div className="relative w-full animate-fade-in">
          <div className="flash" />
          <Confetti count={80} />
          <div className="gift-photos">
            {photos.map((p, i) => (
              <img key={p.src} src={p.src} alt={p.caption} loading="lazy" style={{ animationDelay: `${i * 0.18}s` }} />
            ))}
          </div>
          <p className="mt-12 font-display text-2xl text-balance sm:text-3xl">
            My favorite gift isn't something I can wrap.
          </p>
          <p className="gold-text mt-6 font-display text-xl sm:text-2xl">
            It's every beautiful memory we've created.
          </p>
        </div>
      )}
    </Scene>
  );
}

/** SCENE 16 — THE FINAL PHOTO FILM */
export function SceneFilm() {
  const [i, setI] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % photos.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Scene id="film" full={false}>
      <SceneLabel>Scene 16 — The Final Film</SceneLabel>
      <div className="film-stage" onClick={() => setViewer(i)}>
        {photos.map((p, idx) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.caption}
            loading="lazy"
            className={`film-slide ${idx === i ? "is-active" : ""}`}
          />
        ))}
        <span className="film-stage-caption">{photos[i]!.caption}</span>
      </div>

      <div className="collage mt-14">
        {photos.map((p, idx) => (
          <button key={p.src} onClick={() => setViewer(idx)} className="collage-item">
            <img src={p.src} alt={p.caption} loading="lazy" />
          </button>
        ))}
      </div>
      <PhotoViewer photos={photos} index={viewer} onClose={() => setViewer(null)} onIndex={setViewer} />
    </Scene>
  );
}

/** SCENE 17 — FINAL MESSAGE */
export function SceneFinalMessage() {
  const lines = [
    "If I could choose one thing…",
    "I would choose more moments like these.",
    "More laughs.",
    "More memories.",
    "More reasons to smile.",
  ];
  return (
    <Scene id="final-message" className="text-center">
      <div className="single-light" />
      {lines.map((l, idx) => (
        <Reveal key={l} delay={idx * 500} className="my-6">
          <p className="font-display text-xl leading-relaxed text-balance text-[var(--ink)]/90 sm:text-2xl">{l}</p>
        </Reveal>
      ))}
      <Reveal delay={2800} className="mt-12">
        <p className="gold-text font-display text-2xl sm:text-3xl">And more chapters in our story. ❤️</p>
      </Reveal>
    </Scene>
  );
}

/** SCENE 18 + 19 — FINAL SCREEN & AFTER-CREDITS */
export function SceneFinale() {
  const [showTease, setShowTease] = useState(false);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    const el = document.getElementById("finale");
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        window.setTimeout(() => setShowTease(true), 5000);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Scene id="finale" className="relative text-center">
      <div className="hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="heart" style={{ left: `${(i * 8.5 + 3) % 96}%`, animationDelay: `${i * 1.3}s` }}>
            ❤
          </span>
        ))}
      </div>
      <Confetti count={40} />
      <Reveal>
        <h2 className="finale-title">
          HAPPY BIRTHDAY,
          <br />
          {her.toUpperCase()} ❤️
        </h2>
      </Reveal>
      <Reveal delay={400}>
        <p className="mt-6 text-sm tracking-[0.4em] text-[var(--muted-ink)]">{birthdayLong}</p>
      </Reveal>
      <Reveal delay={800}>
        <p className="mt-12 font-display text-xl text-balance text-[var(--ink)]/90">
          Thank you for being a beautiful part of my story.
        </p>
      </Reveal>
      <Reveal delay={1200}>
        <p className="mt-10 text-xs uppercase tracking-[0.35em] text-[var(--muted-ink)]">With love,</p>
        <p className="gold-text font-display text-2xl">{him}</p>
      </Reveal>

      <div className={`mt-24 transition-all duration-1000 ${showTease ? "opacity-100" : "translate-y-3 opacity-0"}`}>
        {!secret ? (
          <>
            <p className="font-display text-lg text-[var(--ink)]/80">Wait… one last thing.</p>
            <button
              className="enter-btn mt-6"
              onClick={() => {
                getAmbience().chime();
                setSecret(true);
              }}
            >
              ONE LAST SECRET →
            </button>
          </>
        ) : (
          <div className="animate-fade-in">
            <p className="font-display text-xl">If you smiled while going through this…</p>
            <p className="gold-text mt-4 font-display text-2xl">…then my mission is complete. ❤️</p>
            <p className="mt-8 font-display text-lg text-[var(--ink)]/85">
              Happy Birthday once again, {her}.
            </p>
          </div>
        )}
      </div>
    </Scene>
  );
}
