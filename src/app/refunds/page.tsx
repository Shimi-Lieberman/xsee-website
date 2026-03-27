import LegalPageLayout from "@/components/LegalPageLayout";
import { LegalSection } from "@/components/LegalSection";

export const metadata = {
  title: "Refund Policy | XSEE",
  description: "XSEE 14-day refund policy. All plans.",
};

const TOC = [
  { id: "1", num: "1", label: "14-Day Guarantee" },
  { id: "2", num: "2", label: "How to Request" },
  { id: "3", num: "3", label: "Free Trial" },
  { id: "4", num: "4", label: "Annual Plans" },
  { id: "5", num: "5", label: "Contact" },
];

export default function RefundsPage() {
  return (
    <LegalPageLayout
      tag="LEGAL · REFUND POLICY"
      headline="Refund Policy"
      tocItems={TOC}
      current="refunds"
    >
      <p className="legal-body" style={{ marginBottom: 24, fontSize: 15, color: "#94a3b8" }}>
        XSEE offers a 14-day refund policy on all plans.
      </p>

      <LegalSection id="1" num="1" title="14-Day Refund Guarantee">
        <p>
          If you are not satisfied with XSEE within 14 days of your purchase, contact us for a full refund. No questions asked.
        </p>
      </LegalSection>

      <LegalSection id="2" num="2" title="How to Request a Refund">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:security@xsee.io?subject=Refund%20Request">security@xsee.io</a>
        </p>
        <p>
          <strong>Subject:</strong> &quot;Refund Request&quot;
        </p>
        <p>We will process your refund within 5 business days.</p>
      </LegalSection>

      <LegalSection id="3" num="3" title="Free Trial">
        <p>All plans include a 14-day free trial.</p>
        <p>No charge until the trial ends.</p>
        <p>Cancel anytime during the trial at no cost.</p>
      </LegalSection>

      <LegalSection id="4" num="4" title="Annual Plans">
        <p>Annual plans are eligible for a full refund within 14 days of purchase.</p>
      </LegalSection>

      <LegalSection id="5" num="5" title="Contact">
        <p>
          <a href="mailto:security@xsee.io">security@xsee.io</a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
