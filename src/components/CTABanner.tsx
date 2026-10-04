import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="get-started" className="hp-section relative overflow-hidden" aria-labelledby="cta-title">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 27, 141, 0.12), transparent 70%)",
        }}
      />
      <div className="hp-container relative z-[1]">
        <div className="text-center mb-14">
          <p className="hp-eyebrow hp-kicker hp-kicker--center mb-5">Get started</p>
          <h2
            id="cta-title"
            className="hp-h-display mx-auto text-center"
            style={{ fontSize: "clamp(42px, 6vw, 76px)" }}
          >
            <span className="block">The breach your scanner missed</span>
            <span className="block text-[var(--hp-brand)]">is already in your graph.</span>
          </h2>
          <p className="mt-8 text-[17px] text-[var(--hp-ink2)] max-w-[520px] mx-auto leading-[1.55]">
            Request a free assessment of your AWS account. Our team will contact you to arrange the read-only review and share a ranked report.
          </p>
        </div>
        <div className="cta-two-options reveal-on-scroll grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[960px] mx-auto">
          <div className="hp-card p-8">
            <p className="hp-eyebrow text-[var(--hp-brand)] mb-3">FREE</p>
            <h3 className="text-xl font-semibold text-[var(--hp-ink)] mb-3">Free Risk Assessment</h3>
            <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.6] mb-6">
              Connect a read-only IAM role. Our team runs the assessment on your account and sends you the ranked report.
            </p>
            <Link href="/free-scan" className="hp-btn-primary w-full justify-center">
              Request your free attack-path assessment →
            </Link>
            <div className="mt-4 flex items-start justify-center gap-2 text-center text-[13px] text-[var(--hp-ink3)]">
              <ShieldCheck size={12} color="#10b981" className="mt-0.5 shrink-0" aria-hidden />
              <span>Read-only access. No agents deployed.</span>
            </div>
          </div>
          <div className="hp-card p-8">
            <p className="hp-eyebrow text-[var(--hp-ink3)] mb-3">FULL PLATFORM</p>
            <h3 className="text-xl font-semibold text-[var(--hp-ink)] mb-3">Request access</h3>
            <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.6] mb-6">
              We onboard founding customers personally. Request access to the XSEE platform and its planned capabilities — view Starter and Pro plans below.{" "}
              <Link href="#pricing" className="text-[var(--hp-brand)] underline underline-offset-2">
                view plans
              </Link>
              .
            </p>
            <Link
              href="mailto:sales@xsee.io?subject=Request%20access"
              className="hp-btn-ghost w-full justify-center border-[var(--hp-line2)]"
            >
              Request access →
            </Link>
            <div className="mt-4 flex items-start justify-center gap-2 text-center text-[13px] text-[var(--hp-ink3)]">
              <ShieldCheck size={12} color="#10b981" className="mt-0.5 shrink-0" aria-hidden />
              <span>We onboard founding customers personally.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
