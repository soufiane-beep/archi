"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const lines = [
    { text: "Nous concevons des projets", accent: false },
    { text: "qui transforment les lieux", accent: false },
    { text: "de manière intelligente,", accent: false },
    { text: "durable", accent: true },
    { text: "et cohérente.", accent: true },
  ];

  return (
    <section
      ref={ref}
      className="relative py-48 px-8 overflow-hidden bg-[#1e3530]"
    >
      {/* Horizontal lines background texture */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-[0.06]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 72px,
              #f9f7f4 72px,
              #f9f7f4 73px
            )`,
          }}
        />
      </motion.div>

      <div ref={textRef} className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: vertical label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4"
          >
            <span className="block w-10 h-px bg-[#8aaf9f]/60" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f] lg:[writing-mode:vertical-rl] lg:rotate-180"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Notre Philosophie
            </span>
          </motion.div>

          {/* Center: main quote */}
          <div className="lg:col-span-9">
            <div className="space-y-1">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%", opacity: 0 }}
                    animate={isInView ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 1.1,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-light leading-[1.08]"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                      color: line.accent ? "#8aaf9f" : "#f9f7f4",
                    }}
                  >
                    {line.text}
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 w-24 h-px bg-[#f9f7f4]/15 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-sm leading-relaxed text-[#8aaf9f]/70 max-w-xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Particuliers · Investisseurs · Promoteurs · Entreprises — Partout en Belgique
            </motion.p>
          </div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex lg:flex-col gap-12 lg:gap-14 lg:border-l lg:border-[#f9f7f4]/10 lg:pl-8"
          >
            {[
              { value: "9+", label: "Projets" },
              { value: "3", label: "Régions" },
              { value: "8", label: "Ans" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <span
                  className="block font-light text-[#8aaf9f] leading-none"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 5vw, 5rem)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="block mt-1 text-[10px] tracking-[0.3em] uppercase text-[#8aaf9f]/50"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
