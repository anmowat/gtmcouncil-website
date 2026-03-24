import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt =
  "AI will rewire the GTM motion. GTM Council is an exclusive community of the top 100+ GTM operators sharing insights and helping shape how GTM will evolve.";

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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#ffffff",
          padding: "60px",
          gap: "60px",
        }}
      >
        {/* Logo on the left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img src={logoSrc} width={360} height={240} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "3px",
            height: "320px",
            background: "#c8952a",
            flexShrink: 0,
          }}
        />

        {/* Text on the right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#0d2340",
              lineHeight: 1.2,
            }}
          >
            AI will rewire the GTM motion.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#334155",
              lineHeight: 1.5,
            }}
          >
            GTM Council is an exclusive community of the top 100+ GTM operators
            sharing insights and helping shape how GTM will evolve.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
