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
      },
    ],
  },
];

// ── Icons ─────────────────────────────────────────────────────────
function SpotifyIcon() {
  return (
    <Image src="/logo-spotify.png" alt="Spotify" width={28} height={28} className="rounded-full" />
  );
}

function AppleIcon() {
  return (
    <Image src="/logo-apple-podcasts.png" alt="Apple Podcasts" width={28} height={28} className="rounded-lg" />
  );
}

function YouTubeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#FF0000" />
      <path d="M21.6 10.4C21.4 9.6 20.8 9 20 8.8C18.6 8.4 14 8.4 14 8.4C14 8.4 9.4 8.4 8 8.8C7.2 9 6.6 9.6 6.4 10.4C6 11.8 6 14 6 14C6 14 6 16.2 6.4 17.6C6.6 18.4 7.2 19 8 19.2C9.4 19.6 14 19.6 14 19.6C14 19.6 18.6 19.6 20 19.2C20.8 19 21.4 18.4 21.6 17.6C22 16.2 22 14 22 14C22 14 22 11.8 21.6 10.4Z" fill="white" />
      <path d="M12 16.8V11.2L17 14L12 16.8Z" fill="#FF0000" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#FF6719" />
      <path d="M7 8.5H21V10.5H7V8.5Z" fill="white" />
      <path d="M7 12.5H21V14.5H7V12.5Z" fill="white" />
      <path d="M7 16.5V21L14 18L21 21V16.5H7Z" fill="white" />
    </svg>
  );
}

// ── Episode Card ───────────────────────────────────────────────────
function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl overflow-hidden aspect-square w-full max-w-[220px]">
        <Image
          src={episode.coverImage}
          alt="Episode cover"
          width={220}
          height={220}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        {episode.spotify && (
          <a href={episode.spotify} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
            <SpotifyIcon />
          </a>
        )}
        {episode.apple && (
          <a href={episode.apple} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
            <AppleIcon />
          </a>
        )}
        {episode.youtube && (
          <a href={episode.youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
            <YouTubeIcon />
          </a>
        )}
        {episode.substack && (
          <a href={episode.substack} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
            <SubstackIcon />
          </a>
        )}
      </div>
    </div>
  );
}

// ── Series Card ────────────────────────────────────────────────────
function SeriesCard({ series }: { series: Series }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden">
      {/* Header row */}
      <div className="p-6 flex gap-4">
        {/* Left: title + subtitle */}
        <div className="flex-1">
          <h2 className="text-xl font-extrabold mb-1" style={{ color: "#011224" }}>
            {series.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{series.subtitle}</p>
        </div>

        {/* Right: eBook box */}
        <div className="shrink-0">
          {series.ebookUrl ? (
            <a
              href={series.ebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-32 h-20 rounded-xl text-xs font-bold text-center text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#c4921a" }}
            >
              Download eBook
            </a>
          ) : (
            <div
              className="flex items-center justify-center w-32 h-20 rounded-xl text-xs font-semibold text-center"
              style={{ backgroundColor: "#f1f5f9", color: "#94a3b8", border: "1px dashed #cbd5e1" }}
            >
              eBook<br />coming soon
            </div>
          )}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold border-t border-gray-100 hover:bg-gray-50 transition-colors"
        style={{ color: "#1d4ed8" }}
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
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap gap-6">
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
      {/* ── Hero graphic ──────────────────────────────────────────── */}
      <section className="py-16 px-4 flex justify-center">
        <Image
          src="/podcast-stacked-gtm.jpg"
          alt="Stacked GTM — a show by GTM Council"
          width={320}
          height={320}
          className="rounded-2xl shadow-lg"
          priority
        />
      </section>

      {/* ── Tagline ───────────────────────────────────────────────── */}
      <section className="pb-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#c4921a" }}>
            We dive deep on topics
          </h2>
          <p className="text-gray-600 text-lg">
            Each series looks at the topic from the perspective of vendors AND practitioners
          </p>
        </div>
      </section>

      {/* ── Series list ───────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {SERIES.map((s) => (
            <SeriesCard key={s.title} series={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
