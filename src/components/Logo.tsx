/**
 * XSEE logo: eagle head + circuit traces (brand blue).
 * Transparent background — works on dark (#040B18) and light sections.
 */
export default function Logo({ className, height = 36 }: { className?: string; height?: number }) {
  const aspect = 180 / 110;
  const width = Math.round(height * aspect);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 180 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="180" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="logo-trace" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Eagle head — profile facing right: sharp crown, hooked beak, angular jaw (#2563EB) */}
      <path
        d="M 12 78 L 18 60 L 24 44 L 30 30 L 38 18 L 48 10 L 58 12 L 66 22 L 66 34 L 60 48 L 52 62 L 42 74 L 28 82 L 18 85 L 12 78 Z"
        stroke="#2563EB"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Crown peaks — angular crown */}
      <path d="M 30 30 L 36 14 L 42 24" stroke="#2563EB" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Beak — hooked, pointing right */}
      <path d="M 48 16 L 62 10 L 68 22" stroke="#2563EB" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 54 42 L 64 54" stroke="#2563EB" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Internal circuit traces within head — around eye and jaw */}
      <path d="M 42 28 L 52 24 L 56 32" stroke="url(#logo-trace)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M 50 48 L 56 56" stroke="url(#logo-trace)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* Red eye */}
      <circle cx="52" cy="36" r="3" fill="#EF4444" />
      {/* PCB circuit traces — horizontal rows extending LEFT from back of head */}
      <g stroke="url(#logo-trace)" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <line x1="26" y1="38" x2="6" y2="38" />
        <line x1="26" y1="46" x2="4" y2="46" />
        <line x1="26" y1="54" x2="6" y2="54" />
        <line x1="24" y1="62" x2="4" y2="62" />
        <line x1="24" y1="70" x2="6" y2="70" />
        <line x1="22" y1="78" x2="5" y2="78" />
        <line x1="20" y1="32" x2="10" y2="26" />
        <line x1="20" y1="32" x2="10" y2="38" />
      </g>
      <g fill="none" stroke="#60A5FA" strokeWidth="1.2">
        <circle cx="6" cy="38" r="2" />
        <circle cx="4" cy="46" r="2" />
        <circle cx="6" cy="54" r="2" />
        <circle cx="4" cy="62" r="2" />
        <circle cx="6" cy="70" r="2" />
        <circle cx="5" cy="78" r="2" />
        <circle cx="10" cy="26" r="1.5" />
        <circle cx="10" cy="38" r="1.5" />
      </g>
      {/* Wordmark XSEE — gradient, bold sans-serif */}
      <text
        x="112"
        y="62"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-0.03em"
        fill="url(#logo-gradient)"
      >
        XSEE
      </text>
    </svg>
  );
}
