import { useEffect, useState } from "react";
import { getAmbience } from "@/lib/audio";

export function MusicPlayer({ started }: { started: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!started) return;
    getAmbience().start();
    setPlaying(true);
  }, [started]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setT((v) => (v + 1) % 180), 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  if (!started) return null;

  const toggle = () => {
    const a = getAmbience();
    if (playing) {
      a.stop();
      setPlaying(false);
    } else {
      a.start();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    getAmbience().setMuted(next);
  };

  const pct = (t / 180) * 100;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,22rem)] -translate-x-1/2">
      <div className="glass flex items-center gap-3 rounded-full px-3 py-2">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] transition hover:bg-[var(--gold)]/25"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="1" y="1" width="4" height="12" rx="1" /><rect x="9" y="1" width="4" height="12" rx="1" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 1l11 6-11 6z" /></svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted-ink)]">
            Our theme
          </p>
          <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--burgundy)] via-[var(--gold)] to-[var(--blush)] transition-[width] duration-1000 ease-linear"
              style={{ width: `${playing ? pct : 0}%` }}
            />
          </div>
        </div>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--muted-ink)] transition hover:text-[var(--gold)]"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2L3.5 5H1v6h2.5L7 14z" /><path d="M10 6l4 4M14 6l-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2L3.5 5H1v6h2.5L7 14z" /><path d="M10 5.5a3.5 3.5 0 010 5M12 3.5a6 6 0 010 9" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
