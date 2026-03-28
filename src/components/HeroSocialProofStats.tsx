"use client";

import CountUp from "react-countup";

const easeOutCubic = (t: number, b: number, c: number, d: number) => {
  const t2 = t / d - 1;
  return c * (t2 * t2 * t2 + 1) + b;
};

export default function HeroSocialProofStats() {
  return (
    <div className="hero-social-proof">
      <div className="sp-stat">
        <div className="sp-num hero-sp-num-magenta">
          <CountUp
            end={1000}
            duration={2}
            enableScrollSpy
            scrollSpyOnce
            useEasing
            easingFn={easeOutCubic}
            useGrouping
            separator=","
          />
          <span>+</span>
        </div>
        <div className="sp-lbl">Attack patterns in XSEE&apos;s engine</div>
      </div>
      <div className="sp-sep" />
      <div className="sp-stat">
        <div className="sp-num" style={{ color: "var(--yellow-light)" }}>
          L1–L3
        </div>
        <div className="sp-lbl">Layers of validation proof</div>
      </div>
      <div className="sp-sep" />
      <div className="sp-stat warm">
        <div className="sp-num">
          <CountUp
            end={92}
            duration={2}
            enableScrollSpy
            scrollSpyOnce
            useEasing
            easingFn={easeOutCubic}
          />
          <span>%</span>
        </div>
        <div className="sp-lbl">Avg exploit confidence score</div>
      </div>
      <div className="sp-sep" />
      <div className="sp-stat">
        <div className="sp-num">
          &lt;30<span>m</span>
        </div>
        <div className="sp-lbl">Time to your first proven breach path</div>
      </div>
      <div className="sp-sep" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="sp-stat warm">
        <div className="sp-num">
          <CountUp
            end={18.5}
            decimals={1}
            duration={2}
            enableScrollSpy
            scrollSpyOnce
            useEasing
            easingFn={easeOutCubic}
            prefix="$"
          />
          <span>M</span>
        </div>
        <div className="sp-lbl">Avg financial exposure proven</div>
      </div>
    </div>
  );
}
