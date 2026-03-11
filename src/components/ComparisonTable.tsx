const ROWS = [
  { cap: "Attack path discovery", xsee: "L1 + L2 validated", wiz: "Theoretical only", prisma: "Theoretical only", xseeChk: true, wizChk: true, prismaChk: true },
  { cap: "Live API proof-of-exploitability", xsee: "Evidence package per hop", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Runtime exploit simulation", xsee: "XseeCyber L3", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Detection gap analysis per path", xsee: "Per simulation run", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "AI security analyst", xsee: "5 specialised capabilities", wiz: "Partial", prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Copy-paste IaC remediation", xsee: "Terraform · CLI · CFN", wiz: "Partial", prisma: "Partial", xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Remediation verification", xsee: "Re-simulate to confirm", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "Operational playbooks", xsee: "Kanban + auto-verify", wiz: null, prisma: null, xseeChk: true, wizChk: false, prismaChk: false },
  { cap: "SMB-first transparent pricing", xsee: "From $499/mo", wiz: "Enterprise only", prisma: "Enterprise only", xseeChk: true, wizChk: false, prismaChk: false },
];

export default function ComparisonTable() {
  return (
    <section className="section section-alt" id="compare">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Competitive Analysis</span>
          <h2 className="display-lg">Where XSEE goes further</h2>
          <p>
            Other tools discover attack paths that might exist. XSEE proves the
            ones that will succeed — then closes them with a verified fix.
          </p>
          <div className="section-rule" />
        </div>
        <div className="cmp-wrap reveal-scale">
          <table className="cmp-table" id="cmpTable">
            <thead>
              <tr>
                <th style={{ width: "36%" }}>Capability</th>
                <th className="xsee-col">XSEE</th>
                <th>Wiz</th>
                <th>Prisma Cloud</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
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
                    {row.wiz ?? ""}
                  </td>
                  <td>
                    {row.prismaChk ? (
                      <span className="chk">✓</span>
                    ) : (
                      <span className="cx">✗</span>
                    )}{" "}
                    {row.prisma ?? ""}
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
