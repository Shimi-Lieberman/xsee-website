import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xsee.io"),
  title: "XSEE — Cloud Attack Intelligence Platform",
  description:
    "Discover attack paths, prove they're exploitable, and fix them with evidence. Six security engines in one unified platform.",
  openGraph: {
    title: "XSEE — Cloud Attack Intelligence Platform",
    description:
      "Discover attack paths, prove they're exploitable, and fix them with evidence.",
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
