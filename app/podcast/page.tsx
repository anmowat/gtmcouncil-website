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
      {
        coverImage: "/podcast-ep-gtmeng-4.jpg",
        substack: "https://gtmcouncil.substack.com/p/gtm-engineer-gtm-data-at-scale",
        spotify: "https://open.spotify.com/episode/0E1ISAlGIpZbp7lZH6T15j?si=UHxUey3UQh2HatxvtQitvw",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-elio-scalestack/id1896338897?i=1000770786188",
        youtube: "https://youtu.be/j0pSwBbyywg",
      },
      {
        coverImage: "/podcast-ep-gtmeng-5.jpg",
        substack: "https://gtmcouncil.substack.com/p/ryan-milligan-cro-quotapath-nailing",
        spotify: "https://open.spotify.com/episode/5hOXwya7rWsMiMeUW2RCzr",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-ryan-cro-quotapath/id1896338897?i=1000772975761",
        youtube: "https://youtu.be/VvsthkkOabg",
      },
      {
        coverImage: "/podcast-ep-gtmeng-6.jpg",
        substack: "https://gtmcouncil.substack.com/p/james-underhill-gtm-profound-the",
        spotify: "https://open.spotify.com/episode/56XS4XFChVsXk9GN68uZkl",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-james-profound/id1896338897?i=1000774831875",
        youtube: "https://youtu.be/DC-qoED_W04",
      },
      {
        coverImage: "/podcast-ep-gtmeng-7.jpg",
        substack: "https://gtmcouncil.substack.com/p/joe-lehr-operator-primary-ventures",
        spotify: "https://open.spotify.com/episode/3agzxgkSC6tSPFMCD3WCGS",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-joe-primary-ventures/id1896338897?i=1000775787223",
        youtube: "https://youtu.be/K2jD1RSPEaQ",
      },
      {
        coverImage: "/podcast-ep-gtmeng-8.jpg",
        substack: "https://gtmcouncil.substack.com/p/gtm-ai-change-management-gina-dust",
        spotify: "https://open.spotify.com/episode/0uI67s1RFxR2wSZ0nu0i3x",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-gina-dust/id1896338897?i=1000776762515",
        youtube: "https://youtu.be/j8-UCq0wTyA",
      },
      {
        coverImage: "/podcast-ep-gtmeng-9.jpg",
        substack: "https://gtmcouncil.substack.com/p/gtm-data-for-engineers-jai-deepline",
        spotify: "https://open.spotify.com/episode/7Ml8N6O4zSBY7ypCiczCqC?si=-5D5IeJSRUa-4vM9zWVwoQ",
        apple: "https://podcasts.apple.com/us/podcast/gtm-engineer-jai-deepline/id1896338897?i=1000778903756",
        youtube: "https://youtu.be/5C6h-3FKR9s",
      },
    ],
  },
  {
    title: "Agentic Sales",
    subtitle:
      "Understand how companies are automating their SDR and AE motions with top vendors and practitioners.",
    episodes: [
      {
        coverImage: "/podcast-ep-gtmeng-1.jpg",
        substack: "https://gtmcouncil.substack.com/p/prabhav-jain-ceo-11x-on-stacked-gtm",
        spotify: "https://open.spotify.com/episode/7Fq5HXm4HN47vWW9wvNfxx",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sdr-prabhav-ceo-11x/id1896338897?i=1000766463777",
        youtube: "https://youtu.be/gjrF4iIUm5A",
      },
      {
        coverImage: "/podcast-ep-agenticsales-2.jpg",
        substack: "https://gtmcouncil.substack.com/p/matt-millen-regie-automation-vs-augmentation",
        spotify: "https://open.spotify.com/episode/6dFC6Qk1117BWwnck9mDfl?si=VoOwr9DlSjy7Mzv65PkktA",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-matt-president-regie/id1896338897?i=1000769674206",
        youtube: "https://youtu.be/YBZueUaKVWU",
      },
      {
        coverImage: "/podcast-ep-agenticsales-3.jpg",
        substack: "https://gtmcouncil.substack.com/p/mark-deacon-croo-canibuild-the-ai",
        spotify: "https://open.spotify.com/episode/3VkuKDpDTem7fHCWjlTVgE?si=bpdDEU00QMK16w0jWMOTIw",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-mark-canibuild/id1896338897?i=1000771887977",
        youtube: "https://youtu.be/1xivr_1s9jI",
      },
      {
        coverImage: "/podcast-ep-agenticsales-4.jpg",
        substack: "https://gtmcouncil.substack.com/p/seth-marrs-cso-sandler-agentic-sales",
        spotify: "https://open.spotify.com/episode/1ZAYL8SfyxgBPgUC8sMifr",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-seth-sandler/id1896338897?i=1000773889085",
        youtube: "https://youtu.be/jyEqS0gmm6E",
      },
      {
        coverImage: "/podcast-ep-agenticsales-5.jpg",
        substack: "https://gtmcouncil.substack.com/p/data-for-agentic-sales-austin-unify",
        spotify: "https://open.spotify.com/episode/79GB5zopL44iHRovvUD50u",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-austin-unify/id1896338897?i=1000777748264",
        youtube: "https://youtu.be/tKalnsaNMug",
      },
      {
        coverImage: "/podcast-ep-agenticsales-6.jpg",
        substack: "https://gtmcouncil.substack.com/p/headless-crm-phil-cooper-agentforce",
        spotify: "https://open.spotify.com/episode/2pcwl2TIagJPqk4Mlbi52B?si=irNElJN6TRCW0p8qozYX4g",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-philip-salesforce/id1896338897?i=1000779898739",
        youtube: "https://youtu.be/he2kQXNCVLE",
      },
      {
        coverImage: "/podcast-ep-agenticsales-7.jpg",
        spotify: "https://open.spotify.com/episode/6b8Z9ReNKahWGzGzUWVfdx?si=xRLa8AejRzaU0OgBmlS5Vw",
        apple: "https://podcasts.apple.com/us/podcast/agentic-sales-amanda-1mind/id1896338897?i=1000782803145",
        youtube: "https://youtu.be/2zBkpDJ-QYE",
      },
    ],
  },
  {
    title: "Marketing Agents",
    subtitle:
      "You can build sales agents. You can't build marketing agents. Marketing is behind and most use cases are just Claude Chat. We dive deep with vendors and practitioners actually leveraging AI in marketing.",
    episodes: [],
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
        {series.ebookUrl && (
          <div className="shrink-0">
            <a
              href={series.ebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-32 h-20 rounded-xl text-xs font-bold text-center text-white hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#c4921a" }}
            >
              Download eBook
            </a>
          </div>
        )}
      </div>

      {/* Toggle — gold to match brand */}
      {series.episodes.length === 0 ? (
        <div
          className="w-full flex items-center justify-center py-3 text-sm font-semibold"
          style={{ color: "#94a3b8" }}
        >
          Episodes dropping soon
        </div>
      ) : (
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
      )}

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
      <section className="pt-10 pb-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start gap-10">
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
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-extrabold mb-2" style={{ color: "#c4921a" }}>
              Series, not episodes.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              We dive deep on a topic (over 7-10 episodes)<br />
              We interview vendors and practitioners to learn how they are innovating
            </p>
            {/* ── Sponsors inline on desktop ── */}
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Sponsored by</p>
            <div className="overflow-hidden">
              <div className="animate-marquee flex items-center w-max">
                {[
                  { name: "TGTC",       logo: "/logo-tgtc.svg",       href: "http://tgtc.io/GTMCouncil",  h: 44 },
                  { name: "Fullcast",   logo: "/logo-fullcast.webp",  href: "https://www.fullcast.com/",  h: 64 },
                  { name: "Nooks",      logo: "/logo-nooks.webp",     href: "https://www.nooks.ai/",      h: 30 },
                  { name: "Inflection", logo: "/logo-inflection.svg", href: "https://www.inflection.io/", h: 28 },
                  { name: "TGTC",       logo: "/logo-tgtc.svg",       href: "http://tgtc.io/GTMCouncil",  h: 44 },
                  { name: "Fullcast",   logo: "/logo-fullcast.webp",  href: "https://www.fullcast.com/",  h: 64 },
                  { name: "Nooks",      logo: "/logo-nooks.webp",     href: "https://www.nooks.ai/",      h: 30 },
                  { name: "Inflection", logo: "/logo-inflection.svg", href: "https://www.inflection.io/", h: 28 },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity shrink-0 pr-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.logo} alt={s.name} style={{ height: s.h, width: "auto", display: "block" }} />
                  </a>
                ))}
              </div>
            </div>
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
