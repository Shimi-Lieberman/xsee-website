import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.xsee.io",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.xsee.io/free-scan",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.xsee.io/product",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.xsee.io/demo",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.xsee.io/about",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.xsee.io/security",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.xsee.io/changelog",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://www.xsee.io/under-attack",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.xsee.io/terms",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.xsee.io/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.xsee.io/refunds",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
