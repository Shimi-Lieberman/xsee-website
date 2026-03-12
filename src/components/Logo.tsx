/**
 * XSEE logo: eagle head + circuit traces (brand blue).
 * Traced from reference — flat crown, hooked beak, circuit-style E's, donut dots.
 * Transparent background.
 */
export default function Logo({ className, height = 36 }: { className?: string; height?: number }) {
  const aspect = 320 / 110;
  const width = Math.round(height * aspect);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 320 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="320" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* Eagle head outline — flat crown, hooked beak, angular jaw */}
      <path
        d="M 85 35 L 145 30 C 160 30 170 38 168 50 L 175 55 C 176 62 172 68 166 67 L 158 65 C 150 72 138 76 125 74 L 100 70 C 88 66 82 58 82 48 Z"
        stroke="#2563EB"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Beak detail */}
      <path d="M 158 58 C 162 60 166 62 165 66" stroke="#2563EB" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Red eye + pupil + highlight */}
      <circle cx="152" cy="42" r="5" fill="#EF4444" />
      <circle cx="152" cy="42" r="2" fill="#040B18" />
      <circle cx="153.5" cy="40.5" r="1" fill="white" fillOpacity="0.7" />
      {/* Circuit traces — rows going LEFT from back of head */}
      <g stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="85" y1="35" x2="55" y2="35" />
        <line x1="55" y1="35" x2="20" y2="35" />
        <line x1="55" y1="35" x2="55" y2="28" />
        <line x1="55" y1="28" x2="15" y2="28" />
        <line x1="83" y1="44" x2="50" y2="44" />
        <line x1="50" y1="44" x2="18" y2="44" />
        <line x1="35" y1="44" x2="35" y2="54" />
        <line x1="35" y1="54" x2="12" y2="54" />
        <line x1="82" y1="53" x2="48" y2="53" />
        <line x1="48" y1="53" x2="16" y2="53" />
        <line x1="28" y1="53" x2="28" y2="63" />
        <line x1="28" y1="63" x2="8" y2="63" />
        <line x1="84" y1="62" x2="52" y2="62" />
        <line x1="52" y1="62" x2="20" y2="62" />
        <line x1="90" y1="68" x2="55" y2="80" />
        <line x1="55" y1="80" x2="20" y2="80" />
        <line x1="38" y1="80" x2="38" y2="90" />
      </g>
      {/* Donut dots — outer #60A5FA, inner hole #040B18 */}
      {[
        [20, 35],
        [15, 28],
        [18, 44],
        [12, 54],
        [16, 53],
        [8, 63],
        [20, 62],
        [20, 80],
        [38, 90],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#60A5FA" />
          <circle cx={x} cy={y} r="1.2" fill="#040B18" />
        </g>
      ))}
      {/* X — gradient text */}
      <text
        x="195"
        y="58"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="32"
        letterSpacing="-0.02em"
        fill="url(#logo-gradient)"
      >
        X
      </text>
      {/* S — gradient text */}
      <text
        x="222"
        y="58"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="32"
        letterSpacing="-0.02em"
        fill="url(#logo-gradient)"
      >
        S
      </text>
      {/* E (first) — circuit-trace style: vertical bar + 3 horizontal bars */}
      <g stroke="url(#logo-gradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="238" y1="33" x2="238" y2="77" />
        <line x1="238" y1="33" x2="265" y2="33" />
        <line x1="238" y1="55" x2="261" y2="55" />
        <line x1="238" y1="77" x2="265" y2="77" />
      </g>
      {/* E (second) — circuit-trace style */}
      <g stroke="url(#logo-gradient)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="268" y1="33" x2="268" y2="77" />
        <line x1="268" y1="33" x2="295" y2="33" />
        <line x1="268" y1="55" x2="291" y2="55" />
        <line x1="268" y1="77" x2="295" y2="77" />
      </g>
    </svg>
  );
}
