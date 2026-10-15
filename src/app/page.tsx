import type { Metadata } from "next";
import "./homepage.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ScrollTracker } from "@/components/ScrollTracker";
import GlobalScripts from "@/components/GlobalScripts";
import HomeNav from "@/components/homepage/HomeNav";
import HomeHero from "@/components/homepage/HomeHero";
import BuyerJourney from "@/components/homepage/BuyerJourney";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Validate attack paths. Verify the fix.",
  description:
    "XSEE helps AWS security teams validate reachable attack paths, prioritize remediation, and verify closure with evidence that can be revisited as the environment changes.",
  openGraph: {
    title: "XSEE — Validate attack paths. Verify the fix.",
    description:
      "Validate reachable AWS attack paths, prioritize remediation, and verify closure with evidence your team can revisit as the environment changes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE — Validate attack paths. Verify the fix.",
    description:
      "Validate reachable AWS attack paths, prioritize remediation, and verify closure with revisitable evidence.",
  },
};

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <ScrollProgressBar />
      <GlobalScripts />
      <div className="hp-page min-h-screen">
        <HomeNav />
        <main className="hp-page-main mx-auto w-full max-w-[100vw]">
          <HomeHero />
          <BuyerJourney />
          <Footer />
        </main>
      </div>
    </>
  );
}
