"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import "./cinematic.css";

const WORDS = ["See.", "Chain.", "Prove.", "Close.", "Repeat."];

export default function StoryFinale() {
  return (
    <section className="cx cx-finale" aria-labelledby="cx-finale-title" data-nav-tone="dark">
      <p className="cx-finale-kicker">The XSEE loop</p>
      <h2 id="cx-finale-title">
        {WORDS.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </h2>
      <div className="cs-actions">
        <Link href="/demo" className="cs-btn cs-btn--primary" onClick={() => Analytics.ctaClicked("finale", "book_demo")}>
          See XSEE in action <ArrowRight size={16} aria-hidden />
        </Link>
        <Link href="/product" className="cs-btn cs-btn--ghost">
          Explore the technology
        </Link>
      </div>
    </section>
  );
}
