"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { SCENARIO, STEPS, STEP_BEATS } from "@/lib/attackPathScenario";
import { demoReducer, focusEdgeId, INITIAL_STATE, pathResult, type Selection } from "./attack-path/demoState";
import PathGraph from "./attack-path/PathGraph";
import MobilePath from "./attack-path/MobilePath";
import Inspector from "./attack-path/Inspector";
import { ExploreControls, StoryControls } from "./attack-path/StepNavigator";
import StoryCaption from "./attack-path/StoryCaption";
import ClosureRecord from "./attack-path/ClosureRecord";
import { ResultChip } from "./attack-path/parts";
import "./attack-path/attack-path-demo.css";

const STORY_TICK_MS = 100;
const APPROVAL_APPLY_MS = 1600;
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

/** `started`: the graph area is at least half visible. `running`: any part is on screen and the tab is visible. */
function useVisibility(sectionRef: React.RefObject<HTMLElement | null>, stageRef: React.RefObject<HTMLElement | null>) {
  const [halfVisible, setHalfVisible] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const sectionObserver = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    const stageObserver = new IntersectionObserver(([entry]) => setHalfVisible(entry.intersectionRatio >= 0.5), {
      threshold: [0, 0.5, 1],
    });
    sectionObserver.observe(section);
    stageObserver.observe(stage);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      sectionObserver.disconnect();
      stageObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sectionRef, stageRef]);
  return { canStart: halfVisible && pageVisible, running: onScreen && pageVisible };
}

export default function AttackPathWalkthrough() {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_STATE);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const autoStarted = useRef(false);
  const reducedMotion = useReducedMotion();
  const { canStart, running } = useVisibility(sectionRef, stageRef);
  const story = state.mode === "story";
  const settled = state.beat >= STEP_BEATS[state.step].length;

  useEffect(() => {
    if (!reducedMotion || state.mode !== "story" || state.story !== "idle") return;
    autoStarted.current = true;
    dispatch({ type: "explore" });
  }, [reducedMotion, state.mode, state.story]);

  useEffect(() => {
    if (autoStarted.current || reducedMotion || !canStart || state.story !== "idle") return;
    autoStarted.current = true;
    dispatch({ type: "storyStart" });
  }, [canStart, reducedMotion, state.story]);

  useEffect(() => {
    if (!story || state.story !== "playing" || !running) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      dispatch({ type: "storyTick", ms: Math.min(now - last, 250) });
      last = now;
    }, STORY_TICK_MS);
    return () => window.clearInterval(timer);
  }, [story, state.story, running]);

  useEffect(() => {
    if (story || state.selection || settled) return;
    if (reducedMotion) {
      dispatch({ type: "settle" });
      return;
    }
    if (!running) return;
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), STEP_BEATS[state.step][state.beat]);
    return () => window.clearTimeout(timer);
  }, [story, reducedMotion, running, settled, state.beat, state.selection, state.step]);

  useEffect(() => {
    if (story || state.approval !== "approved") return;
    if (!reducedMotion && !running) return;
    const timer = window.setTimeout(() => dispatch({ type: "approvalApplied" }), reducedMotion ? 0 : APPROVAL_APPLY_MS);
    return () => window.clearTimeout(timer);
  }, [story, reducedMotion, running, state.approval]);

  useEffect(() => {
    const delay = DRIFT_STAGE_MS[state.drift];
    if (story || !delay) return;
    if (!reducedMotion && !running) return;
    const timer = window.setTimeout(() => dispatch({ type: "advanceDrift" }), reducedMotion ? 0 : delay);
    return () => window.clearTimeout(timer);
  }, [story, reducedMotion, running, state.drift]);

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
  const inspectorKey = [state.mode, state.step, state.selection?.id ?? "", !story && state.step === 1 ? focusEdgeId(state) : ""].join("-");

  return (
    <section ref={sectionRef} id="walkthrough" className="apd" aria-labelledby="walkthrough-title">
      <div className="apd-shell">
        <header className="apd-intro">
          <p className="apd-kicker">Product walkthrough</p>
          <h2 id="walkthrough-title" className="text-balance">
            See what changed, why the path closed, and what drift does to the result.
          </h2>
        </header>

        <div className="apd-panel" data-mode={state.mode}>
          <div className="apd-panel-head">
            <div className="apd-panel-title">
              <span className="apd-env-badge">Illustrative environment</span>
              <h3>
                <span className="apd-path-id">{SCENARIO.pathId}</span> {SCENARIO.pathTitle}
              </h3>
            </div>
            <div role="status" aria-live={story ? "off" : "polite"} className="apd-panel-status">
              <span className="sr-only">
                Step {state.step + 1} of {STEPS.length}, {STEPS[state.step].title}. Path status:
              </span>
              <ResultChip result={result} />
            </div>
          </div>

          <p className="sr-only">
            Animated walkthrough summary: {SCENARIO.pathId} runs from an assumed foothold in web-frontend through role-web-task and
            sts:AssumeRole on role-batch-ops to the prod/orders-db secret. A trust-policy fix is reviewed, approved by a person, and applied
            by the customer&apos;s pipeline. A re-test stops at sts:AssumeRole, verifying closure. A later configuration change triggers
            reassessment, and a new check shows the path reopened. Use Explore this path to step through the evidence.
          </p>

          <div className="apd-body">
            <div ref={stageRef} className="apd-stage">
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
              {story ? <StoryControls state={state} dispatch={dispatch} /> : <ExploreControls state={state} dispatch={dispatch} />}
            </div>
            <aside ref={inspectorRef} className="apd-inspector" aria-label={story ? "Story caption and evidence" : "Inspector"}>
              {story ? <StoryCaption state={state} /> : null}
              <div key={inspectorKey} className="apd-inspector-content">
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
