"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { team, stats } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function LeBureauPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image
            src="https://www.premierart.be/assets/img/slide-01.jpg"
            alt="Premier Art Architecture — Le Bureau"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-[#080808]/30 to-[#080808]" />

        <div className="absolute bottom-20 left-8 right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-[#c8a97e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e]" style={{ fontFamily: "var(--font-inter)" }}>
              Le Bureau
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#f0ece4]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
            >
              Une architecture
              <br />rigoureuse & contemporaine
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Story section */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <StoryText />
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-px bg-white/5 border border-white/5"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#080808] p-8 text-center">
                  <span
                    className="block font-light text-[#c8a97e] mb-2"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem" }}
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

      {/* Pillars section */}
      <section className="py-24 px-8 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="block w-8 h-px bg-[#c8a97e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e]" style={{ fontFamily: "var(--font-inter)" }}>
              Ce qui guide nos projets
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Lecture du contexte",
                text: "Chaque projet commence par une analyse précise du lieu, de son potentiel, de ses contraintes et de son environnement immédiat.",
              },
              {
                title: "Fonctionnalité",
                text: "Nous concevons des espaces adaptés à leur usage, ergonomiques, logiques dans leur circulation et cohérents avec le programme.",
              },
              {
                title: "Cohérence",
                text: "Chaque décision architecturale s'inscrit dans une logique d'ensemble, du volume à la matière, de la structure au détail.",
              },
              {
                title: "Faisabilité",
                text: "Nous maintenons une vision réaliste du projet à chaque étape — budget, technique, réglementation — pour garantir une réalisation aboutie.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-white/10 pt-8"
              >
                <h3
                  className="font-light text-[#f0ece4] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#666055] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="block w-8 h-px bg-[#c8a97e]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e]" style={{ fontFamily: "var(--font-inter)" }}>
            L&apos;Équipe
          </span>
        </motion.div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-light text-[#f0ece4]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Les Architectes
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden mb-6" style={{ height: "400px" }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 to-transparent" />
              </div>
              <h3
                className="font-light text-[#f0ece4] mb-1"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem" }}
              >
                {member.name}
              </h3>
              <p
                className="text-[10px] tracking-[0.25em] uppercase text-[#c8a97e] mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {member.role}
              </p>
              <p className="text-[#666055] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-light text-[#f0ece4] mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Parlons de votre projet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#666055] mb-10 max-w-md mx-auto text-sm"
            style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}
          >
            Transformation, extension, construction neuve ou réaffectation — chaque projet commence par un premier échange pour comprendre vos besoins et explorer les possibilités.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 bg-[#c8a97e] text-[#080808] hover:bg-[#dfc49a] transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Nous Contacter
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StoryText() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="flex items-center gap-4 mb-8"
      >
        <span className="block w-8 h-px bg-[#c8a97e]" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#c8a97e]" style={{ fontFamily: "var(--font-inter)" }}>
          Notre Vision
        </span>
      </motion.div>
      <div className="overflow-hidden mb-8">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-light text-[#f0ece4] leading-tight"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Concevoir avec vision.
          <br />
          Transformer avec méthode.
        </motion.h2>
      </div>
      <div className="space-y-5">
        {[
          "Notre bureau développe une architecture contemporaine, rigoureuse et contextualisée, au service de projets variés en Belgique. Nous intervenons sur des projets de transformation, d'extension, de construction neuve et de réaffectation, en développant des réponses architecturales cohérentes et adaptées à chaque contexte.",
          "Nous accompagnons des maîtres d'ouvrage privés et professionnels dans des projets variés, allant de l'habitation individuelle à des programmes plus techniques ou complexes — centres médicaux, bâtiments tertiaires, sites industriels. Notre approche repose sur une lecture attentive du lieu, une compréhension fine des usages et une volonté constante de concilier qualité architecturale, faisabilité et cohérence globale.",
          "Au-delà de la conception, nous accordons une importance particulière à la clarté du processus, au dialogue avec le client et à la maîtrise des différentes étapes du projet — des premières réflexions jusqu'au suivi de réalisation.",
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
            className={`leading-relaxed ${i === 0 ? "text-[#c8c2b8]" : "text-[#666055]"}`}
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem" }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
