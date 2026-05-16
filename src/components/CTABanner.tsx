import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="get-started" className="hp-section relative overflow-hidden" aria-labelledby="cta-title">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,27,141,0.12), transparent 70%)",
        }}
      />
      <div className="hp-container relative z-[1]">
        <div className="text-center mb-14">
          <p className="hp-eyebrow mb-4">Get started</p>
          <h2
            id="cta-title"
            className="font-semibold text-[var(--hp-ink)] mx-auto max-w-[920px]"
            style={{ fontSize: "clamp(42px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            The breach your scanner missed is
            <br />
            <span className="text-[var(--hp-brand)]">already in your graph.</span>
          </h2>
          <p className="text-[17px] text-[var(--hp-ink2)] max-w-[520px] mx-auto mt-5 leading-[1.55]">
            Most teams find out during an incident. XSEE gives you the proof before the attacker does. One IAM role.
            Thirty minutes. The truth about your cloud.
          </p>
        </div>
        <div className="cta-two-options reveal-on-scroll grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          <div className="hp-card p-8">
            <p className="hp-eyebrow text-[var(--hp-brand)] mb-3">FREE</p>
            <h3 className="text-xl font-semibold text-[var(--hp-ink)] mb-3">Free Risk Assessment</h3>
            <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.6] mb-6">
              Connect your AWS account with read-only IAM. XSEE scans your environment, validates attack paths, and
              delivers a ranked HTML report in 30 minutes. No commitment. No credit card. No agents.
            </p>
            <Link href="/free-scan" className="hp-btn-primary w-full justify-center">
              Run Free Scan →
            </Link>
            <div className="mt-4 flex items-start justify-center gap-2 text-center text-[13px] text-[var(--hp-ink3)]">
              <ShieldCheck size={12} color="#10b981" className="mt-0.5 shrink-0" aria-hidden />
              <span>Read-only access. No agents deployed. Results in 30 minutes.</span>
            </div>
          </div>
          <div className="hp-card p-8">
            <p className="hp-eyebrow text-[var(--hp-ink3)] mb-3">FULL PLATFORM</p>
            <h3 className="text-xl font-semibold text-[var(--hp-ink)] mb-3">Start Free Trial</h3>
            <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.6] mb-6">
              14-day full access to all 7 engines + autonomous agents. See your Detection Coverage Score. Generate
              evidence packages. After trial: Starter $1,800/mo, Pro $3,500/mo —{" "}
              <Link href="#pricing" className="text-[var(--hp-brand)] underline underline-offset-2">
                view plans
              </Link>
              .
            </p>
            <Link
              href="https://app.xsee.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn-ghost w-full justify-center border-[var(--hp-line2)]"
            >
              Start Free Trial →
            </Link>
            <div className="mt-4 flex items-start justify-center gap-2 text-center text-[13px] text-[var(--hp-ink3)]">
              <ShieldCheck size={12} color="#10b981" className="mt-0.5 shrink-0" aria-hidden />
              <span>Read-only access. No agents deployed. Results in 30 minutes.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
