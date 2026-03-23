"use client";

import { useEffect, useRef } from "react";

// Fixed logos: left = Salesforce squished by Claude, right = HubSpot squished by OpenAI
const SALESFORCE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#00A1E0" d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8"/></svg>`;
const HUBSPOT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z"/></svg>`;
const OPENAI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>`;
const CLAUDE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>`;

const BASE_DRAW = 91 * 1.85 * 0.7; // ≈ 118 px

const T_IDLE   = 1.6;
const T_DROP   = 1.6;
const T_SQUISH = 0.65;
const T_FADE   = 1.8;
const T_PAUSE  = 0.5;
const T_TOTAL  = T_IDLE + T_DROP + T_SQUISH + T_FADE + T_PAUSE;

// max-w-3xl = 768px (mission text), max-w-7xl = 1280px (pillars)
const TEXT_MAX_W   = 768;
const PILLAR_MAX_W = 1280;

const SALESFORCE_PALETTE = ["#00A1E0", "#33BBF0", "#0079B8"];
const HUBSPOT_PALETTE    = ["#FF7A59", "#FF9A7A", "#E05535"];

function easeInCubic(t: number) { return Math.max(0, Math.min(1, t)) ** 3; }
function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function svgUrl(s: string) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s); }

interface Splat { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number; }

export default function LogoBattle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1, cancelled = false, lastTs = 0;
    let elapsed = 0, prevPhase = "";
    let done = false;

    const sfImg  = new Image(); sfImg.src  = svgUrl(SALESFORCE_SVG);
    const hsImg  = new Image(); hsImg.src  = svgUrl(HUBSPOT_SVG);
    const oaiImg = new Image(); oaiImg.src = svgUrl(OPENAI_SVG);
    const clImg  = new Image(); clImg.src  = svgUrl(CLAUDE_SVG);

    let leftX = 0, rightX = 0, logoY = 0, drawS = BASE_DRAW;
    const leftSplats:  Splat[] = [];
    const rightSplats: Splat[] = [];

    function computePositions() {
      drawS = BASE_DRAW * Math.min(1, Math.max(0.45, W / 900));
      // center each animation between the outer edge of the pillars grid
      // and the outer edge of the mission text block
      const textLeft   = Math.max(0, (W - TEXT_MAX_W)   / 2);
      const pillarLeft = Math.max(16, (W - PILLAR_MAX_W) / 2);
      leftX  = (pillarLeft + textLeft) / 2;
      rightX = W - leftX;
      logoY  = H * 0.50;
    }

    function spawnSplats(arr: Splat[], cx: number, palette: string[]) {
      for (let i = 0; i < 14; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        arr.push({
          x:     cx + rand(-drawS * 0.25, drawS * 0.25),
          y:     logoY + drawS * 0.1,
          vx:    side * rand(80, 260) + rand(-40, 40),
          vy:    rand(-100, 40),
          r:     rand(4, 12) * (drawS / BASE_DRAW),
          color: palette[Math.floor(Math.random() * 3)],
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
      computePositions();
      lastTs = 0;
    }

    init();
    const ro = new ResizeObserver(init);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf: number;

    function drawBattle(
      cx: number,
      g1img: HTMLImageElement, g2img: HTMLImageElement,
      splats: Splat[], dt: number,
      phase: string, phaseT: number,
    ) {
      const GRAV = 700;
      for (const s of splats) {
        s.x += s.vx * dt; s.y += s.vy * dt; s.vy += GRAV * dt;
        s.alpha = Math.max(0, s.alpha - dt * 1.1);
        if (s.alpha < 0.01) continue;
        ctx!.save();
        ctx!.globalAlpha = s.alpha;
        ctx!.fillStyle = s.color;
        ctx!.beginPath();
        ctx!.ellipse(s.x, s.y, s.r * 1.8, s.r * 0.65, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      const g2StartY = -(drawS * 2);
      const g2LandY  = logoY - drawS;

      // G1
      let g1Alpha = 0, g1ScaleX = 1, g1ScaleY = 1;
      if (phase === "idle" || phase === "drop") {
        g1Alpha = 0.88;
      } else if (phase === "squish") {
        const t = phaseT / T_SQUISH;
        g1ScaleY = Math.max(0, 1 - t / 0.6);
        g1ScaleX = t < 0.3 ? 1 + (t / 0.3) * 2.2 : Math.max(0, 3.2 * (1 - (t - 0.3) / 0.7));
        g1Alpha  = g1ScaleY > 0.01 ? 0.88 : 0;
      }
      if (g1Alpha > 0.01) {
        ctx!.save();
        ctx!.globalAlpha = g1Alpha;
        ctx!.translate(cx, logoY + drawS / 2);
        ctx!.scale(g1ScaleX, g1ScaleY);
        ctx!.drawImage(g1img, -drawS / 2, -drawS, drawS, drawS);
        ctx!.restore();
      }

      // G2
      let g2Y = g2StartY, g2Alpha = 0, g2ScaleY = 1;
      if (phase === "drop") {
        const t = easeInCubic(phaseT / T_DROP);
        g2Y    = g2StartY + (g2LandY - g2StartY) * t;
        g2Alpha = 0.88;
      } else if (phase === "squish") {
        const t = phaseT / T_SQUISH;
        g2Y     = g2LandY + (logoY - g2LandY) * Math.min(t / 0.6, 1);
        g2ScaleY = 1 - Math.exp(-t * 18) * Math.sin(t * 35) * 0.18;
        g2Alpha  = 0.88;
      } else if (phase === "fade") {
        g2Y    = logoY;
        g2Alpha = Math.max(0, 0.88 * (1 - phaseT / T_FADE));
      }
      if (g2Alpha > 0.01) {
        ctx!.save();
        ctx!.globalAlpha = g2Alpha;
        ctx!.translate(cx, g2Y);
        ctx!.scale(1, g2ScaleY);
        ctx!.drawImage(g2img, -drawS / 2, -drawS / 2, drawS, drawS);
        ctx!.restore();
      }
    }

    function frame(now: number) {
      if (cancelled) return;
      if (!ctx || W === 0) { raf = requestAnimationFrame(frame); return; }

      const dt = lastTs ? Math.min((now - lastTs) / 1000, 0.05) : 0.016;
      lastTs = now;

      elapsed += dt;

      // Play once — stop after one full cycle
      if (elapsed >= T_TOTAL) {
        ctx.clearRect(0, 0, W, H);
        done = true;
        return;
      }

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

      if (phase === "squish" && prevPhase !== "squish") {
        spawnSplats(leftSplats,  leftX,  SALESFORCE_PALETTE);
        spawnSplats(rightSplats, rightX, HUBSPOT_PALETTE);
      }
      prevPhase = phase;

      ctx.clearRect(0, 0, W, H);
      drawBattle(leftX,  sfImg,  clImg,  leftSplats,  dt, phase, phaseT);
      drawBattle(rightX, hsImg,  oaiImg, rightSplats, dt, phase, phaseT);

      if (!done) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => { cancelled = true; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none hidden sm:block"
    />
  );
}
