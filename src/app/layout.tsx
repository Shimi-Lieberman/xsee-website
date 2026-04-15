import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const fontVariables = `${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable}`;

const GTM_ID = "GTM-WTKZKKHJ";

const GTM_HEAD_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const GTM_NOSCRIPT_HTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xsee.io"),
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }} />
        <meta name="google-site-verification" content="pXNBoP04Acdko2NmE4Ks-ssGEPFuPCubz79TPxjMW8Q" />
      </head>
      <body
        className={`${fontVariables} font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)]`}
        suppressHydrationWarning
      >
        <noscript dangerouslySetInnerHTML={{ __html: GTM_NOSCRIPT_HTML }} />
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
