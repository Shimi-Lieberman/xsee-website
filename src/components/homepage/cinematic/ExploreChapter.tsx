import { Play } from "lucide-react";
import EvidenceConsole from "../EvidenceConsole";
import "./cinematic.css";

const LEGEND = [
  { state: "proven", label: "Proven", detail: "Observed in configuration or confirmed by policy simulation." },
  { state: "inferred", label: "Inferred", detail: "Depends on a stated assumption." },
  { state: "unverified", label: "Unverified", detail: "Untested, or access was denied." },
] as const;

export default function ExploreChapter() {
  return (
    <section id="experience-the-proof" className="cx" aria-labelledby="cx-title" data-nav-tone="dark">
      <div className="cx-head">
        <p className="cs-eyebrow">
          <span>Experience the proof</span> Exposure, path, evidence, fix
        </p>
        <h2 id="cx-title" className="text-balance">
          Follow one path from exposure to the fix.
        </h2>
        <p className="text-pretty">
          See the exposure, the path it opens, the asset it reaches, the evidence behind each step, and the change that closes it.
        </p>
        <p className="cx-synthetic">Synthetic demonstration environment</p>
        <ul className="cx-legend" aria-label="Evidence states">
          {LEGEND.map((item) => (
            <li key={item.state} className={`cx-legend-item is-${item.state}`}>
              <span className="cx-legend-mark" aria-hidden />
              <span>
                <strong>{item.label}</strong> {item.detail}
              </span>
            </li>
          ))}
        </ul>
        <a className="cx-watch" href="#experience">
          <Play size={14} aria-hidden /> Prefer to watch? 1:16
        </a>
      </div>
      <div className="cx-terminal">
        <EvidenceConsole />
      </div>
    </section>
  );
}
