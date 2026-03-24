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
          padding: "80px",
          gap: "70px",
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
          <img src={logoSrc} width={420} height={280} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "4px",
            height: "380px",
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
            gap: "32px",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#0d2340",
              lineHeight: 1.15,
            }}
          >
            AI will rewire the GTM motion.
          </div>
          <div
            style={{
              fontSize: 38,
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
