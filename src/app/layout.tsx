import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";
import "./xsee-elite.css";
import "./legal-pages.css";
import ChatWidget from "@/components/ChatWidget";
import { ClarityInit } from "@/components/ClarityInit";
import { PostHogProvider } from "@/components/PostHogProvider";
import ScrollAnimator from "@/components/ScrollAnimator";
import { ScrollReveal } from "@/components/ScrollReveal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050810",
};

const fontVariables = `${GeistSans.variable} ${GeistMono.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xsee.io"),
  verification: {
    google: "pXNBoP04Acdko2NmE4Ks-ssGEPFuPCubz79TPxjMW8Q",
  },
  title: "XSEE — Prove Every Attack Path is Real",
  description:
    "Cloud Attack Intelligence. XSEE discovers, validates, and simulates attack paths against your live AWS environment — with cryptographic evidence per hop. Not theory. Proof.",
  icons: {
    icon: [
      { url: "/logo-symbol-only.svg", type: "image/svg+xml" },
      { url: "/logo-symbol-only.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/logo-symbol-only.svg",
  },
  openGraph: {
    title: "XSEE — Prove Every Attack Path is Real",
    description:
      "Stop guessing. Prove the breach. Live AWS API validation, AI attack simulation, and cryptographic evidence packages in under 30 minutes.",
    url: "https://www.xsee.io",
    siteName: "XSEE",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "XSEE — Cloud Attack Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE — Prove Every Attack Path is Real",
    description: "Live AWS attack path validation with cryptographic evidence. Not theory. Proof.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} font-sans antialiased`} suppressHydrationWarning>
      <body
        className={`${fontVariables} font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]`}
        suppressHydrationWarning
      >
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />
        <ScrollReveal />
        <PostHogProvider>{children}</PostHogProvider>
        <ScrollAnimator />
        <ChatWidget />
        <ClarityInit />
      </body>
    </html>
  );
}
