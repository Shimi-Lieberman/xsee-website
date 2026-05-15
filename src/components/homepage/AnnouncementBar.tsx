import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="relative border-b border-[var(--hp-line)] bg-[var(--hp-base)]">
      <div className="hp-container px-6 lg:px-10 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-[12px] text-[var(--hp-ink2)] min-w-0">
          <span className="hp-green-dot" style={{ boxShadow: "none" }} />
          <span className="hidden sm:inline hp-mono text-[var(--hp-ink3)]" style={{ letterSpacing: "0.1em" }}>
            AUTONOMOUS AGENTS
          </span>
          <span className="hidden sm:inline text-[var(--hp-ink4)]">·</span>
          <span className="truncate">Investigation · Board Report · Threat Hunt — now live</span>
        </div>
        <Link
          href="/changelog"
          className="inline-flex items-center gap-1.5 text-[12px] text-[var(--hp-ink)] hover:text-[var(--hp-brand)] transition-colors shrink-0"
        >
          <span className="hidden sm:inline">Changelog</span>
          <span className="sm:hidden">Log</span>
          <ArrowRight className="w-3 h-3" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
