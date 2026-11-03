import type { Metadata } from "next";

export const SITE_URL = "https://www.xsee.io";

const SOCIAL_IMAGE = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "XSEE — Trust Nothing. Prove Everything.",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Next.js replaces (does not merge) the root `openGraph` and `twitter` objects
 * when a page defines its own, so every field must be restated here.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "XSEE",
      locale: "en_US",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
