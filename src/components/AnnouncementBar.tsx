import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="ann-inner">
        <span className="ann-badge-warm">New</span>
        <span className="ann-text">
          XSEE is now in early access — the first platform that proves which exposures actually lead to a breach.
        </span>
        <Link href="#contact" className="ann-link">
          Request access →
        </Link>
      </div>
    </div>
  );
}
