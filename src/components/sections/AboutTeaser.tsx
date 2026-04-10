"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm" style={{ height: "600px" }}>
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                  src="https://www.premierart.be/assets/img/property-11.jpg"
                  alt="Jean-François Devaux, architecte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* Overlay subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-8 bg-[#1e3530] border border-white/5 p-8 max-w-[220px]"
            >
              <span
                className="block text-5xl font-light text-[#8aaf9f] mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                2005
              </span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#8aaf9f]/60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Fondé à Bruxelles
              </span>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="block w-8 h-px bg-[#253d32]" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Le Bureau
              </span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-light leading-tight"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#1a1a1a",
                }}
              >
                Un bureau engagé dans
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #253d32 0%, #3a5e4e 50%, #253d32 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  une architecture exigeante
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <p
                className="text-[#4a4a4a] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem" }}
              >
                Notre bureau développe une architecture contemporaine, sobre et contextualisée, au service de projets variés en Belgique. Nous cherchons à produire des réponses justes, fonctionnelles et durables, en conciliant ambition architecturale, faisabilité et qualité d'usage.
              </p>
              <p
                className="text-[#5e5e56] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem" }}
              >
                Transformation, extension, construction neuve ou réaffectation — nous accompagnons particuliers, investisseurs, promoteurs et entreprises de l'idée initiale jusqu'à la réalisation.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 my-10 pt-10 border-t border-[#253d32]/10"
            >
              {[
                { label: "Rigueur", desc: "Méthode & précision" },
                { label: "Polyvalence", desc: "Tous types de projets" },
                { label: "Humain", desc: "Écoute & dialogue" },
              ].map((v) => (
                <div key={v.label}>
                  <span
                    className="block text-[#1a1a1a] font-light mb-1"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}
                  >
                    {v.label}
                  </span>
                  <span
                    className="text-[11px] text-[#5e5e56]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {v.desc}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/le-bureau"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#253d32] border border-[#253d32]/30 px-8 py-4 hover:border-[#253d32] hover:bg-[#253d32] hover:text-[#f9f7f4] transition-all duration-400"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Découvrir le Bureau
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
