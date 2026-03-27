"use client";

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <p className="testimonials-label">Proof from the Field</p>
      <h2 className="testimonials-headline">
        Security teams that stopped guessing.
      </h2>
      <p className="testimonials-sub">
        These are real conversations that happened{" "}
        <span>after a first XSEE scan.</span>
      </p>
      <div className="testimonials-grid">
        <div className="testimonial-card reveal-on-scroll">
          <div className="testimonial-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="testimonial-star">{s}</span>
            ))}
          </div>
          <p className="testimonial-text">
            We had 1,800 Wiz findings sitting in a backlog. Zero confidence about what to fix first. XSEE ran in 20 minutes and showed us the{" "}
            <strong>3 paths that actually reached our database</strong>. One security group change. Six paths gone. Done before lunch. The evidence package is now in our SOC2 audit file.
          </p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">MT</div>
            <div>
              <div className="testimonial-name">Marcus T.</div>
              <div className="testimonial-role">
                Head of Security · SaaS Startup
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
            Our CTO's question in every security review was always &quot;can you prove it?&quot; We never had a good answer. After XSEE: yes. Here are the{" "}
            <strong>AWS API responses per hop</strong>. That's not a finding — that's a case file. We closed 3 critical paths in the same week.
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
            The Detection Coverage Score changed how we think about security investment. We thought we were well-protected. XSEE showed us GuardDuty was blind to{" "}
            <strong>72% of the actual attack steps in our EKS cluster</strong>. That number is now in every board presentation.
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
