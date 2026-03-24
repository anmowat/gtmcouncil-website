import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt =
  "AI will rewire GTM. An exclusive community of RevOps leaders shaping what comes next.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo-gtmcouncil.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

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
        {/* Logo — 200×200, crop ~15px each side to remove whitespace */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 170,
            height: 200,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img src={logoSrc} width={200} height={200} style={{ flexShrink: 0 }} />
        </div>

        {/* Spacer */}
        <div style={{ height: 40, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 90,
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
        <div style={{ height: 24, display: "flex" }} />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 42,
            color: "#334155",
            lineHeight: 1.45,
            textAlign: "center",
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          An exclusive community of RevOps leaders shaping what comes next.
        </div>
      </div>
    ),
    { ...size }
  );
}
