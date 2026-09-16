import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

export const alt = "Level";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#11141c",
          color: "#faf6ee",
        }}
      >
        <div style={{ position: "relative", width: 90, height: 128, display: "flex", marginBottom: 30 }}>
          <div
            style={{
              position: "absolute",
              display: "flex",
              left: 5,
              top: 44,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#faf6ee",
            }}
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              left: 5,
              top: 0,
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "11px solid #faf6ee",
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>Level</div>
        <div style={{ display: "flex", fontSize: 32, color: "#d9b57c", marginTop: 20, maxWidth: 820 }}>
          Product design, engineering, law and business management, in one team
        </div>
      </div>
    ),
    { ...size },
  );
}
