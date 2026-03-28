export const COMPARISON_ROWS = [
  { cap: "Attack path discovery", xsee: "Live-validated graph", wiz: "Theoretical only", prisma: "Theoretical only", xseeChk: true, wizChk: true, prismaChk: true },
  { cap: "Live API proof-of-exploitability", xsee: "Evidence package per hop", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Runtime exploit simulation", xsee: "XseeCyber L3", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "AI attacker simulation", xsee: "Human + AI behavior models", wiz: "Partial", prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Detection gap analysis per path", xsee: "Per simulation run", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "AI security analyst", xsee: "5 specialised capabilities", wiz: "Partial", prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Copy-paste IaC remediation", xsee: "Terraform · CLI · CFN", wiz: "Partial", prisma: "Partial", xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Remediation verification", xsee: "Re-simulate to confirm", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Operational playbooks", xsee: "Kanban + auto-verify", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "1,000+ attack patterns", xsee: "TTP library + AI learning", wiz: "Partial", prisma: "Partial", xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Transparent SMB pricing", xsee: "From $1,200/mo", wiz: "Enterprise only", prisma: "Enterprise only", xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Full 7-stage security loop", xsee: "End-to-end", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "NHI validation", xsee: "Full mapping + L2", wiz: "Partial", prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
];

export default function ComparisonTable() {
  return (
    <section className="section sec-navy" id="compare">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Market Position</span>
          <h2 className="display-lg">
            Every other tool finds problems.
            <br />
            XSEE is the only one that proves them.
          </h2>
          <p>
            Wiz tells you what could be exploited. XM Cyber shows you theoretical paths. Pentera runs generic simulations. XSEE validates your specific paths with live AWS API evidence and simulates AI attackers. No other platform closes all three loops.
          </p>
          <div className="section-rule" />
        </div>
        <div className="cmp-wrap reveal-on-scroll">
          <table className="cmp-table" id="cmpTable">
            <thead>
              <tr>
                <th style={{ width: "36%" }}>Capability</th>
                <th className="xsee-col xsee-col-head">XSEE</th>
                <th>Wiz</th>
                <th>Prisma Cloud</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.cap}>
                  <td>{row.cap}</td>
                  <td className="xsee-val">
                    <span className="chk">✓</span> {row.xsee}
                  </td>
                  <td>
                    {row.wizChk ? (
                      <span className="chk">✓</span>
                    ) : (
                      <span className="cx">✗</span>
                    )}{" "}
                    {row.wiz != null ? (row.wiz === "Partial" ? <span className="pt">Partial</span> : row.wiz) : ""}
                  </td>
                  <td>
                    {row.prismaChk ? (
                      <span className="chk">✓</span>
                    ) : (
                      <span className="cx">✗</span>
                    )}{" "}
                    {row.prisma != null ? (row.prisma === "Partial" ? <span className="pt">Partial</span> : row.prisma) : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
