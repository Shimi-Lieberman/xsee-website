import Link from "next/link";

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="#" className="nav-logo">
            <img
              src="/logo-primary-transparent.svg"
              onError={(e) => console.error("Logo failed to load:", e)}
              height={36}
              style={{ height: "36px", width: "auto" }}
              alt="XSEE"
            />
          </Link>
          <nav className="nav-links">
            <Link href="#how" className="nav-link">
              Platform
            </Link>
            <Link href="#engines" className="nav-link">
              Engines
            </Link>
            <Link href="#compare" className="nav-link">
              Why XSEE
            </Link>
            <Link href="#pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </nav>
          <div className="nav-actions">
            <div className="nav-status-pill">
              <div className="nav-status-dot" />
              All Systems Operational
            </div>
            <Link href="#contact" className="btn btn-secondary btn-sm">
              Free Report
            </Link>
            <Link
              href="https://app.xsee.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Launch App →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
