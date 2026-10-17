import { ChevronDown } from "lucide-react";
import { BIBLE } from "@/lib/cinematic/bible";

export function BibleView() {
  return (
    <details className="lab-bible">
      <summary>
        Visual production bible
        <ChevronDown size={20} aria-hidden="true" />
      </summary>
      <div className="lab-bible-body">
        {BIBLE.map((section) => (
          <section key={section.id} className="lab-section">
            <h3>{section.title}</h3>
            <ul>
              {section.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
