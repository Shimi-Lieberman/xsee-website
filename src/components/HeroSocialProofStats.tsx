"use client";

export default function HeroSocialProofStats() {
  return (
    <div className="hero-social-proof">
      <div className="sp-stat min-w-0">
        <div className="sp-num hero-sp-num-magenta font-mono">1,000+</div>
        <div className="sp-lbl">Attack patterns in XSEE&apos;s engine</div>
      </div>
      <div className="sp-stat min-w-0">
        <div className="sp-num font-mono" style={{ color: "var(--yellow-light)" }}>
          7
        </div>
        <div className="sp-lbl">Engines in the autonomous loop</div>
      </div>
      <div className="sp-stat warm min-w-0">
        <div className="sp-num font-mono">
          92<span>%</span>
        </div>
        <div className="sp-lbl">Avg exploit confidence score</div>
      </div>
      <div className="sp-stat min-w-0">
        <div className="sp-num font-mono">
          &lt;30<span>m</span>
        </div>
        <div className="sp-lbl">Time to your first proven breach path</div>
      </div>
      <div className="sp-stat warm min-w-0">
        <div className="sp-num font-mono">
          $3.2<span>M</span>
        </div>
        <div className="sp-lbl">Avg financial exposure proven on first scan</div>
      </div>
    </div>
  );
}
