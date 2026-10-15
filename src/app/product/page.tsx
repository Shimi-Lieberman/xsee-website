import type { Metadata } from "next";
import "../homepage.css";
import HomeNav from "@/components/homepage/HomeNav";
import AttackGraphCinematic from "@/components/homepage/AttackGraphCinematic";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE Product — Attack Path Validation and Evidence",
  description:
    "Explore XSEE product demonstrations for attack path analysis, evidence review, and verification. Demonstration data is illustrative and not a live customer environment.",
};

export default function ProductPage() {
  return (
    <div className="hp-page xsee-product-page min-h-screen">
      <HomeNav />
      <main className="hp-page-main mx-auto w-full max-w-[100vw]">
        <section className="xsee-product-page-intro px-5 pb-10 pt-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="hp-eyebrow">Product demonstrations</p>
            <h1 className="text-balance">Inspect the path. Review the evidence.</h1>
            <p>
              The technical views below use illustrative scenarios and sample data. They do not show a live customer environment or represent actions taken in an AWS account.
            </p>
          </div>
        </section>
        <section className="hp-section" aria-labelledby="attack-graph-title">
          <div className="hp-container">
            <div className="xsee-product-section-heading">
              <p className="hp-eyebrow">Illustrative AWS scenario</p>
              <h2 id="attack-graph-title">A path, assembled from connected resources.</h2>
              <p>Sample resource names and events are shown for explanation only. Validation and closure states in this view are not live results.</p>
            </div>
            <AttackGraphCinematic />
          </div>
        </section>
        <section className="hp-section" aria-labelledby="evidence-states-title">
          <div className="hp-container">
            <div className="xsee-product-section-heading">
              <p className="hp-eyebrow">Evidence states</p>
              <h2 id="evidence-states-title">Each step on a path is labeled by what was checked.</h2>
              <p>
                <strong>Configuration observation</strong> — a setting read from AWS metadata, such as a security group rule.{" "}
                <strong>Permission simulation</strong> — an IAM policy evaluation result for a principal and action; it shows what policy allows, not that an action was performed.{" "}
                <strong>Untested</strong> — no validation result is implied. A recorded request ID or hash shows that evidence was collected and has not been altered; on its own it does not show an attack succeeds.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
