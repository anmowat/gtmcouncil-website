import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt =
  "AI will rewire GTM. An exclusive community of operational leaders shaping what comes next.";

// Render at 2x resolution for crisp text — same 1.905:1 aspect ratio as 1200×630.
// Social platforms accept the larger size and scale it down, giving sharp edges.
export const size = {
  width: 2400,
  height: 1260,
};

export const contentType = "image/png";

export default async function Image() {
  const [fontExtraBold, fontRegular] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/montserrat-extrabold.ttf")),
    readFile(join(process.cwd(), "public/fonts/montserrat-regular.ttf")),
  ]);

  // All measurements are 2× the logical values so the image looks identical
  // to the 1200×630 version when displayed at reference size, but with twice
  // the pixel density → no soft anti-aliasing edges.
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
          padding: "120px 160px",
        }}
      >
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          {/* GTM */}
          <div style={{ display: "flex", lineHeight: 1 }}>
            <span
              style={{
                fontSize: 640,
                fontWeight: 800,
                fontFamily: "Montserrat",
                color: "#0d2340",
                lineHeight: 1,
              }}
            >
              G
            </span>
            <span
              style={{
                fontSize: 640,
                fontWeight: 800,
                fontFamily: "Montserrat",
                color: "#c4921a",
                lineHeight: 1,
              }}
            >
              T
            </span>
            <span
              style={{
                fontSize: 640,
                fontWeight: 800,
                fontFamily: "Montserrat",
                color: "#0d2340",
                lineHeight: 1,
              }}
            >
              M
            </span>
          </div>

          {/* COUNCIL */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 400,
              fontFamily: "Montserrat",
              color: "#0d2340",
              letterSpacing: "64px",
              paddingLeft: "64px",
            }}
          >
            COUNCIL
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 32, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 160,
            fontWeight: 800,
            fontFamily: "Montserrat",
            color: "#0d2340",
            lineHeight: 1.1,
            textAlign: "center",
            display: "flex",
          }}
        >
          AI will rewire GTM.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Montserrat",
          data: fontExtraBold,
          weight: 800,
          style: "normal",
        },
        {
          name: "Montserrat",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
