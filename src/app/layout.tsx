import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./xsee-elite.css";
import "./legal-pages.css";
import ChatWidget from "@/components/ChatWidget";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050d1a",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xsee.io"),
  title: "XSEE — Prove Every Attack Path is Real",
  description:
    "XSEE proves which attack paths in your cloud are actually exploitable — with cryptographic evidence per hop, live AWS API validation, and AI attacker simulation. Not theory. Proof.",
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
      "XSEE proves which attack paths in your cloud are actually exploitable. Not theory. Proof.",
    url: "https://xsee.io",
    siteName: "XSEE",
    images: [
      {
        url: "https://xsee.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "XSEE — Cloud Attack Intelligence",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE — Prove Every Attack Path is Real",
    description: "XSEE proves which attack paths are actually exploitable.",
    images: ["https://xsee.io/og-image.png"],
  },
};

const fontVariables = [inter.variable, plusJakarta.variable, ibmPlexMono.variable].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body
        className={`${fontVariables} antialiased bg-[var(--bg-base)] text-[var(--text-primary)]`}
        suppressHydrationWarning
      >
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
