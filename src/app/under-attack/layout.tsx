import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Breach Response | XSEE",
  description:
    "Get immediate attack path validation. Read-only AWS scan. Evidence package within hours.",
};

export default function UnderAttackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
