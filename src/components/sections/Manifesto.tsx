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

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const lines = [
    "Nous concevons des projets",
    "qui transforment les lieux",
    "de manière intelligente,",
    "durable",
    "et cohérente.",
  ];

  return (
    <section
      ref={ref}
      className="relative py-40 px-8 overflow-hidden"
    >
      {/* Background texture */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              #c8a97e 80px,
              #c8a97e 81px
            )`,
          }}
        />
      </motion.div>

      <div ref={textRef} className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4"
          >
            <span className="block w-12 h-px bg-[#c8a97e]" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e] lg:[writing-mode:vertical-rl] lg:rotate-180"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Notre Philosophie
            </span>
          </motion.div>

          {/* Center: main text */}
          <div className="lg:col-span-8">
            <div className="space-y-2">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%", opacity: 0 }}
                    animate={isInView ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 1,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-light leading-tight"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                      color: i === 0 || i === 2 ? "#f0ece4" : "#c8c2b8",
                    }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-sm leading-relaxed text-[#666055] max-w-xl"
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
            className="lg:col-span-2 flex lg:flex-col gap-10"
          >
            {[
              { value: "9", label: "projets" },
              { value: "3", label: "régions" },
              { value: "8", label: "ans" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-right">
                <span
                  className="block text-4xl font-light text-[#c8a97e]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-[#666055]"
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
