import { ImageResponse } from "next/og";

export const alt = "Learning Access Initiative — free tutoring, SAT prep & classes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #eef3ff 0%, #ffffff 55%, #eafaf3 100%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#2d66f5",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            LA
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#0b1121" }}>
            Learning Access Initiative
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "68px", fontWeight: 800, color: "#0b1121", lineHeight: 1.05, letterSpacing: "-2px" }}>
            Free tutoring, SAT prep
          </div>
          <div style={{ fontSize: "68px", fontWeight: 800, color: "#2d66f5", lineHeight: 1.05, letterSpacing: "-2px" }}>
            &amp; classes that work.
          </div>
          <div style={{ marginTop: "24px", fontSize: "30px", color: "#475064" }}>
            For multilingual students. In your language. No cost.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Free tutoring", "SAT practice", "Live classes", "Learn hub"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: "24px",
                color: "#2d66f5",
                background: "#e9f0ff",
                padding: "8px 18px",
                borderRadius: "999px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
