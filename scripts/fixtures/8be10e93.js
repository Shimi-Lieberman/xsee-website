// SECTION — Trust architecture. Two-role IAM model (matches the live site).

function RoleCard({ tag, status, name, sub, summary, allows, denies, accent }) {
  return (
    <div className={"card overflow-hidden flex flex-col h-full " + (accent ? "border-brand/40" : "")}>
      <div className="px-6 py-5 border-b hairline">
        <div className="flex items-center justify-between">
          <span className={"mono text-[11px] " + (accent ? "text-brand" : "text-ink3")} style={{ letterSpacing: '0.14em' }}>
            {tag}
          </span>
          <span className={
            "inline-flex items-center gap-1.5 text-[10.5px] mono px-2 py-[3px] rounded-full border " +
            (accent
              ? "border-ok/40 text-ok bg-ok/[0.08]"
              : "border-line2 text-ink2 bg-elevated")
          } style={{ letterSpacing: '0.1em' }}>
            <span className={accent ? "green-dot" : "amber-dot"} style={{ boxShadow: 'none' }}></span>
            {status}
          </span>
        </div>
        <div className="mt-3 text-[20px] text-ink font-semibold" style={{ letterSpacing: '-0.02em' }}>
          {name}
        </div>
        <div className="mt-1 text-[12.5px] text-ink3">{sub}</div>
      </div>

      <div className="px-6 py-5 flex-1 flex flex-col">
        <p className="text-[13.5px] text-ink2 leading-[1.6]">{summary}</p>

        <div className="mt-6 space-y-2">
          {allows.map(a => (
            <div key={a} className="mono text-[11.5px] text-ink2 flex items-center gap-2">
              <I.Check className="w-3.5 h-3.5 text-ok shrink-0" />
              <span className="truncate">{a}</span>
            </div>
          ))}
          {denies && denies.map(d => (
            <div key={d} className="mono text-[11.5px] text-ink3 flex items-center gap-2">
              <I.X className="w-3.5 h-3.5 text-ink4 shrink-0" />
              <span className="truncate line-through decoration-ink4">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ZeroWrite() {
  return (
    <section id="trust" className="px-6 lg:px-10 py-[120px] lg:py-[160px] border-t hairline">
      <div className="max-w-[1400px] mx-auto">
        <div className="eyebrow mb-6">Zero-trust access model</div>
        <h2
          className="font-semibold text-ink"
          style={{ fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.04em' }}
        >
          Read-only by default.
          <span className="text-ink3"> Write access only when you approve it.</span>
        </h2>
        <p className="mt-7 text-[17px] text-ink2 max-w-[760px] leading-[1.55]">
          XSEE uses two separate IAM roles with completely different permission scopes.
          You create both. You control both. You can revoke either in 10 seconds.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RoleCard
            tag="ROLE · 01"
            status="ALWAYS ACTIVE"
            name="XSEE Scanner"
            sub="Always read-only · always on"
            summary="Uses AWS ReadOnlyAccess managed policy. Discovers assets, validates attack paths, reads IAM policies and security-group rules. Cannot write, delete, or modify anything. Ever."
            allows={[
              'Describe* · List* · Get*',
              'iam:SimulatePrincipalPolicy',
              'iam:GetRolePolicy',
            ]}
            denies={[
              'All write actions',
              'All delete actions',
              'All create actions',
            ]}
            accent
          />

          <RoleCard
            tag="ROLE · 02"
            status="HUMAN-GATED"
            name="Remediation Agent"
            sub="Optional · scoped · audited"
            summary="Activated only when you choose automated remediation. You define exactly which write actions it can perform — nothing else. Every fix requires your explicit approval."
            allows={[
              'ec2:RevokeSecurityGroupIngress',
              'iam:DetachRolePolicy',
              's3:PutBucketPublicAccessBlock',
            ]}
            denies={[
              'iam:DeleteRole',
              'iam:CreateUser',
              's3:DeleteBucket',
            ]}
          />
        </div>

        {/* Audit trail callout */}
        <div className="mt-10 rounded-[12px] border hairline bg-overlay p-7 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="lg:max-w-[420px]">
            <div className="eyebrow text-ink3 mb-2">Complete audit trail</div>
            <div className="text-[16px] text-ink leading-[1.45]">
              Every action by either role is logged, timestamped, cryptographically signed,
              and tied to a human approval token.
            </div>
          </div>
          <div className="hidden lg:block flex-1 mono text-[11.5px] text-ink3 bg-elevated rounded-[8px] border hairline px-4 py-3 leading-[1.7]">
            <span className="text-ok">2026-05-16T08:14:02Z</span> scanner · iam:SimulatePrincipalPolicy · sig…a3f2c8<br/>
            <span className="text-ok">2026-05-16T08:14:11Z</span> scanner · ec2:DescribeInstances · sig…7b1e44<br/>
            <span className="text-brand">2026-05-16T09:02:31Z</span> remediation · ec2:RevokeSecurityGroupIngress · approved by ops@acme
          </div>
        </div>

        {/* Vendor row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Wiz',     v: 'Write access required', muted: true },
            { name: 'Cortex',  v: 'Write access required', muted: true },
            { name: 'Orca',    v: 'Limited write',         muted: true },
            { name: 'XSEE',    v: 'Zero write · ever',     muted: false },
          ].map(c => (
            <div
              key={c.name}
              className={
                "rounded-[10px] p-5 border " +
                (c.muted ? "bg-elevated border-line" : "bg-elevated border-brand/40")
              }
            >
              <div className={"eyebrow mb-3 " + (c.muted ? "text-ink3" : "text-brand")}>{c.name}</div>
              <div className={"text-[15px] font-medium leading-tight " + (c.muted ? "text-ink2" : "text-ink")}>
                {c.v}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.ZeroWrite = ZeroWrite;
