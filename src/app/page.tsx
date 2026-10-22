import type { Metadata } from "next";
import "./homepage.css";
import "./film.css";
import "@/components/homepage/landing/landing.css";
import HomeNav from "@/components/homepage/HomeNav";
import HomeHero from "@/components/homepage/landing/HomeHero";
import GraphShowcase from "@/components/homepage/landing/GraphShowcase";
import ValueSection from "@/components/homepage/landing/ValueSection";
import XseeFilm from "@/components/homepage/film/XseeFilm";
import ClosingInvite from "@/components/homepage/landing/ClosingInvite";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Thousands of findings. A handful of real attack paths.",
  description:
    "XSEE connects exposures across your AWS environment, shows the evidence behind each reachable path, and checks the path again after your team makes a change.",
  openGraph: {
    title: "XSEE — Thousands of findings. A handful of real attack paths.",
    description:
      "Connect AWS exposures, prioritize remediation with evidence, and confirm the relevant path after a change.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE — Thousands of findings. A handful of real attack paths.",
    description: "Connect AWS exposures, prioritize remediation with evidence, and confirm the relevant path after a change.",
  },
};

export default function Home() {
  return (
    <div className="hp-page lp-root min-h-screen">
      <HomeNav />
      <main className="hp-page-main mx-auto w-full max-w-[100vw]">
        <HomeHero />
        <GraphShowcase />
        <ValueSection />
        <XseeFilm />
        <ClosingInvite />
        <div className="hp-film-credits" data-nav-tone="dark">
          <Footer />
        </div>
      </main>
    </div>
  );
}
