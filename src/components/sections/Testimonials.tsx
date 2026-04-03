"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-32 px-8 relative overflow-hidden">
      {/* Background quote mark */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-[300px] leading-none text-white/[0.02] select-none pointer-events-none font-display"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        "
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex items-center gap-4 justify-center mb-12"
        >
          <span className="block w-8 h-px bg-[#c8a97e]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Témoignages
          </span>
          <span className="block w-8 h-px bg-[#c8a97e]" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p
              className="font-light text-[#c8c2b8] mb-10 leading-relaxed"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              }}
            >
              "{testimonials[current].quote}"
            </p>
            <div>
              <span
                className="block text-[#f0ece4] font-light mb-1"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}
              >
                {testimonials[current].author}
              </span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {testimonials[current].project}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#666055] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all duration-300"
            aria-label="Précédent"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-400 ${
                  i === current ? "w-8 h-px bg-[#c8a97e]" : "w-2 h-px bg-white/20"
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#666055] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all duration-300"
            aria-label="Suivant"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
