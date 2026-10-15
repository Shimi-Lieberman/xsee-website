import type { Metadata } from "next";
import "../homepage.css";
import HomeNav from "@/components/homepage/HomeNav";
import Footer from "@/components/Footer";
import DemoRequestForm, { type RequestType } from "@/components/DemoRequestForm";
import { PILOT_STAGES } from "@/components/homepage/PilotSection";

export const metadata: Metadata = {
  title: "Book a demo — XSEE",
  description: "Request an XSEE demo or discuss a focused pilot in your AWS environment.",
  alternates: { canonical: "/demo" },
};

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const requestType: RequestType = type === "pilot" ? "pilot" : "demo";
  const isPilot = requestType === "pilot";

  return (
    <div className="hp-page min-h-screen">
      <HomeNav />
      <main className="hp-page-main mx-auto w-full max-w-[100vw]">
        <section className="xsee-request-section" aria-labelledby="request-title">
          <div className="hp-container xsee-request-layout">
            <div className="xsee-request-copy">
              <p className="hp-eyebrow">{isPilot ? "Enterprise pilot" : "Book a demo"}</p>
              <h1 id="request-title">
                {isPilot ? "Evaluate XSEE in your AWS environment." : "See how XSEE validates an attack path."}
              </h1>
              <p>
                {isPilot
                  ? "Tell us what your team wants to validate. We'll use it to start the scoping conversation."
                  : "Share a little about your team and what you want to evaluate. The XSEE team will follow up by email."}
              </p>
              {isPilot ? (
                <ol className="xsee-request-stages">
                  {PILOT_STAGES.map((stage, index) => (
                    <li key={stage}>
                      <span aria-hidden>{index + 1}</span>
                      {stage}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
            <DemoRequestForm requestType={requestType} />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
