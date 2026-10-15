import { SCENARIO } from "@/lib/attackPathScenario";
import { STORY_PHASES, storyPhaseIndex, type DemoState } from "./demoState";

export default function StoryCaption({ state }: { state: DemoState }) {
  if (state.story === "ended") {
    return (
      <div className="apd-caption is-outcome">
        <p className="apd-caption-step">Outcome</p>
        <p className="apd-caption-text text-balance">
          {SCENARIO.pathId} was closed by a reviewed change, verified by re-test, then reopened by drift.
        </p>
        <p className="apd-caption-note">The closure record below keeps every event, including the reassessment.</p>
      </div>
    );
  }
  const index = storyPhaseIndex(state.storyMs);
  const phase = STORY_PHASES[index];
  return (
    <div className="apd-caption">
      <p className="apd-caption-step">
        {index + 1} / {STORY_PHASES.length} · {phase.label}
      </p>
      <p key={phase.label} className="apd-caption-text text-balance">
        {phase.caption}
      </p>
    </div>
  );
}
