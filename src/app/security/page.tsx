import Link from "next/link";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Security & Trust — XSEE",
  description:
    "How XSEE handles your data, access, and trust. Read-only AWS access, data handling, platform security, and compliance.",
};

export default function SecurityPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section className="section sec-navy" style={{ background: "#050d1a" }}>
          <div className="container">
            <div className="section-head" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 14 }}>SECURITY & TRUST</span>
              <h1 className="display-lg" style={{ color: "#ffffff", marginBottom: 20 }}>
                Security is not a feature. It&apos;s the foundation.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#94a3b8", maxWidth: 560, margin: "0 auto" }}>
                XSEE is a security company. We hold ourselves to a higher standard than most. Here&apos;s exactly how we handle your data, your access, and your trust.
              </p>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-dark-to-light" />

        {/* Section 1 — How XSEE Connects */}
        <section className="section sec-light" id="aws-access" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <h2 className="display-md" style={{ color: "#0f172a", marginBottom: 20 }}>
                Read-only access. Always.
              </h2>
              <p style={{ color: "#334155", marginBottom: 24 }}>
                XSEE connects to your AWS environment using a cross-account IAM role that you create and control. We request the minimum permissions required — AWS managed ReadOnlyAccess policy only.
              </p>
              <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>What this means:</p>
              <ul className="sec-check-list sec-check-green">
                <li style={{ color: "#334155" }}>XSEE can NEVER create, modify, or delete any resource</li>
                <li style={{ color: "#334155" }}>XSEE can NEVER change IAM policies or permissions</li>
                <li style={{ color: "#334155" }}>XSEE can NEVER access your data directly</li>
                <li style={{ color: "#334155" }}>You can revoke access instantly by deleting the IAM role</li>
                <li style={{ color: "#334155" }}>We never store your AWS credentials — only temporary STS tokens used during the scan session</li>
              </ul>
              <div className="sec-info-box">
                <h4 className="sec-info-box-title">IAM Role Details</h4>
                <dl className="sec-info-dl">
                  <dt>Policy</dt>
                  <dd>AWS managed ReadOnlyAccess</dd>
                  <dt>Trust</dt>
                  <dd>XSEE account ID 722375386510</dd>
                  <dt>External ID</dt>
                  <dd>Unique per organization</dd>
                  <dt>Session duration</dt>
                  <dd>Scan duration only</dd>
                  <dt>Revocation</dt>
                  <dd>Delete role in AWS console</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-light-to-dark" />

        {/* Section 2 — Data Handling */}
        <section className="section sec-navy" id="data-handling" style={{ background: "#050d1a" }}>
          <div className="container">
            <h2 className="display-md" style={{ color: "#ffffff", marginBottom: 32 }}>
              What we store. What we don&apos;t.
            </h2>
            <div className="sec-data-grid">
              <div className="sec-data-col">
                <h4 className="sec-data-col-title sec-green">What XSEE stores</h4>
                <ul className="sec-check-list sec-check-green">
                  <li>Attack path findings (nodes, edges, severity)</li>
                  <li>Validation results (API call metadata, not responses)</li>
                  <li>Evidence packages (path structure, not raw data)</li>
                  <li>Scan metadata (timestamps, asset counts, regions)</li>
                  <li>Your account email and organization details</li>
                </ul>
              </div>
              <div className="sec-data-col">
                <h4 className="sec-data-col-title sec-red">What XSEE never stores</h4>
                <ul className="sec-check-list sec-check-red">
                  <li>Your AWS credentials or secret keys</li>
                  <li>The contents of your S3 buckets or databases</li>
                  <li>Personal data from your cloud resources</li>
                  <li>Raw AWS API responses containing sensitive data</li>
                  <li>Your customers&apos; data</li>
                </ul>
              </div>
            </div>
            <div className="sec-info-box" style={{ marginTop: 32, maxWidth: 600 }}>
              <h4 className="sec-info-box-title">Data location</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14, lineHeight: 1.9, color: "#e2e8f0" }}>
                <li><strong>Platform data:</strong> AWS RDS PostgreSQL, us-east-1</li>
                <li><strong>In transit:</strong> TLS 1.2+ on all connections</li>
                <li><strong>At rest:</strong> AES-256 encryption</li>
                <li><strong>Retention:</strong> Data deleted on account closure request</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-dark-to-light" />

        {/* Section 3 — Platform Security */}
        <section className="section sec-light" id="platform-security" style={{ background: "#f8fafc" }}>
          <div className="container">
            <h2 className="display-md" style={{ color: "#0f172a", marginBottom: 32 }}>
              How we secure our own platform.
            </h2>
            <ul className="sec-platform-list">
              <li style={{ color: "#334155" }}><strong>Authentication:</strong> JWT tokens in httpOnly cookies (not localStorage — not accessible via JavaScript)</li>
              <li style={{ color: "#334155" }}><strong>Passwords:</strong> bcrypt hashed, never stored in plaintext</li>
              <li style={{ color: "#334155" }}><strong>Sessions:</strong> Expire after 24 hours, refresh tokens expire after 30 days</li>
              <li style={{ color: "#334155" }}><strong>RBAC:</strong> Admin / member / viewer role separation</li>
              <li style={{ color: "#334155" }}><strong>Org isolation:</strong> Every query scoped to your organization, no cross-org data access possible</li>
              <li style={{ color: "#334155" }}><strong>API:</strong> All endpoints require authentication except public free scan submission</li>
              <li style={{ color: "#334155" }}><strong>Infrastructure:</strong> AWS EC2 + RDS, us-east-1, isolated VPC, security groups locked to app server</li>
            </ul>
          </div>
        </section>

        <div className="sec-transition sec-light-to-dark" />

        {/* Section 4 — Vulnerability Disclosure */}
        <section className="section sec-navy" id="vulnerability" style={{ background: "#050d1a" }}>
          <div className="container">
            <h2 className="display-md" style={{ color: "#ffffff", marginBottom: 20 }}>
              Found a vulnerability? Tell us first.
            </h2>
            <p style={{ color: "#94a3b8", maxWidth: 640, marginBottom: 24 }}>
              We take security reports seriously and respond within 24 hours. We will never pursue legal action against researchers acting in good faith.
            </p>
            <div className="sec-info-box" style={{ maxWidth: 480 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#e2e8f0" }}>
                <strong>Contact:</strong> <a href="mailto:security@xsee.io" className="sec-link">security@xsee.io</a><br />
                <strong>Response time:</strong> 24 hours<br />
                <strong>We will:</strong> Acknowledge, investigate, fix, credit you
              </p>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-dark-to-light" />

        {/* Section 5 — Compliance Roadmap */}
        <section className="section sec-light" id="compliance" style={{ background: "#f8fafc" }}>
          <div className="container">
            <h2 className="display-md" style={{ color: "#0f172a", marginBottom: 32 }}>
              Where we&apos;re headed.
            </h2>
            <div className="sec-compliance-grid">
              <div className="sec-compliance-col">
                <h4 className="sec-compliance-title">Current</h4>
                <ul className="sec-compliance-list sec-check-green">
                  <li>✓ TLS 1.2+ encryption in transit</li>
                  <li>✓ AES-256 encryption at rest</li>
                  <li>✓ httpOnly cookie authentication</li>
                  <li>✓ RBAC access control</li>
                  <li>✓ Org isolation</li>
                  <li>✓ Audit logging</li>
                </ul>
              </div>
              <div className="sec-compliance-col">
                <h4 className="sec-compliance-title">In progress</h4>
                <ul className="sec-compliance-list" style={{ color: "#334155" }}>
                  <li>⏳ SOC2 Type II audit (Q3 2026)</li>
                  <li>⏳ Penetration testing (Q2 2026)</li>
                  <li>⏳ GDPR compliance (Q4 2026)</li>
                  <li>⏳ Security.txt (in progress)</li>
                </ul>
              </div>
              <div className="sec-compliance-col">
                <h4 className="sec-compliance-title">Planned</h4>
                <ul className="sec-compliance-list" style={{ color: "#334155" }}>
                  <li>📋 ISO 27001</li>
                  <li>📋 HIPAA BAA available</li>
                  <li>📋 FedRAMP (enterprise tier)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-light-to-dark" />

        {/* Section 6 — Questions CTA */}
        <section className="section sec-navy" id="questions" style={{ background: "#050d1a" }}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <h2 className="display-md" style={{ color: "#ffffff", marginBottom: 16 }}>
                Still have questions?
              </h2>
              <p style={{ color: "#94a3b8", maxWidth: 560, margin: "0 auto 28px" }}>
                Our team responds to security questions within one business day.
              </p>
              <a href="mailto:security@xsee.io" className="btn btn-primary">
                Contact security team →
              </a>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-dark-to-light" />
        <Footer />
      </main>
    </>
  );
}
