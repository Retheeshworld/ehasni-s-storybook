import { useEffect, useRef } from "react";

/** Full-page cinematic backdrop: starfield canvas + drifting particles + film grain + vignette. */
export function Atmosphere({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { x: number; y: number; r: number; a: number; s: number; hue: number };
    let stars: Star[] = [];

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        s: Math.random() * 0.5 + 0.15,
        hue: Math.random() < 0.18 ? 38 : Math.random() < 0.3 ? 350 : 40,
      }));
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    let t = 0;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * st.s + st.a * 6.283));
        ctx.beginPath();
        ctx.fillStyle =
          st.hue === 350
            ? `hsla(350, 70%, 72%, ${tw * 0.75})`
            : st.hue === 38
              ? `hsla(38, 90%, 68%, ${tw * 0.85})`
              : `hsla(40, 30%, 92%, ${tw * 0.6})`;
        ctx.arc(st.x, st.y - ((t * 6 * st.s) % (h + 20)) * 0.15, st.r, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-[2500ms]"
      style={{ opacity: active ? 1 : 0.25 }}
    >
      <div className="absolute inset-0 bg-[var(--cine-deep)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="lens-flare absolute left-1/2 top-[12%] h-[60vmin] w-[60vmin] -translate-x-1/2" />
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 grain" />
      <div className="floaters absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="floater"
            style={{
              left: `${(i * 7.3 + 4) % 96}%`,
              animationDelay: `${i * 1.7}s`,
              animationDuration: `${16 + (i % 5) * 4}s`,
              opacity: 0.25 + (i % 4) * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
