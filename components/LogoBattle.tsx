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
  // Outreach — blue plectrum
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

// ── Tuning ────────────────────────────────────────────────────────────────
const BASE_G1   = 72;   // initial G1s at 1200×400
const BASE_WAVE = 10;   // G2 wave count at 1200×400
const R         = 13;   // icon half-size
const G1_SPD    = 55;   // G1 charge speed (px/s)
const G2_SPD    = 76;   // G2 hunt speed (px/s) — faster so it always wins
const SPREAD_R  = 72;   // G2→G2 repulsion radius (px)
const SPREAD_F  = 270;  // repulsion strength
const INFECT_R  = 28;   // contact distance to trigger conversion
const CVT_TIME  = 1.2;  // conversion animation duration (s)
const ALPHA     = 0.70;
const MARGIN    = 36;
const EDGE_F    = 520;
const SEEK_F    = 5;    // G2 turning rate (/s)

type State = "g1" | "g2" | "cvt" | "dead";

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  state: State;
  g1: number; g2: number;
  r: number;
  rot: number; rotSpd: number;
  wander: number;
  cvt: number;
}

interface Fx { x: number; y: number; progress: number; r: number; color: string; }

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function svgUrl(s: string) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s); }

function mkG1(x: number, y: number): Pt {
  return {
    x, y, vx: rand(-15, 15), vy: rand(-15, 15),
    state: "g1",
    g1: Math.floor(Math.random() * G1_SVGS.length),
    g2: 0,
    r: rand(R - 1.5, R + 2),
    rot: rand(0, Math.PI * 2),
    rotSpd: rand(-0.35, 0.35),
    wander: rand(0, Math.PI * 2),
    cvt: 0,
  };
}

function mkG2(x: number, y: number, g2Idx: number, vx?: number, vy?: number): Pt {
  const a = rand(0, Math.PI * 2);
  return {
    x, y,
    vx: vx ?? Math.cos(a) * G2_SPD * 0.5,
    vy: vy ?? Math.sin(a) * G2_SPD * 0.5,
    state: "g2",
    g1: Math.floor(Math.random() * G1_SVGS.length),
    g2: g2Idx,
    r: rand(R - 1.5, R + 2),
    rot: rand(0, Math.PI * 2),
    rotSpd: rand(-1.2, 1.2),
    wander: rand(0, Math.PI * 2),
    cvt: 0,
  };
}

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

      const sc    = Math.sqrt(W * H / (1200 * 400));
      const nG1   = Math.max(20, Math.min(Math.round(BASE_G1   * sc), 130));
      const nWave = Math.max(4,  Math.min(Math.round(BASE_WAVE * sc), 22));

      fxs = [];
      pts = [];

      // G1: jittered grid covering the full canvas
      const cols = Math.ceil(Math.sqrt(nG1 * W / H));
      const rows = Math.ceil(nG1 / cols);
      for (let i = 0; i < nG1; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = MARGIN + (W - 2 * MARGIN) * (col + 0.5 + rand(-0.4, 0.4)) / cols;
        const y = MARGIN + (H - 2 * MARGIN) * (row + 0.5 + rand(-0.4, 0.4)) / rows;
        pts.push(mkG1(x, y));
      }

      // G2 wave: lined up just off the right edge, charging left
      for (let i = 0; i < nWave; i++) {
        const y = H * (i + 0.5) / nWave + rand(-H * 0.04, H * 0.04);
        pts.push(mkG2(W - R - 2, y, i % G2_SVGS.length,
          rand(-130, -105), rand(-18, 18)));
      }

      lastT = 0;
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf: number;

    function drawLogo(
      img: HTMLImageElement, x: number, y: number,
      r: number, a: number, angle: number, sc = 1
    ) {
      const s = r * 1.85 * sc;
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

      const spawns: Pt[] = [];
      let anyDead = false;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (p.state === "dead") continue;

        // ── G1: charge toward nearest G2 (engage!) ─────────────────────
        if (p.state === "g1") {
          let tx = 0, ty = 0, tDist = Infinity;
          for (const q of pts) {
            if (q.state !== "g2") continue;
            const dx = q.x - p.x, dy = q.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < tDist) { tDist = d; tx = dx; ty = dy; }
          }

          if (tDist < Infinity) {
            const dist = Math.hypot(tx, ty) || 1;
            p.vx += ((tx / dist) * G1_SPD - p.vx) * Math.min(1, dt * 4);
            p.vy += ((ty / dist) * G1_SPD - p.vy) * Math.min(1, dt * 4);
          } else {
            // Peaceful wander before G2 arrives
            p.wander += (Math.random() - 0.5) * 2.0 * dt;
            p.vx += (Math.cos(p.wander) * 28 - p.vx) * Math.min(1, dt * 2);
            p.vy += (Math.sin(p.wander) * 28 - p.vy) * Math.min(1, dt * 2);
          }

          // Speed cap
          const spd = Math.hypot(p.vx, p.vy);
          if (spd > G1_SPD * 1.1) { p.vx *= G1_SPD * 1.1 / spd; p.vy *= G1_SPD * 1.1 / spd; }

          p.rot += p.rotSpd * dt;

        // ── G2: seek G1 + spread from other G2s ────────────────────────
        } else if (p.state === "g2") {
          let tgtX = 0, tgtY = 0, tgtD = Infinity;
          for (const q of pts) {
            if (q.state !== "g1") continue;
            const d = Math.hypot(q.x - p.x, q.y - p.y);
            if (d < tgtD) { tgtD = d; tgtX = q.x; tgtY = q.y; }
          }

          let ax = 0, ay = 0;

          if (tgtD < Infinity) {
            // Seek force toward nearest G1 (ease off when very close)
            const dx = tgtX - p.x, dy = tgtY - p.y;
            const dist = Math.hypot(dx, dy) || 1;
            const spd = G2_SPD * (1 - Math.exp(-dist / 55));
            ax += ((dx / dist) * spd - p.vx) * SEEK_F;
            ay += ((dy / dist) * spd - p.vy) * SEEK_F;
          } else {
            // No G1 left — wander gently
            p.wander += (Math.random() - 0.5) * 1.5 * dt;
            ax += (Math.cos(p.wander) * G2_SPD * 0.3 - p.vx) * 2;
            ay += (Math.sin(p.wander) * G2_SPD * 0.3 - p.vy) * 2;
          }

          // Spread: repel from nearby G2s (stronger when no targets remain)
          const spreadMult = tgtD === Infinity ? 2.4 : 1.0;
          for (const q of pts) {
            if (q === p || q.state !== "g2") continue;
            const dx = p.x - q.x, dy = p.y - q.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < SPREAD_R) {
              const str = (1 - dist / SPREAD_R) * SPREAD_F * spreadMult;
              ax += (dx / dist) * str;
              ay += (dy / dist) * str;
            }
          }

          p.vx += ax * dt;
          p.vy += ay * dt;

          // Speed cap
          const spd = Math.hypot(p.vx, p.vy);
          if (spd > G2_SPD * 1.6) { p.vx *= G2_SPD * 1.6 / spd; p.vy *= G2_SPD * 1.6 / spd; }

          // Infect any G1 in range
          for (let j = 0; j < pts.length; j++) {
            if (pts[j].state !== "g1") continue;
            if (Math.hypot(pts[j].x - p.x, pts[j].y - p.y) < INFECT_R) {
              pts[j].state = "cvt";
              pts[j].cvt   = 0;
              pts[j].g2    = p.g2;
              pts[j].vx   *= 0.1;
              pts[j].vy   *= 0.1;
              break;
            }
          }

          p.rot += p.rotSpd * dt;

        // ── Converting: halt, spin up, crossfade → 2 new G2s ───────────
        } else if (p.state === "cvt") {
          p.cvt += dt / CVT_TIME;
          p.vx *= Math.max(0, 1 - dt * 6);
          p.vy *= Math.max(0, 1 - dt * 6);
          p.rot += (2 + p.cvt * 10) * dt;

          if (p.cvt >= 1) {
            p.state = "dead";
            anyDead = true;
            // Spawn one of each G2 type at the conversion point
            spawns.push(mkG2(p.x + rand(-6, 6), p.y + rand(-6, 6), 0));
            spawns.push(mkG2(p.x + rand(-6, 6), p.y + rand(-6, 6), 1));
            fxs.push({ x: p.x, y: p.y, progress: 0, r: p.r, color: G2_COLORS[p.g2] });
          }
        }

        // ── Edge repulsion (all live states) ───────────────────────────
        if (p.x < MARGIN)     p.vx += EDGE_F * (1 - p.x / MARGIN) * dt;
        if (p.x > W - MARGIN) p.vx -= EDGE_F * (1 - (W - p.x) / MARGIN) * dt;
        if (p.y < MARGIN)     p.vy += EDGE_F * (1 - p.y / MARGIN) * dt;
        if (p.y > H - MARGIN) p.vy -= EDGE_F * (1 - (H - p.y) / MARGIN) * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.x = Math.max(p.r, Math.min(W - p.r, p.x));
        p.y = Math.max(p.r, Math.min(H - p.r, p.y));
      }

      // Remove dead particles and add spawned ones
      if (anyDead || spawns.length > 0) {
        pts = pts.filter(p => p.state !== "dead").concat(spawns);
      }

      // ── Draw ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // Conversion flash rings
      fxs = fxs.filter(e => e.progress < 1);
      for (const e of fxs) {
        e.progress += dt / 0.5;
        ctx.save();
        ctx.globalAlpha = (1 - e.progress) * 0.55;
        ctx.strokeStyle = e.color;
        ctx.lineWidth   = 2.5;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 1.85 * (1 + e.progress * 2.5), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Icons
      for (const p of pts) {
        if (p.state === "g1") {
          drawLogo(g1imgs[p.g1], p.x, p.y, p.r, ALPHA, p.rot);
        } else if (p.state === "g2") {
          drawLogo(g2imgs[p.g2], p.x, p.y, p.r, ALPHA, p.rot);
        } else if (p.state === "cvt") {
          const sc = 1 + Math.sin(p.cvt * Math.PI) * 0.45;
          drawLogo(g1imgs[p.g1], p.x, p.y, p.r, ALPHA * (1 - p.cvt), p.rot, sc);
          drawLogo(g2imgs[p.g2], p.x, p.y, p.r, ALPHA * p.cvt,       p.rot, sc);
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
