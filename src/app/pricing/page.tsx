"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Analytics } from "@/lib/analytics";

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    Analytics.pricingViewed();
    router.replace("/#pricing");
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-sm"
      style={{ background: "var(--dark)", color: "rgba(255,255,255,0.45)" }}
    >
      Redirecting to pricing…
    </div>
  );
}
