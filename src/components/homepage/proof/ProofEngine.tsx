"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FastForward, Pause, Play, RotateCcw, Search } from "lucide-react";
import ProofStage, { type Layout } from "./ProofStage";
import { Inspector, Terminal } from "./ProofPanels";
import { CLAIMS, STAGES, STATE_LABEL, VERDICT, proofAt } from "./proofModel";
import "./proof.css";

const STAGE_COUNT = STAGES.length;
const QUANTUM = 1 / 600;
const DIRECTOR_MS = 38000;
const END = STAGE_COUNT - 0.08;
const INTERRUPT_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

const WIDE_QUERY = "(min-width: 960px)";
function subscribeWide(cb: () => void) {
  const mq = window.matchMedia(WIDE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useLayout = (): Layout =>
  useSyncExternalStore(
    subscribeWide,
    () => (window.matchMedia(WIDE_QUERY).matches ? "wide" : "tall"),
    () => "tall",
  );

export default function ProofEngine() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const layout = useLayout();
  const inView = useInView(trackRef);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.4 });
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const startRef = useRef<number | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      setFrame((cur) => (cur && cur.w === w && cur.h === h ? cur : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const update = (v: number) => {
    const next = Math.round((v * STAGE_COUNT) / QUANTUM) * QUANTUM;
    setPosition((prev) => (prev === next ? prev : next));
  };
  useMotionValueEvent(smooth, "change", (v) => {
    if (!reducedMotion) update(v);
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reducedMotion) update(v);
  });

  const proof = useMemo(() => proofAt(position), [position]);
  const interactive = proof.stage >= 3;
  const activeSelection = interactive ? selected : null;

  const scrollToPosition = useCallback((p: number, behavior: ScrollBehavior = "instant" as ScrollBehavior) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * (p / STAGE_COUNT), behavior });
  }, []);

  useEffect(() => {
    if (!playing) return;
    let p = startRef.current ?? scrollYProgress.get() * STAGE_COUNT;
    startRef.current = null;
    if (p >= END - 0.02) p = 0;
    let last = performance.now();
    let raf = 0;
    const stop = () => setPlaying(false);
    const onKey = (e: KeyboardEvent) => {
      if (INTERRUPT_KEYS.has(e.key)) stop();
    };
    const tick = (now: number) => {
      p = Math.min(END, p + ((now - last) / DIRECTOR_MS) * STAGE_COUNT);
      last = now;
      scrollToPosition(p);
      if (p >= END) return stop();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKey);
    };
  }, [playing, scrollToPosition, scrollYProgress]);

  const play = () => {
    setSelected(null);
    setPlaying((v) => !v);
  };
  const replay = () => {
    setSelected(null);
    scrollToPosition(0);
    startRef.current = 0;
    setPlaying(true);
  };
  const skip = () => {
    setPlaying(false);
    setSelected(null);
    scrollToPosition(END);
  };
  const explore = () => {
    setPlaying(false);
    scrollToPosition(END);
    setSelected(CLAIMS[0].id);
  };
  const select = (id: string) => {
    setPlaying(false);
    setSelected((cur) => (cur === id ? null : id));
  };
  const jump = (i: number) => {
    setPlaying(false);
    setSelected(null);
    scrollToPosition(i + 0.55, reducedMotion ? "auto" : "smooth");
  };

  const s = proof.stage;
  const terminalOnDock = layout === "tall" && s === 2 && !activeSelection;

  return (
    <section
      id="reactor"
      className="pe"
      aria-labelledby="pe-title"
      data-nav-tone="dark"
      data-stage={s}
      data-animate={!reducedMotion && inView ? "" : undefined}
    >
      <span id="coverage" className="pe-anchor" aria-hidden />
      <div ref={trackRef} className="pe-track">
        <div className="pe-stage">
          <div ref={graphRef} className="pe-graph">
            <ProofStage
              proof={proof}
              layout={layout}
              frame={frame}
              selected={activeSelection}
              interactive={interactive}
              onSelect={select}
            />
            <div className="pe-vignette" aria-hidden />
          </div>

          <header className="pe-head">
            <p className="pe-kicker">
              <span className="pe-kicker-mark" aria-hidden />
              XSEE / Proof engine
            </p>
            <div className="pe-copy">
              {STAGES.map((st, i) => (
                <div key={st.key} className={`pe-copy-item${i === s ? " is-active" : ""}`} aria-hidden={i !== s}>
                  {i === 0 ? (
                    <>
                      <h2 id="pe-title" className="pe-h2 text-balance">
                        The path is visible. <span>Now prove it.</span>
                      </h2>
                      <p className="pe-support text-pretty">
                        XSEE examines each step, separates evidence from assumptions, and reveals what the available proof actually supports.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="pe-stage-n">
                        {String(i + 1).padStart(2, "0")} · {st.label}
                      </p>
                      <h3 className="pe-h3 text-balance">{st.title}</h3>
                      <p className="pe-support text-pretty">{st.body}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </header>

          {layout === "wide" ? (
            <div className={`pe-term-wrap${s >= 2 ? " is-on" : ""}${s >= 3 ? " is-rest" : ""}`}>
              <Terminal proof={proof} />
            </div>
          ) : null}

          <div className="pe-dock">
            <div className={`pe-insp${activeSelection ? " is-detail" : ""}`} aria-live="polite">
              {terminalOnDock ? (
                <Terminal proof={proof} compact />
              ) : (
                <Inspector proof={proof} selected={activeSelection} onSelect={select} onBack={() => setSelected(null)} />
              )}
            </div>

            <div className="pe-controls">
              <nav className="pe-rail" aria-label="Proof engine stages">
                {STAGES.map((st, i) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => jump(i)}
                    className={i === s ? "is-active" : i < s ? "is-done" : undefined}
                    aria-current={i === s ? "step" : undefined}
                    aria-label={`Stage ${i + 1}: ${st.label}`}
                  >
                    <span className="pe-rail-bar" aria-hidden>
                      <span style={{ transform: `scaleX(${i < s ? 1 : i === s ? proof.t : 0})` }} />
                    </span>
                    <span className="pe-rail-label">{st.label}</span>
                  </button>
                ))}
              </nav>
              <div className="pe-buttons">
                <button type="button" className="pe-btn pe-btn--primary" onClick={play} aria-pressed={playing}>
                  {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
                  <span>{playing ? "Pause" : "Play"}</span>
                </button>
                <button type="button" className="pe-btn" onClick={replay} aria-label="Replay from the start">
                  <RotateCcw size={15} aria-hidden />
                  <span className="pe-btn-label">Replay</span>
                </button>
                <button type="button" className="pe-btn" onClick={explore}>
                  <Search size={15} aria-hidden />
                  <span>Explore</span>
                </button>
                <button type="button" className="pe-btn" onClick={skip} aria-label="Skip animation">
                  <FastForward size={15} aria-hidden />
                  <span className="pe-btn-label">Skip</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sr-only">
          <p>
            Simulated validation of attack path AP-12 in a fictional AWS environment. {VERDICT}. No closure is claimed.
          </p>
          <ol>
            {CLAIMS.map((c) => (
              <li key={c.id}>
                {c.step}: {STATE_LABEL[c.state]}. {c.supports} {c.uncertainty}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
