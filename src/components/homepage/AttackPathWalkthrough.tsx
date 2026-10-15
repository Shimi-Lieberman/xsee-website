"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { SCENARIO, STEPS, STEP_BEATS } from "@/lib/attackPathScenario";
import { demoReducer, INITIAL_STATE, LAST_STEP, pathResult, type Selection } from "./attack-path/demoState";
import PathGraph from "./attack-path/PathGraph";
import MobilePath from "./attack-path/MobilePath";
import Inspector from "./attack-path/Inspector";
import StepNavigator from "./attack-path/StepNavigator";
import ClosureRecord from "./attack-path/ClosureRecord";
import { ResultChip } from "./attack-path/parts";
import "./attack-path/attack-path-demo.css";

const APPROVAL_APPLY_MS = 1600;
const DECISION_DWELL_MS = 2000;
const DRIFT_STAGE_MS: Record<string, number> = { changed: 2400, reassess: 2600, rechecking: 2800 };

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useActive(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);
  return inView && pageVisible;
}

export default function AttackPathWalkthrough() {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_STATE);
  const sectionRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const active = useActive(sectionRef);
  const beats = STEP_BEATS[state.step];
  const settled = state.beat >= beats.length;

  useEffect(() => {
    if (!active || state.selection) return;
    if (!settled) {
      if (reducedMotion) {
        dispatch({ type: "settle" });
        return;
      }
      const timer = window.setTimeout(() => dispatch({ type: "tick" }), beats[state.beat]);
      return () => window.clearTimeout(timer);
    }
    if (!state.playing) return;
    if (state.step === 3) {
      if (state.approval === "pending") dispatch({ type: "decisionReached" });
      if (state.approval !== "applied") return;
      const timer = window.setTimeout(() => dispatch({ type: "next" }), DECISION_DWELL_MS);
      return () => window.clearTimeout(timer);
    }
    dispatch(state.step < LAST_STEP ? { type: "next" } : { type: "pause" });
  }, [active, beats, reducedMotion, settled, state.approval, state.beat, state.playing, state.selection, state.step]);

  useEffect(() => {
    if (!active || state.approval !== "approved") return;
    const timer = window.setTimeout(() => dispatch({ type: "approvalApplied" }), APPROVAL_APPLY_MS);
    return () => window.clearTimeout(timer);
  }, [active, state.approval]);

  useEffect(() => {
    const delay = DRIFT_STAGE_MS[state.drift];
    if (!active || !delay) return;
    const timer = window.setTimeout(() => dispatch({ type: "advanceDrift" }), delay);
    return () => window.clearTimeout(timer);
  }, [active, state.drift]);

  const handleSelect = useCallback(
    (selection: Selection) => {
      dispatch({ type: "select", selection });
      if (selection && window.matchMedia("(max-width: 759px)").matches) {
        requestAnimationFrame(() =>
          inspectorRef.current?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" }),
        );
      }
    },
    [reducedMotion],
  );

  const result = pathResult(state);

  return (
    <section ref={sectionRef} id="walkthrough" className="apd" aria-labelledby="walkthrough-title">
      <div className="apd-shell">
        <header className="apd-intro">
          <p className="apd-kicker">Product walkthrough</p>
          <h2 id="walkthrough-title" className="text-balance">
            See what changed, why the path closed, and what drift does to the result.
          </h2>
        </header>

        <div className="apd-panel">
          <div className="apd-panel-head">
            <div className="apd-panel-title">
              <span className="apd-env-badge">Illustrative environment</span>
              <h3>
                <span className="apd-path-id">{SCENARIO.pathId}</span> {SCENARIO.pathTitle}
              </h3>
            </div>
            <div role="status" aria-live="polite" className="apd-panel-status">
              <span className="sr-only">
                Step {state.step + 1} of {STEPS.length}, {STEPS[state.step].title}. Path status:
              </span>
              <ResultChip result={result} />
            </div>
          </div>

          <div className="apd-body">
            <div className="apd-stage">
              <div className="apd-canvas">
                <PathGraph state={state} onSelect={handleSelect} />
                <MobilePath state={state} onSelect={handleSelect} />
                <ul className="apd-legend" aria-label="Line legend">
                  <li className="apd-status-assumed">Assumed</li>
                  <li className="apd-status-observed">Observed</li>
                  <li className="apd-status-simulated">Simulated</li>
                  <li className="apd-status-untested">Untested</li>
                  <li className="apd-status-blocked">Blocked</li>
                  <li className="apd-status-reassess">Drift</li>
                </ul>
              </div>
              <StepNavigator state={state} dispatch={dispatch} reducedMotion={reducedMotion} />
            </div>
            <aside ref={inspectorRef} className="apd-inspector" aria-label="Inspector">
              <div key={`${state.step}-${state.selection?.id ?? "step"}`} className="apd-inspector-content">
                <Inspector state={state} dispatch={dispatch} />
              </div>
            </aside>
          </div>

          <ClosureRecord state={state} />

          <p className="apd-disclosure">
            Fictional account, resources, and timestamps. Results come from read-only collection and policy simulation in this illustration. XSEE
            does not change your AWS environment.
          </p>
        </div>
      </div>
    </section>
  );
}
