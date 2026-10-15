import EvidenceConsole from "../EvidenceConsole";
import "./cinematic.css";

export default function ExploreChapter() {
  return (
    <section className="cx" aria-labelledby="cx-title" data-nav-tone="dark">
      <div className="cx-head">
        <p className="cs-eyebrow">
          <span>Explore</span> The evidence behind the story
        </p>
        <h2 id="cx-title" className="text-balance">
          Every state you just saw has a record behind it.
        </h2>
        <p className="text-pretty">
          Watch the evidence console, step through the attack path yourself, and inspect how each technique moves through the evidence reactor.
        </p>
      </div>
      <div className="cx-terminal">
        <EvidenceConsole />
      </div>
    </section>
  );
}
