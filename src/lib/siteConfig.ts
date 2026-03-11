/**
 * Site-wide config. Social links can be set via env vars for deployment.
 * Only links that are set will be shown on the site.
 */
const socialLinks = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
};

export function getSocialLinks() {
  return Object.fromEntries(
    Object.entries(socialLinks).filter(([, url]) => url && url.trim() !== "")
  );
}
