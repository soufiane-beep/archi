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
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
          <Image
            src="https://www.premierart.be/assets/img/slide-03.jpg"
            alt="Projet architectural Premier Art"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#1e3530]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3530]/30 via-transparent to-[#1e3530]/30" />
      </div>

      <div ref={textRef} className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="block w-8 h-px bg-[#8aaf9f]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Parlons de Votre Projet
          </span>
          <span className="block w-8 h-px bg-[#8aaf9f]" />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#f7f5f0",
              lineHeight: 1,
            }}
          >
            Vous avez un projet
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              background: "linear-gradient(135deg, #8aaf9f 0%, #c2d9cf 50%, #8aaf9f 100%)",
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
          className="text-[#d6d1c7] max-w-xl mx-auto mb-14 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem" }}
        >
          Qu'il s'agisse d'une transformation, d'une extension, d'une construction neuve ou d'une réaffectation, nous vous accompagnons dans le développement d'un projet clair, cohérent et adapté à vos objectifs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/brief"
            className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 bg-[#f7f5f0] text-[#1e3530] hover:bg-[#8aaf9f] transition-colors duration-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Parler de Votre Projet
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 border border-white/20 text-[#f7f5f0] hover:border-white/50 transition-all duration-400"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Voir nos Réalisations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
