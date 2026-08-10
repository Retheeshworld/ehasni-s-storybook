import { useEffect } from "react";

export function PhotoViewer({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: { src: string; caption: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onIndex, photos.length]);

  if (index === null) return null;
  const photo = photos[index]!;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 px-4 py-10 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        className="max-h-[74svh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
      />
      <p className="mt-6 font-display text-xl text-[var(--ink)]">{photo.caption}</p>
      <div className="mt-6 flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
        <button className="ghost-btn" onClick={() => onIndex((index - 1 + photos.length) % photos.length)}>
          ← Prev
        </button>
        <span className="text-xs tracking-[0.3em] text-[var(--muted-ink)]">
          {index + 1} / {photos.length}
        </span>
        <button className="ghost-btn" onClick={() => onIndex((index + 1) % photos.length)}>
          Next →
        </button>
      </div>
      <button className="ghost-btn mt-8" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
