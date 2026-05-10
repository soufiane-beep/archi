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
      <div data-header-theme="dark" className="relative h-[60vh] min-h-[320px] md:min-h-[400px] overflow-hidden">
        <Image
          src="/projets/fayt/1.png"
          alt="Domaines d'intervention Premier Art"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-12 md:bottom-20 left-4 md:left-8 right-4 md:right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-white/50" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-white/70">
              Domaines d&apos;intervention
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, textShadow: "0 4px 32px rgba(0,0,0,0.7)" }}
            >
              Des réponses architecturales
              <br />adaptées à chaque projet
            </motion.h1>
          </div>
        </div>
      </div>

      {/* 4 domains grid */}
      <section data-header-theme="light" className="py-16 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-accent/10 p-6 md:p-10 hover:border-accent/30 transition-all duration-500 bg-bg-card hover:bg-bg-alt"
            >
              <span className="font-body block text-[11px] tracking-[0.3em] text-[#5e5e56] mb-6">
                {service.number}
              </span>
              <h2
                className="font-display font-light text-ink mb-4 group-hover:text-accent transition-colors duration-400"
                style={{ fontSize: "2rem" }}
              >
                {service.title}
              </h2>
              <p className="font-body text-[#5e5e56] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Typologies */}
      <section className="py-14 md:py-24 px-4 md:px-8 bg-bg-card">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="block w-8 h-px bg-accent" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
              Typologies
            </span>
          </motion.div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-ink"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
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
                className="flex items-center gap-3 py-4 border-b border-accent/10"
              >
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                <span className="font-body text-sm text-ink-mid">
                  {t}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-14 md:py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="block w-8 h-px bg-accent" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
            Pour qui
          </span>
        </motion.div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-ink"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
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
              className="border border-accent/10 p-6 md:p-8 bg-bg-card"
            >
              <h3
                className="font-display font-light text-accent mb-3"
                style={{ fontSize: "1.6rem" }}
              >
                {c.label}
              </h3>
              <p className="font-body text-[#5e5e56] text-sm leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-4 md:px-8 border-t border-accent/10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="font-display font-light text-ink mb-4" style={{ fontSize: "2.5rem" }}>
            Un Projet à Discuter ?
          </h2>
          <p className="font-body text-[#5e5e56] text-sm mb-8" style={{ lineHeight: 1.7 }}>
            Chaque projet commence par un premier échange permettant de comprendre vos besoins, le contexte du site et les premières orientations possibles.
          </p>
          <Link
            href="/brief"
            className="font-body inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 bg-accent text-white hover:bg-accent-warm transition-colors duration-300"
          >
            Parler de votre projet
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
