// THE LOOP — 4 phases as premium cards with mini cinematic visuals
// SEE → CHAIN → PROVE → CLOSE. Stacked editorial layout.

function PhaseVisual({ kind }) {
  // Each phase has its own tiny cinematic SVG
  switch (kind) {
    case 'see':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full">
          <defs>
            <linearGradient id="seeScan" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0"/>
              <stop offset="50%" stopColor="#FF1B8D" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FF1B8D" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* Scattered findings */}
          {Array.from({ length: 48 }).map((_, i) => {
            const x = 10 + (i * 13) % 220;
            const y = 10 + Math.floor((i * 19) % 100);
            return <rect key={i} x={x} y={y} width="3" height="3" fill="#FF1B8D" opacity={0.18 + (i % 5) * 0.08}/>;
          })}
          {/* Sweeping line */}
          <rect x="-30" y="0" width="40" height="120" fill="url(#seeScan)" opacity="0.6">
            <animate attributeName="x" from="-40" to="240" dur="3s" repeatCount="indefinite"/>
          </rect>
        </svg>
      );
    case 'chain':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full">
          {/* 4 hop boxes connected */}
          {[20, 80, 140, 200].map((x, i) => (
            <g key={i}>
              <rect x={x - 14} y="50" width="28" height="20" rx="4"
                fill={i === 3 ? '#1A0E1A' : '#0F1320'}
                stroke={i === 3 ? '#FF1B8D' : '#2A3046'} strokeWidth="1"/>
              <circle cx={x} cy="60" r="2.5" fill={i === 3 ? '#FF1B8D' : '#6B7388'}/>
              {i < 3 && (
                <line x1={x + 14} y1="60" x2={x + 46} y2="60"
                  stroke="#FF1B8D" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1s" repeatCount="indefinite"/>
                </line>
              )}
            </g>
          ))}
        </svg>
      );
    case 'prove':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full">
          {/* API call list ascending */}
          {['sts:AssumeRole', 'iam:GetRolePolicy', 'rds:Connect'].map((api, i) => (
            <g key={i}>
              <rect x="20" y={20 + i * 24} width="200" height="18" rx="4"
                fill="#0F1320" stroke="#2A3046" strokeWidth="1"/>
              <circle cx="32" cy={29 + i * 24} r="2.5" fill="#10B981"/>
              <text x="44" y={33 + i * 24} fill="#A6ADC1" fontFamily="Geist Mono" fontSize="9.5">
                {api}
              </text>
              <text x="208" y={33 + i * 24} fill="#6B7388" fontFamily="Geist Mono" fontSize="9" textAnchor="end">200</text>
            </g>
          ))}
          {/* Pulse on last item */}
          <rect x="20" y="68" width="200" height="18" rx="4"
            fill="none" stroke="#FF1B8D" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
          </rect>
        </svg>
      );
    case 'close':
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full">
          {/* Certificate */}
          <rect x="40" y="20" width="160" height="80" rx="6"
            fill="#0F1320" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
          {/* Top stripe */}
          <rect x="40" y="20" width="160" height="3" fill="#10B981" opacity="0.6"/>
          {/* Checkmark */}
          <circle cx="62" cy="56" r="14" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1"/>
          <path d="M55 56 L60 61 L70 50" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Text lines */}
          <rect x="84" y="44" width="80" height="3" rx="1" fill="#3C4358"/>
          <rect x="84" y="52" width="100" height="3" rx="1" fill="#A6ADC1"/>
          <rect x="84" y="60" width="70" height="3" rx="1" fill="#3C4358"/>
          {/* Bottom signature dotted line */}
          <line x1="56" y1="82" x2="184" y2="82" stroke="#2A3046" strokeWidth="1" strokeDasharray="3 3"/>
          <text x="56" y="94" fill="#6B7388" fontFamily="Geist Mono" fontSize="7" letterSpacing="0.5">SIGNED · #4F2A7B</text>
        </svg>
      );
  }
}

function PhaseCard({ num, name, blurb, detail, kind, accent }) {
  return (
    <div className="card-dark p-7 lg:p-8 group transition-all duration-300 hover:border-line2 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-6">
        <div className="mono text-[11px] tracking-[0.16em] text-brand">{num}</div>
        <div className="text-[10.5px] mono tracking-[0.14em] text-ink3">{accent}</div>
      </div>

      <div className="aspect-[2/1] mb-7 -mx-1 rounded-lg overflow-hidden bg-base2 border hairline relative">
        <PhaseVisual kind={kind}/>
      </div>

      <h3 className="display text-ink text-[26px] lg:text-[30px] font-medium tracking-tight mb-3"
        style={{ letterSpacing: '-0.025em' }}>
        {name}
      </h3>
      <p className="text-[14.5px] leading-[1.6] text-ink2 mb-5" style={{ textWrap: 'pretty' }}>
        {blurb}
      </p>
      <div className="pt-5 border-t hairline mono text-[11px] text-ink3 tracking-[0.05em]">
        {detail}
      </div>
    </div>
  );
}

function Loop() {
  return (
    <section id="product" className="relative py-28 lg:py-40 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 glow-brand-soft"
          style={{ width: '700px', height: '700px' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="eyebrow">02 · The loop</span>
          <span className="flex-1 h-px bg-line2 opacity-30 max-w-[200px]"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <h2 className="display display-xl text-ink">
              <span className="block">Four steps.</span>
              <span className="block text-ink3">One signed receipt.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-[18px] leading-[1.6] text-ink2 max-w-[440px]"
              style={{ textWrap: 'pretty' }}>
              Continuous. Read-only. The same loop runs every fifteen minutes — and
              every change to your AWS posture is a new turn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <PhaseCard
            num="01 · SEE"
            kind="see"
            name="Inventory."
            blurb="A read-only sweep across every region pulls every IAM, VPC, security group and resource. No agents. No writes. Two minutes."
            detail="cloudtrail · iam · ec2 · rds · s3 · lambda"
            accent="~120s"
          />
          <PhaseCard
            num="02 · CHAIN"
            kind="chain"
            name="Chain."
            blurb="Misconfigurations join permissions join network reach into a single graph. Findings collapse into the handful of paths that actually connect."
            detail="dagre · force-atlas2 · path search"
            accent="~30s"
          />
          <PhaseCard
            num="03 · PROVE"
            kind="prove"
            name="Prove."
            blurb="Each hop is verified against live AWS APIs. The receipt records the exact CloudTrail event, the policy in force, the network ACL — every step."
            detail="aws sdk · cloudtrail · read-only"
            accent="~5s / hop"
          />
          <PhaseCard
            num="04 · CLOSE"
            kind="close"
            name="Close."
            blurb="One human approves; the autonomous loop applies the smallest fix that breaks the path — and signs a certificate the moment it's gone."
            detail="approval queue · signed receipts"
            accent="~60s"
          />
        </div>
      </div>
    </section>
  );
}

window.Loop = Loop;
