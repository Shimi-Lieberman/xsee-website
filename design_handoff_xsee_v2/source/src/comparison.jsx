// COMPARISON — Light surface continues. Editorial 2-column "Before / With" contrast.

function ComparisonRow({ label, before, after }) {
  return (
    <div className="grid grid-cols-12 gap-6 py-6 border-b border-boneLine last:border-b-0 items-start">
      <div className="col-span-12 md:col-span-3">
        <div className="text-[13px] mono tracking-[0.06em] uppercase text-ink7">{label}</div>
      </div>
      <div className="col-span-12 md:col-span-4 text-[15.5px]" style={{ color: '#4A4E5C', textWrap: 'pretty' }}>
        {before}
      </div>
      <div className="col-span-12 md:col-span-5 text-[15.5px]" style={{ color: '#13151C', textWrap: 'pretty' }}>
        {after}
      </div>
    </div>
  );
}

function Comparison() {
  return (
    <section className="relative" style={{ background: '#F2EFE8' }}>
      <div className="py-28 lg:py-40 px-6 lg:px-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="eyebrow eyebrow-light">04 · The contrast</span>
            <span className="flex-1 h-px bg-boneLine max-w-[200px]"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <h2 className="display display-xl" style={{ color: '#13151C' }}>
                <span className="block">Every other tool reports.</span>
                <span className="block" style={{ color: '#7B8093' }}>
                  <span className="serif-accent" style={{ fontWeight: 400 }}>xsee</span> proves.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <p className="text-[17px] leading-[1.65] max-w-[420px]"
                style={{ color: '#4A4E5C', textWrap: 'pretty' }}>
                The category is full of dashboards that grade the size of your problem.
                We're the one that hands you the receipt for closing it.
              </p>
            </div>
          </div>

          {/* Header strip */}
          <div className="grid grid-cols-12 gap-6 pb-5 border-b-2 border-ink5">
            <div className="col-span-12 md:col-span-3"></div>
            <div className="col-span-12 md:col-span-4">
              <div className="text-[11px] mono tracking-[0.18em] uppercase" style={{ color: '#7B8093' }}>
                Traditional CSPM
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 49.4 49.4" fill="#FF1B8D">
                  <path d="M0 0h49.4v49.4l-4.3-6.3V4.32H4.32v40.79h8L20.06 33.8l2.69 3.94L14.76 49.4H0V0Zm27.76 45.1h8.4L25.1 28.62l10.86-15.9 3.77 2.4-9.65 14.12 13.86 20.2h-9.04l-7.14-4.32Zm-15.5-33.04 6.42 3.04 3.58 5.27-2.15 3.1-7.85-11.42Z"/>
                </svg>
                <div className="text-[11px] mono tracking-[0.18em] uppercase" style={{ color: '#13151C', fontWeight: 600 }}>
                  xsee
                </div>
              </div>
            </div>
          </div>

          <ComparisonRow
            label="What you receive"
            before="A weekly digest with 4,000 findings and a severity histogram."
            after="A specific list of attack paths that reach data — usually fewer than five."
          />
          <ComparisonRow
            label="How they're proved"
            before="A static rules engine. If a port is open and a CVE applies, it's a finding."
            after="Live AWS API calls per hop. Real CloudTrail evidence. Reproducible from the receipt."
          />
          <ComparisonRow
            label="What happens next"
            before="A Jira ticket assigned to a team that doesn't own the resource."
            after="A proposed fix tied to the smallest change that breaks the path. One human approves; the loop applies it."
          />
          <ComparisonRow
            label="When it's resolved"
            before="When someone manually re-runs the scan and the finding falls off."
            after="The moment the path is broken — and a cryptographically signed receipt is filed."
          />
          <ComparisonRow
            label="Time-to-first-proof"
            before="6–12 weeks of integration + a long-tail of false-positive triage."
            after="Under 30 minutes from CloudFormation paste to first signed path closed."
          />
          <ComparisonRow
            label="What audit gets"
            before='"We resolved 3,847 findings last quarter."'
            after='"We closed 14 reachable paths to prod data. Here is the signature for each."'
          />

          {/* Bottom CTA strip */}
          <div className="mt-16 lg:mt-20 flex flex-wrap items-center justify-between gap-6">
            <div className="text-[13px] mono tracking-[0.06em] uppercase" style={{ color: '#7B8093' }}>
              Side-by-side · 90 day pilot
            </div>
            <a href="#cta" className="btn-light-primary inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px] font-medium">
              See your own breach paths
              <I.ArrowRight className="w-4 h-4"/>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom hard transition seam to dark */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-base"></div>
    </section>
  );
}

window.Comparison = Comparison;
