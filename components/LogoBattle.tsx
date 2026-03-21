"use client";

import { useEffect, useRef } from "react";

// ── SVG logos ─────────────────────────────────────────────────────────────
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
  // HubSpot — salmon sprocket
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
  // Marketo — purple ascending bars
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 90">
    <polygon points="4,88 20,88 23,58 7,58"   fill="#5B5BC4"/>
    <polygon points="28,88 46,88 52,26 34,26" fill="#5B5BC4"/>
    <polygon points="55,88 74,88 82,2 63,2"   fill="#5B5BC4"/>
  </svg>`,
  // Outreach — blue plectrum with hole
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50,7 C64,5 82,20 91,38 C98,53 96,72 82,84 C70,94 56,97 50,97 C44,97 30,94 18,84 C4,72 2,53 9,38 C18,20 36,5 50,7 Z" fill="#5757D9"/>
    <circle cx="50" cy="52" r="22" fill="white"/>
  </svg>`,
];

const G2_SVGS = [
  // OpenAI — black bloom
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
    <path fill="#111" d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835 9.964 9.964 0 00-6.13-3.865 10.079 10.079 0 00-11.051 4.821 9.964 9.964 0 00-6.51 4.833 10.079 10.079 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 006.129 3.865 10.078 10.078 0 0011.051-4.815 9.965 9.965 0 006.51-4.839 10.079 10.079 0 00-1.239-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103L16.353 34.1a7.504 7.504 0 01-9.961-3.094zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.012L7.044 23.51a7.504 7.504 0 01-2.747-9.89zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.114-.012l8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.048-4.648a7.498 7.498 0 0111.135 7.767zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z"/>
  </svg>`,
  // Claude — salmon 12-ray starburst
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

const G2_COLORS = ["#111111", "#D4785A"];

// ── tuning ────────────────────────────────────────────────────────────────
const BASE_N    = 68;   // particles at 1200×400
const INIT_G2   = 2;    // initial attacker count
const R         = 13;   // icon half-size
const G1_WANDER = 38;   // px/s casual drift
const G1_FLEE   = 72;   // px/s when running
const G2_HUNT   = 92;   // px/s — always faster than G1
const FLEE_R    = 120;  // px — G1 starts fleeing when G2 is this close
const INFECT_R  = 30;   // px — trigger conversion on contact
const CVT_TIME  = 1.3;  // seconds to complete conversion
const WAND_JRK  = 2.2;  // wander heading jitter (rad/s)
const ALPHA     = 0.72;
const MARGIN    = 38;
const EDGE_F    = 550;

type State = "g1" | "g2" | "cvt";

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  state: State;
  g1: number; g2: number;
  r: number;
  rot: number; rotSpd: number;
  wander: number;   // heading angle for wander/flee
  cvt: number;      // conversion progress 0..1
  tid: number;      // target particle index (-1 = none, G2 only)
}

interface Fx { x: number; y: number; progress: number; r: number; color: string; }

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function svgUrl(s: string) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s); }

export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, cancelled = false, lastT = 0;
    let pts: Pt[] = [], fxs: Fx[] = [];

    const g1imgs = G1_SVGS.map(s => { const i = new Image(); i.src = svgUrl(s); return i; });
    const g2imgs = G2_SVGS.map(s => { const i = new Image(); i.src = svgUrl(s); return i; });

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

      const n = Math.max(30, Math.min(Math.round(BASE_N * Math.sqrt(W * H / (1200 * 400))), 160));
      fxs = [];
      pts = Array.from({ length: n }, (_, i) => {
        const isG2 = i < INIT_G2;
        return {
          x: rand(MARGIN, W - MARGIN),
          y: rand(MARGIN, H - MARGIN),
          vx: rand(-25, 25), vy: rand(-25, 25),
          state: isG2 ? "g2" : "g1",
          g1: Math.floor(Math.random() * G1_SVGS.length),
          g2: i % G2_SVGS.length,
          r: rand(R - 1.5, R + 2),
          rot: rand(0, Math.PI * 2),
          rotSpd: isG2 ? rand(-1.3, 1.3) : rand(-0.35, 0.35),
          wander: rand(0, Math.PI * 2),
          cvt: 0,
          tid: -1,
        };
      });
      lastT = 0;
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf: number;

    function drawLogo(
      img: HTMLImageElement, x: number, y: number,
      r: number, a: number, angle: number, scale = 1
    ) {
      const s = r * 1.85 * scale;
      ctx!.save();
      ctx!.globalAlpha = a;
      ctx!.translate(x, y);
      ctx!.rotate(angle);
      ctx!.drawImage(img, -s / 2, -s / 2, s, s);
      ctx!.restore();
    }

    function frame(now: number) {
      if (cancelled) return;
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0.016;
      lastT = now;

      // ── build claimed-target set for this frame ────────────────────────
      const claimed = new Set<number>();
      for (const p of pts) {
        if (p.state === "g2" && p.tid >= 0 && pts[p.tid]?.state === "g1")
          claimed.add(p.tid);
      }

      // ── update particles ───────────────────────────────────────────────
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // ── G1: wander, flee when G2 nearby ───────────────────────────
        if (p.state === "g1") {
          let gx = 0, gy = 0, gd = Infinity;
          for (const q of pts) {
            if (q.state !== "g2") continue;
            const dx = p.x - q.x, dy = p.y - q.y;
            const d = Math.hypot(dx, dy);
            if (d < gd) { gd = d; gx = dx; gy = dy; }
          }

          if (gd < FLEE_R) {
            // Flee directly away from nearest G2
            const dist = Math.hypot(gx, gy) || 1;
            const str  = 1 - gd / FLEE_R;
            const tx   = (gx / dist) * G1_FLEE;
            const ty   = (gy / dist) * G1_FLEE;
            p.vx += (tx - p.vx) * Math.min(1, dt * 6 * str);
            p.vy += (ty - p.vy) * Math.min(1, dt * 6 * str);
          } else {
            // Gentle wander
            p.wander += (Math.random() - 0.5) * WAND_JRK * dt;
            const tx = Math.cos(p.wander) * G1_WANDER;
            const ty = Math.sin(p.wander) * G1_WANDER;
            p.vx += (tx - p.vx) * Math.min(1, dt * 2.5);
            p.vy += (ty - p.vy) * Math.min(1, dt * 2.5);
          }
          p.rot += p.rotSpd * dt;

        // ── G2: seek exclusive target, infect on contact ───────────────
        } else if (p.state === "g2") {
          // Invalidate stale target
          if (p.tid >= 0 && pts[p.tid]?.state !== "g1") p.tid = -1;

          // Acquire new target (prefer unclaimed G1s)
          if (p.tid === -1) {
            let best = -1, bestD = Infinity;
            // First pass: unclaimed only
            for (let j = 0; j < pts.length; j++) {
              if (pts[j].state !== "g1" || claimed.has(j)) continue;
              const d = Math.hypot(pts[j].x - p.x, pts[j].y - p.y);
              if (d < bestD) { bestD = d; best = j; }
            }
            // Fallback: any G1
            if (best === -1) {
              for (let j = 0; j < pts.length; j++) {
                if (pts[j].state !== "g1") continue;
                const d = Math.hypot(pts[j].x - p.x, pts[j].y - p.y);
                if (d < bestD) { bestD = d; best = j; }
              }
            }
            p.tid = best;
            if (best >= 0) claimed.add(best);
          }

          if (p.tid >= 0) {
            const tgt  = pts[p.tid];
            const dx   = tgt.x - p.x, dy = tgt.y - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            // Ease off speed when very close
            const spd  = G2_HUNT * (1 - Math.exp(-dist / 55));
            p.vx += ((dx / dist) * spd - p.vx) * Math.min(1, dt * 6);
            p.vy += ((dy / dist) * spd - p.vy) * Math.min(1, dt * 6);

            // Infect
            if (dist < INFECT_R && tgt.state === "g1") {
              tgt.state = "cvt";
              tgt.cvt   = 0;
              tgt.g2    = p.g2;
              tgt.vx   *= 0.15;
              tgt.vy   *= 0.15;
              p.tid     = -1; // immediately go hunt next
            }
          } else {
            // No G1 targets left — drift
            p.wander += (Math.random() - 0.5) * WAND_JRK * dt;
            const tx = Math.cos(p.wander) * G2_HUNT * 0.4;
            const ty = Math.sin(p.wander) * G2_HUNT * 0.4;
            p.vx += (tx - p.vx) * Math.min(1, dt * 2);
            p.vy += (ty - p.vy) * Math.min(1, dt * 2);
          }
          p.rot += p.rotSpd * dt;

        // ── Converting: stop, spin up, crossfade ──────────────────────
        } else {
          p.cvt += dt / CVT_TIME;
          // Brake to a halt
          p.vx *= Math.max(0, 1 - dt * 6);
          p.vy *= Math.max(0, 1 - dt * 6);
          // Spin accelerates as conversion progresses
          p.rot += (2 + p.cvt * 10) * dt;

          if (p.cvt >= 1) {
            p.state  = "g2";
            p.cvt    = 1;
            p.rotSpd = rand(-1.3, 1.3);
            p.wander = rand(0, Math.PI * 2);
            p.tid    = -1;
            // Launch toward a new victim
            p.vx = Math.cos(p.wander) * G2_HUNT * 0.55;
            p.vy = Math.sin(p.wander) * G2_HUNT * 0.55;
            fxs.push({ x: p.x, y: p.y, progress: 0, r: p.r, color: G2_COLORS[p.g2] });
          }
        }

        // Edge repulsion (smooth, not hard bounce)
        if (p.x < MARGIN)     p.vx += EDGE_F * (1 - p.x / MARGIN) * dt;
        if (p.x > W - MARGIN) p.vx -= EDGE_F * (1 - (W - p.x) / MARGIN) * dt;
        if (p.y < MARGIN)     p.vy += EDGE_F * (1 - p.y / MARGIN) * dt;
        if (p.y > H - MARGIN) p.vy -= EDGE_F * (1 - (H - p.y) / MARGIN) * dt;

        // Speed cap
        const spd  = Math.hypot(p.vx, p.vy);
        const maxS = p.state === "cvt" ? 10 : p.state === "g1" ? G1_FLEE : G2_HUNT;
        if (spd > maxS) { p.vx *= maxS / spd; p.vy *= maxS / spd; }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        // Hard clamp as safety net
        p.x = Math.max(p.r, Math.min(W - p.r, p.x));
        p.y = Math.max(p.r, Math.min(H - p.r, p.y));
      }

      // ── draw ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // Conversion flash rings
      fxs = fxs.filter(e => e.progress < 1);
      for (const e of fxs) {
        e.progress += dt / 0.55;
        ctx.save();
        ctx.globalAlpha = (1 - e.progress) * 0.55;
        ctx.strokeStyle = e.color;
        ctx.lineWidth   = 2.5;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 1.85 * (1 + e.progress * 2.2), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Icons
      for (const p of pts) {
        if (p.state === "g1") {
          drawLogo(g1imgs[p.g1], p.x, p.y, p.r, ALPHA, p.rot);
        } else if (p.state === "g2") {
          drawLogo(g2imgs[p.g2], p.x, p.y, p.r, ALPHA, p.rot);
        } else {
          // Crossfade: G1 fades out, G2 fades in, both scale up then back
          const scale = 1 + Math.sin(p.cvt * Math.PI) * 0.45;
          drawLogo(g1imgs[p.g1], p.x, p.y, p.r, ALPHA * (1 - p.cvt), p.rot, scale);
          drawLogo(g2imgs[p.g2], p.x, p.y, p.r, ALPHA * p.cvt,       p.rot, scale);
        }
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
