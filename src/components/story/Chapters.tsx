import { Reveal, Scene, SceneLabel } from "./Reveal";
import { Confetti } from "./ActThree";
import { birthdayLong, her, him, photos } from "@/story/content";

function LineStack({ lines, gap = 260 }: { lines: string[]; gap?: number }) {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * gap}>
          <p className="font-display text-xl leading-relaxed text-balance text-[var(--ink)]/90 sm:text-2xl">
            {l}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/** PROLOGUE — how she walked in */
export function SceneHowItStarted() {
  return (
    <Scene id="how-it-started">
      <SceneLabel>Prologue</SceneLabel>
      <LineStack
        lines={[
          "At first, she was just another person in the world.",
          "Then came a conversation.",
          "Then a smile.",
          "Then a few memories.",
          "And somehow… without either of us noticing…",
        ]}
      />
      <Reveal delay={1500} className="mt-12 max-w-xl text-center">
        <p className="gold-text font-display text-2xl leading-relaxed text-balance sm:text-3xl">
          she became one of the most important parts of my world.
        </p>
      </Reveal>
    </Scene>
  );
}

/** CHAPTER 1 — BEFORE YOU */
export function SceneBeforeYou() {
  return (
    <Scene id="before-you">
      <Reveal className="text-center">
        <p className="scene-label">Chapter 01</p>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl">Before You</h2>
      </Reveal>

      <Reveal delay={300} className="mt-14 w-full max-w-lg">
        <div className="empty-room" aria-hidden />
      </Reveal>

      <div className="mt-14">
        <LineStack
          lines={[
            "There was a version of me who had never met you.",
            "He didn't know your smile.",
            "He didn't know your little habits.",
            "He didn't know the memories that were waiting for him.",
            "And honestly…",
          ]}
        />
      </div>
      <Reveal delay={1500} className="mt-10 text-center">
        <p className="gold-text font-display text-2xl sm:text-3xl">He didn't know what he was missing.</p>
      </Reveal>
    </Scene>
  );
}

/** CHAPTER 2 — THEN YOU HAPPENED */
export function SceneThenYouHappened() {
  return (
    <Scene id="then-you-happened">
      <Reveal className="text-center">
        <p className="scene-label">Chapter 02</p>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl">Then You Happened</h2>
      </Reveal>

      <div className="mt-14 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={i * 220}>
            <figure className="chapter-photo">
              <img src={p.src} alt={p.caption} loading="lazy" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <LineStack
          lines={[
            "And ordinary days started becoming memories.",
            "A simple conversation could make my day.",
            "A simple smile could stay in my mind for hours.",
            "And the little moments…",
          ]}
        />
      </div>
      <Reveal delay={1300} className="mt-10 text-center">
        <p className="gold-text font-display text-2xl sm:text-3xl">somehow became my favorite ones.</p>
      </Reveal>
    </Scene>
  );
}

/** CHAPTER 3 — THE THINGS YOU DON'T KNOW */
export function SceneThingsYouDontKnow() {
  return (
    <Scene id="things-you-dont-know">
      <Reveal className="text-center">
        <p className="scene-label">Chapter 03</p>
        <h2 className="mt-6 font-display text-4xl sm:text-5xl">The Things You Don't Know</h2>
      </Reveal>

      <div className="mt-16 flex w-full max-w-xl flex-col gap-14 text-center">
        {[
          "You probably don't know how many times your smile made me smile.",
          "You probably don't know how many memories I've replayed in my head.",
          "You probably don't know how special the little things became.",
          "You probably don't know how much you mean to me.",
        ].map((l, i) => (
          <Reveal key={l} delay={i * 200}>
            <p className="font-display text-xl leading-relaxed text-balance sm:text-2xl">{l}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={600} className="mt-24 text-center">
        <div className="single-light" />
        <p className="font-display text-2xl text-[var(--ink)]/85 sm:text-3xl">So I built this…</p>
      </Reveal>
    </Scene>
  );
}

/** CHAPTER 4 — FOR YOU */
export function SceneForYou() {
  return (
    <Scene id="for-you" className="relative text-center">
      <Reveal>
        <p className="scene-label">Chapter 04</p>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl">For You</h2>
      </Reveal>
      <div className="mt-14">
        <LineStack
          lines={[
            "Not because I needed to make something impressive.",
            "Not because today is just your birthday.",
            "But because you deserve to know what you mean to someone.",
          ]}
          gap={320}
        />
      </div>

      <Reveal delay={1200} className="relative mt-20 w-full">
        <Confetti count={50} />
        <div className="glow-burst" />
        <p className="birthday-title">HAPPY BIRTHDAY</p>
        <p className="gold-text mt-4 font-display text-4xl sm:text-6xl">{her} ❤️</p>
      </Reveal>
    </Scene>
  );
}

/** FINAL CHAPTER — NOT THE END */
export function SceneNotTheEnd() {
  const lines = [
    "I don't know exactly what every tomorrow will look like.",
    "I don't know what the next chapter will bring.",
    "But if life gives us more moments together…",
    "I want to turn them into memories.",
  ];
  const mores = [
    "More laughs.",
    "More stupid conversations.",
    "More pictures.",
    "More unexpected moments.",
    "More reasons to smile.",
    "More chapters.",
  ];

  return (
    <Scene id="not-the-end" className="relative text-center">
      <Reveal>
        <p className="scene-label">Final Chapter</p>
        <h2 className="mt-6 font-display text-4xl sm:text-5xl">Not The End</h2>
      </Reveal>

      <div className="mt-14">
        <LineStack lines={lines} gap={300} />
      </div>

      <div className="mt-14 flex flex-col items-center gap-3">
        {mores.map((m, i) => (
          <Reveal key={m} delay={i * 180}>
            <p className="gold-text font-display text-2xl sm:text-3xl">{m}</p>
          </Reveal>
        ))}
      </div>

      <div className="hearts mt-24">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="heart" style={{ left: `${(i * 8.5 + 3) % 96}%`, animationDelay: `${i * 1.3}s` }}>
            ❤
          </span>
        ))}
      </div>

      <Reveal delay={300} className="mt-24">
        <h3 className="finale-title">
          THIS STORY
          <br />
          ISN'T FINISHED.
        </h3>
      </Reveal>
      <Reveal delay={700}>
        <p className="gold-text mt-8 font-display text-2xl sm:text-3xl">Chapter 23 begins now. ❤️</p>
      </Reveal>

      <Reveal delay={1000} className="mt-16 w-full max-w-md">
        <ol className="timeline text-left">
          <li className="timeline-item">
            <span className="timeline-dot" />
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">{birthdayLong}</p>
            <p className="mt-1 font-display text-lg">The day {her}'s story began.</p>
          </li>
          <li className="timeline-item">
            <span className="timeline-dot" />
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">Today</p>
            <p className="mt-1 font-display text-lg">The day we celebrate her.</p>
          </li>
          <li className="timeline-item">
            <span className="timeline-dot" />
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">Tomorrow</p>
            <p className="mt-1 font-display text-lg">Another page waiting to be written.</p>
          </li>
        </ol>
      </Reveal>

      <Reveal delay={1300} className="mt-16">
        <p className="gold-text font-display text-2xl">— {him} ❤️</p>
      </Reveal>
    </Scene>
  );
}
