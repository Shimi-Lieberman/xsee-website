import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="ann-inner">
        <span className="ann-badge">New</span>
        <span className="ann-text">
          XseeCyber L3 — Runtime exploit simulation with detection gap analysis is
          now live.
        </span>
        <Link href="#engines" className="ann-link">
          Learn more →
        </Link>
      </div>
    </div>
  );
}
