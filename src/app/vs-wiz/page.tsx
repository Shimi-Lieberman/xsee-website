import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

// Unlisted pending sourced, dated competitor claims (see docs/internal/public-copy-review.md).
export const metadata: Metadata = {
  title: "XSEE alongside your cloud security platform",
  robots: { index: false, follow: false },
};

const FIT = [
  {
    title: "Your platform finds and ranks issues",
    copy: "Posture, configuration and vulnerability findings stay where your team already manages them.",
  },
  {
    title: "XSEE asks whether a path is reachable",
    copy: "From read-only configuration, XSEE assesses whether findings connect into a path to something that matters.",
  },
  {
    title: "Your team decides and applies the change",
    copy: "XSEE proposes a fix and re-checks the path afterwards. It does not make changes in your AWS environment.",
  },
] as const;

export default function VsWizPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main className="w-full" style={{ paddingTop: 72 }}>
        <section className="section sec-navy" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <div className="xsee-container xsee-section">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow mb-4 inline-block">Working together</span>
              <h1 className="display-lg mb-6 text-balance">XSEE works alongside your cloud security platform.</h1>
              <p className="text-lg leading-relaxed text-slate-400 text-pretty">
                Platforms like Wiz and Prisma Cloud answer what is misconfigured or vulnerable. XSEE answers a narrower
                question: which of those findings combine into a path an attacker could follow, and whether a fix
                actually closed it.
              </p>
            </div>

            <ol className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
              {FIT.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-700 p-6">
                  <h2 className="mb-2 text-lg font-semibold">{item.title}</h2>
                  <p className="leading-relaxed text-slate-400">{item.copy}</p>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-3 text-center">
              <p className="leading-relaxed text-slate-400">
                How XSEE fits your existing tooling is covered in a private technical walkthrough.
              </p>
              <Link href="/demo" className="btn btn-primary inline-flex min-h-11 items-center px-6">
                Request a private technical walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
