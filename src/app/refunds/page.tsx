import LegalPageLayout from "@/components/LegalPageLayout";
import { LegalSection } from "@/components/LegalSection";
import RefundSummaryCards from "@/components/RefundSummaryCards";
import { RefundGreenChecks, RefundRequestSteps } from "@/components/RefundLegalBlocks";

export const metadata = {
  title: "Refund Policy — XSEE",
  description: "XSEE refund policy for subscriptions paid via Paddle.",
};

const TOC = [
  { id: "1", num: "1", label: "Overview" },
  { id: "2", num: "2", label: "Free Trial" },
  { id: "3", num: "3", label: "Monthly & Annual" },
  { id: "4", num: "4", label: "Exceptions" },
  { id: "5", num: "5", label: "How to Request" },
  { id: "6", num: "6", label: "Chargebacks" },
  { id: "7", num: "7", label: "Contact" },
];

export default function RefundsPage() {
  return (
    <LegalPageLayout
      tag="LEGAL · REFUND POLICY"
      headline="Refund Policy"
      subtitle="Simple, fair, no questions asked."
      tocItems={TOC}
      current="refunds"
    >
      <RefundSummaryCards />

      <LegalSection id="1" num="1" title="Overview">
        <p>
          This Refund Policy describes how refunds work for XSEE subscriptions purchased through our payment partner, Paddle. Paddle is the merchant of record for your transaction; refund timing may also depend on your bank or card issuer after we approve a refund.
        </p>
      </LegalSection>

      <LegalSection id="2" num="2" title="Free Trial">
        <p>
          If you use a free trial, you will not be charged until the trial ends and you convert to a paid plan (where a payment method is required). You may cancel before the trial ends to avoid charges, subject to the terms shown at signup.
        </p>
      </LegalSection>

      <LegalSection id="3" num="3" title="Monthly & Annual Subscriptions">
        <p>
          <strong>Monthly:</strong> You may cancel at any time. You typically retain access through the end of the current paid period; we do not refund partial months except as stated below or as required by law.
        </p>
        <p>
          <strong>Annual:</strong> You may request a <strong>full refund within 7 days</strong> of the initial annual charge if you have not materially abused the Service. Between 7 and 30 days, we may offer a <strong>pro-rata refund</strong> for the unused portion at our discretion, minus any discounts or credits applied at purchase.
        </p>
      </LegalSection>

      <LegalSection id="4" num="4" title="Exceptions & Goodwill">
        <p>We may provide refunds or credits outside this policy when:</p>
        <RefundGreenChecks />
      </LegalSection>

      <LegalSection id="5" num="5" title="How to Request a Refund">
        <p>To request a refund, follow these steps:</p>
        <RefundRequestSteps />
      </LegalSection>

      <LegalSection id="6" num="6" title="Chargebacks">
        <p>
          If you initiate a chargeback, we may suspend your account pending resolution. We encourage you to contact us first so we can resolve billing issues quickly.
        </p>
      </LegalSection>

      <LegalSection id="7" num="7" title="Contact">
        <p>
          Refund questions: <a href="mailto:security@xsee.io">security@xsee.io</a>
        </p>
        <p>
          You may also use Paddle&apos;s buyer support options linked from your receipt.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
