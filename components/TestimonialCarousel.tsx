"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  photoUrl: string;
  linkedin: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 15000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [testimonials.length, hovered]);

  function prev() { setIdx((i) => (i - 1 + testimonials.length) % testimonials.length); }
  function next() { setIdx((i) => (i + 1) % testimonials.length); }

  const t = testimonials[idx];

  return (
    <div
      className="relative group max-w-5xl mx-auto px-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Quote area — all slides stacked in same grid cell so height = tallest quote */}
      <div className="text-center" style={{ display: "grid" }}>
        {testimonials.map((slide, i) => (
          <div
            key={i}
            style={{ gridArea: "1 / 1", visibility: i === idx ? "visible" : "hidden" }}
          >
            <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
              <span className="text-5xl font-serif leading-none align-bottom mr-1 select-none" style={{ color: "#c4921a" }}>&ldquo;</span>
              {slide.quote}
              <span className="text-5xl font-serif leading-none align-bottom ml-1 select-none" style={{ color: "#c4921a" }}>&rdquo;</span>
            </p>
          </div>
        ))}
      </div>

      {/* Attribution — outside the quote grid so it never jumps */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <a
          href={t.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-yellow-600 transition-all"
          style={{ width: 80, height: 80 }}
          aria-label={`${t.name} on LinkedIn`}
        >
          <Image
            src={t.photoUrl}
            alt={t.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </a>
        <div className="text-left">
          <a
            href={t.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-base hover:underline"
            style={{ color: "#011224" }}
          >
            {t.name}
          </a>
          <p className="text-sm text-gray-500 mt-0.5">{t.title}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-opacity"
            style={{ backgroundColor: "#011224", opacity: i === idx ? 1 : 0.25 }}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button onClick={prev} aria-label="Previous"
        className="absolute left-0 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200">
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} aria-label="Next"
        className="absolute right-0 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200">
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
