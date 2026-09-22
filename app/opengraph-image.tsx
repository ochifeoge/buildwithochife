import { ImageResponse } from "next/og";
export const alt =
  "Ochife — Business websites and web applications, built with purpose.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#f5f3ed",
        color: "#232720",
        padding: "60px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          ochife<span style={{ color: "#a9472c" }}>.</span>
        </div>
        <span style={{ fontSize: 16, letterSpacing: 2 }}>
          INDEPENDENT FULL-STACK DEVELOPER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        <span>Good business.</span>
        <span>Meet a better website.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #d8dad0",
          paddingTop: 25,
          fontSize: 20,
        }}
      >
        <span>Business websites / Web applications / Redesigns</span>
        <span style={{ color: "#a9472c" }}>BuildWithOchife</span>
      </div>
    </div>,
    size,
  );
}
