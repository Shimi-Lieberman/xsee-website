/**
 * Nav logo: dragon/shield mark (inline SVG).
 * Used in Nav and anywhere the same mark is needed.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg-brand" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <filter id="lg-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Dragon body arc */}
      <path
        d="M 7 28 C 2 22 2 10 8 6 C 12 3 17 3 21 5"
        stroke="url(#lg-brand)"
        strokeWidth="1.3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <circle cx="7" cy="28" r="1.1" fill="#4ADE80" opacity="0.8" />
      <circle cx="4" cy="20" r="1" fill="#4ADE80" opacity="0.6" />
      <circle cx="4" cy="13" r="1" fill="#4ADE80" opacity="0.6" />
      <circle cx="8" cy="7" r="1.1" fill="#4ADE80" opacity="0.8" />
      <circle cx="14" cy="4" r="1" fill="#4ADE80" opacity="0.6" />
      <circle cx="21" cy="5" r="1.1" fill="#4ADE80" opacity="0.8" />
      <line x1="7" y1="28" x2="4" y2="20" stroke="#4ADE80" strokeWidth="0.7" opacity="0.4" />
      <line x1="4" y1="20" x2="7" y2="13" stroke="#4ADE80" strokeWidth="0.7" opacity="0.35" />
      <line x1="4" y1="20" x2="4" y2="13" stroke="#4ADE80" strokeWidth="0.7" opacity="0.3" />
      <line x1="7" y1="13" x2="4" y2="13" stroke="#4ADE80" strokeWidth="0.7" opacity="0.3" />
      <line x1="7" y1="13" x2="8" y2="7" stroke="#4ADE80" strokeWidth="0.7" opacity="0.35" />
      <line x1="4" y1="13" x2="8" y2="7" stroke="#4ADE80" strokeWidth="0.7" opacity="0.3" />
      <line x1="8" y1="7" x2="14" y2="4" stroke="#4ADE80" strokeWidth="0.7" opacity="0.35" />
      <line x1="8" y1="7" x2="21" y2="5" stroke="#4ADE80" strokeWidth="0.7" opacity="0.3" />
      <line x1="14" y1="4" x2="21" y2="5" stroke="#4ADE80" strokeWidth="0.7" opacity="0.3" />
      <polygon points="4,13 4,20 7,13" fill="#4ADE80" opacity="0.04" />
      <polygon points="4,13 8,7 7,13" fill="#4ADE80" opacity="0.04" />
      <polygon points="8,7 14,4 21,5" fill="#4ADE80" opacity="0.04" />
      {/* Dragon head */}
      <path
        d="M 21 5 C 25 4 28 5 29 8 C 30 10 28 13 26 13"
        stroke="url(#lg-brand)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 23 3 L 26 1 L 25 5"
        stroke="#86EFAC"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="26" cy="7.5" r="1.2" fill="#4ADE80" filter="url(#lg-glow)" />
      <circle cx="26" cy="7.5" r="0.5" fill="#FFFFFF" opacity="0.8" />
      <line x1="29" y1="9" x2="28" y2="11" stroke="#86EFAC" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      {/* Dragon tail */}
      <path
        d="M 7 28 C 10 32 16 33 19 31 C 21 30 22 28 20 27"
        stroke="url(#lg-brand)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 20 27 L 23 25 M 20 27 L 22 29"
        stroke="#86EFAC"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Shield */}
      <path
        d="M 18 9 L 12 11.5 L 12 17.5 C 12 21.5 14.8 24.8 18 26 C 21.2 24.8 24 21.5 24 17.5 L 24 11.5 Z"
        fill="rgba(74,222,128,0.08)"
        stroke="url(#lg-brand)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        filter="url(#lg-glow)"
      />
      <line x1="14.5" y1="14" x2="21.5" y2="22" stroke="url(#lg-brand)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21.5" y1="14" x2="14.5" y2="22" stroke="url(#lg-brand)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
