import Link from "next/link";
import Image from "next/image";

/** Same mark + wordmark + tagline as the header nav — reuse everywhere for consistency. */
export default function SiteLogo() {
  return (
    <Link href="/" className="nav-logo" aria-label="XSEE home">
      <span className="nav-logo-inner" aria-hidden="true">
        <span className="nav-logo-mark-wrap">
          <Image
            src="/logo-symbol-only.svg"
            width={44}
            height={44}
            alt=""
            className="nav-logo-mark"
            style={{ background: "transparent" }}
          />
        </span>
        <span className="nav-logo-stack">
          <span className="nav-logo-title">XSEE</span>
          <span className="nav-logo-tagline">Cloud attack intelligence</span>
        </span>
      </span>
    </Link>
  );
}
