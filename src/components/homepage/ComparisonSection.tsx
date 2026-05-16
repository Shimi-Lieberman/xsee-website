const VENDORS = ["Wiz", "Cortex", "Orca", "XSEE"] as const;

const ROWS: [string, string[]][] = [
  ["Can vendor read your AWS resources?", ["Yes", "Yes", "Yes", "Yes"]],
  ["Can vendor modify your AWS resources?", ["Yes", "Yes", "Limited", "No, ever"]],
  ["Can vendor apply a fix without your approval?", ["Configurable", "Configurable", "Yes", "No (Layer 1)"]],
  [
    "Attacker access if vendor is breached",
    ["Write access to your cloud", "Write access to your cloud", "Lambda on your account", "Read-only data already in our reports"],
  ],
  [
    "Boundary enforcement",
    ["Vendor controls + SOC 2", "Vendor controls + SOC 2", "Customer Lambda + AWS IAM", "Customer Lambda + AWS IAM"],
  ],
  ["Procurement security review time", ["Weeks", "Weeks", "Days", "Days"]],
  ["Cryptographic proof per hop", ["No", "No", "No", "Yes · signed"]],
  ["Re-verification via re-simulation", ["No", "No", "No", "Yes"]],
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="hp-section" aria-labelledby="compare-title">
      <div className="hp-container">
        <p className="hp-eyebrow mb-6">The competitive landscape</p>
        <h2
          id="compare-title"
          className="font-semibold text-[var(--hp-ink)] max-w-[920px]"
          style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Where vendors actually differ.
        </h2>
        <p className="mt-5 text-[16px] text-[var(--hp-ink2)] max-w-[720px] leading-[1.55]">
          Every CNAPP claims &quot;least privilege&quot; and &quot;comprehensive visibility.&quot; Here&apos;s what happens when one of them
          gets compromised.
        </p>
        <div className="mt-14 hp-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--hp-line2)]">
                  <th className="text-left hp-eyebrow text-[var(--hp-ink3)] px-5 lg:px-7 py-4 font-medium w-[44%]">Question</th>
                  {VENDORS.map((v) => {
                    const isUs = v === "XSEE";
                    return (
                      <th
                        key={v}
                        className={`text-left px-5 py-4 font-medium align-top ${isUs ? "border-l border-[color:rgba(255,27,141,0.4)] bg-[color:rgba(255,27,141,0.04)]" : ""}`}
                        style={{ width: "14%" }}
                      >
                        <div className={`hp-eyebrow ${isUs ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}>{v}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([q, vals], rIdx) => (
                  <tr key={q} className={rIdx < ROWS.length - 1 ? "border-b border-[var(--hp-line)]" : ""}>
                    <td className="px-5 lg:px-7 py-5 align-top text-[14px] text-[var(--hp-ink2)] leading-[1.5]">{q}</td>
                    {vals.map((val, cIdx) => {
                      const isUs = cIdx === 3;
                      return (
                        <td
                          key={val}
                          className={`px-5 py-5 align-top text-[13.5px] leading-[1.45] ${
                            isUs ? "border-l border-[color:rgba(255,27,141,0.4)] bg-[color:rgba(255,27,141,0.04)] text-[var(--hp-ink)]" : "text-[var(--hp-ink3)]"
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 hp-mono text-[11.5px] text-[var(--hp-ink3)] max-w-[820px] leading-[1.6]">
          Based on vendor documentation. Wiz&apos;s own 2021 research found 76% of organizations have at least one third-party
          application capable of complete account takeover. Source: wiz.io.
        </p>
      </div>
    </section>
  );
}
