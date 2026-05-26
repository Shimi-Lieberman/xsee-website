// FOOTER — minimal, dense, premium

function Footer() {
  const groups = [
    {
      title: 'Product',
      links: ['Attack Intelligence', 'Approval Queue', 'Autonomous Runs', 'Findings', 'Crown Jewels', 'Integrations']
    },
    {
      title: 'Resources',
      links: ['Docs', 'Changelog', 'Security', 'SOC 2 report', 'IAM policy', 'Status']
    },
    {
      title: 'Company',
      links: ['Manifesto', 'Customers', 'Pricing', 'Careers', 'Press', 'Contact']
    },
  ];
  return (
    <footer className="relative bg-base2 border-t hairline px-6 lg:px-10 pt-20 lg:pt-28 pb-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 lg:pb-24">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-6">
              <svg width="22" height="22" viewBox="0 0 49.4 49.4" fill="#FF1B8D">
                <path d="M0 0h49.4v49.4l-4.3-6.3V4.32H4.32v40.79h8L20.06 33.8l2.69 3.94L14.76 49.4H0V0Zm27.76 45.1h8.4L25.1 28.62l10.86-15.9 3.77 2.4-9.65 14.12 13.86 20.2h-9.04l-7.14-4.32Zm-15.5-33.04 6.42 3.04 3.58 5.27-2.15 3.1-7.85-11.42Z"/>
              </svg>
              <span className="font-semibold text-[15px] text-ink">xsee</span>
            </div>
            <p className="text-[17px] leading-[1.5] text-ink2 max-w-[380px] serif-accent mb-6"
              style={{ fontWeight: 400, fontStyle: 'italic' }}>
              Every breach has a path. We prove it before they take it.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="green-dot dot-pulse"></span>
              <span className="mono text-[11px] text-ink3 tracking-[0.14em]">ALL SYSTEMS NORMAL</span>
            </div>
          </div>

          {/* Link columns */}
          {groups.map(g => (
            <div key={g.title} className="lg:col-span-2">
              <div className="eyebrow mb-5">{g.title}</div>
              <ul className="space-y-3 text-[14px]">
                {g.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-ink2 hover:text-ink transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-1"></div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t hairline flex flex-wrap items-center justify-between gap-4 mono text-[11px] text-ink3 tracking-[0.06em]">
          <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
            <span>© 2026 xsee, inc.</span>
            <a href="#" className="hover:text-ink2 transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink2 transition-colors">Terms</a>
            <a href="#" className="hover:text-ink2 transition-colors">DPA</a>
            <a href="#" className="hover:text-ink2 transition-colors">SOC 2 report</a>
          </div>
          <div>San Francisco · Tel Aviv</div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
