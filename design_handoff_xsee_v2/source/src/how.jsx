// HOW — Light interlude. Cream/bone surface. Apple-style rhythm break.
// Three-step setup walkthrough with editorial illustration.

function HowStep({ num, name, blurb, time, visual }) {
  return (
    <div className="group">
      <div className="aspect-[5/3] rounded-[14px] border border-boneLine bg-white overflow-hidden mb-7 relative transition-all duration-300 group-hover:border-[#A29B8B]">
        {visual}
      </div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="mono text-[11px] tracking-[0.16em] text-ink7">{num}</span>
        <span className="mono text-[11px] tracking-[0.14em] text-ink7">·</span>
        <span className="mono text-[11px] tracking-[0.14em] text-ink7">{time}</span>
      </div>
      <h3 className="text-[26px] lg:text-[28px] font-medium text-ink5 tracking-tight mb-3"
        style={{ letterSpacing: '-0.025em' }}>
        {name}
      </h3>
      <p className="text-[14.5px] leading-[1.6] text-ink6 max-w-[36ch]" style={{ textWrap: 'pretty' }}>
        {blurb}
      </p>
    </div>
  );
}

function ConnectVisual() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {/* AWS-style cloud silhouette */}
      <g transform="translate(200 120)">
        {/* Soft halo */}
        <circle cx="0" cy="0" r="92" fill="rgba(255,27,141,0.06)"/>
        <circle cx="0" cy="0" r="64" fill="#F8F5EE" stroke="#E5E0D2" strokeWidth="1"/>
        {/* AWS cube */}
        <g transform="translate(-22 -22)" fill="none" stroke="#13151C" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M22 4 L40 13 L40 32 L22 41 L4 32 L4 13 Z"/>
          <path d="M22 4 L22 22 L40 32" opacity="0.4"/>
          <path d="M22 22 L4 32" opacity="0.4"/>
        </g>
      </g>
      {/* Connection line */}
      <line x1="40" y1="120" x2="108" y2="120" stroke="#13151C" strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="40" cy="120" r="5" fill="#FF1B8D"/>
      <text x="40" y="148" fill="#7B8093" fontFamily="Geist Mono" fontSize="9" textAnchor="middle">YOU</text>
      {/* IAM badge */}
      <g transform="translate(310 95)">
        <rect x="0" y="0" width="76" height="50" rx="6" fill="white" stroke="#E5E0D2"/>
        <text x="38" y="18" fill="#7B8093" fontFamily="Geist" fontSize="8" fontWeight="600" letterSpacing="1.2" textAnchor="middle">IAM ROLE</text>
        <text x="38" y="33" fill="#13151C" fontFamily="Geist Mono" fontSize="9.5" textAnchor="middle">xsee-read</text>
        <circle cx="11" cy="42" r="2.5" fill="#10B981"/>
        <text x="18" y="44" fill="#10B981" fontFamily="Geist Mono" fontSize="7.5">read-only</text>
      </g>
      <line x1="276" y1="120" x2="306" y2="120" stroke="#13151C" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}

function ScanVisual() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {/* Stacked resource bars (mini inventory) */}
      <g transform="translate(40 30)">
        {['EC2', 'IAM', 'RDS', 'S3', 'VPC', 'LMB'].map((r, i) => (
          <g key={r} transform={`translate(0 ${i * 28})`}>
            <text x="0" y="14" fill="#7B8093" fontFamily="Geist Mono" fontSize="9.5" fontWeight="600" letterSpacing="0.5">{r}</text>
            <rect x="44" y="6" height="10" rx="2"
              width={60 + (i * 23) % 200}
              fill="#13151C" opacity={0.85 - i * 0.07}/>
            <text x={48 + 60 + (i * 23) % 200 + 8} y="14"
              fill="#7B8093" fontFamily="Geist Mono" fontSize="9">
              {[342, 87, 14, 23, 8, 41][i]}
            </text>
          </g>
        ))}
      </g>
      {/* Sweeping progress dot */}
      <circle cx="200" cy="210" r="3" fill="#FF1B8D">
        <animate attributeName="cx" from="40" to="360" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <line x1="40" y1="210" x2="360" y2="210" stroke="#E5E0D2" strokeWidth="1"/>
    </svg>
  );
}

function ReviewVisual() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {/* Approval card */}
      <g transform="translate(40 30)">
        <rect x="0" y="0" width="320" height="180" rx="8" fill="white" stroke="#E5E0D2"/>
        <rect x="0" y="0" width="320" height="3" fill="#FF1B8D"/>
        {/* Header */}
        <text x="20" y="28" fill="#7B8093" fontFamily="Geist" fontSize="9" fontWeight="600" letterSpacing="1.2">FIX PROPOSAL · #4F2A</text>
        {/* Title */}
        <text x="20" y="54" fill="#13151C" fontFamily="Geist" fontSize="15" fontWeight="600">Remove ingress on sg-bastion</text>
        {/* Body */}
        <text x="20" y="76" fill="#7B8093" fontFamily="Geist" fontSize="11">Breaks 4 paths · effort: low</text>

        {/* Approve / reject buttons */}
        <rect x="20" y="120" width="110" height="36" rx="6" fill="#13151C"/>
        <text x="75" y="142" fill="white" fontFamily="Geist" fontSize="12" fontWeight="500" textAnchor="middle">Approve</text>
        <rect x="140" y="120" width="84" height="36" rx="6" fill="white" stroke="#E5E0D2"/>
        <text x="182" y="142" fill="#13151C" fontFamily="Geist" fontSize="12" textAnchor="middle">Reject</text>

        {/* Cursor hint pointing at Approve */}
        <g transform="translate(76 102)">
          <circle cx="0" cy="0" r="8" fill="rgba(255,27,141,0.12)" stroke="#FF1B8D" strokeWidth="1"/>
          <circle cx="0" cy="0" r="3" fill="#FF1B8D"/>
        </g>
      </g>
    </svg>
  );
}

function How() {
  return (
    <section id="how" className="relative" style={{ background: '#F2EFE8' }}>
      {/* Top hard transition seam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-line"></div>

      <div className="relative py-28 lg:py-40 px-6 lg:px-10 overflow-hidden">
        {/* Soft warm dot grid */}
        <div className="absolute inset-0 dotgrid-light opacity-50 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative">

          {/* Section header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-20">
            <span className="eyebrow eyebrow-light">03 · Setup</span>
            <span className="flex-1 h-px bg-boneLine max-w-[200px]"></span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 lg:mb-28">
            <div className="lg:col-span-7">
              <h2 className="display display-xl" style={{ color: '#13151C' }}>
                <span className="block">From sign-up to first proof</span>
                <span className="block text-ink6 serif-accent" style={{ fontWeight: 400 }}>
                  in under thirty minutes.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="text-[18px] leading-[1.6] max-w-[440px]"
                style={{ color: '#4A4E5C', textWrap: 'pretty' }}>
                One IAM role. Read-only. No data leaves your AWS account. The first
                breach paths surface while you're still on the call.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <HowStep
              num="01"
              time="2 MIN"
              name="Connect."
              blurb="Paste a single CloudFormation URL. We assume a read-only role into your account. No agents, no SDKs, no exfiltration."
              visual={<ConnectVisual/>}
            />
            <HowStep
              num="02"
              time="~25 MIN"
              name="Scan."
              blurb="Every region, every IAM principal, every flow log. The first attack graph builds while you watch."
              visual={<ScanVisual/>}
            />
            <HowStep
              num="03"
              time="ONE CLICK"
              name="Review."
              blurb="Each path arrives with a proposed fix. Approve the ones you trust; the loop applies them and signs the receipt."
              visual={<ReviewVisual/>}
            />
          </div>

          {/* Subtle proof strip */}
          <div className="mt-20 lg:mt-28 pt-10 border-t border-boneLine flex flex-wrap items-center justify-between gap-6">
            <p className="text-[15px] max-w-[480px]" style={{ color: '#4A4E5C', textWrap: 'pretty' }}>
              The first scan reports back in the same hour. A median customer closes
              their first critical path on{" "}
              <span style={{ color: '#13151C', fontWeight: 500 }}>day&nbsp;one</span>.
            </p>
            <div className="flex items-center gap-3">
              <a href="#cta" className="btn-light-primary inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px] font-medium">
                Connect your AWS account
                <I.ArrowRight className="w-4 h-4"/>
              </a>
              <a href="#docs" className="btn-light-ghost inline-flex items-center gap-2 h-11 px-5 rounded-full text-[14px]">
                Read the docs
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

window.How = How;
