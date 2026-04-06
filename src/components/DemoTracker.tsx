"use client";

import { useEffect } from "react";
import { Analytics } from "@/lib/analytics";

export default function DemoTracker() {
  useEffect(() => {
    Analytics.demoPageViewed();
  }, []);

  return null;
}
