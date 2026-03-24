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

  // Logo source is 132×132 (square). Render in an overflow:hidden container
  // that is narrower than the image to crop whitespace on left/right edges,
  // letting us scale the logo taller without distorting proportions.
  const LOGO_RENDER = 310; // image rendered at 310×310 (1:1)
  const LOGO_CROP_W = 280; // visible width after cropping ~15px each side
  const LOGO_CROP_H = 310;

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
          gap: "50px",
        }}
      >
        {/* Logo — cropped container removes horizontal whitespace */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: LOGO_CROP_W,
            height: LOGO_CROP_H,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={logoSrc}
            width={LOGO_RENDER}
            height={LOGO_RENDER}
            style={{ flexShrink: 0 }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            width: "4px",
            height: "340px",
            background: "#c8952a",
            flexShrink: 0,
          }}
        />

        {/* Text — flex:1 + minWidth:0 ensures it wraps inside remaining space */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            minWidth: 0,
            gap: "30px",
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#0d2340",
              lineHeight: 1.15,
              wordBreak: "break-word",
            }}
          >
            AI will rewire GTM.
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#334155",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            An exclusive community of RevOps leaders shaping what comes next.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
