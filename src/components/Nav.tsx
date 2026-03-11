import Link from "next/link";

export default function Nav() {
  return (
    <nav id="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="#" className="nav-logo">
            <svg
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[30px] w-[30px] flex-shrink-0"
            >
              <path
                d="M15 2L4 7.5V15C4 21.3 8.9 27.1 15 29C21.1 27.1 26 21.3 26 15V7.5L15 2Z"
                stroke="#3B82F6"
                strokeWidth={1.5}
                fill="rgba(37,99,235,0.1)"
              />
              <path
                d="M10 15L14 19L20 11"
                stroke="#3B82F6"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="logo-wordmark">
              X<em>SEE</em>
            </span>
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
              Request Demo
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
