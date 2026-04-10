"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const typologies = [
  "Maisons et habitations",
  "Extensions et rehausses",
  "Immeubles résidentiels",
  "Bureaux et bâtiments tertiaires",
  "Sites industriels et logistiques",
  "Programmes médicaux et paramédicaux",
  "Réaffectation de bâtiments existants",
];

const clients = [
  { label: "Particuliers", desc: "Rénovation, extension et construction de votre habitation" },
  { label: "Investisseurs", desc: "Valorisation et optimisation de biens immobiliers" },
  { label: "Promoteurs", desc: "Développement de programmes résidentiels ou mixtes" },
  { label: "Entreprises", desc: "Bâtiments professionnels, tertiaires et industriels" },
];

export default function DomainesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://www.premierart.be/assets/img/slide-02.jpg"
          alt="Domaines d'intervention Premier Art"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-20 left-8 right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-[#f9f7f4]/50" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#f9f7f4]/70" style={{ fontFamily: "var(--font-inter)" }}>
              Domaines d&apos;intervention
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#f9f7f4]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95 }}
            >
              Des réponses architecturales
              <br />adaptées à chaque projet
            </motion.h1>
          </div>
        </div>
      </div>

      {/* 4 domains grid */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-[#2c4a3e]/10 p-10 hover:border-[#2c4a3e]/30 transition-all duration-500 bg-[#eae6de] hover:bg-[#f1ede6]"
            >
              <span
                className="block text-[11px] tracking-[0.3em] text-[#5e5e56] mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.number}
              </span>
              <h2
                className="font-light text-[#1a1a1a] mb-4 group-hover:text-[#253d32] transition-colors duration-400"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem" }}
              >
                {service.title}
              </h2>
              <p className="text-[#5e5e56] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Typologies */}
      <section className="py-24 px-8 bg-[#eae6de]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="block w-8 h-px bg-[#253d32]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]" style={{ fontFamily: "var(--font-inter)" }}>
              Typologies
            </span>
          </motion.div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Des projets à différentes échelles,
              <br />une même exigence
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {typologies.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-3 py-4 border-b border-[#2c4a3e]/10"
              >
                <span className="w-1 h-1 rounded-full bg-[#253d32] shrink-0" />
                <span className="text-sm text-[#4a4a4a]" style={{ fontFamily: "var(--font-inter)" }}>
                  {t}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="block w-8 h-px bg-[#253d32]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]" style={{ fontFamily: "var(--font-inter)" }}>
            Pour qui
          </span>
        </motion.div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-light text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Nous accompagnons tous types
            <br />de maîtres d&apos;ouvrage
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border border-[#2c4a3e]/10 p-8 bg-[#eae6de]"
            >
              <h3
                className="font-light text-[#253d32] mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem" }}
              >
                {c.label}
              </h3>
              <p className="text-[#5e5e56] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 border-t border-[#2c4a3e]/10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-light text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}>
            Un Projet à Discuter ?
          </h2>
          <p className="text-[#5e5e56] text-sm mb-8" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}>
            Chaque projet commence par un premier échange permettant de comprendre vos besoins, le contexte du site et les premières orientations possibles.
          </p>
          <Link
            href="/brief"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 bg-[#253d32] text-[#f9f7f4] hover:bg-[#3a5e4e] hover:text-[#f9f7f4] transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Parler de votre projet
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
