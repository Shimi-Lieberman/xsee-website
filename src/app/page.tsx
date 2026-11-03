import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/pageMetadata";
import "./homepage.css";
import "./film.css";
import "@/components/homepage/landing/landing.css";
import HomeNav from "@/components/homepage/HomeNav";
import HomeHero from "@/components/homepage/landing/HomeHero";
import GraphShowcase from "@/components/homepage/landing/GraphShowcase";
import ValueSection from "@/components/homepage/landing/ValueSection";
import XseeFilm from "@/components/homepage/film/XseeFilm";
import HomeFaq from "@/components/homepage/landing/HomeFaq";
import ClosingInvite from "@/components/homepage/landing/ClosingInvite";
import Footer from "@/components/Footer";


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
        "XSEE is an early-stage cloud security company focused on attack-path validation for AWS.",
      sameAs: ["https://www.linkedin.com/company/xsee-cybersecurity/"],
      founder: { "@id": `${SITE_URL}/#founder` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Shimi Lieberman",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE_URL}/#organization` },
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

export const metadata: Metadata = pageMetadata({
  title: "XSEE | AWS Cloud Security & Attack-Path Validation",
  description:
    "XSEE helps AWS security teams assess connected exposures, prioritize attack paths with evidence, and reassess them after changes. Request a private demo.",
  path: "/",
});

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
        <HomeFaq />
        <ClosingInvite />
        <div className="hp-film-credits" data-nav-tone="dark">
          <Footer />
        </div>
      </main>
    </div>
  );
}
