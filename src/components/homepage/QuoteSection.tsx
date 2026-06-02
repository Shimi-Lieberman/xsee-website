import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuoteSection() {
  return (
    <section id="quote" className="hp-section hp-light relative" aria-labelledby="quote-block">
      <div className="hp-container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-1 lg:block">
            <p className="hp-mono text-[11px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.16em" }}>
              01 / 03
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="hp-eyebrow mb-7 lg:hidden">Customer story</p>

            <blockquote
              id="quote-block"
              className="font-medium text-[var(--hp-ink)]"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: 1.18, letterSpacing: "-0.025em" }}
            >
              <span className="text-[var(--hp-brand)]">&ldquo;</span>
              After three weeks triaging 1,800 findings with no clear priority, XSEE showed us the three paths that
              actually reached our database.
              <span className="text-[var(--hp-ink3)]"> One security group change. Done before lunch.</span>
              <span className="text-[var(--hp-brand)]">&rdquo;</span>
            </blockquote>

            <div className="mt-10 flex items-center gap-5">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--hp-line)] bg-[var(--hp-elevated)]"
                aria-hidden
              >
                <span className="hp-mono text-[13px] font-semibold text-[var(--hp-ink2)]">HS</span>
              </div>
              <div>
                <p className="text-[14.5px] font-medium text-[var(--hp-ink)]">Head of Security</p>
                <p className="mt-0.5 text-[12.5px] text-[var(--hp-ink3)]">
                  B2B SaaS · 200 employees <span className="mx-1.5 text-[var(--hp-ink4)]">·</span> AWS eu-central-1
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="space-y-7 border-l-2 border-[var(--hp-line2)] pl-6">
              <div>
                <p className="hp-mono text-[36px] font-medium leading-none text-[var(--hp-ink)]" style={{ letterSpacing: "-0.03em" }}>
                  847
                </p>
                <p className="mt-2 text-[12px] leading-[1.5] text-[var(--hp-ink3)]">Assets scanned end-to-end</p>
              </div>
              <div>
                <p className="hp-mono text-[36px] font-medium leading-none text-[var(--hp-ink)]" style={{ letterSpacing: "-0.03em" }}>
                  <span className="text-[var(--hp-brand)]">22</span>
                  <span className="text-[20px] text-[var(--hp-ink3)]"> min</span>
                </p>
                <p className="mt-2 text-[12px] leading-[1.5] text-[var(--hp-ink3)]">From connect to first signed Receipt</p>
              </div>
              <div>
                <p className="hp-mono text-[36px] font-medium leading-none text-[var(--hp-ink)]" style={{ letterSpacing: "-0.03em" }}>
                  3
                </p>
                <p className="mt-2 text-[12px] leading-[1.5] text-[var(--hp-ink3)]">Paths closed — one fix, six paths eliminated</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-[var(--hp-line)] pt-14 md:grid-cols-2 lg:mt-24 lg:gap-12">
          <div>
            <p className="text-[16.5px] font-medium leading-[1.55] text-[var(--hp-ink)]">
              &ldquo;Our CTO asks the same question every security review: &apos;Can you prove it?&apos; After XSEE: yes.{" "}
              <span className="text-[var(--hp-ink3)]">AWS API response per hop. Timestamped. In our SOC 2 file.</span>&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <p className="text-[12.5px] text-[var(--hp-ink2)]">Cloud Security Engineer</p>
              <span className="text-[var(--hp-ink4)]">·</span>
              <p className="text-[12.5px] text-[var(--hp-ink3)]">Fintech · Series A</p>
            </div>
            <div className="hp-mono mt-4 flex gap-6 text-[11.5px]">
              <p>
                <span className="font-medium text-[var(--hp-ink)]">12.4M records</span>{" "}
                <span className="text-[var(--hp-ink3)]">at risk proven</span>
              </p>
              <p>
                <span className="font-medium text-[var(--hp-ink)]">18 min</span>{" "}
                <span className="text-[var(--hp-ink3)]">to report</span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-[16.5px] font-medium leading-[1.55] text-[var(--hp-ink)]">
              &ldquo;XSEE&apos;s Detection Coverage Score showed our tools were blind to 72% of the actual attack steps in our
              EKS cluster.
              <span className="text-[var(--hp-ink3)]"> That number is now in every board presentation.&rdquo;</span>
            </p>
            <div className="mt-5 flex items-center gap-3">
              <p className="text-[12.5px] text-[var(--hp-ink2)]">DevSecOps Lead</p>
              <span className="text-[var(--hp-ink4)]">·</span>
              <p className="text-[12.5px] text-[var(--hp-ink3)]">DevOps platform · scale-up</p>
            </div>
            <div className="hp-mono mt-4 flex gap-6 text-[11.5px]">
              <p>
                <span className="font-medium text-[var(--hp-ink)]">72%</span>{" "}
                <span className="text-[var(--hp-ink3)]">detection gap found</span>
              </p>
              <p>
                <span className="font-medium text-[var(--hp-ink)]">4 of 5</span>{" "}
                <span className="text-[var(--hp-ink3)]">blind spots closed</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-[var(--hp-line)] pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--hp-ink)] transition-colors hover:text-[var(--hp-brand)]"
          >
            Read more customer stories
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-[2px] w-6 rounded-full bg-[var(--hp-brand)]" />
            <span className="h-[2px] w-2 rounded-full bg-[var(--hp-line2)]" />
            <span className="h-[2px] w-2 rounded-full bg-[var(--hp-line2)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
