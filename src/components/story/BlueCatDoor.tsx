import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { getAmbience } from "@/lib/audio";

/** Emotional tones the cat can perform before a card opens. */
export type CatMood = "moment" | "smile" | "conversation" | "memory" | "secret" | "surprise" | "love";

const MOODS: Record<CatMood, { blink: number; hold: number; hearts: string[] }> = {
  moment: { blink: 3600, hold: 160, hearts: ["❤", "💙", "❤"] },
  smile: { blink: 2200, hold: 120, hearts: ["😊", "❤", "✨"] },
  conversation: { blink: 2600, hold: 130, hearts: ["💬", "❤", "💬"] },
  memory: { blink: 5200, hold: 260, hearts: ["✨", "💙", "✨"] },
  secret: { blink: 6400, hold: 380, hearts: ["🤫", "💙", "✨"] },
  surprise: { blink: 1400, hold: 90, hearts: ["🎉", "✨", "❤"] },
  love: { blink: 3000, hold: 200, hearts: ["❤", "💗", "💙"] },
};

/** Original cute blue robotic-cat emoji character (not Doraemon). */
export function BlueCat({
  excited,
  size = 130,
  mood = "moment",
}: {
  excited?: boolean;
  size?: number;
  mood?: CatMood;
}) {
  const [blink, setBlink] = useState(false);
  const cfg = MOODS[mood] ?? MOODS.moment;
  useEffect(() => {
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), cfg.hold);
    }, cfg.blink);
    return () => window.clearInterval(id);
  }, [cfg.blink, cfg.hold]);

  return (
    <div
      className={`cat-wrap cat-mood-${mood} ${excited ? "is-excited" : ""}`}
      style={{ width: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 210" className="cat-svg">
        <defs>
          <radialGradient id="catBlue" cx="35%" cy="28%">
            <stop offset="0%" stopColor="#8fd6ff" />
            <stop offset="55%" stopColor="#2f9de0" />
            <stop offset="100%" stopColor="#1668a8" />
          </radialGradient>
          <radialGradient id="catFace" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e7eef4" />
          </radialGradient>
          <radialGradient id="catGloss" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* body */}
        <ellipse cx="100" cy="162" rx="46" ry="40" fill="url(#catBlue)" />
        <ellipse cx="100" cy="170" rx="30" ry="27" fill="url(#catFace)" />
        {/* arms */}
        <circle cx="52" cy="150" r="14" fill="url(#catBlue)" />
        <g className="cat-arm">
          <circle cx="150" cy="140" r="14" fill="url(#catBlue)" />
        </g>
        {/* head */}
        <circle cx="100" cy="78" r="62" fill="url(#catBlue)" />
        <ellipse cx="100" cy="88" rx="50" ry="46" fill="url(#catFace)" />
        {/* eyes */}
        <ellipse cx="82" cy="52" rx="15" ry={blink ? 2 : 18} fill="#fff" stroke="#0f4f7d" strokeWidth="2.5" />
        <ellipse cx="118" cy="52" rx="15" ry={blink ? 2 : 18} fill="#fff" stroke="#0f4f7d" strokeWidth="2.5" />
        {!blink && (
          <>
            <circle cx="88" cy="56" r="5.5" fill="#12283a" />
            <circle cx="112" cy="56" r="5.5" fill="#12283a" />
            <circle cx="90" cy="53" r="1.8" fill="#fff" />
            <circle cx="114" cy="53" r="1.8" fill="#fff" />
          </>
        )}
        {/* nose + mouth */}
        <circle cx="100" cy="78" r="9" fill="#e8412f" />
        <circle cx="97" cy="75" r="3" fill="#ff9f95" opacity="0.9" />
        <line x1="100" y1="87" x2="100" y2="104" stroke="#0f4f7d" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 104 Q100 128 126 104" fill="none" stroke="#0f4f7d" strokeWidth="3.5" strokeLinecap="round" />
        {/* whiskers */}
        {[-1, 1].map((s) => (
          <g key={s} stroke="#0f4f7d" strokeWidth="2.5" strokeLinecap="round">
            <line x1={100 + s * 26} y1="76" x2={100 + s * 52} y2="68" />
            <line x1={100 + s * 26} y1="84" x2={100 + s * 54} y2="84" />
            <line x1={100 + s * 26} y1="92" x2={100 + s * 52} y2="100" />
          </g>
        ))}
        {/* collar + bell */}
        <rect x="58" y="128" width="84" height="11" rx="5.5" fill="#e8412f" />
        <circle cx="100" cy="142" r="11" fill="#ffd35c" stroke="#c9932a" strokeWidth="2" />
        <line x1="91" y1="140" x2="109" y2="140" stroke="#c9932a" strokeWidth="2" />
        <circle cx="100" cy="146" r="2.6" fill="#8a6414" />
        <ellipse cx="80" cy="34" rx="26" ry="14" fill="url(#catGloss)" />
      </svg>

      {size >= 90 && (
        <>
          <span className="cat-heart" style={{ animationDelay: "0s" }}>{cfg.hearts[0]}</span>
          <span className="cat-heart" style={{ animationDelay: "1.1s", left: "70%" }}>{cfg.hearts[1]}</span>
          <span className="cat-heart" style={{ animationDelay: "2.2s", left: "30%" }}>{cfg.hearts[2]}</span>
        </>
      )}
    </div>
  );
}

export function BlueCatDoor({
  line,
  doorLabel = "Open the magical door",
  message,
  mood = "love",
}: {
  line: string;
  doorLabel?: string;
  message: string;
  mood?: CatMood;
}) {
  const [open, setOpen] = useState(false);
  const [excited, setExcited] = useState(false);

  const onOpen = () => {
    if (open) return;
    setExcited(true);
    getAmbience().chime();
    if (navigator.vibrate) navigator.vibrate(28);
    window.setTimeout(() => setOpen(true), 620);
  };

  return (
    <Reveal className="my-14 w-full">
      <div className="magic-door-row">
        {!open && (
          <div className="flex flex-col items-center">
            <BlueCat excited={excited} mood={mood} />
            <p className="cat-bubble">{line}</p>
          </div>
        )}

        <button className={`magic-door ${open ? "is-open" : ""}`} onClick={onOpen} aria-label={doorLabel}>
          <span className="magic-door-panel">
            <span className="text-2xl">🚪</span>
            <span className="mt-2 block text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">
              {doorLabel}
            </span>
            <span className="magic-knob" />
          </span>
          <span className="magic-door-inside font-display text-lg leading-snug">{message}</span>
        </button>
      </div>
    </Reveal>
  );
}
