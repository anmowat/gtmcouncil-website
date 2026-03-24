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
  const [fontExtraBold, fontRegular] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/montserrat-extrabold.ttf")),
    readFile(join(process.cwd(), "public/fonts/montserrat-regular.ttf")),
  ]);

  // Logo recreated as inline JSX using the actual brand colors.
  // GTM: ExtraBold — G/M navy #0d2340, T gold #c4921a.
  // COUNCIL: Regular, wide letter-spacing, navy.
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
        }}
      >
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          {/* GTM */}
          <div style={{ display: "flex", lineHeight: 1 }}>
            <span
              style={{
                fontSize: 160,
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
                fontSize: 160,
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
                fontSize: 160,
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
              fontSize: 30,
              fontWeight: 400,
              fontFamily: "Montserrat",
              color: "#0d2340",
              letterSpacing: "16px",
              paddingLeft: "16px", // offset trailing letter-spacing so it centres
            }}
          >
            COUNCIL
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 36, display: "flex" }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 80,
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

        {/* Spacer */}
        <div style={{ height: 20, display: "flex" }} />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            fontFamily: "Montserrat",
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
