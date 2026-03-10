import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xsee.io"),
  title: "XSEE — Cloud Attack Intelligence Platform",
  description:
    "See how attackers can breach your cloud — before they do. XSEE continuously discovers real attack paths and proves they're exploitable.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/xsee-logo-transparent.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "XSEE — Cloud Attack Intelligence Platform",
    description:
      "See how attackers can breach your cloud — before they do. Attack path intelligence, not just another scanner.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.variable} antialiased font-sans`}>{children}</body>
    </html>
  );
}
