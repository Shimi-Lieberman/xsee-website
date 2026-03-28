import { ImageResponse } from "next/og";

export const runtime = "edge";

const STATS = ["3 Critical Paths Found", "$18.5M Avg Exposure", "<30 Min First Proof"] as const;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050d1a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,45,120,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,120,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              border: "2px solid #ff2d78",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#ff2d78",
              fontWeight: 900,
            }}
          >
            X
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: "32px", fontWeight: 900, letterSpacing: "4px" }}>XSEE</span>
            <span
              style={{
                color: "#64748b",
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Cloud Attack Intelligence
            </span>
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
            position: "relative",
            maxWidth: "1000px",
          }}
        >
          Prove Every Attack Path is Real
        </div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            textAlign: "center",
            maxWidth: "800px",
            position: "relative",
          }}
        >
          Live AWS API validation · Cryptographic evidence per hop · AI attack simulation
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat}
              style={{
                background: "rgba(255,45,120,0.1)",
                border: "1px solid rgba(255,45,120,0.3)",
                borderRadius: "8px",
                padding: "12px 20px",
                color: "#ff2d78",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
