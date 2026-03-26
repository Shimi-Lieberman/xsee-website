"use client";

import { Gift, Calendar, RefreshCw } from "lucide-react";

export default function RefundSummaryCards() {
  return (
    <div className="legal-refund-summary-grid">
      <div className="legal-refund-card legal-refund-card-trial">
        <Gift size={22} color="#10B981" aria-hidden />
        <div className="legal-refund-card-title">14-Day Free Trial</div>
        <p style={{ margin: 0, color: "#34d399", fontSize: 13, lineHeight: 1.55 }}>
          Full access. No credit card. Cancel anytime.
        </p>
      </div>
      <div className="legal-refund-card legal-refund-card-monthly">
        <Calendar size={22} color="#3B82F6" aria-hidden />
        <div className="legal-refund-card-title">Monthly Plans</div>
        <p style={{ margin: 0, color: "#93c5fd", fontSize: 13, lineHeight: 1.55 }}>
          Cancel anytime. Access until period ends.
        </p>
      </div>
      <div className="legal-refund-card legal-refund-card-annual">
        <RefreshCw size={22} color="#FF1B8D" aria-hidden />
        <div className="legal-refund-card-title">Annual Plans</div>
        <p style={{ margin: 0, color: "#ff80c2", fontSize: 13, lineHeight: 1.55 }}>
          Full refund within 7 days. Pro-rata within 30 days.
        </p>
      </div>
    </div>
  );
}
