import type { Dispatch } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { STEPS } from "@/lib/attackPathScenario";
import { LAST_STEP, type DemoAction, type DemoState } from "./demoState";

type Props = { state: DemoState; dispatch: Dispatch<DemoAction>; reducedMotion: boolean };

export default function StepNavigator({ state, dispatch, reducedMotion }: Props) {
  const waitingForApproval = state.step === 3 && state.approval === "pending";
  const playDisabled = reducedMotion || state.step === LAST_STEP || waitingForApproval;
  const playHint = reducedMotion
    ? "Autoplay is off for your reduced-motion setting."
    : waitingForApproval
      ? "Paused at the decision point. Approve to continue."
      : state.step === LAST_STEP
        ? "End of the walkthrough. Introduce drift or replay."
        : null;

  return (
    <div className="apd-nav">
      <div className="apd-controls" role="group" aria-label="Playback">
        <button type="button" className="apd-control" onClick={() => dispatch({ type: "prev" })} disabled={state.step === 0}>
          <ChevronLeft aria-hidden /> <span>Previous</span>
        </button>
        <button
          type="button"
          className="apd-control is-primary"
          onClick={() => dispatch({ type: state.playing ? "pause" : "play" })}
          disabled={!state.playing && playDisabled}
        >
          {state.playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          <span>{state.playing ? "Pause" : "Play"}</span>
        </button>
        <button type="button" className="apd-control" onClick={() => dispatch({ type: "next" })} disabled={state.step === LAST_STEP}>
          <span>Next</span> <ChevronRight aria-hidden />
        </button>
        <button type="button" className="apd-control is-quiet" onClick={() => dispatch({ type: "replay" })} disabled={reducedMotion}>
          <RotateCcw aria-hidden /> <span>Replay</span>
        </button>
      </div>
      {playHint ? <p className="apd-play-hint">{playHint}</p> : null}
      <ol className="apd-steps" aria-label="Walkthrough steps">
        {STEPS.map((step, index) => (
          <li key={step.key}>
            <button
              type="button"
              className={`apd-step${index === state.step ? " is-active" : ""}${index < state.step ? " is-past" : ""}`}
              aria-current={index === state.step ? "step" : undefined}
              onClick={() => dispatch({ type: "goTo", step: index })}
            >
              <span className="apd-step-index">{index + 1}</span>
              <span className="apd-step-copy">
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
