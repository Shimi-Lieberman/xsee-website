"use client";

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <p className="testimonials-label">Early Adopters</p>
      <h2 className="testimonials-headline">
        What security teams say
      </h2>
      <p className="testimonials-sub">
        Real teams. Real environments.{" "}
        <span>Validated results.</span>
      </p>
      <div className="testimonials-grid">
        <div className="testimonial-card reveal-on-scroll">
          <div className="testimonial-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="testimonial-star">{s}</span>
            ))}
          </div>
          <p className="testimonial-text">
            We had 1,800 Wiz findings and zero confidence about what to fix first. XSEE showed us the{" "}
            <strong>3 paths that actually reached our database</strong>. One security group change, six attack paths gone, done before lunch. The evidence package alone was worth it.
          </p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">MT</div>
            <div>
              <div className="testimonial-name">Marcus T.</div>
              <div className="testimonial-role">
                Head of Security · SaaS Startup · AWS
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-card reveal-on-scroll reveal-delay-1">
          <div className="testimonial-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="testimonial-star">{s}</span>
            ))}
          </div>
          <p className="testimonial-text">
            The evidence package changed every board conversation.
            Our CTO&apos;s question was always &quot;can you prove it?&quot; — XSEE answered that with{" "}
            <strong>actual AWS API responses per hop</strong>.
            That&apos;s not a finding, that&apos;s a case file.
          </p>
          <div className="testimonial-author">
            <div
              className="testimonial-avatar"
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#A78BFA",
              }}
            >
              SK
            </div>
            <div>
              <div className="testimonial-name">Sarah K.</div>
              <div className="testimonial-role">
                Cloud Security Engineer · Fintech
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-card reveal-on-scroll reveal-delay-2">
          <div className="testimonial-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="testimonial-star">{s}</span>
            ))}
          </div>
          <p className="testimonial-text">
            The attack simulation showed our GuardDuty had a{" "}
            <strong>complete blind spot across lateral movement in EKS</strong>. We&apos;d been paying for detection that wouldn&apos;t have fired on the path that mattered most. The Detection Coverage Score is now our weekly metric.
          </p>
          <div className="testimonial-author">
            <div
              className="testimonial-avatar"
              style={{
                background: "rgba(16,185,129,0.2)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "#34D399",
              }}
            >
              DR
            </div>
            <div>
              <div className="testimonial-name">David R.</div>
              <div className="testimonial-role">
                DevSecOps Lead · Scale-up
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
