"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      ref={ref}
      className="py-36 px-8 relative overflow-hidden bg-[#f7f5f0]"
    >
      {/* Decorative large letter */}
      <div
        className="absolute -top-12 left-8 md:left-16 select-none pointer-events-none font-display leading-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(200px, 30vw, 380px)",
          color: "#2c4a3e",
          opacity: 0.028,
          lineHeight: 1,
        }}
      >
        "
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 mb-20"
        >
          <span className="block w-8 h-px bg-[#2c4a3e]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Témoignages
          </span>
        </motion.div>

        {/* Quote area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          {/* Left: counter + navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-8"
          >
            <div
              className="font-light text-[#1a1a1a]/10 leading-none select-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(4rem, 8vw, 8rem)",
              }}
            >
              {String(current + 1).padStart(2, "0")}
            </div>
            <div className="flex lg:flex-col items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Témoignage ${i + 1}`}
                  className="flex items-center justify-center w-8 h-8"
                >
                  <span
                    className={`block transition-all duration-500 rounded-full ${
                      i === current
                        ? "w-2 h-2 bg-[#2c4a3e]"
                        : "w-1.5 h-1.5 bg-[#2c4a3e]/20 hover:bg-[#2c4a3e]/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: quote content */}
          <div className="lg:col-span-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className="font-light text-[#1a1a1a] leading-[1.2] mb-12"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
                  }}
                >
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <footer className="flex items-center gap-6">
                  <span className="block w-10 h-px bg-[#2c4a3e]/30" />
                  <div>
                    <span
                      className="block font-light text-[#1a1a1a] leading-tight"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "1.3rem",
                      }}
                    >
                      {testimonials[current].author}
                    </span>
                    <span
                      className="block text-[10px] tracking-[0.3em] uppercase text-[#2c4a3e]/70 mt-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {testimonials[current].project}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-3 mt-20 justify-end"
        >
          <button
            onClick={prev}
            className="group w-12 h-12 border border-[#2c4a3e]/15 flex items-center justify-center text-[#7a7a72] hover:border-[#2c4a3e] hover:text-[#2c4a3e] transition-all duration-300"
            aria-label="Témoignage précédent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-300">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="group w-12 h-12 border border-[#2c4a3e]/15 flex items-center justify-center text-[#7a7a72] hover:border-[#2c4a3e] hover:text-[#2c4a3e] transition-all duration-300"
            aria-label="Témoignage suivant"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-300">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
