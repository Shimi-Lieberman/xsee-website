import type { Metadata } from "next";
import DesignDirectionBoard from "@/components/DesignDirectionBoard";
import "./design-directions.css";

export const metadata: Metadata = {
  title: "XSEE Design Directions — Concept Study",
  description: "Three calm, confident visual directions for the XSEE cloud security platform.",
};

export default function DesignDirectionsPage() {
  return <DesignDirectionBoard />;
}
