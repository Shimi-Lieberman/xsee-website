import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — XSEE",
  description: "XSEE pricing: Starter, Professional, and Enterprise. 14-day free trial.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
