"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface Quote {
  name: string;
  title: string;
  quote: string;
  photoUrl?: string;
  linkedin?: string;
}

interface Props {
  quotes: Quote[];
  bg: string;
  light?: boolean;
}

const LinkedInIcon = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function QuoteCarousel({ quotes, bg, light = true }: Props) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (quotes.length <= 1 || hovered) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 10000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [quotes.length, hovered]);

  function prev() { setIdx((i) => (i - 1 + quotes.length) % quotes.length); }
  function next() { setIdx((i) => (i + 1) % quotes.length); }

  const textCls = light ? "text-white" : "text-gray-900";
  const mutedCls = light ? "text-white/75" : "text-gray-600";

  return (
    <div
      className="relative rounded-xl overflow-hidden group"
      style={{ backgroundColor: bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* All slides stacked in one grid cell — height = tallest slide, no jumping */}
      <div style={{ display: "grid" }}>
        {quotes.map((slide, i) => (
          <div
            key={i}
            className="p-5 flex flex-col gap-3"
            style={{ gridArea: "1 / 1", visibility: i === idx ? "visible" : "hidden" }}
          >
            {/* ── Name + Title + LinkedIn at top ── */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`font-bold text-sm leading-tight ${textCls}`}>{slide.name}</p>
                <p className={`text-xs mt-0.5 ${mutedCls}`}>{slide.title}</p>
              </div>
              {slide.linkedin && (
                <a
                  href={slide.linkedin.startsWith("http") ? slide.linkedin : `https://${slide.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: "#0a66c2" }}
                  aria-label={`${slide.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>

            {/* ── Square photo + Quote ── */}
            <div className="flex gap-4 items-start">
              {/* Square photo */}
              <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden bg-black/10">
                {slide.photoUrl ? (
                  <Image
                    src={slide.photoUrl}
                    alt={slide.name}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-2xl font-bold ${light ? "text-white/40" : "text-black/20"}`}>
                    {slide.name[0]}
                  </div>
                )}
              </div>

              {/* Quote */}
              <p className={`text-sm italic leading-relaxed flex-1 ${textCls}`}>
                &ldquo;{slide.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {quotes.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            aria-label="Previous"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            aria-label="Next"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-2 right-3 flex gap-1">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-opacity"
                style={{ backgroundColor: light ? "#fff" : "#011224", opacity: i === idx ? 1 : 0.4 }}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
