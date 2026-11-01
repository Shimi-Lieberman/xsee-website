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

const SITE_URL = "https://www.xsee.io";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "XSEE",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      slogan: "Trust Nothing. Prove Everything.",
      description:
        "XSEE is an early-stage cloud security company developing an evidence-first approach to AWS exposure validation.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "XSEE",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  title: "XSEE — Know which attack paths matter.",
  description:
    "Assess connected AWS exposures, prioritize remediation with evidence, and reassess the path after a change.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    siteName: "XSEE",
    type: "website",
    images: [{ url: "/og", width: 1200, height: 630, alt: "XSEE — Trust Nothing. Prove Everything." }],
    title: "XSEE — Know which attack paths matter.",
    description:
      "Assess connected AWS exposures, prioritize remediation with evidence, and reassess the path after a change.",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE — Know which attack paths matter.",
    description: "Assess connected AWS exposures, prioritize remediation with evidence, and reassess the path after a change.",
    images: ["/og"],
  },
};

export default function Home() {
  return (
    <div className="hp-page lp-root min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
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
