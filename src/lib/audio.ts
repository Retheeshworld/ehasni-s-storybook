/** Tiny WebAudio ambience — no external audio files, starts only on user action. */

type Ambience = {
  start: () => void;
  stop: () => void;
  setMuted: (m: boolean) => void;
  heartbeat: () => void;
  chime: () => void;
};

let instance: Ambience | null = null;

export function getAmbience(): Ambience {
  if (instance) return instance;

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let voices: OscillatorNode[] = [];
  let muted = false;

  const ensure = () => {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctor();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return { ctx: ctx!, master: master! };
  };

  const start = () => {
    const { ctx: c, master: m } = ensure();
    if (voices.length) return;
    // Soft warm pad: A minor-ish stack, very slow tremolo.
    [110, 164.81, 220, 329.63].forEach((f, i) => {
      const osc = c.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      const g = c.createGain();
      g.gain.value = 0.16 / (i + 1);
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      const lfoGain = c.createGain();
      lfoGain.gain.value = 0.05 / (i + 1);
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
      osc.connect(g).connect(m);
      osc.start();
      voices.push(osc, lfo);
    });
    m.gain.cancelScheduledValues(c.currentTime);
    m.gain.setValueAtTime(m.gain.value, c.currentTime);
    m.gain.linearRampToValueAtTime(muted ? 0 : 0.28, c.currentTime + 4);
  };

  const stop = () => {
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    const v = voices;
    voices = [];
    const c = ctx;
    window.setTimeout(() => v.forEach((o) => { try { o.stop(); } catch { /* noop */ } }), 1400);
    void c;
  };

  const setMuted = (m: boolean) => {
    muted = m;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(m ? 0 : voices.length ? 0.28 : 0, ctx.currentTime + 0.5);
  };

  const blip = (freq: number, dur: number, gain: number, type: OscillatorType = "sine") => {
    const { ctx: c, master: m } = ensure();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(muted ? 0 : gain, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g).connect(m.gain.value === 0 && !voices.length ? c.destination : c.destination);
    o.start();
    o.stop(c.currentTime + dur + 0.05);
  };

  const heartbeat = () => {
    blip(58, 0.28, 0.35, "sine");
    window.setTimeout(() => blip(52, 0.34, 0.26, "sine"), 320);
  };

  const chime = () => {
    blip(880, 0.6, 0.12, "triangle");
    window.setTimeout(() => blip(1320, 0.7, 0.08, "sine"), 90);
  };

  instance = { start, stop, setMuted, heartbeat, chime };
  return instance;
}
