"use client";

import { useEffect, useRef } from "react";

// ── SVG logo markup for each G1 brand (drawn as canvas images) ─────────────
const G1_SVGS = [
  // Salesforce — sky-blue cloud
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 36">
    <circle cx="22" cy="22" r="13" fill="#00A1E0"/>
    <circle cx="11" cy="27" r="9"  fill="#00A1E0"/>
    <circle cx="35" cy="17" r="17" fill="#00A1E0"/>
    <circle cx="47" cy="24" r="11" fill="#00A1E0"/>
    <circle cx="40" cy="29" r="8"  fill="#00A1E0"/>
    <rect x="2" y="24" width="52" height="12" fill="#00A1E0"/>
  </svg>`,

  // HubSpot — salmon sprocket (ring + 3 arms + dots)
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <line x1="37" y1="52" x2="15" y2="17" stroke="#FF7A59" stroke-width="11" stroke-linecap="round"/>
    <line x1="61" y1="40" x2="63" y2="9"  stroke="#FF7A59" stroke-width="11" stroke-linecap="round"/>
    <line x1="38" y1="69" x2="11" y2="84" stroke="#FF7A59" stroke-width="11" stroke-linecap="round"/>
    <circle cx="13" cy="13" r="12" fill="#FF7A59"/>
    <circle cx="64" cy="7"  r="12" fill="#FF7A59"/>
    <circle cx="9"  cy="86" r="12" fill="#FF7A59"/>
    <circle cx="60" cy="62" r="28" fill="#FF7A59"/>
    <circle cx="60" cy="62" r="14" fill="white"/>
  </svg>`,

  // Marketo — purple three ascending parallelogram bars
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 90">
    <polygon points="4,88 20,88 23,58 7,58"      fill="#5B5BC4"/>
    <polygon points="28,88 46,88 52,26 34,26"    fill="#5B5BC4"/>
    <polygon points="55,88 74,88 82,2 63,2"      fill="#5B5BC4"/>
  </svg>`,

  // Outreach — blue-violet rounded plectrum with circle cutout
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50,7 C64,5 82,20 91,38 C98,53 96,72 82,84 C70,94 56,97 50,97 C44,97 30,94 18,84 C4,72 2,53 9,38 C18,20 36,5 50,7 Z" fill="#5757D9"/>
    <circle cx="50" cy="52" r="22" fill="white"/>
  </svg>`,
];

// G2 — keep as colored badges until real logos land
const G2_BADGES = [
  { abbr: "OAI", bg: "#10A37F" }, // OpenAI
  { abbr: "Cl",  bg: "#CC785C" }, // Claude
];

// ── Tunables ───────────────────────────────────────────────────────────────
const BASE_PARTICLES = 140;
const ICON_R         = 15;
const BASE_ALPHA     = 0.58;
const DURATION_MS    = 10_000;
const FUZZY_FRAC     = 0.10;

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

function svgDataUrl(svg: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Fallback badge (used for G2 and if an image fails to load)
function drawBadge(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  abbr: string, bg: string, alpha: number
) {
  const side = r * 1.85, cr = r * 0.38;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = "rgba(0,0,0,0.22)"; ctx.shadowBlur = 5; ctx.shadowOffsetY = 2;
  ctx.beginPath();
  ctx.roundRect(x - side/2, y - side/2, side, side, cr);
  ctx.fillStyle = bg; ctx.fill();
  ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = `700 ${abbr.length >= 3 ? r*0.72 : r*0.88}px system-ui,sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(abbr, x, y + 0.5);
  ctx.restore();
}

interface Pt { x:number; y:number; phX:number; phY:number; spd:number; amp:number; g1:number; g2:number; r:number; }

export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, pts: Pt[] = [];
    let cancelled = false;

    // Pre-load all G1 SVG images
    const g1imgs: HTMLImageElement[] = new Array(G1_SVGS.length);
    let loaded = 0;

    G1_SVGS.forEach((svg, i) => {
      const img = new Image();
      img.onload  = () => { g1imgs[i] = img; loaded++; };
      img.onerror = () => { loaded++; }; // skip bad image gracefully
      img.src = svgDataUrl(svg);
    });

    function init() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(40, Math.min(
        Math.round(BASE_PARTICLES * Math.sqrt(W * H / (1200 * 400))), 240
      ));
      pts = Array.from({ length: n }, (_, i) => ({
        x:   rand(ICON_R*2.5, W-ICON_R*2.5),
        y:   rand(ICON_R*2.5, H-ICON_R*2.5),
        phX: rand(0, Math.PI*2), phY: rand(0, Math.PI*2),
        spd: rand(0.25, 0.65), amp: rand(3, 9),
        g1: i % G1_SVGS.length,
        g2: i % G2_BADGES.length,
        r:  rand(ICON_R-2, ICON_R+3),
      }));
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const startTime = performance.now();
    let raf: number;

    function drawLogoImg(img: HTMLImageElement | undefined, x: number, y: number, r: number, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      const s = r * 1.85;
      if (img) {
        ctx!.drawImage(img, x - s/2, y - s/2, s, s);
      }
      ctx!.restore();
    }

    function frame(now: number) {
      if (cancelled) return;
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const elapsed  = now - startTime;
      const rawT     = Math.min(elapsed / DURATION_MS, 1);
      const progress = ease(rawT);
      const frontX   = W * (1 - progress);
      const fuzzy    = W * FUZZY_FRAC;
      const t        = elapsed / 1000;

      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const px = p.x + Math.sin(t * p.spd       + p.phX) * p.amp;
        const py = p.y + Math.cos(t * p.spd * 0.7 + p.phY) * p.amp;
        const d  = px - frontX;

        if (d > fuzzy) {
          // Fully G2
          const b = G2_BADGES[p.g2];
          drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA);
        } else if (d > -fuzzy) {
          const blend = (d + fuzzy) / (2 * fuzzy);
          if (blend < 0.5) {
            drawLogoImg(g1imgs[p.g1], px, py, p.r, BASE_ALPHA * (1 - blend * 2));
          } else {
            const b = G2_BADGES[p.g2];
            drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA * ((blend - 0.5) * 2));
          }
        } else {
          // Fully G1
          drawLogoImg(g1imgs[p.g1], px, py, p.r, BASE_ALPHA);
        }
      }

      // Battle-front glow beam
      if (rawT > 0.01 && rawT < 0.99) {
        const gw  = fuzzy * 2.5;
        const grd = ctx.createLinearGradient(frontX - gw, 0, frontX + gw, 0);
        grd.addColorStop(0,   "rgba(255,255,255,0)");
        grd.addColorStop(0.5, "rgba(255,255,255,0.22)");
        grd.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(frontX - gw, 0, gw * 2, H);
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}
