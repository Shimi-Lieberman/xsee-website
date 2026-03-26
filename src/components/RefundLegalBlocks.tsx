"use client";

import { CheckCircle } from "lucide-react";

const EXCEPTIONS = [
  "Refunds required by applicable law in your jurisdiction.",
  "Duplicate charges or billing errors confirmed by our finance team.",
  "Service unavailability exceeding our SLA for a sustained period (as defined in your order).",
];

export function RefundGreenChecks() {
  return (
    <ul className="legal-exception-list">
      {EXCEPTIONS.map((t) => (
        <li key={t}>
          <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function RefundRequestSteps() {
  return (
    <div className="legal-steps-card">
      <div className="legal-steps-row">
        <div className="legal-step-item">
          <div className="legal-step-circle" style={{ background: "#2563eb" }}>
            1
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.55 }}>
            Email <a href="mailto:security@xsee.io">security@xsee.io</a> from your account email.
          </p>
        </div>
        <div className="legal-step-item">
          <div className="legal-step-circle" style={{ background: "#7c3aed" }}>
            2
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.55 }}>
            Include your reason and the subscription or invoice date.
          </p>
        </div>
        <div className="legal-step-item">
          <div className="legal-step-circle" style={{ background: "#10b981" }}>
            3
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.55 }}>
            We process approved refunds within 5–10 business days to your original payment method.
          </p>
        </div>
      </div>
    </div>
  );
}
