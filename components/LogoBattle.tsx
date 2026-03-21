"use client";

import { useEffect, useRef } from "react";

// ── SVG logos ─────────────────────────────────────────────────────────────
const G1_SVGS = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 36">
    <circle cx="22" cy="22" r="13" fill="#00A1E0"/>
    <circle cx="11" cy="27" r="9"  fill="#00A1E0"/>
    <circle cx="35" cy="17" r="17" fill="#00A1E0"/>
    <circle cx="47" cy="24" r="11" fill="#00A1E0"/>
    <circle cx="40" cy="29" r="8"  fill="#00A1E0"/>
    <rect x="2" y="24" width="52" height="12" fill="#00A1E0"/>
  </svg>`,
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

// ── Layout ─────────────────────────────────────────────────────────────────
// Base logo draw size at full scale (W ≥ 800).  Scales down on small screens.
const BASE_DRAW = 91 * 1.85; // ≈ 168 px
const COLS      = 3;
const ROWS      = 2;
const N         = COLS * ROWS; // 6 logos per team

// ── Phase durations (seconds) ──────────────────────────────────────────────
const T_IDLE   = 1.6;  // G1 sits, G2 waiting above
const T_DROP   = 1.9;  // G2 drops in (staggered)
const T_SQUISH = 0.9;  // G2 settled, G1 scattering
const T_FADE   = 2.2;  // both fade out
const T_PAUSE  = 0.5;  // invisible gap before restart
const T_TOTAL  = T_IDLE + T_DROP + T_SQUISH + T_FADE + T_PAUSE;

function easeInOut(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function svgUrl(s: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
}

interface Sprite {
  team: "g1" | "g2";
  logoIdx: number;
  gx: number; gy: number;   // rest position
  x: number;  y: number;    // current position
  vx: number; vy: number;   // velocity (physics in squish/fade)
  alpha: number;
  rot: number; rotSpd: number;
  dropDelay: number;        // G2 per-logo stagger (s)
  dropStartY: number;       // G2 starting y, above canvas
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

    let sprites: Sprite[] = [];
    let drawS = BASE_DRAW; // actual draw size (scaled for viewport)

    function buildSprites() {
      // Scale logos down on small canvases
      drawS = BASE_DRAW * Math.min(1, Math.max(0.4, W / 900));
      const spacingX = drawS * 1.10;
      const spacingY = drawS * 1.14;
      const startX   = W * 0.05;                         // left edge of first logo
      const startY   = H / 2 - ((ROWS - 1) / 2) * spacingY;
      const dropStartY = -(drawS * 2.5);                 // above canvas

      sprites = [];
      for (let i = 0; i < N; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const gx  = startX + col * spacingX + drawS / 2;
        const gy  = startY + row * spacingY;

        sprites.push({
          team: "g1", logoIdx: i % G1_SVGS.length,
          gx, gy, x: gx, y: gy, vx: 0, vy: 0, alpha: 0.85,
          rot: rand(0, Math.PI * 2), rotSpd: rand(-0.12, 0.12),
          dropDelay: 0, dropStartY: 0,
        });
        sprites.push({
          team: "g2", logoIdx: i % G2_SVGS.length,
          gx, gy, x: gx, y: dropStartY, vx: 0, vy: 0, alpha: 0,
          rot: rand(0, Math.PI * 2), rotSpd: rand(-0.28, 0.28),
          dropDelay: i * 0.11, dropStartY,
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
      buildSprites();
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
        buildSprites(); // reset for next loop
      }

      // Determine phase + time within phase
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

      // On first frame of squish: scatter G1 logos
      if (phase === "squish" && prevPhase !== "squish") {
        for (const s of sprites) {
          if (s.team === "g1") {
            s.vx     = rand(-200, 200);
            s.vy     = rand(160, 380);
            s.rotSpd = rand(-8, 8); // spin while flying
          }
        }
      }
      prevPhase = phase;

      ctx.clearRect(0, 0, W, H);

      const GRAV = 800; // px/s²

      for (const s of sprites) {
        if (phase === "idle") {
          if (s.team === "g1") {
            // Subtle breathing hover
            s.x = s.gx + Math.sin(elapsed * 1.0 + s.gx * 0.008) * 2.5;
            s.y = s.gy + Math.cos(elapsed * 1.2 + s.gy * 0.010) * 3;
            s.alpha = 0.85;
          } else {
            s.alpha = 0; // G2 hidden above
          }
          s.rot += s.rotSpd * dt;

        } else if (phase === "drop") {
          s.rot += s.rotSpd * dt;
          if (s.team === "g1") {
            // Continue hover while waiting to be squished
            s.x = s.gx + Math.sin(elapsed * 1.0 + s.gx * 0.008) * 1.5;
            s.y = s.gy + Math.cos(elapsed * 1.2 + s.gy * 0.010) * 1.5;
            s.alpha = 0.85;
          } else {
            // Each G2 falls in at a staggered time
            const dropDur = T_DROP - s.dropDelay;
            const t = (phaseT - s.dropDelay) / dropDur;
            if (t <= 0) {
              s.alpha = 0;
            } else {
              s.alpha = 0.85;
              s.x = s.gx;
              s.y = s.dropStartY + (s.gy - s.dropStartY) * easeInOut(Math.min(t, 1));
            }
          }

        } else if (phase === "squish") {
          if (s.team === "g1") {
            // Physics: fly away under gravity
            s.vy += GRAV * dt;
            s.x  += s.vx * dt;
            s.y  += s.vy * dt;
            s.rot += s.rotSpd * dt;
            s.alpha = 0.85;
          } else {
            // G2 settled: slight impact bounce
            const bounce = Math.exp(-phaseT * 10) * Math.sin(phaseT * 24) * 12;
            s.x = s.gx;
            s.y = s.gy + bounce;
            s.rot += s.rotSpd * dt;
            s.alpha = 0.85;
          }

        } else if (phase === "fade") {
          const fadeAlpha = Math.max(0, 0.85 * (1 - phaseT / T_FADE));
          s.alpha = fadeAlpha;
          if (s.team === "g1") {
            s.vy += GRAV * dt;
            s.x  += s.vx * dt;
            s.y  += s.vy * dt;
          } else {
            s.x = s.gx;
            s.y = s.gy;
          }
          s.rot += s.rotSpd * dt;

        } else {
          s.alpha = 0;
        }

        if (s.alpha < 0.01) continue;

        const imgs = s.team === "g1" ? g1imgs : g2imgs;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.drawImage(imgs[s.logoIdx], -drawS / 2, -drawS / 2, drawS, drawS);
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
