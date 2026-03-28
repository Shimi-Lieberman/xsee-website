import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";

export default function Footer() {
  return (
    <footer className="sec-navy">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <SiteLogo />
            </div>
            <p className="footer-tagline">
              XSEE — Cloud Exposure Intelligence. Discover. Validate. Simulate. Fix. Certify. Built for the age of AI attackers.
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
                <Link href="/#how">How It Works</Link>
              </li>
              <li>
                <Link href="/#engines">Engines</Link>
              </li>
              <li>
                <Link href="/vs-wiz">XSEE vs Wiz</Link>
              </li>
              <li>
                <Link href="/#pricing">Pricing</Link>
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
                <Link href="/#contact">Contact</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
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
                <Link href="/changelog">Changelog</Link>
              </li>
              <li>
                <Link href="#">Status</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/70">Contact</h4>
            <Link href="/#contact" className="mb-2 block text-sm text-white/50 transition-colors hover:text-white">
              Request a Demo
            </Link>
            <a href="mailto:hello@xsee.io" className="block text-sm text-white/50 transition-colors hover:text-white">
              hello@xsee.io
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} XSEE. All rights reserved.</p>
          <div className="footer-legal flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/refunds">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
