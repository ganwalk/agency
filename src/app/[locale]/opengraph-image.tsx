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
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 36 }}>
          <div style={{ width: 22, height: 34, background: "#faf6ee", borderRadius: 3, display: "flex" }} />
          <div style={{ width: 22, height: 56, background: "#faf6ee", borderRadius: 3, display: "flex" }} />
          <div style={{ width: 22, height: 82, background: "#faf6ee", borderRadius: 3, display: "flex" }} />
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
