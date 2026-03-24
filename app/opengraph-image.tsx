import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt =
  "AI will rewire GTM. An exclusive community of operational leaders shaping what comes next.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo-gtmcouncil.svg"),
    "base64"
  );
  const logoSrc = `data:image/svg+xml;base64,${logoData}`;

  // Vertical stack layout — readable even at LinkedIn DM thumbnail size.
  // Logo centered top, large headline, subtitle below.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: "60px 80px",
          gap: "0px",
        }}
      >
        {/* Logo — SVG viewBox 220×120, rendered at 500×273 (correct aspect ratio) */}
        <img src={logoSrc} width={500} height={273} style={{ flexShrink: 0 }} />

        {/* Spacer */}
        <div style={{ height: 24, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#0d2340",
            lineHeight: 1.1,
            textAlign: "center",
            display: "flex",
          }}
        >
          AI will rewire GTM.
        </div>

        {/* Spacer */}
        <div style={{ height: 16, display: "flex" }} />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#334155",
            lineHeight: 1.45,
            textAlign: "center",
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          An exclusive community of operational leaders shaping what comes next.
        </div>
      </div>
    ),
    { ...size }
  );
}
