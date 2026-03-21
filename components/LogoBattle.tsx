"use client";

import { useEffect, useRef } from "react";

// ── Brand definitions ──────────────────────────────────────────────────────
const G1 = [
  { abbr: "SF",  bg: "#00A1E0", name: "Salesforce" }, // bright blue
  { abbr: "Hs",  bg: "#FF7A59", name: "HubSpot"   }, // salmon orange
  { abbr: "Mk",  bg: "#5C4EE5", name: "Marketo"   }, // violet
  { abbr: "Or",  bg: "#6244BB", name: "Outreach"  }, // purple
  { abbr: "Gg",  bg: "#FF5C35", name: "Gong"      }, // red-orange
];

const G2 = [
  { abbr: "OAI", bg: "#10A37F", name: "OpenAI"  }, // teal
  { abbr: "Cl",  bg: "#CC785C", name: "Claude"  }, // Anthropic warm
];

// ── Tunables ───────────────────────────────────────────────────────────────
const BASE_PARTICLES = 140;
const ICON_R         = 15;   // icon half-size (px)
const BASE_ALPHA     = 0.55; // resting opacity
const DURATION_MS    = 10_000;
const FUZZY_FRAC     = 0.10; // soft boundary = 10% of width

// ── Helpers ────────────────────────────────────────────────────────────────
function rand(a: number, b: number) { return a + Math.random() * (b - a); }

function ease(t: number) {
  // Slow-start, fast-middle, slow-end
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x,     y + h, x,     y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y,         x + r, y);
  ctx.closePath();
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  abbr: string, bg: string, alpha: number
) {
  const side = r * 1.85;
  const cornerR = r * 0.38;

  ctx.save();
  ctx.globalAlpha = alpha;

  // Soft shadow
  ctx.shadowColor  = "rgba(0,0,0,0.22)";
  ctx.shadowBlur   = 5;
  ctx.shadowOffsetY = 2;

  rrect(ctx, x - side / 2, y - side / 2, side, side, cornerR);
  ctx.fillStyle = bg;
  ctx.fill();

  // Inner highlight (top-left glint)
  ctx.shadowColor = "transparent";
  ctx.shadowBlur  = 0;
  ctx.shadowOffsetY = 0;
  const hl = ctx.createLinearGradient(x - side/2, y - side/2, x + side/2, y + side/2);
  hl.addColorStop(0, "rgba(255,255,255,0.18)");
  hl.addColorStop(1, "rgba(255,255,255,0)");
  rrect(ctx, x - side / 2, y - side / 2, side, side, cornerR);
  ctx.fillStyle = hl;
  ctx.fill();

  // Label
  const fontSize = abbr.length >= 3 ? r * 0.72 : r * 0.88;
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(abbr, x, y + 0.5);

  ctx.restore();
}

// ── Particle type ──────────────────────────────────────────────────────────
interface Pt {
  x: number; y: number;
  phX: number; phY: number;
  spd: number; amp: number;
  g1: number; g2: number;
  r: number;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    let pts: Pt[] = [];

    function init() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale particle count to canvas area
      const area  = W * H;
      const count = Math.round(BASE_PARTICLES * Math.sqrt(area / (1200 * 400)));
      const n     = Math.max(40, Math.min(count, 240));

      pts = Array.from({ length: n }, (_, i) => ({
        x:   rand(ICON_R * 2.5, W - ICON_R * 2.5),
        y:   rand(ICON_R * 2.5, H - ICON_R * 2.5),
        phX: rand(0, Math.PI * 2),
        phY: rand(0, Math.PI * 2),
        spd: rand(0.25, 0.65),
        amp: rand(3, 9),
        g1:  i % G1.length,
        g2:  i % G2.length,
        r:   rand(ICON_R - 2, ICON_R + 3),
      }));
    }

    init();

    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const startTime = performance.now();
    let raf: number;

    function frame(now: number) {
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const elapsed  = now - startTime;
      const rawT     = Math.min(elapsed / DURATION_MS, 1);
      const progress = ease(rawT);           // 0 = all G1  →  1 = all G2

      // G2 territory: rightmost `progress` fraction of canvas
      // frontX moves from W (far right) to 0 (far left) as progress 0→1
      const frontX = W * (1 - progress);
      const fuzzy  = W * FUZZY_FRAC;
      const t      = elapsed / 1000;

      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const px = p.x + Math.sin(t * p.spd       + p.phX) * p.amp;
        const py = p.y + Math.cos(t * p.spd * 0.7 + p.phY) * p.amp;

        // Signed distance into G2 territory (positive = inside G2)
        const d = px - frontX;

        if (d > fuzzy) {
          // Fully G2
          const b = G2[p.g2];
          drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA);
        } else if (d > -fuzzy) {
          // Soft transition zone — only one logo visible at a time to avoid bleed-through
          const blend = (d + fuzzy) / (2 * fuzzy); // 0 at G1 edge → 1 at G2 edge
          if (blend < 0.5) {
            const b = G1[p.g1];
            drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA * (1 - blend * 2));
          } else {
            const b = G2[p.g2];
            drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA * ((blend - 0.5) * 2));
          }
        } else {
          // Fully G1
          const b = G1[p.g1];
          drawBadge(ctx, px, py, p.r, b.abbr, b.bg, BASE_ALPHA);
        }
      }

      // Battle-front glow — a soft vertical beam that moves across
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
