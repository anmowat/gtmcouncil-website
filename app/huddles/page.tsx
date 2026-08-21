import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import QuoteCarousel, { Quote } from "@/components/QuoteCarousel";

export const metadata = {
  title: "Tech Huddles | GTM Council",
  description: "Each month we invite a GTM Tech CEO to meet with our members for an intimate discussion.",
};

const MEMBER_QUOTES: Quote[] = [
  {
    name: "Evan Quasney",
    title: "RevOps Leader",
    quote: "These huddles are an amazing chance to ideate with fellow members and leading vendors on the future of GTM tech and the impact of AI",
    photoUrl: "/photos/evan-quasney.jpg",
    linkedin: "https://www.linkedin.com/in/evan-quasney/",
  },
  {
    name: "Chris Fuller",
    title: "VP RevOps",
    quote: "Absolutely love the huddles as a way to both stay on top of trends in GTM systems and technology and have a place to discuss with other Rev Ops leaders implications for how we shape and run our GTM motions, teams, and processes.",
    photoUrl: "/photos/chris-fuller.png",
    linkedin: "https://www.linkedin.com/in/chris-fuller-ab435510/",
  },
  {
    name: "Andy Mowat",
    title: "VP RevOps @ 4 Unicorns",
    quote: "We've been quietly running these huddles for 9 years. The unique format to bring in CEOs who know the tech and space creates such great discussion and learning with our members.",
    photoUrl: "/photos/andy-mowat.jpg",
    linkedin: "https://www.linkedin.com/in/amowat/",
  },
];

const COMPANY_QUOTES: Quote[] = [
  {
    name: "Sriharsha (Sal) Guduguntia",
    title: "CEO @ Hyperbound",
    quote: "It was powerful to share how we are seeing AI change manager coaching and enablement with 20+ RevOps leaders and get input on our platform / vision. The insights around how the group looks at buy-vs-build in this AI area accelerated our thinking.",
    photoUrl: "/photos/sriharsha-guduguntia.jpg",
    linkedin: "https://www.linkedin.com/in/sguduguntla/",
  },
  {
    name: "Elio Narciso",
    title: "CEO @ Scalestack",
    quote: "The opportunity to share our platform and vision for the future with 15 top RevOps leaders and get feedback was amazing. We built great relationships and even closed a few deals from the discussion.",
    photoUrl: "/photos/elio-narciso.jpg",
    linkedin: "https://www.linkedin.com/in/elionarciso/",
  },
];

const FORMAT_CARDS: { icon: ReactNode; title: string; body: string | null; bullets: ReactNode[] | null }[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "C-Level",
    body: "We want to hear and help you pressure test your vision and messaging. We've found that this only works with the CEO (or in some cases CPO).",
    bullets: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Strategy not Pitching",
    body: "Focus on vision and industry trends, not sales demos. Use this as an opportunity to get real input from top RevOps leaders. Discussions can get 🌶️ given the sophistication of our members so come prepared for great questions (and debate).",
    bullets: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "60-Minute Sessions",
    body: null,
    bullets: [
      "First 10 minutes: Members only",
      <span>40 Mins: <a href="https://docs.google.com/document/d/1FzcAGvArPVYEWgwM9bm7-B22rOGhSHpevTQzTPWDFH8/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" style={{ color: "#c4921a" }}>Short intro from vendor</a> and then lively discussion/Q&amp;A</span>,
      "Last 10 minutes: Members only download (insights shared anonymously)",
    ],
  },
];

export default function HuddlesPage() {
  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-5" style={{ color: "#011224" }}>
            Tech Huddles
          </h1>
          <p className="text-lg text-gray-600">
            Each month we invite a GTM Tech CEO
          </p>
          <p className="text-lg text-gray-600 mb-3">
            to meet with our members for an intimate discussion
          </p>
          <p className="text-gray-500 text-sm">
            Some sessions (with permission of members and company){" "}
            <Link href="/insights" className="underline hover:opacity-80" style={{ color: "#011224" }}>
              we share publicly
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Value for Both Sides ────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#011224" }}>
            Value for Both Sides
          </h2>

          {/* Flat 2×2 grid — CSS grid keeps each row equal height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">

            {/* Row 1: description cards */}
            <div className="rounded-xl p-6" style={{ backgroundColor: "#011224" }}>
              <div className="flex items-center gap-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
                <h3 className="font-extrabold text-white text-lg">For Members</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Discover emerging technologies that could address your pain points. Build relationships with innovative vendors and push your thinking on the future of GTM technology.
              </p>
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: "#c4921a" }}>
              <div className="flex items-center gap-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <h3 className="font-extrabold text-white text-lg">For GTM Tech Companies</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Get input from senior RevOps leaders (typically 10-20 attend a huddle). Share your vision for the future and get critical feedback.
              </p>
            </div>

            {/* Row 2: quote carousels — grid forces equal height */}
            <QuoteCarousel quotes={MEMBER_QUOTES} bg="#011224" light={true} />
            <QuoteCarousel quotes={COMPANY_QUOTES} bg="#c4921a" light={true} />

          </div>
        </div>
      </section>

      {/* ── Past Guests ─────────────────────────────────────────────── */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-2xl font-extrabold" style={{ color: "#011224" }}>
              Past Guests
            </h2>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: "#c4921a" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="15.5" r="5.5"/>
                <path d="M21 2l-9.6 9.6"/>
                <path d="M15.5 7.5l3 3L22 7l-3-3"/>
              </svg>
              View Huddle Recordings
            </Link>
          </div>
          <div className="overflow-hidden">
            <div className="animate-marquee flex items-center gap-16 w-max">
              {[
                { src: "/logo-huddle-scalestack.jpg",  alt: "Scalestack",  h: 73 },
                { src: "/logo-huddle-adamx.png",       alt: "AdamX",       h: 48 },
                { src: "/logo-huddle-hyperbound.png",  alt: "Hyperbound",  h: 34 },
                { src: "/logo-huddle-relevanceai.jpg", alt: "Relevance AI",h: 44 },
                { src: "/logo-huddle-rox.png",         alt: "Rox",         h: 73 },
                { src: "/logo-huddle-nue.jpg",         alt: "Nue",         h: 48 },
                { src: "/logo-huddle-sweep.jpg",       alt: "Sweep",       h: 44, href: "https://www.sweep.io/" },
                { src: "/logo-huddle-airspeed.svg",    alt: "Airspeed",    h: 36, href: "https://www.goairspeed.com/" },
                { src: "/logo-huddle-von.svg",         alt: "Von",         h: 44, href: "https://vonlabs.ai/" },
                { src: "/logo-huddle-dust.svg",        alt: "Dust",        h: 48, href: "https://dust.tt/" },
                { src: "/logo-huddle-scalestack.jpg",  alt: "Scalestack",  h: 73 },
                { src: "/logo-huddle-adamx.png",       alt: "AdamX",       h: 48 },
                { src: "/logo-huddle-hyperbound.png",  alt: "Hyperbound",  h: 34 },
                { src: "/logo-huddle-relevanceai.jpg", alt: "Relevance AI",h: 44 },
                { src: "/logo-huddle-rox.png",         alt: "Rox",         h: 73 },
                { src: "/logo-huddle-nue.jpg",         alt: "Nue",         h: 48 },
                { src: "/logo-huddle-sweep.jpg",       alt: "Sweep",       h: 44, href: "https://www.sweep.io/" },
                { src: "/logo-huddle-airspeed.svg",    alt: "Airspeed",    h: 36, href: "https://www.goairspeed.com/" },
                { src: "/logo-huddle-von.svg",         alt: "Von",         h: 44, href: "https://vonlabs.ai/" },
                { src: "/logo-huddle-dust.svg",        alt: "Dust",        h: 48, href: "https://dust.tt/" },
              ].map((logo, i) => {
                const img = (
                  <Image
                    key={i}
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={logo.h}
                    className="object-contain shrink-0"
                    style={{ height: logo.h, width: "auto" }}
                  />
                );
                return logo.href ? (
                  <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">{img}</a>
                ) : img;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Format ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#011224" }}>
            Format
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FORMAT_CARDS.map((card) => (
              <div key={card.title} className="rounded-xl border border-gray-200 bg-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3" style={{ color: "#011224" }}>
                  {card.icon}
                  <h3 className="font-bold">{card.title}</h3>
                </div>
                {card.body && (
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                )}
                {card.bullets && (
                  <ul className="space-y-1.5">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#c4921a" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Upcoming Guests ─────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-4" style={{ color: "#011224" }}>
            Upcoming Guests
          </h2>
          <ul className="space-y-3">
            {[
              { date: "8/24 @ 1pm",  company: "Nooks",      href: "https://www.nooks.ai/" },
              { date: "9/11 @ 10am", company: "1Mind",      href: "https://www.1mind.com/" },
              { date: "9/28 @ 1pm",  company: "to be announced", href: null },
              { date: "10/9 @ 10am", company: "Fullcast",   href: "https://www.fullcast.com/" },
            ].map((item) => (
              <li key={item.date} className="flex items-center gap-2 text-sm">
                <span className="font-bold" style={{ color: "#011224" }}>{item.date}</span>
                <span className="text-gray-300">·</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">
                    {item.company}
                  </a>
                ) : (
                  <span className="text-gray-400 italic">{item.company}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
