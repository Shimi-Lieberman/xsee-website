"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function NumbersMoment() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t1 = performance.now();
          const tick1 = (now: number) => {
            const p = Math.min((now - t1) / 2000, 1);
            const ease = 1 - (1 - p) ** 3;
            setCount1(Math.round(ease * 4000));
            if (p < 1) requestAnimationFrame(tick1);
          };
          requestAnimationFrame(tick1);
          const t2 = performance.now();
          const tick2 = (now: number) => {
            const p = Math.min((now - t2) / 1200, 1);
            const ease = 1 - (1 - p) ** 3;
            setCount2(Math.round(ease * 3));
            if (p < 1) requestAnimationFrame(tick2);
          };
          requestAnimationFrame(tick2);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        background: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mesh-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(239,68,68,0.08), transparent 70%)",
          left: "-100px",
          top: "50%",
          transform: "translateY(-50%)",
          animation: "orbDrift1 12s ease-in-out infinite",
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,31,143,0.08), transparent 70%)",
          right: "-80px",
          top: "50%",
          transform: "translateY(-50%)",
          animation: "orbDrift2 10s ease-in-out infinite",
        }}
      />

      <div
        className="reveal"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.24em",
          color: "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-mono)",
          marginBottom: "56px",
        }}
      >
        The reality no one wants to face
      </div>

      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "0",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <div style={{ padding: "0 80px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(100px,16vw,180px)",
              fontWeight: 900,
              fontFamily: "var(--font-mono)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: "rgba(239,68,68,0.7)",
              marginBottom: "16px",
            }}
          >
            {count1.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.48)",
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: "260px",
              margin: "0 auto",
            }}
          >
            Alerts your scanner generates every month.
          </div>
        </div>

        <div
          style={{
            width: "1px",
            height: "200px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <div style={{ padding: "0 80px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(100px,16vw,180px)",
              fontWeight: 900,
              fontFamily: "var(--font-mono)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: "var(--pink)",
              marginBottom: "16px",
            }}
          >
            {count2}
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.48)",
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: "260px",
              margin: "0 auto",
            }}
          >
            That actually reach your crown-jewel database.
          </div>
        </div>
      </div>

      <div
        className="reveal"
        style={{
          fontSize: "clamp(22px,3vw,32px)",
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          maxWidth: "700px",
          margin: "72px auto 40px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        The 3,997 others are noise.
        <br />
        XSEE finds the three
        <br />
        that will end your quarter.
      </div>

      <div className="reveal">
        <div style={{ textAlign: "center" }}>
          <Link
            href="/free-scan"
            className="btn-shimmer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background: "var(--pink)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              padding: "14px 32px",
              borderRadius: "13px",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 0 40px rgba(255,31,143,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 70px rgba(255,31,143,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(255,31,143,0.35)";
            }}
          >
            Run Free Scan — See yours →
          </Link>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.38)",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            Don&apos;t cancel your CSPM. Add the layer it structurally cannot provide.
          </p>
        </div>
      </div>
    </section>
  );
}
