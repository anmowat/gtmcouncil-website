"use client";

import { useEffect, useRef } from "react";

// ── SVG logos — exact paths from Simple Icons (simpleicons.org) ───────────
const G1_SVGS = [
  // Salesforce — simpleicons.org/icons/salesforce.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#00A1E0" d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8"/>
  </svg>`,
  // HubSpot — simpleicons.org/icons/hubspot.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"/>
  </svg>`,
  // LinkedIn — simpleicons.org/icons/linkedin.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>`,
  // Marketo — simpleicons.org/icons/marketo.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#5C4C9F" d="M16.146 0v24l6.134-4.886V3.334zM13.293 18.758l-4.939 2.157V2.086l4.939 1.462zM1.721 18.205l3.78-.999V5.188l-3.762-.606z"/>
  </svg>`,
];

const G2_SVGS = [
  // OpenAI — simpleicons.org/icons/openai.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#412991" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>`,
  // Anthropic — simpleicons.org/icons/anthropic.svg — viewBox 0 0 24 24
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="#181818" d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
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
