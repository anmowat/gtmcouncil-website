"use client";

import { useEffect, useRef } from "react";

// ── SVG logos ─────────────────────────────────────────────────────────────
const G1_SVGS = [
  // Salesforce cloud — 5 overlapping circles + bottom ellipse fill, all within viewBox
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 195">
    <ellipse cx="150" cy="156" rx="130" ry="40" fill="#00A1E0"/>
    <circle  cx="52"  cy="113" r="43"          fill="#00A1E0"/>
    <circle  cx="96"  cy="91"  r="55"          fill="#00A1E0"/>
    <circle  cx="150" cy="76"  r="65"          fill="#00A1E0"/>
    <circle  cx="204" cy="91"  r="55"          fill="#00A1E0"/>
    <circle  cx="248" cy="113" r="43"          fill="#00A1E0"/>
  </svg>`,
  // HubSpot sprocket — ring on right, three arms extend upper-left / left / lower-left
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="72" cy="50" r="18" fill="#FF7A59"/>
    <circle cx="72" cy="50" r="9"  fill="white"/>
    <line x1="59" y1="37" x2="38" y2="16" stroke="#FF7A59" stroke-width="8" stroke-linecap="round"/>
    <circle cx="31" cy="9"  r="9" fill="#FF7A59"/>
    <line x1="54" y1="50" x2="22" y2="50" stroke="#FF7A59" stroke-width="8" stroke-linecap="round"/>
    <circle cx="13" cy="50" r="9" fill="#FF7A59"/>
    <line x1="59" y1="63" x2="38" y2="84" stroke="#FF7A59" stroke-width="8" stroke-linecap="round"/>
    <circle cx="31" cy="91" r="9" fill="#FF7A59"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 90">
    <polygon points="4,88 20,88 23,58 7,58"   fill="#5B5BC4"/>
    <polygon points="28,88 46,88 52,26 34,26" fill="#5B5BC4"/>
    <polygon points="55,88 74,88 82,2 63,2"   fill="#5B5BC4"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50,7 C64,5 82,20 91,38 C98,53 96,72 82,84 C70,94 56,97 50,97 C44,97 30,94 18,84 C4,72 2,53 9,38 C18,20 36,5 50,7 Z" fill="#5757D9"/>
    <circle cx="50" cy="52" r="22" fill="white"/>
  </svg>`,
];

const G2_SVGS = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
    <path fill="#111" d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-6.13-3.865 10.079 10.079 0 00-11.051 4.821 9.964 9.964 0 00-6.51 4.833 10.079 10.079 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 006.129 3.865 10.078 10.078 0 0011.051-4.815 9.965 9.965 0 006.51-4.839 10.079 10.079 0 00-1.239-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103L16.353 34.1a7.504 7.504 0 01-9.961-3.094zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.51a7.504 7.504 0 01-2.747-9.89zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.048-4.648a7.498 7.498 0 0111.135 7.767zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z"/>
  </svg>`,
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

// ── Constants ─────────────────────────────────────────────────────────────
const BASE_DRAW = 91 * 1.85; // ≈ 168 px at full scale

// Phase durations (seconds)
const T_IDLE   = 1.6;  // G1 sitting alone
const T_DROP   = 1.6;  // G2 falling in
const T_SQUISH = 0.65; // impact + squish
const T_FADE   = 1.8;  // G2 fades, G1 already gone
const T_PAUSE  = 0.5;
const T_TOTAL  = T_IDLE + T_DROP + T_SQUISH + T_FADE + T_PAUSE;

// Splat particle colours (loosely "watermelon")
const SPLAT_COLORS = ["#e74c3c", "#c0392b", "#27ae60", "#f39c12", "#1e8449", "#e74c3c"];

function easeInCubic(t: number) {
  return Math.max(0, Math.min(1, t)) ** 3;
}
function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function svgUrl(s: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
}

interface Splat {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
}

export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, cancelled = false, lastTs = 0;
    let elapsed = 0, prevPhase = "pause";

    const g1imgs = G1_SVGS.map(s => { const i = new Image(); i.src = svgUrl(s); return i; });
    const g2imgs = G2_SVGS.map(s => { const i = new Image(); i.src = svgUrl(s); return i; });

    // Per-cycle state (randomised each loop)
    let g1Idx = 0, g2Idx = 0;
    let logoX = 0, logoY = 0;  // centre of G1 at rest
    let drawS = BASE_DRAW;
    let splats: Splat[] = [];

    function reset() {
      drawS  = BASE_DRAW * Math.min(1, Math.max(0.45, W / 900));
      g1Idx  = Math.floor(Math.random() * G1_SVGS.length);
      g2Idx  = Math.floor(Math.random() * G2_SVGS.length);
      logoX  = W * 0.20;
      logoY  = H * 0.50;
      splats = [];
    }

    function spawnSplats() {
      // Blobs fly sideways as if G1 was pulped
      for (let i = 0; i < 14; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        splats.push({
          x:     logoX + rand(-drawS * 0.25, drawS * 0.25),
          y:     logoY + drawS * 0.1,                         // near G1 bottom
          vx:    side * rand(80, 260) + rand(-40, 40),
          vy:    rand(-100, 40),
          r:     rand(4, 12) * (drawS / BASE_DRAW),
          color: SPLAT_COLORS[Math.floor(Math.random() * SPLAT_COLORS.length)],
          alpha: rand(0.7, 1.0),
        });
      }
    }

    function init() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width; H = rect.height; dpr = window.devicePixelRatio || 1;
      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      elapsed = 0;
      prevPhase = "pause";
      reset();
      lastTs = 0;
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf: number;

    function frame(now: number) {
      if (cancelled) return;
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const dt = lastTs ? Math.min((now - lastTs) / 1000, 0.05) : 0.016;
      lastTs = now;

      elapsed += dt;
      if (elapsed >= T_TOTAL) {
        elapsed -= T_TOTAL;
        reset();
      }

      // Phase + time within phase
      let phase: string, phaseT: number;
      if (elapsed < T_IDLE) {
        phase = "idle";   phaseT = elapsed;
      } else if (elapsed < T_IDLE + T_DROP) {
        phase = "drop";   phaseT = elapsed - T_IDLE;
      } else if (elapsed < T_IDLE + T_DROP + T_SQUISH) {
        phase = "squish"; phaseT = elapsed - T_IDLE - T_DROP;
      } else if (elapsed < T_IDLE + T_DROP + T_SQUISH + T_FADE) {
        phase = "fade";   phaseT = elapsed - T_IDLE - T_DROP - T_SQUISH;
      } else {
        phase = "pause";  phaseT = 0;
      }

      // Spawn splats on first frame of squish
      if (phase === "squish" && prevPhase !== "squish") spawnSplats();
      prevPhase = phase;

      ctx.clearRect(0, 0, W, H);

      // ── Splat particles ───────────────────────────────────────────────
      const GRAV = 700;
      for (const s of splats) {
        s.x  += s.vx * dt;
        s.y  += s.vy * dt;
        s.vy += GRAV * dt;
        s.alpha = Math.max(0, s.alpha - dt * 1.1);
        if (s.alpha < 0.01) continue;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        // Flat horizontal ellipse — looks like splattered juice
        ctx.ellipse(s.x, s.y, s.r * 1.8, s.r * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // G2 drop-start position: well above canvas
      const g2StartY = -(drawS * 2);
      // G2 lands so its bottom edge just meets G1's top edge
      const g2LandY  = logoY - drawS;         // g2 centre when touching G1 top

      // ── G1 ────────────────────────────────────────────────────────────
      // Drawn bottom-anchored: bottom edge stays fixed at logoY + drawS/2
      // while scaleY collapses and scaleX spreads (watermelon squish).
      let g1Alpha = 0, g1ScaleX = 1, g1ScaleY = 1;

      if (phase === "idle" || phase === "drop") {
        g1Alpha = 0.88;
      } else if (phase === "squish") {
        const t = phaseT / T_SQUISH;
        // Flatten fast: fully flat by ~60 % of squish phase
        g1ScaleY = Math.max(0, 1 - t / 0.6);
        // Spread wide then collapse back (peak at t ≈ 0.3)
        g1ScaleX = t < 0.3
          ? 1 + (t / 0.3) * 2.2          // 1 → 3.2
          : Math.max(0, 3.2 * (1 - (t - 0.3) / 0.7)); // 3.2 → 0
        g1Alpha = g1ScaleY > 0.01 ? 0.88 : 0;
      }
      // G1 invisible during fade/pause (already gone)

      if (g1Alpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = g1Alpha;
        // Anchor at bottom of G1 so it squishes downward
        ctx.translate(logoX, logoY + drawS / 2);
        ctx.scale(g1ScaleX, g1ScaleY);
        ctx.drawImage(g1imgs[g1Idx], -drawS / 2, -drawS, drawS, drawS);
        ctx.restore();
      }

      // ── G2 ────────────────────────────────────────────────────────────
      let g2Y = g2StartY, g2Alpha = 0, g2ScaleY = 1;

      if (phase === "idle") {
        g2Alpha = 0;
      } else if (phase === "drop") {
        const t = easeInCubic(phaseT / T_DROP);
        g2Y     = g2StartY + (g2LandY - g2StartY) * t;
        g2Alpha = 0.88;
      } else if (phase === "squish") {
        // Press downward as G1 flattens: centre moves from g2LandY → logoY
        const t    = phaseT / T_SQUISH;
        g2Y        = g2LandY + (logoY - g2LandY) * Math.min(t / 0.6, 1);
        // Slight impact squash on G2 itself (quick vertical compress then rebound)
        g2ScaleY   = 1 - Math.exp(-t * 18) * Math.sin(t * 35) * 0.18;
        g2Alpha    = 0.88;
      } else if (phase === "fade") {
        g2Y     = logoY;
        g2Alpha = Math.max(0, 0.88 * (1 - phaseT / T_FADE));
      }

      if (g2Alpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = g2Alpha;
        ctx.translate(logoX, g2Y);
        ctx.scale(1, g2ScaleY);
        ctx.drawImage(g2imgs[g2Idx], -drawS / 2, -drawS / 2, drawS, drawS);
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelled = true; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}
