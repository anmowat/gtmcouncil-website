"use client";

import { useState } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────
interface Episode {
  coverImage: string;
  substack?: string;
  spotify?: string;
  apple?: string;
  youtube?: string;
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
        substack: "https://gtmcouncil.substack.com/p/prabhav-jain-ceo-11x-on-stacked-gtm",
        spotify: "https://open.spotify.com/episode/7Fq5HXm4HN47vWW9wvNfxx",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sdr-prabhav-ceo-11x/id1896338897?i=1000766463777",
        youtube: "https://youtu.be/gjrF4iIUm5A",
      },
      {
        coverImage: "/podcast-ep-gtmeng-2.jpg",
        substack: "https://gtmcouncil.substack.com/p/everett-berry-head-of-gtm-eng-clay",
        spotify: "https://open.spotify.com/episode/7LcESEQFy8dUakWjTEzijf?si=C-DBH6kcTbiuIRLFMzdIsg",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-everett-clay/id1896338897?i=1000767433244",
        youtube: "https://youtu.be/HBwLFuIR0NM",
      },
      {
        coverImage: "/podcast-ep-gtmeng-3.jpg",
        substack: "https://gtmcouncil.substack.com/p/shantanu-personio-ai-gtm-bottlenecks",
        spotify: "https://open.spotify.com/episode/0biiXt54AYRywap67sJYfh",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-shantanu-personio/id1896338897?i=1000768588439",
        youtube: "https://youtu.be/AQ_TD8e833w",
      },
    ],
  },
];

// ── Episode Card ───────────────────────────────────────────────────
function EpisodeCard({ episode }: { episode: Episode }) {
  const links = [
    { href: episode.substack, src: "/logo-substack.png",       label: "Substack" },
    { href: episode.spotify,  src: "/logo-spotify.png",        label: "Spotify" },
    { href: episode.apple,    src: "/logo-apple-podcasts.png", label: "Apple Podcasts" },
    { href: episode.youtube,  src: "/logo-youtube.svg",        label: "YouTube" },
  ].filter((l) => l.href);

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
      {/* Square cover art */}
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={episode.coverImage}
          alt="Episode cover"
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Platform links — spread evenly, substack first */}
      <div className="flex items-center justify-around px-3 py-3 bg-gray-50 border-t border-gray-100">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="hover:opacity-75 transition-opacity"
          >
            <Image src={l.src} alt={l.label} width={32} height={32} className="rounded-lg" />
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
    <div className="rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: "#011224" }}>
      {/* Header */}
      <div className="p-6 flex gap-6 items-start">
        <div className="flex-1">
          <h2 className="text-xl font-extrabold mb-1 text-white">{series.title}</h2>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#94a3b8" }}>{series.subtitle}</p>
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
              className="flex items-center justify-center w-20 h-20 rounded-xl text-xs font-semibold text-center leading-snug"
              style={{ backgroundColor: "#0d2844", color: "#64748b" }}
            >
              eBook<br />coming soon
            </div>
          )}
        </div>
      </div>

      {/* Toggle — gold to match brand */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors"
        style={{ color: "#c4921a" }}
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

      {/* Episodes — white background with subtle inset shadow */}
      {open && (
        <div className="p-6" style={{ borderTop: "1px solid #e2e8f0", backgroundColor: "#ffffff", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              width={275}
              height={275}
              className="rounded-2xl shadow-lg"
              priority
            />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold mb-2" style={{ color: "#c4921a" }}>
              Series, not episodes.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              We spend 7-10 episodes per topic — interviewing vendors and practitioners, real depth, not hot takes.
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
