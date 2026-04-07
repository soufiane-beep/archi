"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { heroSlides as slides } from "@/lib/data";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLoaded(true);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#1e3530]">
      {/* Background slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1.5s ease" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Overlay forest green — plus doux que le noir */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3530]/75 via-[#1e3530]/20 to-[#1e3530]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3530]/45 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-[1400px] mx-auto">
        {/* Main title */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-12 h-px bg-[#8aaf9f]" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cabinet d'Architecture · Bruxelles
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              key={`title-${current}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none tracking-tight mb-2"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                color: "#f7f5f0",
              }}
            >
              {slides[current].title}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              key={`subtitle-${current}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-light leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                background: "linear-gradient(135deg, #8aaf9f 0%, #c2d9cf 50%, #8aaf9f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {slides[current].subtitle}
            </motion.h1>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <Link
              href="/brief"
              className="group inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-[#f7f5f0] font-medium px-8 py-4 bg-[#2c4a3e] hover:bg-[#4a7c68] transition-colors duration-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Parler de Votre Projet
            </Link>
            <Link
              href="/projects"
              className="group text-[11px] tracking-[0.3em] uppercase text-[#8aaf9f] hover:text-[#f7f5f0] hover-line transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Nos Réalisations
            </Link>
          </motion.div>

          {/* Slide info + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-end gap-4"
          >
            <motion.p
              key={`loc-${current}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] tracking-[0.3em] text-[#8aaf9f] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {slides[current].location}
            </motion.p>
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-500 ${
                    i === current
                      ? "w-8 h-px bg-[#8aaf9f]"
                      : "w-3 h-px bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-[#8aaf9f]/60"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#8aaf9f]" />
        </motion.div>
      </motion.div>

      {/* Vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-6">
        <span
          className="text-[9px] tracking-[0.5em] uppercase text-[#8aaf9f]/50 [writing-mode:vertical-rl]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Architecture · Design · Belgique
        </span>
        <span className="block w-px h-16 bg-gradient-to-b from-transparent to-[#8aaf9f]/50" />
      </div>
    </section>
  );
}
