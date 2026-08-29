"use client";

import { useState } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────
interface Episode {
  coverImage: string;
  spotify?: string;
  apple?: string;
  youtube?: string;
  substack?: string;
}

interface Series {
  title: string;
  subtitle: string;
  ebookUrl?: string;
  episodes: Episode[];
}

// ── Data ──────────────────────────────────────────────────────────
const SERIES: Series[] = [
  {
    title: "GTM Engineering",
    subtitle:
      "Learn how to leverage GTM engineers, set them up for success and emerging tools — from the best practitioners.",
    episodes: [
      {
        coverImage: "/podcast-ep-gtmeng-1.jpg",
        spotify: "https://open.spotify.com/episode/7Fq5HXm4HN47vWW9wvNfxx",
        apple:
          "https://podcasts.apple.com/us/podcast/agentic-sdr-prabhav-ceo-11x/id1896338897?i=1000766463777",
        youtube: "https://youtu.be/gjrF4iIUm5A",
        substack:
          "https://gtmcouncil.substack.com/p/prabhav-jain-ceo-11x-on-stacked-gtm",
      },
    ],
  },
];

// ── Platform icons (muted brand colors) ───────────────────────────
function SpotifyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#15803D" />
      <path d="M25.5 16.2C21.9 14.1 15.9 13.8 12.6 14.85C12.0 15.0 11.4 14.7 11.25 14.1C11.1 13.5 11.4 12.9 12.0 12.75C15.9 11.55 22.5 11.85 26.7 14.25C27.3 14.55 27.45 15.3 27.15 15.9C26.85 16.5 26.1 16.65 25.5 16.2ZM25.35 19.35C25.05 19.8 24.45 19.95 24.0 19.65C21.0 17.85 16.5 17.25 12.9 18.45C12.45 18.6 11.85 18.3 11.7 17.85C11.55 17.4 11.85 16.8 12.3 16.65C16.5 15.3 21.45 15.9 24.9 18.0C25.35 18.3 25.5 18.9 25.35 19.35ZM23.85 22.5C23.55 22.8 23.1 22.95 22.8 22.65C20.1 21.15 16.8 20.85 12.9 21.75C12.6 21.9 12.15 21.6 12.0 21.3C11.85 21.0 12.15 20.55 12.45 20.4C16.8 19.35 20.4 19.65 23.4 21.3C23.85 21.6 23.85 22.2 23.85 22.5Z" fill="white"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#6D28D9" />
      <path d="M18 8C18 8 14 8 14 13C14 14.5 14.5 15.8 15.2 16.8C14.4 17.5 13 19.2 13 22C13 25.5 15.5 28 18 28C20.5 28 23 25.5 23 22C23 19.2 21.6 17.5 20.8 16.8C21.5 15.8 22 14.5 22 13C22 8 18 8 18 8Z" fill="white" fillOpacity="0.2"/>
      <circle cx="18" cy="13" r="3" fill="white"/>
      <path d="M13.5 20H22.5C22.5 23.5 20.5 26 18 26C15.5 26 13.5 23.5 13.5 20Z" fill="white"/>
      <rect x="17" y="16" width="2" height="4" fill="white"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#B91C1C" />
      <path d="M27.8 13.2C27.5 12.2 26.7 11.4 25.7 11.1C23.8 10.5 18 10.5 18 10.5C18 10.5 12.2 10.5 10.3 11.1C9.3 11.4 8.5 12.2 8.2 13.2C7.6 15.1 7.6 18 7.6 18C7.6 18 7.6 20.9 8.2 22.8C8.5 23.8 9.3 24.6 10.3 24.9C12.2 25.5 18 25.5 18 25.5C18 25.5 23.8 25.5 25.7 24.9C26.7 24.6 27.5 23.8 27.8 22.8C28.4 20.9 28.4 18 28.4 18C28.4 18 28.4 15.1 27.8 13.2ZM15.6 21.4V14.6L21.6 18L15.6 21.4Z" fill="white"/>
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#C2550A" />
      <rect x="9" y="10" width="18" height="3" rx="1" fill="white"/>
      <rect x="9" y="16" width="18" height="3" rx="1" fill="white"/>
      <path d="M9 22V28L18 24L27 28V22H9Z" fill="white"/>
    </svg>
  );
}

// ── Episode Card ───────────────────────────────────────────────────
function EpisodeCard({ episode }: { episode: Episode }) {
  const links = [
    { href: episode.spotify,  icon: <SpotifyIcon />,  label: "Spotify" },
    { href: episode.apple,    icon: <AppleIcon />,    label: "Apple Podcasts" },
    { href: episode.youtube,  icon: <YouTubeIcon />,  label: "YouTube" },
    { href: episode.substack, icon: <SubstackIcon />, label: "Substack" },
  ].filter((l) => l.href);

  return (
    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#0a1e3d" }}>
      {/* Full-width image, natural 16:9 ratio */}
      <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={episode.coverImage}
          alt="Episode cover"
          width={1280}
          height={720}
          className="w-full h-full object-contain"
          style={{ backgroundColor: "#000" }}
        />
      </div>
      {/* Icons spread across full width */}
      <div className="flex items-center justify-around px-6 py-4">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="hover:opacity-75 transition-opacity"
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Series Card ────────────────────────────────────────────────────
function SeriesCard({ series }: { series: Series }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#011224", border: "1px solid #1a3a6c" }}>
      {/* Header */}
      <div className="p-6 flex gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-extrabold mb-1 text-white">{series.title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{series.subtitle}</p>
        </div>
        <div className="shrink-0">
          {series.ebookUrl ? (
            <a
              href={series.ebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-32 h-20 rounded-xl text-xs font-bold text-center text-white hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#c4921a" }}
            >
              Download eBook
            </a>
          ) : (
            <div
              className="flex items-center justify-center w-32 h-20 rounded-xl text-xs font-semibold text-center leading-snug"
              style={{ backgroundColor: "#0d2844", color: "#64748b", border: "1px dashed #1e4070" }}
            >
              eBook<br />coming soon
            </div>
          )}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors"
        style={{
          borderTop: "1px solid #1a3a6c",
          color: "#60a5fa",
          backgroundColor: open ? "#0d2844" : "transparent",
        }}
      >
        {open ? "Hide episodes" : `See episodes (${series.episodes.length})`}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Episodes */}
      {open && (
        <div className="p-6" style={{ borderTop: "1px solid #1a3a6c", backgroundColor: "#0d2844" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {series.episodes.map((ep, i) => (
              <EpisodeCard key={i} episode={ep} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function PodcastPage() {
  return (
    <div>
      {/* ── Hero: artwork + tagline side by side ──────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          <div className="shrink-0">
            <Image
              src="/podcast-stacked-gtm.jpg"
              alt="Stacked GTM — a show by GTM Council"
              width={240}
              height={240}
              className="rounded-2xl shadow-lg"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#c4921a" }}>
              We dive deep on topics
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Each series looks at the topic from the perspective of vendors AND practitioners
            </p>
          </div>
        </div>
      </section>

      {/* ── Series list ───────────────────────────────────────────── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {SERIES.map((s) => (
            <SeriesCard key={s.title} series={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
