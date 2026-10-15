import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";

export const metadata: Metadata = {
  title: "Responding to an AWS incident — XSEE",
  description:
    "If you are responding to a suspected AWS incident, XSEE can help your team map which identities and resources are reachable. Contact our team to discuss.",
};

const CONTACT_URL = "mailto:security@xsee.io?subject=AWS%20incident%20%E2%80%94%20request%20for%20help";

const STEPS = [
  {
    title: "Contact our team",
    detail: "Email us with what you can share. We will reply to discuss whether XSEE is a fit for your situation.",
  },
  {
    title: "Connect a read-only IAM role",
    detail: "No agents are installed. Your team keeps control and can revoke access by deleting the role.",
  },
  {
    title: "Review reachable paths",
    detail:
      "XSEE maps identities, permissions and network exposure, and labels each step by what was checked. It is not a forensic or intrusion-detection tool.",
  },
  {
    title: "Your team decides on containment",
    detail: "XSEE does not make changes in your account. Your responders choose and apply any actions.",
  },
];

const CONTAINMENT_STEPS = [
  "Follow your organization's incident response plan and involve your security lead.",
  "Revoke or rotate any IAM access keys you suspect are compromised.",
  "Confirm CloudTrail is enabled in all regions and review recent IAM activity such as AssumeRole, CreateUser and AttachUserPolicy.",
  "Consider isolating a suspected instance by restricting its security group rather than terminating it, to preserve evidence.",
  "Contact AWS Support if you need help from AWS.",
];

export default function UnderAttackPage() {
  return (
    <>
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />
      <main style={{ background: "#f7f9fc", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="page-container-md">
          <p className="text-xs font-bold uppercase tracking-widest font-mono mb-6" style={{ color: "#b45309" }}>
            Incident support
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-[#0b1220] mb-4 leading-tight text-balance">
            Responding to a suspected AWS incident?
          </h1>

          <p className="text-lg text-[#475569] mb-10 leading-relaxed text-pretty">
            XSEE can help your team see which identities, permissions and resources are reachable in the affected
            account, using a read-only IAM role. Contact us to discuss your situation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href={CONTACT_URL}
              className="flex min-h-11 items-center justify-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl text-base"
              style={{ background: "#0b1220" }}
            >
              Contact our team
            </a>
          </div>

          <section className="mb-12" aria-labelledby="how-we-help">
            <h2
              id="how-we-help"
              className="text-xs font-bold uppercase tracking-widest font-mono mb-6"
              style={{ color: "#7c8aa0" }}
            >
              How we can help
            </h2>
            <ol className="flex flex-col gap-4">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="p-4 rounded-xl"
                  style={{ background: "#ffffff", border: "1px solid rgba(11,18,32,0.08)" }}
                >
                  <div className="text-sm font-bold text-[#0b1220] mb-1">{step.title}</div>
                  <div className="text-sm text-[#5b6577] leading-relaxed">{step.detail}</div>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="rounded-xl p-5 mb-10"
            style={{ background: "#ffffff", border: "1px solid rgba(11,18,32,0.08)" }}
            aria-labelledby="general-steps"
          >
            <h2
              id="general-steps"
              className="text-xs font-bold uppercase tracking-widest font-mono mb-2"
              style={{ color: "#7c8aa0" }}
            >
              General first steps
            </h2>
            <p className="text-sm text-[#5b6577] mb-4 leading-relaxed">
              General guidance only — not a substitute for your incident response plan or professional advice.
            </p>
            <ul className="flex flex-col gap-2.5 list-disc pl-5">
              {CONTAINMENT_STEPS.map((item) => (
                <li key={item} className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
