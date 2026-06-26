import { ImageResponse } from "next/og";
import { address, businessName } from "./seo";

export const alt =
  "Grappling Garage - Wrestling, BJJ and fitness in Tunis";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const subtitle = `Practical grappling, self-defense and conditioning at ${address.display}.`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#061826",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 0,
          }}
        >
          <span>{businessName}</span>
          <span style={{ color: "#7ee7e0" }}>Tunis</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              alignSelf: "flex-start",
              padding: "14px 22px",
              borderRadius: 999,
              background: "#10364f",
              color: "#c8f1ff",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            Wrestling • BJJ • Fitness
          </div>
          <div
            style={{
              maxWidth: 850,
              fontSize: 82,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            Learn to feel capable.
          </div>
          <div
            style={{
              maxWidth: 780,
              display: "flex",
              fontSize: 30,
              lineHeight: 1.3,
              color: "#c8e4f2",
              fontWeight: 700,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
