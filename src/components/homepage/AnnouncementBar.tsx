import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="v2-polish sticky top-0 z-[60] h-9 overflow-hidden border-b border-[var(--v2-line)] bg-[var(--v2-base)]">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-2.5 text-[12px] text-[var(--v2-ink2)]">
          <span className="green-dot shrink-0" style={{ boxShadow: "none" }} />
          <span className="v2-mono hidden text-[var(--v2-ink3)] sm:inline" style={{ letterSpacing: "0.1em" }}>
            AUTONOMOUS AGENTS
          </span>
          <span className="hidden text-[var(--v2-ink4)] sm:inline">·</span>
          <span className="truncate">Investigation · Board Report · Threat Hunt — now live</span>
        </div>
        <Link
          href="/changelog"
          className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[var(--v2-ink)] transition-colors duration-200 hover:text-[var(--v2-brand)]"
        >
          <span>Changelog</span>
          <ArrowRight className="h-3 w-3 shrink-0" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
