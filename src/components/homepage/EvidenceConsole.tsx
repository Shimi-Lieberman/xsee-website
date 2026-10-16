"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Eye,
  FlaskConical,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";
import {
  CONSOLE_ACCESSIBLE_SUMMARY,
  CONSOLE_SCRIPT,
  CONSOLE_STATIC_SNAPSHOT,
  CONSOLE_TIMING,
  STATUS_LABELS,
  type ConsoleEvent,
  type ConsoleStatus,
} from "@/lib/evidenceConsoleScript";
import ConsoleRain from "./ConsoleRain";
import "./evidence-console.css";

const STATUS_ICONS: Record<ConsoleStatus, LucideIcon> = {
  observed: Eye,
  simulated: FlaskConical,
  untested: CircleDashed,
  verified: CheckCircle2,
  pending: Clock3,
  reassess: AlertTriangle,
};

type RenderedLine = { id: number; event: ConsoleEvent; past?: boolean };

type PlaybackState = {
  step: number;
  phase: "wait" | "type" | "fade";
  typed: number;
  lines: RenderedLine[];
  nextId: number;
};

type PlaybackAction = { type: "startTyping" | "typeChar" | "commit" | "fade" | "reset" };

// Seed with the previous run (dimmed) so the console never opens as an empty box.
const INITIAL_STATE: PlaybackState = {
  step: 0,
  phase: "wait",
  typed: 0,
  lines: CONSOLE_STATIC_SNAPSHOT.map((event, id) => ({ id, event, past: true })),
  nextId: CONSOLE_STATIC_SNAPSHOT.length,
};

function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState {
  switch (action.type) {
    case "startTyping":
      return { ...state, phase: "type", typed: 0 };
    case "typeChar":
      return { ...state, typed: state.typed + 1 };
    case "commit": {
      const event = CONSOLE_SCRIPT[state.step];
      const lines = [...state.lines, { id: state.nextId, event }].slice(-CONSOLE_TIMING.maxLines);
      return { ...state, step: state.step + 1, phase: "wait", typed: 0, lines, nextId: state.nextId + 1 };
    }
    case "fade":
      return { ...state, phase: "fade" };
    case "reset":
      return {
        ...INITIAL_STATE,
        lines: state.lines.map((line) => ({ ...line, past: true })),
        nextId: state.nextId,
      };
  }
}

function nextTick(state: PlaybackState): { delay: number; action: PlaybackAction } {
  if (state.phase === "fade") return { delay: CONSOLE_TIMING.fadeMs, action: { type: "reset" } };
  const event = CONSOLE_SCRIPT[state.step];
  if (!event) return { delay: CONSOLE_TIMING.endPauseMs, action: { type: "fade" } };
  if (state.phase === "wait") {
    return { delay: event.delay, action: { type: event.kind === "command" ? "startTyping" : "commit" } };
  }
  return state.typed < event.text.length
    ? { delay: CONSOLE_TIMING.charMs, action: { type: "typeChar" } }
    : { delay: CONSOLE_TIMING.commandSettleMs, action: { type: "commit" } };
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function ConsoleLine({ event, animate, past }: { event: ConsoleEvent; animate: boolean; past?: boolean }) {
  const className = past ? "xsee-console-line is-past" : "xsee-console-line";
  const body =
    event.kind === "command" ? (
      <>
        <span className="xsee-console-prompt">$</span>
        <span className="xsee-console-command">{event.text}</span>
      </>
    ) : event.status ? (
      <StatusLine status={event.status} text={event.text} />
    ) : (
      <span className={`xsee-console-tone-${event.tone ?? "output"}`}>{event.text}</span>
    );

  if (!animate || past) return <div className={className}>{body}</div>;

  return (
    <motion.div
      layout="position"
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut", layout: { duration: 0.32, ease: "easeOut" } }}
    >
      {body}
    </motion.div>
  );
}

function StatusLine({ status, text }: { status: ConsoleStatus; text: string }) {
  const Icon = STATUS_ICONS[status];
  return (
    <span className="xsee-console-status-line">
      <span className={`xsee-console-chip xsee-console-chip-${status}`}>
        <Icon size={13} strokeWidth={2.2} aria-hidden />
        {STATUS_LABELS[status]}
      </span>
      <span className="xsee-console-tone-output">{text}</span>
    </span>
  );
}

export default function EvidenceConsole() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const pageVisible = usePageVisible();
  const inView = useInView(rootRef);
  const [userPaused, setUserPaused] = useState(false);
  const [state, dispatch] = useReducer(playbackReducer, INITIAL_STATE);

  const running = !prefersReducedMotion && !userPaused && inView && pageVisible;

  useEffect(() => {
    if (!running) return;
    const { delay, action } = nextTick(state);
    const timer = window.setTimeout(() => dispatch(action), delay);
    return () => window.clearTimeout(timer);
  }, [running, state]);

  const activeEvent = CONSOLE_SCRIPT[state.step];
  const typing = state.phase === "type" && activeEvent?.kind === "command";
  const lines: RenderedLine[] = prefersReducedMotion
    ? CONSOLE_STATIC_SNAPSHOT.map((event, id) => ({ id, event }))
    : state.lines;

  return (
    <figure
      ref={rootRef}
      className="xsee-console"
      aria-labelledby="xsee-console-title"
      aria-describedby="xsee-console-summary"
    >
      <div className="xsee-console-titlebar">
        <span className="xsee-console-controls" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span id="xsee-console-title" className="xsee-console-title">
          XSEE / Evidence Console
        </span>
      </div>

      <div className="xsee-console-body">
        {!prefersReducedMotion && <ConsoleRain running={running} />}
        <div
          className="xsee-console-log"
          data-fading={state.phase === "fade" || undefined}
          aria-hidden="true"
        >
          {lines.map((line) => (
            <ConsoleLine key={line.id} event={line.event} past={line.past} animate={!prefersReducedMotion} />
          ))}
          {!prefersReducedMotion && (
            <div className="xsee-console-line xsee-console-active">
              <span className="xsee-console-prompt">$</span>
              <span className="xsee-console-command is-active">
                {typing ? activeEvent.text.slice(0, state.typed) : ""}
              </span>
              <span className="xsee-console-cursor" data-solid={typing || !running || undefined} />
            </div>
          )}
        </div>
        <p id="xsee-console-summary" className="sr-only">
          {CONSOLE_ACCESSIBLE_SUMMARY}
        </p>
      </div>

      <figcaption className="xsee-console-footer">
        <span className="xsee-console-badge">
          <span className="xsee-console-badge-dot" aria-hidden />
          Automated demo · simulated environment
        </span>
        {!prefersReducedMotion && (
          <button
            type="button"
            className="xsee-console-toggle"
            onClick={() => setUserPaused((paused) => !paused)}
            aria-label={userPaused ? "Resume console demo" : "Pause console demo"}
          >
            {userPaused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
            <span aria-hidden>{userPaused ? "Resume" : "Pause"}</span>
          </button>
        )}
      </figcaption>
    </figure>
  );
}
