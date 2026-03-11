import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-wordmark">
              X<em>SEE</em>
            </div>
            <p className="footer-tagline">
              Cloud Attack Intelligence Platform. Discover real attack paths.
              Prove exploitability. Fix what matters.
            </p>
            <div className="footer-status">
              <div className="footer-status-dot" />
              All Systems Operational
            </div>
          </div>
          <div>
            <div className="footer-col-head">Product</div>
            <ul className="footer-links">
              <li>
                <Link href="#how">How It Works</Link>
              </li>
              <li>
                <Link href="#engines">Engines</Link>
              </li>
              <li>
                <Link href="#compare">vs. Wiz</Link>
              </li>
              <li>
                <Link href="#pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Company</div>
            <ul className="footer-links">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
              <li>
                <Link href="#">Security</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Resources</div>
            <ul className="footer-links">
              <li>
                <Link href="#">Documentation</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Changelog</Link>
              </li>
              <li>
                <Link href="#">Status</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} XSEE. All rights reserved.</p>
          <div className="footer-legal flex gap-5">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
