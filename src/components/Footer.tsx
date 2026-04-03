import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#050d1a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/*
        === PREVIOUS FOOTER (replaced) ===
        sec-navy footer with SiteLogo, FooterMiniContact, footer-grid columns:
        Product: How It Works, Engines, XSEE vs Wiz, Pricing
        Company: About/Careers plain, Contact, Security
        Resources: Documentation, Blog, Status, Changelog (plain spans)
        Contact column: FooterMiniContact, Request Demo, sales@xsee.io
        footer-bottom: Terms, Privacy, Refunds
      */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <img
            src="/logo-primary-transparent.svg"
            alt="XSEE"
            style={{ height: "32px", width: "auto", marginBottom: "16px" }}
          />
          <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-5">
            Cloud Attack Intelligence. Discover. Validate. Simulate. Fix. Certify. Built for the age of AI attackers.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Systems Operational
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-4 font-mono">
            Product
          </div>
          {[
            { label: "How It Works", href: "/#how" },
            { label: "Engines", href: "/#engines" },
            { label: "vs. Wiz", href: "/vs-wiz" },
            { label: "Pricing", href: "/#pricing" },
            { label: "Changelog", href: "/changelog" },
            { label: "Free Scan", href: "/free-scan" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/40 hover:text-white mb-2.5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-4 font-mono">
            Company
          </div>
          {[
            { label: "About", href: "#" },
            { label: "Security", href: "/security" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "/#contact" },
            { label: "sales@xsee.io", href: "mailto:sales@xsee.io" },
            { label: "Under Attack?", href: "/under-attack" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/40 hover:text-white mb-2.5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-4 font-mono">
            Resources
          </div>
          {[
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Status", href: "#" },
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/40 hover:text-white mb-2.5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className="px-6 py-5 max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="text-xs text-white/22">© {new Date().getFullYear()} XSEE. All rights reserved.</div>
        <div className="flex items-center gap-5">
          {[
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Security", href: "/security" },
            { label: "Refunds", href: "/refunds" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-white/22 hover:text-white/55 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-[10px] text-white/18 font-mono flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          v1.4.0 · All systems operational
        </div>
      </div>
    </footer>
  );
}
