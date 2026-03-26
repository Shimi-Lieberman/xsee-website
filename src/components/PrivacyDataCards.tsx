"use client";

import { User, Activity, Cloud } from "lucide-react";

export default function PrivacyDataCards() {
  return (
    <>
      <div className="legal-subcard">
        <div className="legal-subcard-head">
          <User size={20} color="#3B82F6" aria-hidden />
          <h3 className="legal-subcard-title">Account Information</h3>
        </div>
        <ul className="legal-ul">
          <li>
            <span className="legal-ul-dot" />
            Name, email address, and company name
          </li>
          <li>
            <span className="legal-ul-dot" />
            Billing details processed securely by our payment partner Paddle (we do not store full card numbers)
          </li>
        </ul>
      </div>
      <div className="legal-subcard">
        <div className="legal-subcard-head">
          <Activity size={20} color="#7C3AED" aria-hidden />
          <h3 className="legal-subcard-title">Usage Data</h3>
        </div>
        <ul className="legal-ul">
          <li>
            <span className="legal-ul-dot" />
            Scan results, feature usage, and product analytics
          </li>
          <li>
            <span className="legal-ul-dot" />
            Technical logs (e.g. IP, user agent) for security and reliability
          </li>
        </ul>
      </div>
      <div className="legal-subcard">
        <div className="legal-subcard-head">
          <Cloud size={20} color="#10B981" aria-hidden />
          <h3 className="legal-subcard-title">AWS Scan Data</h3>
        </div>
        <ul className="legal-ul">
          <li>
            <span className="legal-ul-dot" />
            Asset metadata, IAM structure, and network topology as observed via read-only access
          </li>
          <li>
            <span className="legal-ul-dot" />
            Attack-path analysis outputs derived from that metadata
          </li>
        </ul>
      </div>
    </>
  );
}
