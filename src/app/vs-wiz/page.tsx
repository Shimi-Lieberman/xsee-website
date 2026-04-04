import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { COMPARISON_ROWS } from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "XSEE vs Wiz — What Wiz Can't Do",
  description:
    "Wiz shows you what could be exploited. XSEE proves what will be — with live AWS API validation and cryptographic evidence per hop. See the full comparison.",
};

const VS_WIZ_EXTRA = [
  {
    cap: "Proof of exploitability (per hop)",
    xsee: "Live AWS API confirmation each hop",
    wiz: "Theoretical graph edges",
    prisma: "Theoretical only",
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
  {
    cap: "Cryptographic evidence package",
    xsee: "Signed, exportable evidence per path",
    wiz: null,
    prisma: null,
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
  {
    cap: "Detection Coverage Score",
    xsee: "% of attack steps visible to your detectors",
    wiz: null,
    prisma: null,
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
  {
    cap: "Before/after verification after fix",
    xsee: "L2 re-validation + proof delta",
    wiz: null,
    prisma: null,
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
  {
    cap: "AI attacker simulation (validated paths)",
    xsee: "Human + AI models on proven paths",
    wiz: "Partial",
    prisma: null,
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
  {
    cap: "Pricing transparency",
    xsee: "Published from $1,200/mo",
    wiz: "Enterprise quote only",
    prisma: "Enterprise quote only",
    xseeChk: true,
    wizChk: false,
    prismaChk: false,
  },
] as const;

const ALL_ROWS = [...COMPARISON_ROWS, ...VS_WIZ_EXTRA];

export default function VsWizPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main className="w-full" style={{ paddingTop: 72 }}>
        <section className="section sec-navy" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <div className="xsee-container xsee-section">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow mb-4 inline-block">Comparison</span>
              <h1 className="display-lg mb-6">
                Wiz tells you what could be exploited.
                <br />
                <span className="text-[#ff2d78]">XSEE proves what will be.</span>
              </h1>
              <p className="text-lg text-slate-400">
                Wiz is the best CSPM on the market. It&apos;s also fundamentally incapable of answering the one question every CISO actually needs
                answered: is this path real?
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">Wiz</h2>
                <p className="text-slate-300">
                  Finds 4,000 issues. Ranks by CVSS. Draws a theoretical attack graph. Tells you it could happen.
                </p>
              </div>
              <div className="rounded-2xl border border-[#ff2d78]/30 bg-[#ff2d78]/[0.06] p-8">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#ff2d78]">XSEE</h2>
                <p className="text-slate-200">
                  Finds the 3 paths that actually reach your database. Calls live AWS APIs to prove each hop. Generates cryptographic evidence. Tells you it
                  will happen — with proof.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section sec-navy" style={{ paddingTop: 0 }}>
          <div className="xsee-container xsee-section">
            <div className="section-head reveal mb-10 text-center">
              <h2 className="display-md">Full comparison</h2>
              <p className="text-slate-400">Same table as the homepage, expanded with capabilities Wiz can&apos;t match.</p>
              <div className="section-rule mx-auto" />
            </div>
            <div className="cmp-wrap reveal-on-scroll">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th style={{ width: "36%" }}>Capability</th>
                    <th className="xsee-col xsee-col-head">XSEE</th>
                    <th>Wiz</th>
                    <th>Prisma Cloud</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_ROWS.map((row) => (
                    <tr key={row.cap}>
                      <td>{row.cap}</td>
                      <td className="xsee-val">
                        <span className="chk">✓</span> {row.xsee}
                      </td>
                      <td>
                        {row.wizChk ? <span className="chk">✓</span> : <span className="cx">✗</span>}{" "}
                        {row.wiz != null ? (row.wiz === "Partial" ? <span className="pt">Partial</span> : row.wiz) : ""}
                      </td>
                      <td>
                        {row.prismaChk ? <span className="chk">✓</span> : <span className="cx">✗</span>}{" "}
                        {row.prisma != null
                          ? row.prisma === "Partial"
                            ? <span className="pt">Partial</span>
                            : row.prisma
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="mb-6 text-xl font-semibold text-white">Don&apos;t cancel Wiz. Add the layer it can&apos;t provide.</p>
              <Link href="/free-scan" className="btn btn-primary btn-lg btn-shimmer inline-flex">
                <span className="relative z-[2]">Run Free Scan →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
