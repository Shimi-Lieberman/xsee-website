import type { Dispatch } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Search } from "lucide-react";
import { STAGES, STEPS } from "@/lib/attackPathScenario";
import { LAST_STEP, STORY_MS, STORY_PHASES, stageIndex, storyPhaseIndex, type DemoAction, type DemoState } from "./demoState";

type Props = { state: DemoState; dispatch: Dispatch<DemoAction> };

export function StoryControls({ state, dispatch }: Props) {
  const ended = state.story === "ended";
  const playing = state.story === "playing";
  const current = storyPhaseIndex(state.storyMs);
  const percent = Math.round((state.storyMs / STORY_MS) * 100);

  return (
    <div className="apd-nav apd-story-nav">
      <div className="apd-story-bar">
        {ended ? (
          <button type="button" className="apd-control is-primary" onClick={() => dispatch({ type: "storyReplay" })}>
            <RotateCcw aria-hidden /> <span>Replay</span>
          </button>
        ) : (
          <button
            type="button"
            className="apd-control is-primary apd-control-play"
            onClick={() => dispatch({ type: playing ? "storyPause" : state.story === "idle" ? "storyStart" : "storyResume" })}
            aria-label={playing ? "Pause story" : state.story === "idle" ? "Play story" : "Resume story"}
          >
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
            <span>{playing ? "Pause" : state.story === "idle" ? "Play story" : "Resume"}</span>
          </button>
        )}
        <div
          className="apd-track"
          role="progressbar"
          aria-label="Story progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={`${STORY_PHASES[current].label}, ${percent}%`}
        >
          {STORY_PHASES.map((phase, index) => {
            const fill = Math.min(1, Math.max(0, (state.storyMs - phase.start) / (phase.end - phase.start)));
            return (
              <span key={phase.label} className={`apd-seg${index === current && !ended ? " is-current" : ""}`}>
                <span className="apd-seg-fill" style={{ transform: `scaleX(${fill})` }} />
              </span>
            );
          })}
        </div>
        <button type="button" className="apd-control" onClick={() => dispatch({ type: "explore" })}>
          <Search aria-hidden /> <span>Explore</span>
        </button>
      </div>
      <ol className="apd-seg-labels" aria-hidden>
        {STORY_PHASES.map((phase, index) => (
          <li key={phase.label} className={index === current ? "is-current" : index < current ? "is-past" : ""}>
            {phase.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ExploreControls({ state, dispatch }: Props) {
  const currentStage = stageIndex(state.step);
  const stage = STAGES[currentStage];
  return (
    <div className="apd-nav">
      <ol className="apd-stages" aria-label="Walkthrough stages">
        {STAGES.map((item, index) => (
          <li key={item.key}>
            <button
              type="button"
              className={`apd-stage-tab${index === currentStage ? " is-active" : ""}${index < currentStage ? " is-past" : ""}`}
              aria-current={index === currentStage ? "step" : undefined}
              onClick={() => dispatch({ type: "goTo", step: item.steps[0] })}
            >
              <span className="apd-step-index">{index + 1}</span>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
      {stage.steps.length > 1 ? (
        <ol className="apd-substeps" aria-label={`${stage.title} steps`}>
          {stage.steps.map((step) => (
            <li key={step}>
              <button
                type="button"
                className={`apd-substep${step === state.step ? " is-active" : ""}${step < state.step ? " is-past" : ""}`}
                aria-current={step === state.step ? "step" : undefined}
                onClick={() => dispatch({ type: "goTo", step })}
              >
                {STEPS[step].title}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
      <div className="apd-controls" role="group" aria-label="Step navigation">
        <button type="button" className="apd-control" onClick={() => dispatch({ type: "prev" })} disabled={state.step === 0}>
          <ChevronLeft aria-hidden /> <span>Previous</span>
        </button>
        <button type="button" className="apd-control" onClick={() => dispatch({ type: "next" })} disabled={state.step === LAST_STEP}>
          <span>Next</span> <ChevronRight aria-hidden />
        </button>
        <button type="button" className="apd-control is-quiet apd-control-replay" onClick={() => dispatch({ type: "storyReplay" })}>
          <Play aria-hidden /> <span>Play walkthrough</span>
        </button>
      </div>
    </div>
  );
}
