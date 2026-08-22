"use client";

import { useState } from "react";
import Link from "next/link";

// ── Brand tokens ──────────────────────────────────────────────────────────
const NAVY    = "#011224";
const GOLD    = "#c4921a";
const GOLD_LT = "#e4b84a";
const NAV_MD  = "#1a3a6c";
const GRAY    = "#94a3b8";
const GRAY_LT = "#d1dae6";

const LINK_STYLE: React.CSSProperties = { color: GOLD, textDecoration: "none" };

const PODCAST_URL = "https://open.spotify.com/show/6CR6uDvyVyS2x3BK0vNOqd";

// ── Survey data ───────────────────────────────────────────────────────────

const GOVERNANCE = {
  keyInsight: "Governance gets formal only at scale",
  subtitle: '"Does your org have a formal framework or governance process?" — by company size',
  cats: ["No framework", "Informal", "Formal or in development"],
  colors: [GRAY, GOLD_LT, NAVY],
  rows: [
    { label: "Less than 200",  n: 13, vals: [31, 38, 31] },
    { label: "200 – 1,000",    n: 31, vals: [39, 42, 19] },
    { label: "1,001 – 5,000",  n: 23, vals: [13, 65, 22] },
    { label: "5,000 +",        n: 13, vals: [23, 15, 62] },
  ],
};

const TOOL_PREF = {
  keyInsight: "Buy bias rises with company size",
  subtitle: '"When evaluating a new tool, what is your general preference?" — by company size',
  cats: ["Lean buy", "It depends", "Lean build"],
  colors: [NAVY, GRAY, GOLD],
  rows: [
    { label: "Less than 200",  n: 13, vals: [15, 54, 31] },
    { label: "200 – 1,000",    n: 31, vals: [39, 48, 13] },
    { label: "1,001 – 5,000",  n: 24, vals: [42, 58,  0] },
    { label: "5,000 +",        n: 13, vals: [54, 38,  8] },
  ],
};

const POSTPONED = {
  keyInsight: "Small teams stall deals to build with AI",
  subtitle: '"Have you postponed a software purchase in the last 6 months because you believe you can \'build it faster\' with AI?" — by company size',
  cats: ["Never", "Rarely", "Occasionally", "Frequently"],
  colors: [GRAY_LT, GRAY, GOLD_LT, GOLD],
  rows: [
    { label: "Less than 200",  n: 13, vals: [0,  15, 38, 46] },
    { label: "200 – 1,000",    n: 31, vals: [10, 26, 42, 23] },
    { label: "1,001 – 5,000",  n: 24, vals: [4,  21, 42, 33] },
    { label: "5,000 +",        n: 13, vals: [15, 31, 46,  8] },
  ],
};

const BUILD_SYS = {
  keyInsight: "CRM stays bought; ops systems get built",
  subtitle: '"How likely are you to build the following systems internally in the next few years?" — by system',
  cats: ["Never", "Long way out", "Next 1–2 years", "Already done"],
  colors: [NAVY, NAV_MD, GOLD_LT, GOLD],
  splitAt: 2,
  rows: [
    { label: "CRM",                  vals: [62, 28,  1,  9] },
    { label: "MAP",                  vals: [35, 32, 24,  8] },
    { label: "Commissions",          vals: [26, 25, 26, 23] },
    { label: "Lead Routing",         vals: [16, 29, 35, 20] },
    { label: "CSM",                  vals: [16, 27, 38, 19] },
    { label: "Support Operations",   vals: [20, 19, 38, 23] },
    { label: "Forecasting",          vals: [10, 14, 49, 27] },
    { label: "Territories & Quotas", vals: [ 6, 17, 42, 35] },
  ],
};

const BLOCKERS = {
  keyInsight: "Messy data is the #1 AI blocker",
  subtitle: '"What are the biggest barriers to AI adoption in your GTM org?" — % of respondents selecting each',
  items: [
    { label: "Fragmented / messy data",                   pct: 56.9 },
    { label: "AI competes with keeping business running", pct: 40.4 },
    { label: "Security / compliance restrictions",        pct: 36.7 },
    { label: "No clear AI owner in GTM",                  pct: 29.8 },
    { label: "Too many stakeholders to align",            pct: 21.3 },
    { label: "No clarity on AI priorities",               pct: 21.3 },
    { label: "Fear of LLM obsolescence",                  pct: 18.1 },
    { label: "GTM teams not engaged / aligned",           pct: 17.6 },
    { label: "Budget tied to headcount cuts",             pct: 11.7 },
    { label: "No impact from AI pilots",                  pct:  8.5 },
  ],
};

const OWNERSHIP = {
  keyInsight: "RevOps owns GTM — but AI is up for grabs",
  subtitle: '"Who owns each of the following in your org?" — % saying each team owns it',
  areas: ["GTM Systems", "Rep Productivity", "Data Enrichment", "Data Tooling", "AI Agents"],
  owners: ["RevOps", "Product/Eng", "IT", "Other", "Unclear"],
  data: [
    [73,  2, 22, 11,  0],
    [88,  1,  6, 17,  0],
    [78,  7, 15, 10,  2],
    [32, 37, 44, 20,  2],
    [51, 39, 52, 26, 11],
  ],
};

const ROI_DATA = {
  keyInsight: "Almost a third aren't measuring AI ROI",
  subtitle: '"How do you measure return on AI investment?" — % of respondents',
  items: [
    { label: "Productivity",                  pct: 33.5, color: GOLD,    hatch: false },
    { label: "Both Productivity & Outcomes",  pct: 21.8, color: NAV_MD,  hatch: true  },
    { label: "Outcomes",                      pct: 14.9, color: NAVY,    hatch: false },
    { label: "Not Measuring",                 pct: 29.8, color: GRAY,    hatch: false },
  ],
};

// ── Chart components ──────────────────────────────────────────────────────

function ChartCard({ subtitle, keyInsight, legend, children }: {
  subtitle: string;
  keyInsight?: string;
  legend?: { label: string; color: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-xl p-5 sm:p-6"
      style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
      {keyInsight && (
        <p className="text-xl font-extrabold mb-1 leading-tight" style={{ color: NAVY }}>
          {keyInsight}
        </p>
      )}
      <p className="text-sm font-medium mb-4 leading-snug" style={{ color: NAVY }}>
        {subtitle}
      </p>
      {legend && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
          {legend.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs" style={{ color: "#475569" }}>{label}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

function StackedBars({ cats, colors, rows }: {
  cats: string[];
  colors: string[];
  rows: { label: string; n?: number; vals: number[] }[];
}) {
  const [tip, setTip] = useState<string | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  return (
    <div className="space-y-3 relative">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold" style={{ color: NAVY }}>{row.label}</span>
            {row.n !== undefined && (
              <span className="text-xs tabular-nums" style={{ color: GRAY }}>n = {row.n}</span>
            )}
          </div>
          <div className="flex h-10 overflow-hidden rounded-sm" style={{ gap: "2px" }}>
            {row.vals.map((val, i) => (
              val > 0 && (
                <div key={i}
                  style={{ width: `${val}%`, backgroundColor: colors[i], flexShrink: 0 }}
                  className="flex items-center justify-center relative"
                  onMouseEnter={(e) => { setTip(`${cats[i]}: ${val}%`); setTipPos({ x: e.clientX, y: e.clientY }); }}
                  onMouseMove={(e) => setTipPos({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setTip(null)}>
                  {val >= 11 && (
                    <span className="text-white font-bold select-none" style={{ fontSize: 11 }}>{val}%</span>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      ))}
      {tip && (
        <div className="fixed z-50 text-white text-xs font-medium px-2.5 py-1.5 rounded shadow-lg pointer-events-none"
          style={{ backgroundColor: "#0f172a", top: tipPos.y - 36, left: tipPos.x, transform: "translateX(-50%)" }}>
          {tip}
        </div>
      )}
    </div>
  );
}

function DivergingBarsChart({ cats, colors, rows, splitAt }: {
  cats: string[];
  colors: string[];
  rows: { label: string; vals: number[] }[];
  splitAt: number;
}) {
  const [tip, setTip] = useState<string | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const leftCats   = cats.slice(0, splitAt);
  const rightCats  = cats.slice(splitAt);
  const leftColors = colors.slice(0, splitAt);
  const rightColors = colors.slice(splitAt);

  const scale = Math.max(
    ...rows.map(r => r.vals.slice(0, splitAt).reduce((a, b) => a + b, 0)),
    ...rows.map(r => r.vals.slice(splitAt).reduce((a, b) => a + b, 0))
  );

  const BAR_H   = 36;
  const LABEL_W = 152;

  return (
    <div className="relative">
      {/* Direction labels */}
      <div className="flex items-center mb-2" style={{ paddingLeft: LABEL_W }}>
        <div className="flex-1 flex justify-end pr-3">
          <span className="text-xs font-bold" style={{ color: NAVY }}>◄ PREFER TO BUY</span>
        </div>
        <div style={{ width: 2 }} />
        <div className="flex-1 flex justify-start pl-3">
          <span className="text-xs font-bold" style={{ color: GOLD }}>BUILDING IN-HOUSE ►</span>
        </div>
      </div>

      {rows.map((row) => {
        const leftVals  = row.vals.slice(0, splitAt);
        const rightVals = row.vals.slice(splitAt);
        return (
          <div key={row.label} className="flex items-center mb-2">
            {/* Row label */}
            <div className="text-sm font-semibold text-right shrink-0 pr-3 leading-tight"
              style={{ width: LABEL_W, color: NAVY }}>
              {row.label}
            </div>

            {/* Left bars – right-aligned (grow leftward from center) */}
            <div className="flex-1 flex items-center justify-end" style={{ height: BAR_H, gap: 1 }}>
              {leftVals.map((val, i) =>
                val > 0 ? (
                  <div key={i}
                    className="flex items-center justify-center shrink-0"
                    style={{ width: `${(val / scale) * 100}%`, height: BAR_H, backgroundColor: leftColors[i] }}
                    onMouseEnter={e => { setTip(`${leftCats[i]}: ${val}%`); setTipPos({ x: e.clientX, y: e.clientY }); }}
                    onMouseMove={e => setTipPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTip(null)}>
                    {val >= 8 && (
                      <span className="text-white font-bold select-none" style={{ fontSize: 11 }}>{val}</span>
                    )}
                  </div>
                ) : null
              )}
            </div>

            {/* Center divider */}
            <div className="shrink-0" style={{ width: 2, height: BAR_H + 6, backgroundColor: "#94a3b8" }} />

            {/* Right bars – left-aligned (grow rightward from center) */}
            <div className="flex-1 flex items-center justify-start" style={{ height: BAR_H, gap: 1 }}>
              {rightVals.map((val, i) =>
                val > 0 ? (
                  <div key={i}
                    className="flex items-center justify-center shrink-0"
                    style={{ width: `${(val / scale) * 100}%`, height: BAR_H, backgroundColor: rightColors[i] }}
                    onMouseEnter={e => { setTip(`${rightCats[i]}: ${val}%`); setTipPos({ x: e.clientX, y: e.clientY }); }}
                    onMouseMove={e => setTipPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTip(null)}>
                    {val >= 8 && (
                      <span className="text-white font-bold select-none" style={{ fontSize: 11 }}>{val}</span>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        );
      })}

      {tip && (
        <div className="fixed z-50 text-white text-xs font-medium px-2.5 py-1.5 rounded shadow-lg pointer-events-none"
          style={{ backgroundColor: "#0f172a", top: tipPos.y - 36, left: tipPos.x, transform: "translateX(-50%)" }}>
          {tip}
        </div>
      )}
    </div>
  );
}

function BlockersChart({ items }: { items: { label: string; pct: number }[] }) {
  const max = Math.max(...items.map(d => d.pct));

  function barColor(pct: number): string {
    const ratio = pct / max;
    // NAVY rgb(1,18,36) → light steel rgb(203,213,225)
    const r = Math.round(1   + (203 - 1)   * (1 - ratio));
    const g = Math.round(18  + (213 - 18)  * (1 - ratio));
    const b = Math.round(36  + (225 - 36)  * (1 - ratio));
    return `rgb(${r},${g},${b})`;
  }

  return (
    <div className="space-y-2.5">
      {items.map(({ label, pct }) => (
        <div key={label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold leading-snug" style={{ color: NAVY }}>{label}</span>
            <span className="text-xs font-bold tabular-nums ml-2 shrink-0" style={{ color: GRAY }}>{pct}%</span>
          </div>
          <div className="h-7 rounded-sm overflow-hidden" style={{ backgroundColor: "#e8eef4" }}>
            <div className="h-full rounded-sm"
              style={{ width: `${(pct / max) * 100}%`, backgroundColor: barColor(pct) }} />
          </div>
        </div>
      ))}
      {/* Gradient legend */}
      <div className="flex items-center gap-2 pt-2">
        <span className="text-xs" style={{ color: GRAY }}>Less common</span>
        <svg width="100" height="10" style={{ borderRadius: 2 }}>
          <defs>
            <linearGradient id="blockers-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgb(203,213,225)" />
              <stop offset="100%" stopColor={NAVY} />
            </linearGradient>
          </defs>
          <rect width="100" height="10" fill="url(#blockers-grad)" rx="2" />
        </svg>
        <span className="text-xs" style={{ color: GRAY }}>Most common</span>
      </div>
    </div>
  );
}

function OwnershipHeatMap({ areas, owners, data }: {
  areas: string[];
  owners: string[];
  data: number[][];
}) {
  const allVals = data.flat();
  const max = Math.max(...allVals);

  function cellBg(val: number): string {
    const ratio = val / max;
    // light blue-gray rgb(220,229,239) → NAVY rgb(1,18,36)
    const r = Math.round(220 + (1   - 220) * ratio);
    const g = Math.round(229 + (18  - 229) * ratio);
    const b = Math.round(239 + (36  - 239) * ratio);
    return `rgb(${r},${g},${b})`;
  }

  function cellTextColor(val: number): string {
    return (val / max) > 0.4 ? "#fff" : NAVY;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th className="text-left py-2 pr-3 font-semibold" style={{ color: GRAY, minWidth: 130 }}>Function</th>
            {owners.map((o) => (
              <th key={o} className="text-center py-2 px-2 font-semibold" style={{ color: NAVY }}>{o}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {areas.map((area, ai) => (
            <tr key={area}>
              <td className="py-2 pr-3 font-semibold" style={{ color: NAVY, borderTop: "1px solid #e2e8f0" }}>{area}</td>
              {owners.map((_, oi) => {
                const val = data[ai][oi];
                return (
                  <td key={oi}
                    className="text-center py-2 px-2 font-bold tabular-nums"
                    style={{
                      borderTop: "1px solid #e2e8f0",
                      backgroundColor: cellBg(val),
                      color: cellTextColor(val),
                    }}>
                    {val}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Gradient legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs" style={{ color: GRAY }}>0%</span>
        <svg width="140" height="12" style={{ borderRadius: 2 }}>
          <defs>
            <linearGradient id="hm-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgb(220,229,239)" />
              <stop offset="100%" stopColor={NAVY} />
            </linearGradient>
          </defs>
          <rect width="140" height="12" fill="url(#hm-grad)" rx="2" />
        </svg>
        <span className="text-xs" style={{ color: GRAY }}>{max}%</span>
        <span className="text-xs ml-1" style={{ color: GRAY }}>share of respondents</span>
      </div>
    </div>
  );
}

function PieChart({ items }: { items: { label: string; pct: number; color: string; hatch: boolean }[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = items.reduce((s, d) => s + d.pct, 0);
  const cx = 100, cy = 100, r = 90;

  let cumAngle = -90;
  const slices = items.map((item) => {
    const angle = (item.pct / total) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    return { ...item, startAngle, angle };
  });

  function polarToXY(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function describeSlice(startAngle: number, angle: number, radius: number) {
    if (angle >= 360) {
      return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} Z`;
    }
    const start = polarToXY(startAngle, radius);
    const end = polarToXY(startAngle + angle, radius);
    const largeArc = angle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox="0 0 200 200" className="shrink-0" style={{ width: 200, height: 200 }}>
        <defs>
          {/* Diagonal hatch: gold stripes on NAV_MD background */}
          <pattern id="pie-hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="8" height="8" fill={NAV_MD} />
            <line x1="0" y1="0" x2="0" y2="8" stroke={GOLD} strokeWidth="3.5" />
          </pattern>
        </defs>
        {slices.map((s) => {
          const isHovered = hovered === s.label;
          const midAngle = s.startAngle + s.angle / 2;
          const labelR = r * 0.62;
          const lp = polarToXY(midAngle, labelR);
          const fillAttr = s.hatch ? "url(#pie-hatch)" : s.color;
          return (
            <g key={s.label}
              onMouseEnter={() => setHovered(s.label)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default", transition: "opacity 0.15s" }}
              opacity={hovered && !isHovered ? 0.65 : 1}>
              <path
                d={describeSlice(s.startAngle, s.angle, r)}
                fill={fillAttr}
                stroke="#fff"
                strokeWidth={2}
              />
              {s.angle >= 20 && (
                <text
                  x={lp.x} y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={11}
                  fontWeight="bold">
                  {s.pct}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {/* Legend lives inside PieChart — do NOT also pass legend= to ChartCard */}
      <div className="space-y-3">
        {slices.map((s) => (
          <div key={s.label}
            className="flex items-center gap-2.5"
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
            style={{ opacity: hovered && hovered !== s.label ? 0.5 : 1, transition: "opacity 0.15s", cursor: "default" }}>
            {s.hatch ? (
              <svg width="16" height="16" className="shrink-0" style={{ borderRadius: 2 }}>
                <defs>
                  <pattern id="swatch-hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <rect width="8" height="8" fill={NAV_MD} />
                    <line x1="0" y1="0" x2="0" y2="8" stroke={GOLD} strokeWidth="3.5" />
                  </pattern>
                </defs>
                <rect width="16" height="16" fill="url(#swatch-hatch)" rx="2" />
              </svg>
            ) : (
              <span className="shrink-0 w-4 h-4 rounded-sm" style={{ backgroundColor: s.color }} />
            )}
            <span className="text-sm" style={{ color: "#334155" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

function PodcastLink({ href }: { href?: string }) {
  return (
    <a href={href || PODCAST_URL} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>
      Stacked GTM Podcast
    </a>
  );
}

function Quote({ text, name, nameHref, role }: {
  text: string;
  name: string;
  nameHref?: string;
  role?: React.ReactNode;
}) {
  return (
    <blockquote className="my-7 pl-5" style={{ borderLeft: `4px solid ${GOLD}` }}>
      <p className="text-base italic leading-relaxed mb-2.5" style={{ color: "#1e3a5c" }}>
        &ldquo;{text}&rdquo;
      </p>
      <footer className="text-sm" style={{ color: NAVY }}>
        <strong>
          {nameHref ? (
            <a href={nameHref} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>
              {name}
            </a>
          ) : name}
        </strong>
        {role && <span className="font-normal" style={{ color: "#64748b" }}>, {role}</span>}
      </footer>
    </blockquote>
  );
}

function Section({ n, title }: { n: number; title: string }) {
  return (
    <div className="mt-14 mb-6">
      <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: GOLD }}>
        {`0${n}`.slice(-2)}
      </p>
      <h2 className="text-2xl font-extrabold leading-tight" style={{ color: NAVY }}>{title}</h2>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed mb-4" style={{ color: "#334155" }}>
      {children}
    </p>
  );
}

function Bullets({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-2 mb-5 ml-1">
      {items.map(([label, detail]) => (
        <li key={label} className="flex gap-2.5 text-base leading-relaxed" style={{ color: "#334155" }}>
          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
          <span><strong>{label}:</strong> {detail}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function BuyBuildPage() {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="px-4 pt-10 pb-9" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>
              GTM Council Research Report
            </p>
            <a
              href="https://www.fullcast.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              style={{ textDecoration: "none" }}
            >
              <span className="text-base font-semibold" style={{ color: GRAY }}>in Partnership with</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-fullcast.webp" alt="Fullcast" style={{ height: 64, display: "block" }} />
            </a>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4" style={{ color: NAVY }}>
            Buy vs. Build — The Defining Question for Your GTM Stack
          </h1>
          <p className="text-lg mb-3" style={{ color: "#475569" }}>
            A guide for CEOs and CROs on what to build, what to buy, and how to actually win with AI in go-to-market.
          </p>
          <p className="text-sm" style={{ color: GRAY }}>
            Based on interviews and surveys with 150+ RevOps leaders in GTM Council,{" "}
            <a href="https://www.fullcast.com/" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Fullcast</a>, and{" "}
            <a href="https://www.scalevp.com/" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Scale Ventures</a>
          </p>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Intro */}
        <P>
          AI coding has upended GTM software: for the first time you can build applications without an engineering team. But building a single-player tool and maintaining a GTM infrastructure are different sports — and most companies are discovering that the hard way.
        </P>
        <P>
          We have written this to <strong>give CEO/CROs a framework to guide their GTM tech roadmap — in partnership with their RevOps teams</strong>. Large enterprises have formalized this — 62% have a framework. Everyone else is running on informal process or nothing at all.
        </P>

        <ChartCard
          keyInsight={GOVERNANCE.keyInsight}
          subtitle={GOVERNANCE.subtitle}
          legend={GOVERNANCE.cats.map((c, i) => ({ label: c, color: GOVERNANCE.colors[i] }))}>
          <StackedBars cats={GOVERNANCE.cats} colors={GOVERNANCE.colors} rows={GOVERNANCE.rows} />
        </ChartCard>

        {/* Section 1 */}
        <Section n={1} title="Why this decision matters — the stakes and the gap" />

        <P>AI GTM Transformation isn&apos;t a RevOps decision. It&apos;s landing on your desk whether you want it or not.</P>

        <Quote
          text="Every go-to-market leader is being pushed by their CEO, who is in turn being pushed by their board, to figure out how to hit ambitious revenue goals with much fewer resources."
          name="Prabhav Jain"
          nameHref="https://www.linkedin.com/in/jainprabhav/"
          role={<>CEO @ 11x on <PodcastLink href="https://gtmcouncil.substack.com/p/prabhav-jain-ceo-11x-on-stacked-gtm" /></>}
        />

        <Quote
          text="AI is more than just the ability to build a custom tool or agent or count token usage. To truly recognize the impact of AI in GTM as engineering and support have done, you need to approach it as a larger transformation initiative."
          name="Lauren Davis"
          nameHref="https://www.linkedin.com/in/laurenedavis/"
          role="VP of RevOps"
        />

        <P>Functions with simple recursive loops like coding and customer support have been quickly automated with AI:</P>

        <Bullets items={[
          ["Software", "80%+ of code is written with AI, up from 20% just over a year ago."],
          ["Support", "Companies are now resolving 60%+ of support tickets with AI, delivering better experiences faster and cheaper."],
        ]} />

        <P>There are early signs that these returns are achievable in GTM as well:</P>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[
            { who: "Kyle Norton @ Owner",        href: "https://www.linkedin.com/in/kylecnorton/",     result: "20× improvement in revenue per AE" },
            { who: "Ryan Milligan @ QuotaPath",  href: "https://www.linkedin.com/in/ryanemilligan/",   result: "1.7× rep productivity in 18 months" },
            { who: "Mark Deacon @ CanIBuild",    href: "https://www.linkedin.com/in/markpdeacon/",     result: "400% Revenue/Head increase, 2× demo-to-close" },
            { who: "Shantanu @ Personio",         href: "https://www.linkedin.com/in/shantanushekhar/", result: "30% AE productivity YoY" },
            { who: "Amy Cook @ Fullcast",         href: "https://www.linkedin.com/in/amyosmondcook/",  result: "10× marketing productivity, AEO up 30%" },
          ].map(({ who, href, result }) => (
            <div
              key={who}
              className="rounded-lg px-4 py-3"
              style={{ backgroundColor: "#f1f5f9", borderLeft: "3px solid #1d4ed8" }}
            >
              <p className="text-sm font-semibold mb-0.5">
                <a href={href} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>{who}</a>
              </p>
              <p className="text-sm" style={{ color: "#475569" }}>{result}</p>
            </div>
          ))}
        </div>

        <Quote
          text="The easiest question to ask is: you closed 25 opps last quarter — what would it actually take for you to close 50? And then the rep lists 10 things that make it so they couldn't. And then you tackle all of those one by one with bespoke agents."
          name="Ryan Milligan"
          nameHref="https://www.linkedin.com/in/ryanemilligan/"
          role={<>CRO @ QuotaPath on <PodcastLink href="https://gtmcouncil.substack.com/p/ryan-milligan-cro-quotapath-nailing" /></>}
        />

        <P>To get the returns from building with AI in GTM, you can&apos;t just vibecode a new tool, you can&apos;t bolt on AI to your current foundation. You will need to redesign your entire GTM organization:</P>

        <Bullets items={[
          ["Your data infrastructure", "AI without great data doesn't work"],
          ["Your data signals", "You need to have the data to prioritize your efforts"],
          ["The way your organization learns", "You need your AI to be constantly learning and improving"],
          ["Your GTM functions", "You can't just bolt AI on to the same processes and roles"],
        ]} />

        <div
          className="px-5 py-4 rounded-lg mb-7"
          style={{ backgroundColor: "#f8fafc", borderLeft: `4px solid ${GOLD}` }}
        >
          <p className="text-base font-semibold italic" style={{ color: NAVY }}>
            &ldquo;5–15% lift comes from optimizing tasks; 50%+ requires rethinking the role.&rdquo;
          </p>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            <a href="https://www.linkedin.com/in/jeremeydonovan/" target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Jeremy Donovan</a>, Insight Partners
          </p>
        </div>

        <Quote
          text="To really set up that culture of an AI-powered company, you do need it to be top down — right from the CEO, the CRO."
          name="Shantanu Shekhar"
          nameHref="https://www.linkedin.com/in/shantanushekhar/"
          role={<>VP of RevOps @ Personio on <PodcastLink href="https://gtmcouncil.substack.com/p/shantanu-personio-ai-gtm-bottlenecks" /></>}
        />

        {/* Section 2 */}
        <Section n={2} title={'Context — why "build" became the default'} />

        <P>
          In just two years, GTM teams have shifted from buying most tools to considering build as a viable option. The smaller you are, the more you lean build. The bigger you are, the more you lean buy — and the more likely you are to have a framework.
        </P>

        <ChartCard
          keyInsight={TOOL_PREF.keyInsight}
          subtitle={TOOL_PREF.subtitle}
          legend={TOOL_PREF.cats.map((c, i) => ({ label: c, color: TOOL_PREF.colors[i] }))}>
          <StackedBars cats={TOOL_PREF.cats} colors={TOOL_PREF.colors} rows={TOOL_PREF.rows} />
        </ChartCard>

        <P>This rapid shift has been driven by four factors: fiscal discipline from CFOs cutting tool budgets, ease of building with tools like Claude Code, security hesitancy around unproven vendors, and the low cost of tokens encouraging experimentation.</P>

        <P>This shows up in the stats. Many companies are postponing at least some software decisions to consider building internally.</P>

        <ChartCard
          keyInsight={POSTPONED.keyInsight}
          subtitle={POSTPONED.subtitle}
          legend={POSTPONED.cats.map((c, i) => ({ label: c, color: POSTPONED.colors[i] }))}>
          <StackedBars cats={POSTPONED.cats} colors={POSTPONED.colors} rows={POSTPONED.rows} />
        </ChartCard>

        <P>
          But just because you <em>can</em> build doesn&apos;t mean you <em>should</em>. There are costs of building that companies don&apos;t consider.
        </P>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/buybuildcomic.jpeg"
          alt='"I spend a lot of time on this task. I should write a program automating it!" — Theory vs Reality'
          className="w-full rounded-xl my-8"
          style={{ border: "1px solid #e2e8f0" }}
        />

        <Quote
          text="Six months later, a RevOps leader is going to say: hey, I built 17 different tools over the last six months. I'm having a hard time keeping track of all of them, and they're all breaking, and my board's pissed."
          name="Ryan Milligan"
          nameHref="https://www.linkedin.com/in/ryanemilligan/"
          role={<>CRO @ QuotaPath on <PodcastLink href="https://gtmcouncil.substack.com/p/ryan-milligan-cro-quotapath-nailing" /></>}
        />

        <Quote
          text="When we come up against someone who says 'we're thinking about building this internally,' I say: great. Here are 17 problems you'll have to solve. I literally send them a sheet of the problems. Most of the time they haven't thought about them."
          name="Prabhav Jain"
          nameHref="https://www.linkedin.com/in/jainprabhav/"
          role={<>CEO @ 11x on <PodcastLink href="https://gtmcouncil.substack.com/p/prabhav-jain-ceo-11x-on-stacked-gtm" /></>}
        />

        <Quote
          text="They build it, put it in place, announce it to the group and everyone loves it. And then two weeks later it goes down. They have no freaking clue how to fix it. One data feed broke, and all of a sudden it's unusable."
          name="Seth Marrs"
          nameHref="https://www.linkedin.com/in/sethmarrs"
          role={<>CSO @ Sandler on <PodcastLink /></>}
        />

        {/* Section 3 */}
        <Section n={3} title="The tradeoffs — build vs. buy, honestly" />

        <P>Companies have been making buy vs. build decisions for years with their software engineering teams. There are many classes of tools that engineering organizations have chosen to buy because they aren&apos;t core to their business.</P>

        {/* Comparison table */}
        <div className="my-8 overflow-x-auto rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: 420 }}>
            <thead>
              <tr>
                <th
                  className="text-left py-3 px-5 text-xs font-bold tracking-wider uppercase w-36"
                  style={{ backgroundColor: "#f1f5f9", color: "#94a3b8", borderBottom: "2px solid #e2e8f0" }}
                />
                <th
                  className="text-center py-3 px-5 font-bold"
                  style={{ backgroundColor: NAVY, color: "#fff", borderBottom: `2px solid ${NAVY}` }}
                >
                  Buy
                </th>
                <th
                  className="text-center py-3 px-5 font-bold"
                  style={{ backgroundColor: GOLD, color: "#fff", borderBottom: `2px solid ${GOLD}` }}
                >
                  Build
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Speed to market", "Fast (assuming infosec not a blocker)", "Fast to initial MVP"],
                ["Uptime", "Vendor responsibility", "Your responsibility"],
                ["Innovation", "Vendor-funded", "Funded by investment"],
                ["Customization", "Limited", "Total"],
                ["Intelligence", "Risk of vendor lock-in", "You own it"],
                ["Data security", "Vendor risk, contractual protections", "Internal risk"],
                ["Cost", "Recurring, visible", "Hidden, compounding"],
                ["Roadmap", "Vendor controlled", "You control"],
                ["Key Man Risk", "Low", "High"],
              ].map(([attr, buy, build], i) => (
                <tr key={attr} style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td className="py-3 px-5 font-semibold" style={{ color: NAVY }}>{attr}</td>
                  <td className="py-3 px-5 text-center" style={{ color: "#475569" }}>{buy}</td>
                  <td className="py-3 px-5 text-center" style={{ color: "#475569" }}>{build}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="px-5 py-4 rounded-lg mb-7"
          style={{ backgroundColor: "#fffbf0", borderLeft: `4px solid ${GOLD}` }}
        >
          <p className="text-base font-medium" style={{ color: NAVY }}>
            When you build, you haven&apos;t bought a tool — you&apos;ve created a new product team. Someone owns the pager, the evals, the migration when the model changes underneath you.
          </p>
        </div>

        <Quote
          text="A year ago we said, you know what, we're going to build a lot of the stuff we think we can get with Clay. But there was only so much capacity we had with our two go-to-market engineers. The opportunity cost of not buying something where the solution already exists is what caused us to eventually shift from build to buy."
          name="Shantanu Shekhar"
          nameHref="https://www.linkedin.com/in/shantanushekhar/"
          role={<>VP of RevOps @ Personio on <PodcastLink href="https://gtmcouncil.substack.com/p/shantanu-personio-ai-gtm-bottlenecks" /></>}
        />

        {/* Section 4 */}
        <Section n={4} title="The recommended model — buy your infrastructure, build your intelligence" />

        <P>So… how do you pick which tools to buy vs. build? Start with one question:</P>

        <div
          className="px-5 py-4 rounded-lg mb-5"
          style={{ backgroundColor: "#f0f4f8", borderLeft: `4px solid ${GOLD}` }}
        >
          <p className="font-bold text-base mb-1" style={{ color: NAVY }}>First… Do you need the uptime?</p>
          <p className="text-base" style={{ color: "#334155" }}>
            Vendors are laser-focused on staying up 24/7. Internal apps fail for a hundred reasons a vendor has already solved. If this has to be up when your business depends on it, <strong>buy</strong>.
          </p>
        </div>

        <Quote
          text="Is this business-critical? If yes, that alone should push toward buy-or-partner before you even run the edge/time/context test, given the maintenance/risk/IP burden of build."
          name="Adam Cooper"
          nameHref="https://www.linkedin.com/in/adammcooper/"
          role="VP of RevOps"
        />

        <P>If not, pressure test the buy by asking three questions:</P>

        <Bullets items={[
          ["Can you buy the edge?", "Does using the same tool everyone else does work? Or do you see an opportunity to customize for a competitive advantage?"],
          ["Can you buy it in time?", "Procurement can eat six months. Compare that honestly against the build timeline."],
          ["Can you own the intelligence?", "Does the vendor lock you in, or can you leverage the data across your stack?"],
        ]} />

        <div
          className="px-5 py-4 rounded-xl mb-8"
          style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <p className="font-bold text-base mb-1" style={{ color: NAVY }}>Three yeses → Buy.&nbsp; One no → Consider building.</p>
          <p className="text-base" style={{ color: "#334155" }}>
            The pattern this produces has a name: <strong>buy your infrastructure, build your intelligence</strong>. Buy the rails that must never go down. Build the judgment that makes you win.
          </p>
        </div>

        {/* Framework table */}
        <div className="my-8 overflow-x-auto rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
          <p className="text-xs px-5 pt-4 pb-0 leading-snug" style={{ color: "#64748b", fontStyle: "italic" }}>
            Framework applied to three example systems
          </p>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: 360 }}>
            <thead>
              <tr>
                <th className="text-left py-3 px-5 text-xs font-bold" style={{ backgroundColor: "#f1f5f9", color: "#94a3b8", borderBottom: "2px solid #e2e8f0" }}>Criterion</th>
                {["CRM", "Commissions", "Forecasting"].map((h) => (
                  <th key={h} className="text-center py-3 px-5 font-bold" style={{ backgroundColor: "#f1f5f9", color: NAVY, borderBottom: "2px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Uptime",                "Yes", "No",  "No"],
                ["Buy the Edge",          "—",   "Yes", "Yes"],
                ["Buy in Time",           "—",   "Yes", "Yes"],
                ["Own the Intelligence",  "—",   "Yes", "No"],
                ["Conclusion",            "Buy", "Buy", "Build"],
              ].map(([crit, crm, comm, fore], i) => {
                const isConclusion = crit === "Conclusion";
                return (
                  <tr
                    key={crit}
                    style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: isConclusion ? NAVY : i % 2 === 0 ? "#fff" : "#fafbfc" }}
                  >
                    <td className="py-3 px-5 font-semibold" style={{ color: isConclusion ? "#fff" : NAVY }}>{crit}</td>
                    {[crm, comm, fore].map((val, vi) => (
                      <td key={vi} className="py-3 px-5 text-center font-medium"
                        style={{ color: isConclusion ? GOLD : val === "Yes" ? NAVY : val === "No" ? GRAY : "#d1dae6" }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <P>We see this play out in the data with companies choosing to buy core infrastructure and build the intelligence on top of it.</P>

        <ChartCard
          keyInsight={BUILD_SYS.keyInsight}
          subtitle={BUILD_SYS.subtitle}
          legend={BUILD_SYS.cats.map((c, i) => ({ label: c, color: BUILD_SYS.colors[i] }))}>
          <DivergingBarsChart
            cats={BUILD_SYS.cats}
            colors={BUILD_SYS.colors}
            rows={BUILD_SYS.rows}
            splitAt={BUILD_SYS.splitAt}
          />
        </ChartCard>

        <Quote
          text="Buy your infrastructure, build your intelligence — and where the intelligence itself is core enough to matter but too costly to build alone, co-innovate: let a partner own the rails while you own the judgment."
          name="Adam Cooper"
          nameHref="https://www.linkedin.com/in/adammcooper/"
          role="VP of RevOps"
        />

        {/* Section 5 */}
        <Section n={5} title="What you need to transform your GTM with AI" />

        <Quote
          text="A lot of companies nowadays are trying to skip over that investment (time and people) to jump straight to the AI innovation and it's failing (and costly in time and money) because they've missed the foundation."
          name="Lauren Davis"
          nameHref="https://www.linkedin.com/in/laurenedavis/"
          role="VP of RevOps"
        />

        <P>Regardless of whether you decide to buy or build, there are some foundations you need in place to succeed:</P>

        <ChartCard keyInsight={BLOCKERS.keyInsight} subtitle={BLOCKERS.subtitle}>
          <BlockersChart items={BLOCKERS.items} />
        </ChartCard>

        <Quote
          text="If you give bad data to AI, it just weaponizes it."
          name="Elio Narciso"
          nameHref="https://www.linkedin.com/in/elionarciso"
          role={<>CEO @ ScaleStack on <PodcastLink /></>}
        />

        <Bullets items={[
          ["Intelligence / Context Layer", "Many people try to plug AI right into systems of record. But without the context layer, the AI will hallucinate and fail to improve."],
          ["Dedicated Capacity", "Separate RTB (Run-the-Business) work from CTB (Change-the-Business) transformation. Without this separation, the urgent always beats the important."],
          ["Budget Flexibility", "You don't need much additional spend but you need the ability to add and remove new tools quickly."],
          ["Investment", "Over-invest in your AI GTM transformation effort short-term. If you cut before you've transformed, you kill the possibility of success."],
          ["Enablement", "Rep adoption is a bottleneck. You can only drive change as fast as reps can learn."],
          ["GTM Leadership Alignment", "Your transformation team needs to quickly drive change within the business across all functions."],
          ["Executive support", "Pick one C-suite sponsor who can ensure decisions are made fast with a clear mandate."],
        ]} />

        <Quote
          text="The enablement is the thing that people just forget. We would roll out something, pat ourselves on the back — look at this tool we built — and then no one would use it. Not because they don't want to, but if you open up their Tuesday, they have 12 external calls."
          name="Ryan Milligan"
          nameHref="https://www.linkedin.com/in/ryanemilligan/"
          role={<>CRO @ QuotaPath on <PodcastLink href="https://gtmcouncil.substack.com/p/ryan-milligan-cro-quotapath-nailing" /></>}
        />

        <Quote
          text="There's always this push and pull between: do I build the system to help me in the long term, or do I do the hundreds of tasks I need to do today? It's really hard unless you feel both the freedom and the encouragement from your org."
          name="Gina Kabasakalis"
          nameHref="https://www.linkedin.com/in/ginakabasakalis/"
          role={<>GTM @ Dust on <PodcastLink /></>}
        />

        {/* Section 6 */}
        <Section n={6} title="Who should own AI GTM Transformation" />

        <P>
          In most companies, there is no single owner across systems, rep productivity, data, and agents. This means accountability for change is lacking and initiatives slip. We suggest you empower RevOps to drive this change.
        </P>

        <ChartCard keyInsight={OWNERSHIP.keyInsight} subtitle={OWNERSHIP.subtitle}>
          <OwnershipHeatMap areas={OWNERSHIP.areas} owners={OWNERSHIP.owners} data={OWNERSHIP.data} />
        </ChartCard>

        <P>AI Agents sit at a current ownership crossroads — shared (and sometimes contested) between RevOps, IT, and Product. Actionable moves to clarify accountability:</P>

        <Bullets items={[
          ["Do not split GTM engineering and RevOps", "Both are charged with using data, systems, and AI to drive productivity. Splitting them creates redundancy and confusion."],
          ["Do not split GTM systems and RevOps", "If you want to move fast on GTM systems, bring them together underneath RevOps."],
          ["Ensure RevOps is an equal customer of your data team", "For GTM AI transformation to work, RevOps needs equal call on data resources."],
          ["Support them with a central applied AI team", "This team equips RevOps with AI infrastructure and cross-functional foundations — it doesn't own GTM systems."],
        ]} />

        <Quote
          text="One of the Clay tables Canva runs monitors the social accounts of all their major customers looking for poor graphic design. The problem is one or two reps were doing that. Canva has hundreds of reps who could be. Taking that little nugget and deploying it on behalf of the entire organization — that's GTM engineering at its best."
          name="Everett Berry"
          nameHref="https://www.linkedin.com/in/everettberry/"
          role={<>GTM Engineering @ Clay on <PodcastLink href="https://gtmcouncil.substack.com/p/everett-berry-head-of-gtm-eng-clay" /></>}
        />

        <Quote
          text="What an Applied AI engineer builds isn't 50% better, it's usually 500% better."
          name="Kyle Norton"
          nameHref="https://www.linkedin.com/in/kylecnorton/"
        />

        <Quote
          text="Encourage experimentation to build a V1 prototype — then go to RevOps, let's put this into production."
          name="Ryan Milligan"
          nameHref="https://www.linkedin.com/in/ryanemilligan/"
          role={<>CRO @ QuotaPath on <PodcastLink href="https://gtmcouncil.substack.com/p/ryan-milligan-cro-quotapath-nailing" /></>}
        />

        {/* Section 7 */}
        <Section n={7} title="How to measure the impact" />

        <P>If you can&apos;t measure ROI, you shouldn&apos;t invest in it. Yet, many companies struggle to measure the impact of their AI GTM investment.</P>

        <ChartCard keyInsight={ROI_DATA.keyInsight} subtitle={ROI_DATA.subtitle}>
          <PieChart items={ROI_DATA.items} />
        </ChartCard>

        <Bullets items={[
          ["Productivity (Revenue per Head)", "Easier to measure as you already track these as core financial metrics and have benchmarks."],
          ["Outcomes (Win Rate)", "Harder to measure because many factors influence them and they won't typically move as dramatically as productivity metrics."],
        ]} />

        {/* Conclusion */}
        <div className="mt-14 pt-10" style={{ borderTop: "1px solid #e2e8f0" }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: GOLD }}>Conclusion</p>
          <P>
            In the AI era, deciding whether to buy or build is critical and there are a lot of factors. You have to thoughtfully align your teams and resource them to succeed. And most importantly support them as there will be learnings and mistakes along the way.
          </P>
          <P>Getting the right team in place and then supporting them will be critical for your success.</P>
          <p className="text-xl font-extrabold mt-6 mb-1" style={{ color: NAVY }}>
            If we can leave you with one piece of advice…
          </p>
          <p className="text-2xl font-extrabold" style={{ color: GOLD }}>
            Don&apos;t ask &lsquo;what do these people do?&rsquo; — Instead ask &lsquo;how can I help you go faster?&rsquo;
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-xl text-center" style={{ backgroundColor: NAVY }}>
          <h3 className="text-xl font-bold text-white mb-2">Want to dig deeper?</h3>
          <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
            We share insights from our community in a few areas
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://gtmcouncil.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-bold rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD, color: "#fff" }}
            >
              Subscribe to our substack
            </a>
            <a
              href="https://open.spotify.com/show/6CR6uDvyVyS2x3BK0vNOqd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-bold rounded transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            >
              Listen to our podcast
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
