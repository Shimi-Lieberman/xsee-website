import LegalPageLayout from "@/components/LegalPageLayout";
import { LegalSection } from "@/components/LegalSection";

export const metadata = {
  title: "Terms of Service | XSEE",
  description: "Terms of Service for XSEE Cloud Exposure Intelligence. Payment via Paddle.",
};

const TOC = [
  { id: "1", num: "1", label: "Acceptance" },
  { id: "2", num: "2", label: "Service" },
  { id: "3", num: "3", label: "AI-Powered Features" },
  { id: "4", num: "4", label: "Account" },
  { id: "5", num: "5", label: "Payment" },
  { id: "6", num: "6", label: "Free Trial" },
  { id: "7", num: "7", label: "Cancellation" },
  { id: "8", num: "8", label: "Acceptable Use" },
  { id: "9", num: "9", label: "Data & Privacy" },
  { id: "10", num: "10", label: "IP" },
  { id: "11", num: "11", label: "Availability" },
  { id: "12", num: "12", label: "Liability" },
  { id: "13", num: "13", label: "Changes" },
  { id: "14", num: "14", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      tag="LEGAL · TERMS OF SERVICE"
      headline="Terms of Service"
      subtitle="Please read these terms carefully before using XSEE."
      tocItems={TOC}
      current="terms"
    >
      <LegalSection id="1" num="1" title="Acceptance of Terms">
        <p>
          By accessing or using XSEE (&quot;Service&quot;) operated by XSEE (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
        </p>
        <p>
          If you are entering into these terms on behalf of a company or other legal entity, you represent that you have authority to bind that entity. &quot;You&quot; refers to the individual or entity accepting these terms.
        </p>
      </LegalSection>

      <LegalSection id="2" num="2" title="Description of Service">
        <p>
          XSEE provides cloud exposure intelligence, including attack-path analysis, validation, and related security features for connected cloud environments (currently focused on AWS, as described in our product documentation).
        </p>
        <p>
          We may modify, suspend, or discontinue features with reasonable notice where practicable. The Service is provided on a subscription basis as selected at checkout.
        </p>
      </LegalSection>

      <LegalSection id="3" num="3" title="AI-Powered Features">
        <p>
          XSEE uses artificial intelligence, including Anthropic&apos;s Claude API, to provide features such as attack path explanation, risk summarization, and security recommendations.
        </p>
        <p>
          AI features process only structured security metadata that XSEE has already collected from your connected AWS environment — such as attack path data, validation results, and asset relationships. AI features do not process raw file contents, database records, or S3 object contents.
        </p>
        <p>
          AI-generated outputs are advisory only. You are responsible for reviewing and approving any recommended actions before they are applied to your infrastructure. XSEE&apos;s AI analyst is grounded in your scan data and is designed not to generate information beyond what is present in that data, but outputs should be reviewed by qualified security personnel.
        </p>
      </LegalSection>

      <LegalSection id="4" num="4" title="Account Registration & Security">
        <p>
          You must provide accurate registration information and keep it current. You are responsible for safeguarding credentials and for all activity under your account.
        </p>
        <p>
          Notify us promptly at <a href="mailto:security@xsee.io">security@xsee.io</a> if you suspect unauthorized access.
        </p>
      </LegalSection>

      <LegalSection id="5" num="5" title="Payment & Billing">
        <div className="legal-box-blue">
          <strong>14-day free trial.</strong> No credit card required to start your trial where offered. After the trial, continued use requires a paid subscription processed by our merchant of record, Paddle.
        </div>
        <p>
          Fees, billing cycle, and taxes (if applicable) are shown at checkout. Paddle acts as the seller for payment purposes; your payment relationship for card transactions is with Paddle. Invoices and receipts are issued in accordance with Paddle's terms.
        </p>
        <p>
          Failure to pay may result in suspension or termination of access after notice where required by law.
        </p>
      </LegalSection>

      <LegalSection id="6" num="6" title="Free Trial">
        <p>
          Trial eligibility, duration, and feature limits are described at signup. Unless you subscribe before the trial ends, access to paid features may end automatically. One trial per organization or email may apply to prevent abuse.
        </p>
      </LegalSection>

      <LegalSection id="7" num="7" title="Cancellation & Renewal">
        <p>
          You may cancel your subscription through the billing portal or instructions we provide. Monthly plans typically remain active until the end of the current billing period. Annual plans are governed by our <a href="/refunds">Refund Policy</a>.
        </p>
      </LegalSection>

      <LegalSection id="8" num="8" title="Acceptable Use">
        <p>You agree not to misuse the Service. Without limitation, you may NOT:</p>
        <ul className="legal-prohibited">
          <li>
            <span style={{ color: "#ef4444", flexShrink: 0, fontWeight: 700 }}>✗</span>
            <span>Probe, scan, or test the vulnerability of our systems without written authorization.</span>
          </li>
          <li>
            <span style={{ color: "#ef4444", flexShrink: 0, fontWeight: 700 }}>✗</span>
            <span>Use the Service to violate any law or third-party rights, or to attack systems you are not authorized to assess.</span>
          </li>
          <li>
            <span style={{ color: "#ef4444", flexShrink: 0, fontWeight: 700 }}>✗</span>
            <span>Reverse engineer, decompile, or attempt to extract source code except where prohibited by law.</span>
          </li>
          <li>
            <span style={{ color: "#ef4444", flexShrink: 0, fontWeight: 700 }}>✗</span>
            <span>Resell, sublicense, or redistribute the Service without our consent.</span>
          </li>
          <li>
            <span style={{ color: "#ef4444", flexShrink: 0, fontWeight: 700 }}>✗</span>
            <span>Overload or interfere with the integrity or performance of the Service.</span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="9" num="9" title="Data & Privacy">
        <div className="legal-box-green">
          <strong>We NEVER modify your infrastructure.</strong> Read-only access only. XSEE does not create, change, or delete your cloud resources through the standard integration described in our documentation.
        </div>
        <p>
          Our collection and use of personal data is described in our <a href="/privacy">Privacy Policy</a>. Security practices are summarized on our <a href="/security">Security</a> page.
        </p>
      </LegalSection>

      <LegalSection id="10" num="10" title="Intellectual Property">
        <p>
          The Service, software, branding, and documentation are owned by XSEE or our licensors. We grant you a limited, non-exclusive, non-transferable license to use the Service during your subscription, subject to these terms.
        </p>
        <p>
          You retain ownership of your data. You grant us a license to process your data only as needed to provide and improve the Service and as described in our Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection id="11" num="11" title="Service Availability">
        <p>
          We aim for high availability but do not guarantee uninterrupted access. Scheduled maintenance, third-party outages, or events beyond our reasonable control may affect the Service. We are not liable for such interruptions except as required by law or a separate SLA you have signed.
        </p>
      </LegalSection>

      <LegalSection id="12" num="12" title="Limitation of Liability">
        <div className="legal-box-amber">
          To the maximum extent permitted by law, the Service is provided &quot;as is.&quot; We disclaim implied warranties where allowed. Our aggregate liability arising out of these terms or the Service will not exceed the fees you paid us in the twelve (12) months before the claim (or, if none, fifty U.S. dollars). We are not liable for indirect, incidental, special, consequential, or punitive damages.
        </div>
        <p>
          Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted.
        </p>
      </LegalSection>

      <LegalSection id="13" num="13" title="Changes to Terms">
        <p>
          We may update these terms by posting a revised version on this page and updating the &quot;Last updated&quot; date. Material changes may be communicated by email or in-product notice. Continued use after the effective date constitutes acceptance unless applicable law requires otherwise.
        </p>
      </LegalSection>

      <LegalSection id="14" num="14" title="Contact">
        <p>
          Questions about these Terms: <a href="mailto:sales@xsee.io">sales@xsee.io</a>
        </p>
        <p>
          For payment and invoice questions handled by Paddle, refer to your Paddle receipt or Paddle's support channels as linked in your purchase confirmation.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
