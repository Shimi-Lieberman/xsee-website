import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./xsee-elite.css";

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
  title: "XSEE — Cloud Exposure Intelligence",
  description:
    "The only platform that proves which exposures in your cloud lead to a breach. Live attack graph, validated proof, verified fix.",
  icons: {
    icon: [
      { url: "/logo-symbol-only.svg", type: "image/svg+xml" },
      { url: "/logo-symbol-only.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/logo-symbol-only.svg",
  },
  openGraph: {
    title: "XSEE — Cloud Exposure Intelligence",
    description: "The only platform that proves which exposures lead to a breach.",
    images: ["/og-image.png"],
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
        {children}
      </body>
    </html>
  );
}
