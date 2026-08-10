import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as unknown as React.ElementType;
  return (
    <Comp
      ref={ref as never}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/** Section wrapper: one full cinematic scene. */
export function Scene({
  id,
  children,
  className = "",
  full = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-6 ${
        full ? "min-h-[100svh] py-24" : "py-24"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function SceneLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mb-8">
      <span className="scene-label">{children}</span>
    </Reveal>
  );
}
