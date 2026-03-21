"use client";

import { useEffect, useRef } from "react";

// ── G1 brand SVGs ──────────────────────────────────────────────────────────
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
    <polygon points="4,88 20,88 23,58 7,58"   fill="#5B5BC4"/>
    <polygon points="28,88 46,88 52,26 34,26" fill="#5B5BC4"/>
    <polygon points="55,88 74,88 82,2 63,2"   fill="#5B5BC4"/>
  </svg>`,

  // Outreach — blue-violet rounded plectrum with circle cutout
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50,7 C64,5 82,20 91,38 C98,53 96,72 82,84 C70,94 56,97 50,97 C44,97 30,94 18,84 C4,72 2,53 9,38 C18,20 36,5 50,7 Z" fill="#5757D9"/>
    <circle cx="50" cy="52" r="22" fill="white"/>
  </svg>`,
];

// ── G2 brand SVGs ──────────────────────────────────────────────────────────
const G2_SVGS = [
  // OpenAI — black interlocking bloom
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
    <path fill="#111" d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-6.13-3.865 10.079 10.079 0 00-11.051 4.821 9.964 9.964 0 00-6.51 4.833 10.079 10.079 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 006.129 3.865 10.078 10.078 0 0011.051-4.815 9.965 9.965 0 006.51-4.839 10.079 10.079 0 00-1.239-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103L16.353 34.1a7.504 7.504 0 01-9.961-3.094zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.51a7.504 7.504 0 01-2.747-9.89zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.048-4.648a7.498 7.498 0 0111.135 7.767zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z"/>
  </svg>`,

  // Claude/Anthropic — salmon 12-ray starburst
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g fill="#D4785A">
      <rect x="44" y="6"  width="12" height="38" rx="5" transform="rotate(0   50 50)"/>
      <rect x="44" y="8"  width="11" height="35" rx="5" transform="rotate(30  50 50)"/>
      <rect x="45" y="6"  width="10" height="38" rx="5" transform="rotate(60  50 50)"/>
      <rect x="44" y="7"  width="12" height="36" rx="5" transform="rotate(90  50 50)"/>
      <rect x="44" y="9"  width="11" height="34" rx="5" transform="rotate(120 50 50)"/>
      <rect x="45" y="6"  width="10" height="38" rx="5" transform="rotate(150 50 50)"/>
      <rect x="44" y="7"  width="12" height="37" rx="5" transform="rotate(180 50 50)"/>
      <rect x="44" y="8"  width="11" height="36" rx="5" transform="rotate(210 50 50)"/>
      <rect x="45" y="6"  width="10" height="38" rx="5" transform="rotate(240 50 50)"/>
      <rect x="44" y="6"  width="12" height="35" rx="5" transform="rotate(270 50 50)"/>
      <rect x="44" y="9"  width="11" height="37" rx="5" transform="rotate(300 50 50)"/>
      <rect x="45" y="7"  width="10" height="36" rx="5" transform="rotate(330 50 50)"/>
    </g>
  </svg>`,
];

// ── Tunables ───────────────────────────────────────────────────────────────
const BASE_PARTICLES = 170;
const ICON_R         = 14;
const BASE_ALPHA     = 0.65;
const DURATION_MS    = 8_000;
const FUZZY_FRAC     = 0.08;

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function svgDataUrl(svg: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

interface Pt {
  x: number; y: number;
  phX: number; phY: number;
  spd: number; amp: number;
  g1: number; g2: number;
  r: number;
  rot: number; rotSpd: number;
}

export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, pts: Pt[] = [];
    let cancelled = false;

    // Pre-load all SVGs
    function loadSvgs(svgs: string[]): HTMLImageElement[] {
      return svgs.map(svg => {
        const img = new Image();
        img.src = svgDataUrl(svg);
        return img;
      });
    }
    const g1imgs = loadSvgs(G1_SVGS);
    const g2imgs = loadSvgs(G2_SVGS);

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

      const n = Math.max(50, Math.min(
        Math.round(BASE_PARTICLES * Math.sqrt(W * H / (1200 * 400))), 280
      ));
      pts = Array.from({ length: n }, (_, i) => ({
        x:      rand(ICON_R*2.5, W - ICON_R*2.5),
        y:      rand(ICON_R*2.5, H - ICON_R*2.5),
        phX:    rand(0, Math.PI*2),
        phY:    rand(0, Math.PI*2),
        spd:    rand(1.0, 2.8),      // fast
        amp:    rand(12, 28),         // large swings
        g1:     i % G1_SVGS.length,
        g2:     i % G2_SVGS.length,
        r:      rand(ICON_R-2, ICON_R+3),
        rot:    rand(0, Math.PI*2),
        rotSpd: rand(-1.8, 1.8),     // spinning
      }));
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const startTime = performance.now();
    let raf: number;

    function drawLogo(
      img: HTMLImageElement, x: number, y: number,
      r: number, alpha: number, angle: number
    ) {
      const s = r * 1.85;
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.translate(x, y);
      ctx!.rotate(angle);
      ctx!.drawImage(img, -s/2, -s/2, s, s);
      ctx!.restore();
    }

    function frame(now: number) {
      if (cancelled) return;
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const elapsed  = now - startTime;
      const rawT     = Math.min(elapsed / DURATION_MS, 1);
      const progress = ease(rawT);
      // Jittery battle front — shakes side-to-side as armies clash
      const t        = elapsed / 1000;
      const jitter   = Math.sin(t * 11) * W * 0.025 + Math.cos(t * 6.7) * W * 0.012;
      const frontX   = W * (1 - progress) + jitter;
      const fuzzy    = W * FUZZY_FRAC;

      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const px    = p.x + Math.sin(t * p.spd       + p.phX) * p.amp;
        const py    = p.y + Math.cos(t * p.spd * 0.7 + p.phY) * p.amp;
        const angle = p.rot + t * p.rotSpd;
        const d     = px - frontX;

        if (d > fuzzy) {
          // Fully G2
          drawLogo(g2imgs[p.g2], px, py, p.r, BASE_ALPHA, angle);
        } else if (d > -fuzzy) {
          const blend = (d + fuzzy) / (2 * fuzzy);
          if (blend < 0.5) {
            drawLogo(g1imgs[p.g1], px, py, p.r, BASE_ALPHA * (1 - blend*2), angle);
          } else {
            drawLogo(g2imgs[p.g2], px, py, p.r, BASE_ALPHA * ((blend - 0.5)*2), angle);
          }
        } else {
          // Fully G1
          drawLogo(g1imgs[p.g1], px, py, p.r, BASE_ALPHA, angle);
        }
      }

      // Battle-front glow beam
      if (rawT > 0.01 && rawT < 0.99) {
        const gw  = fuzzy * 3;
        const grd = ctx.createLinearGradient(frontX - gw, 0, frontX + gw, 0);
        grd.addColorStop(0,   "rgba(255,255,255,0)");
        grd.addColorStop(0.5, "rgba(255,255,255,0.28)");
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
