import LegalPageLayout from "@/components/LegalPageLayout";
import { LegalSection } from "@/components/LegalSection";
import PrivacyDataCards from "@/components/PrivacyDataCards";

export const metadata = {
  title: "Privacy Policy — XSEE",
  description: "How XSEE collects, uses, and protects your data. Payments via Paddle.",
};

const TOC = [
  { id: "1", num: "1", label: "Introduction" },
  { id: "2", num: "2", label: "Data We Collect" },
  { id: "3", num: "3", label: "How We Use Data" },
  { id: "4", num: "4", label: "Legal Basis" },
  { id: "5", num: "5", label: "Data Sharing" },
  { id: "6", num: "6", label: "International Transfers" },
  { id: "7", num: "7", label: "Your Rights" },
  { id: "8", num: "8", label: "Retention" },
  { id: "9", num: "9", label: "Security" },
  { id: "10", num: "10", label: "Cookies" },
  { id: "11", num: "11", label: "Children" },
  { id: "12", num: "12", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      tag="LEGAL · PRIVACY POLICY"
      headline="Privacy Policy"
      tocItems={TOC}
      current="privacy"
    >
      <LegalSection id="1" num="1" title="Introduction">
        <p>
          This Privacy Policy explains how XSEE (&quot;we,&quot; &quot;us&quot;) collects, uses, discloses, and protects information when you use our website, products, and services (collectively, the &quot;Service&quot;).
        </p>
        <p>
          By using the Service, you agree to this policy. If you do not agree, please do not use the Service.
        </p>
      </LegalSection>

      <LegalSection id="2" num="2" title="Data We Collect">
        <PrivacyDataCards />
        <div className="legal-box-red" style={{ marginTop: 16 }}>
          <strong>We NEVER</strong> read file contents, database records, or S3 object contents as part of our standard read-only AWS integration. We work from metadata and API-validated signals described in our Security documentation.
        </div>
      </LegalSection>

      <LegalSection id="3" num="3" title="How We Use Data">
        <p>We use information to:</p>
        <ul className="legal-ul">
          <li>
            <span className="legal-ul-dot" />
            Provide, operate, and improve the Service
          </li>
          <li>
            <span className="legal-ul-dot" />
            Authenticate users, prevent fraud, and secure our platform
          </li>
          <li>
            <span className="legal-ul-dot" />
            Communicate about the Service, billing, and policy updates
          </li>
          <li>
            <span className="legal-ul-dot" />
            Comply with legal obligations and enforce our terms
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="4" num="4" title="Legal Basis (EEA/UK)">
        <p>
          Where GDPR or UK GDPR applies, we rely on appropriate bases such as: performance of a contract, legitimate interests (e.g. securing the Service, product improvement, provided we balance your rights), consent where required, and legal obligation.
        </p>
      </LegalSection>

      <LegalSection id="5" num="5" title="Data Sharing & Processors">
        <div className="legal-box-green">
          <strong>We do NOT sell your data.</strong> No advertising partners. Ever.
        </div>
        <p>We share data only with:</p>
        <ul className="legal-ul">
          <li>
            <span className="legal-ul-dot" />
            <strong>Payment processing:</strong> Paddle (merchant of record) for subscriptions, invoicing, and tax compliance as applicable.
          </li>
          <li>
            <span className="legal-ul-dot" />
            <strong>Infrastructure providers:</strong> e.g. cloud hosting and database services under strict agreements.
          </li>
          <li>
            <span className="legal-ul-dot" />
            <strong>Professional advisors</strong> or <strong>authorities</strong> when required by law or to protect rights and safety.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="6" num="6" title="International Transfers">
        <p>
          We may process data in the United States and other countries where we or our subprocessors operate. Where required, we use appropriate safeguards (such as Standard Contractual Clauses) for transfers from the EEA, UK, or Switzerland.
        </p>
      </LegalSection>

      <LegalSection id="7" num="7" title="Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, export, or restrict processing of your personal data, and to object to certain processing or withdraw consent where processing is consent-based.
        </p>
        <div className="legal-rights-pills">
          <span className="legal-right-pill">Access</span>
          <span className="legal-right-pill">Correct</span>
          <span className="legal-right-pill">Delete</span>
          <span className="legal-right-pill">Export</span>
          <span className="legal-right-pill">Opt-out of marketing</span>
        </div>
        <p style={{ marginTop: 16 }}>
          To exercise rights, contact <a href="mailto:security@xsee.io">security@xsee.io</a>. You may also lodge a complaint with your local supervisory authority.
        </p>
      </LegalSection>

      <LegalSection id="8" num="8" title="Retention">
        <p>
          We retain personal data as long as needed to provide the Service, meet legal, tax, and accounting requirements, and resolve disputes. Scan-related outputs are retained according to your plan and account settings, and as described at account closure.
        </p>
      </LegalSection>

      <LegalSection id="9" num="9" title="Security">
        <p>
          We implement technical and organizational measures designed to protect data, including encryption in transit, access controls, and organizational isolation. See our <a href="/security">Security</a> page for an overview.
        </p>
      </LegalSection>

      <LegalSection id="10" num="10" title="Cookies & Similar Technologies">
        <p>
          We use cookies and similar technologies for essential site operation, preferences, analytics, and (where applicable) security. You can control cookies through your browser settings; some features may not work if essential cookies are disabled.
        </p>
      </LegalSection>

      <LegalSection id="11" num="11" title="Children">
        <p>
          The Service is not directed to children under 16 (or the age required in your jurisdiction). We do not knowingly collect personal data from children. Contact us if you believe we have done so in error.
        </p>
      </LegalSection>

      <LegalSection id="12" num="12" title="Contact">
        <p>
          Privacy inquiries: <a href="mailto:security@xsee.io">security@xsee.io</a>
        </p>
        <p>
          For payment data handled by Paddle, you may also exercise rights through Paddle as described in their privacy policy and your checkout experience.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
