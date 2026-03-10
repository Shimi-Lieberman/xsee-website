import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0B1C3D] rounded-lg"
              aria-label="XSEE Home"
            >
              <Image
                src="/xsee-logo-black-transparent.png"
                alt="XSEE — Trust nothing. Prove everything."
                width={200}
                height={60}
                className="h-14 w-auto object-contain object-left sm:h-[60px] bg-transparent"
                style={{ filter: "invert(48%) sepia(79%) saturate(1000%) hue-rotate(86deg) brightness(95%) contrast(101%)" }}
              />
            </Link>
            <p className="mt-3 text-[15px] leading-relaxed text-[#94A3B8]">
              Cloud Attack Intelligence Platform
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-[#64748B] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-[#64748B] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline text-[15px] text-[#64748B] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-[#475569]">
            © 2026 XSEE. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="link-underline text-[#64748B] transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-[#64748B]">·</span>
            <Link
              href="#"
              className="link-underline text-[#64748B] transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
