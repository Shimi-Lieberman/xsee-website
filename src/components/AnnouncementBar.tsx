"use client";

import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <Link href="/free-scan" className="ann-inner ann-link-wrap">
        <span className="ann-badge-warm">NEW</span>
        <span className="ann-text">
          AI-powered attacks are here. Is your cloud ready to prove it can stop them?
        </span>
        <span className="ann-cta">See how XSEE proves it →</span>
      </Link>
    </div>
  );
}
