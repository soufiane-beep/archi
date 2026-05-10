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
    <section ref={ref} data-header-theme="light" className="py-16 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm" style={{ height: "clamp(320px, 70vh, 600px)" }}>
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                  src="/profil/photo-profil.png"
                  alt="Ahmed Chedly ISMAIL, architecte"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-[#1e3530] border border-white/5 p-6 md:p-8 max-w-[200px] md:max-w-[220px]"
            >
              <span
                className="font-display block text-5xl font-light text-[#8aaf9f] mb-1"
              >
                2005
              </span>
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#8aaf9f]/60">
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
              <span className="block w-8 h-px bg-accent" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
                Le Bureau
              </span>
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light text-ink leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
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
              <p className="font-body text-ink-mid leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                Notre bureau développe une architecture contemporaine, sobre et contextualisée, au service de projets variés en Belgique. Nous cherchons à produire des réponses justes, fonctionnelles et durables, en conciliant ambition architecturale, faisabilité et qualité d'usage.
              </p>
              <p className="font-body text-[#5e5e56] leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                Transformation, extension, construction neuve ou réaffectation — nous accompagnons particuliers, investisseurs, promoteurs et entreprises de l'idée initiale jusqu'à la réalisation.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-8 md:my-10 pt-8 md:pt-10 border-t border-accent/10"
            >
              {[
                { label: "Rigueur", desc: "Méthode & précision" },
                { label: "Polyvalence", desc: "Tous types de projets" },
                { label: "Humain", desc: "Écoute & dialogue" },
              ].map((v) => (
                <div key={v.label}>
                  <span
                    className="font-display block text-ink font-light mb-1"
                    style={{ fontSize: "1.25rem" }}
                  >
                    {v.label}
                  </span>
                  <span className="font-body text-[11px] text-[#5e5e56]">
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
                className="font-body group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-accent border border-accent/30 px-8 py-4 hover:border-accent hover:bg-accent hover:text-white transition-all duration-400"
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
