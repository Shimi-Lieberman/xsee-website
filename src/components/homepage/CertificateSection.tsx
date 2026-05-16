import Image from "next/image";
import { Copy, ExternalLink } from "lucide-react";

export default function CertificateSection() {
  return (
    <section id="certificate" className="hp-section" aria-labelledby="cert-title">
      <div className="hp-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <p className="hp-eyebrow mb-6">The artifact</p>
          <h2
            id="cert-title"
            className="font-semibold text-[var(--hp-ink)]"
            style={{ fontSize: "clamp(40px, 5.4vw, 68px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}
          >
            Audit-grade proof of closure.
          </h2>
          <div className="mt-7 space-y-5 text-[17px] text-[var(--hp-ink2)] leading-[1.6] max-w-[480px]">
            <p>
              When the path is closed and verified, XSEE issues a Breach Prevention Certificate. Re-validation runs the
              original attack against the new configuration. If the attack now fails, the path is provably closed. Signed.
              Timestamped.
            </p>
            <p className="text-[var(--hp-ink)]">
              The first artifact in cloud security that proves a problem is actually fixed — not just patched.
            </p>
          </div>
          <ul className="mt-8 space-y-2 text-[13px] text-[var(--hp-ink2)] list-none p-0 m-0">
            <li className="flex items-center gap-2.5">
              <span className="hp-mono text-[var(--hp-ink3)]">+</span> Re-simulation result attached to every issuance
            </li>
            <li className="flex items-center gap-2.5">
              <span className="hp-mono text-[var(--hp-ink3)]">+</span> SHA-256 signature, verifiable from any CLI
            </li>
            <li className="flex items-center gap-2.5">
              <span className="hp-mono text-[var(--hp-ink3)]">+</span> 30-day evidence retention by default · longer on request
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="hp-card overflow-hidden border-[color:rgba(255,27,141,0.4)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--hp-line)]">
              <p className="hp-eyebrow text-[var(--hp-ink3)]">Breach Prevention Certificate</p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[color:rgba(16,185,129,0.4)] bg-[color:rgba(16,185,129,0.1)]">
                <span className="hp-green-dot" style={{ boxShadow: "none" }} />
                <span className="text-[10.5px] hp-mono text-[var(--hp-ok)]" style={{ letterSpacing: "0.12em" }}>
                  VERIFIED
                </span>
              </div>
            </div>
            <div className="px-6 lg:px-8 py-8 lg:py-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image src="/logo-symbol-only.svg" width={20} height={20} alt="" aria-hidden />
                  <span className="text-[20px] font-semibold tracking-tight text-[var(--hp-ink)]">XSEE</span>
                </div>
                <div className="hp-mono text-[11px] text-[var(--hp-ink3)]">cert/0042-a3f2c8</div>
              </div>
              <div className="mt-9 grid grid-cols-1 sm:grid-cols-12 gap-y-7 gap-x-8">
                <div className="sm:col-span-12">
                  <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Path closed</p>
                  <div className="hp-mono text-[14px] text-[var(--hp-ink)] leading-[1.5] flex flex-wrap items-center gap-x-2">
                    Internet
                    <span className="text-[var(--hp-ink4)]">→</span>
                    IAM Role
                    <span className="text-[var(--hp-ink4)]">→</span>
                    EC2
                    <span className="text-[var(--hp-ink4)]">→</span>
                    <span className="text-[var(--hp-brand)]">Production Database</span>
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Issued</p>
                  <div className="hp-mono text-[13px] text-[var(--hp-ink2)]">2026-05-15T17:42:11.832Z UTC</div>
                </div>
                <div className="sm:col-span-6">
                  <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Verified closed</p>
                  <div className="hp-mono text-[13px] text-[var(--hp-ink2)]">2026-05-15T17:51:08.214Z UTC</div>
                </div>
                <div className="sm:col-span-12">
                  <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Re-simulation</p>
                  <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.6] m-0">
                    Attack failed at hop 3 — <span className="hp-mono text-[var(--hp-ok)]">sts:AssumeRole denied</span>. Path is closed.
                  </p>
                </div>
                <div className="sm:col-span-12">
                  <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Cryptographic signature</p>
                  <div className="flex items-center gap-2 hp-mono text-[12px] text-[var(--hp-ink2)] bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3 py-2.5">
                    <span className="text-[var(--hp-ink3)]">sha256:</span>
                    <span className="truncate">a3f2c8b7d09c11e5e8a02…</span>
                    <button type="button" className="ml-auto text-[var(--hp-ink3)] hover:text-[var(--hp-ink)] transition-colors" title="Copy" aria-label="Copy signature">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-5 border-t border-[var(--hp-line)] flex items-center justify-between flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--hp-ink2)]">
                  Verify signature
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </span>
                <div className="hp-mono text-[11px] text-[var(--hp-ink3)]">Issuer: XSEE · authority root</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
