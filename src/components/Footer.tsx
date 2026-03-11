import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { getSocialLinks } from "@/lib/siteConfig";
import { LOGO_DARK } from "@/lib/logo";

export default function Footer() {
  const social = getSocialLinks();
  const socialList = [
    { key: "linkedin", href: social.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { key: "twitter", href: social.twitter, Icon: Twitter, label: "Twitter" },
    { key: "facebook", href: social.facebook, Icon: Facebook, label: "Facebook" },
    { key: "instagram", href: social.instagram, Icon: Instagram, label: "Instagram" },
    { key: "youtube", href: social.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((item) => item.href);

  const productLinks = [
    { href: "#product", label: "Overview" },
    { href: "#pricing", label: "Pricing" },
    { href: "#security", label: "Security" },
  ];
  const companyLinks = [
    { href: "#", label: "About" },
    { href: "#", label: "Careers" },
    { href: "#contact", label: "Contact" },
  ];
  const resourceLinks = [
    { href: "#", label: "Documentation" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Changelog" },
  ];

  return (
    <footer className="bg-[#0B1C3D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4 md:gap-10">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0B1C3D] rounded-lg"
              aria-label="XSEE Home"
            >
              <Image
                src={LOGO_DARK.src}
                alt={LOGO_DARK.alt}
                width={LOGO_DARK.width}
                height={LOGO_DARK.height}
                className="h-11 w-auto object-contain object-left bg-transparent md:h-12"
              />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">
              Cloud Attack Intelligence Platform
            </p>
            {socialList.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {socialList.map(({ key, href, Icon, label }) => (
                  <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0B1C3D] rounded"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product
            </h4>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-slate-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company
            </h4>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-slate-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Resources
            </h4>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-slate-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row sm:items-center gap-6">
          <div>
            <p className="text-sm text-slate-500">
              © 2026 XSEE. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="link-underline text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600" aria-hidden>·</span>
            <Link
              href="#"
              className="link-underline text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
