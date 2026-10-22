"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";

export default function ClosingInvite() {
  return (
    <section className="lp-closing" aria-labelledby="lp-closing-title" data-nav-tone="dark">
      <h2 id="lp-closing-title" className="lp-closing-title text-balance">
        See XSEE with your team.
      </h2>
      <p className="lp-closing-lede text-pretty">A private walkthrough, scoped to the questions your team is asking.</p>
      <Link href="/demo" className="lp-btn lp-btn--primary" onClick={() => Analytics.ctaClicked("closing", "request_demo")}>
        Request a demo <ArrowRight size={16} aria-hidden />
      </Link>
    </section>
  );
}
