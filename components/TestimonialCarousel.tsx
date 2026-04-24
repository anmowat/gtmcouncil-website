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
      className="relative group max-w-3xl mx-auto px-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slide container — fixed height so page doesn't jump */}
      <div style={{ display: "grid" }}>
        {testimonials.map((slide, i) => (
          <div
            key={i}
            style={{ gridArea: "1 / 1", visibility: i === idx ? "visible" : "hidden" }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Quote mark open */}
            <span className="text-6xl leading-none font-serif select-none mb-2" style={{ color: "#c4921a" }}>&ldquo;</span>

            <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed max-w-2xl">
              {slide.quote}
            </p>

            {/* Quote mark close */}
            <span className="text-6xl leading-none font-serif select-none mt-2" style={{ color: "#c4921a" }}>&rdquo;</span>

            {/* Photo */}
            <a
              href={slide.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-full overflow-hidden ring-2 ring-offset-2 hover:ring-4 transition-all"
              style={{ width: 72, height: 72 }}
              aria-label={`${slide.name} on LinkedIn`}
            >
              <Image
                src={slide.photoUrl}
                alt={slide.name}
                width={72}
                height={72}
                className="object-cover w-full h-full"
              />
            </a>

            <p className="mt-3 font-bold text-sm" style={{ color: "#011224" }}>{slide.name}</p>
            <p className="text-sm text-gray-500">{slide.title}</p>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
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
    </div>
  );
}
