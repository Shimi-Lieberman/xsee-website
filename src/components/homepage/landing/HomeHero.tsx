"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";

export default function HomeHero() {
  return (
    <section id="top" className="lp-hero" aria-labelledby="lp-hero-title" data-nav-tone="dark">
      <div className="lp-hero-inner">
        <p className="lp-eyebrow">
          <img src="/logo-symbol-only.svg" alt="" width={18} height={18} className="lp-eyebrow-mark" />
          Attack-path validation for AWS
        </p>
        <h1 id="lp-hero-title" className="lp-hero-title text-balance">
          Know which attack paths are real. Fix what matters first.
        </h1>
        <p className="lp-hero-lede text-pretty">
          XSEE connects exposures across your AWS environment, shows the evidence behind each reachable path, and checks the path
          again after your team makes a change.
        </p>
        <div className="lp-hero-actions">
          <Link href="/demo" className="lp-btn lp-btn--primary" onClick={() => Analytics.ctaClicked("hero", "request_demo")}>
            Request a demo <ArrowRight size={16} aria-hidden />
          </Link>
          <span className="lp-hero-note">Read-only access. Nothing changes in your account.</span>
        </div>
      </div>
    </section>
  );
}
