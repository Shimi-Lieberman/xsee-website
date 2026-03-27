import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image
              src="/logo-primary-transparent.svg"
              width={114}
              height={36}
              alt="XSEE"
              style={{ background: "transparent" }}
            />
          </Link>
          <nav className="nav-links">
            <Link href="/#how" className="nav-link">
              Platform
            </Link>
            <Link href="/#engines" className="nav-link">
              Engines
            </Link>
            <Link href="/#compare" className="nav-link">
              Why XSEE
            </Link>
            <Link href="/free-scan" className="nav-link">
              Free Scan
            </Link>
            <Link href="/#pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/#contact" className="nav-link">
              Contact
            </Link>
          </nav>
          <div className="nav-actions">
            <Link href="/under-attack" className="nav-emergency">
              <span className="nav-emergency-dot" />
              Under Attack?
            </Link>
            <div className="nav-status-pill">
              <div className="nav-status-dot" />
              All Systems Operational
            </div>
            <Link href="/#contact" className="btn btn-primary btn-sm">
              Free Risk Assessment
            </Link>
            <Link
              href="https://app.xsee.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              Launch App →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
