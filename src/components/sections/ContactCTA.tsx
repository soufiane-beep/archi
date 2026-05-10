"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} data-header-theme="dark" className="relative py-20 md:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
          <Image
            src="/projets/rue-des-nobles/6.JPG"
            alt="Projet architectural Premier Art"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#1e3530]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e26]/50 via-[#1a2e26]/20 to-[#1a2e26]/50" />
      </div>

      <div ref={textRef} className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="block w-8 h-px bg-[#8aaf9f]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]">
            Parlons de Votre Projet
          </span>
          <span className="block w-8 h-px bg-[#8aaf9f]" />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)", lineHeight: 1 }}
          >
            Vous avez un projet
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 7vw, 6.5rem)",
              background: "linear-gradient(135deg, #f9f7f4 0%, #d8c9a8 55%, #f9f7f4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            en Belgique ?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body max-w-xl mx-auto mb-14 leading-relaxed"
          style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.85)" }}
        >
          Qu'il s'agisse d'une transformation, d'une extension, d'une construction neuve ou d'une réaffectation, nous vous accompagnons dans le développement d'un projet clair, cohérent et adapté à vos objectifs.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/brief"
            className="font-body group inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#f9f7f4] text-[#1a2e26] hover:bg-[#8aaf9f] hover:text-[#f9f7f4] transition-colors duration-400"
          >
            Parler de Votre Projet
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/projects"
            className="font-body group inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border border-white/50 text-[#f9f7f4] hover:border-white/80 hover:bg-white/10 transition-all duration-400"
          >
            Voir nos Réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
