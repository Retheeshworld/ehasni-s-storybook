import { useEffect, useRef, useState } from "react";
import themeAsset from "@/assets/theme.mp3.asset.json";

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export function MusicPlayer({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!started) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [started]);

  if (!started) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    const next = !muted;
    a.muted = next;
    setMuted(next);
  };

  const pct = duration ? (time / duration) * 100 : 0;

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,22rem)] -translate-x-1/2">
      <audio
        ref={audioRef}
        src={themeAsset.url}
        loop
        preload="auto"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
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
            Kannaana Kanne — our theme
          </p>
          <div
            onClick={seek}
            role="presentation"
            className="mt-1 h-[6px] w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--burgundy)] via-[var(--gold)] to-[var(--blush)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-[0.6rem] tabular-nums tracking-widest text-[var(--muted-ink)]">
            {fmt(time)} / {fmt(duration)}
          </p>
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
