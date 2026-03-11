import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#040B18",
};

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
  title: "XSEE — Cloud Attack Intelligence Platform",
  description:
    "The only platform that proves every attack path is real. Live AWS API evidence, exploit simulation, and verified fix.",
  icons: {
    icon: [
      { url: "/xsee-icon.png", sizes: "32x32", type: "image/png" },
      { url: "/xsee-icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "XSEE — Cloud Attack Intelligence Platform",
    description: "The only platform that proves every attack path is real.",
    images: ["/og-image.png"],
  },
};

const fontVariables = [plusJakarta.variable, ibmPlexMono.variable].join(" ");

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
