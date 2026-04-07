"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { ArrowUpRight, CheckCircle } from "lucide-react";

const process = [
  {
    step: "01",
    title: "Premier échange",
    desc: "Nous analysons votre besoin, le contexte du projet et ses objectifs pour définir ensemble le cadre de la mission.",
  },
  {
    step: "02",
    title: "Étude & faisabilité",
    desc: "Nous évaluons le potentiel du site, les contraintes réglementaires et les premières orientations architecturales.",
  },
  {
    step: "03",
    title: "Conception architecturale",
    desc: "Nous développons une réponse cohérente, fonctionnelle et adaptée à vos usages, en plusieurs phases validées avec vous.",
  },
  {
    step: "04",
    title: "Démarches administratives",
    desc: "Nous vous accompagnons dans la constitution des dossiers nécessaires au développement du projet (permis, etc.).",
  },
  {
    step: "05",
    title: "Dossier technique",
    desc: "Nous préparons les éléments nécessaires à la bonne mise en œuvre du chantier par les entreprises.",
  },
  {
    step: "06",
    title: "Suivi de réalisation",
    desc: "Nous veillons à la cohérence entre la conception, les choix réalisés et l'exécution du projet sur le terrain.",
  },
];

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

const whyUs = [
  {
    title: "Une vision architecturale cohérente",
    desc: "Chaque projet est pensé comme un ensemble, avec une attention portée à l'usage, à la lumière, aux volumes et à l'intégration globale.",
  },
  {
    title: "Une réelle maîtrise de l'existant",
    desc: "Nous intervenons régulièrement sur des bâtiments à transformer, étendre ou réaffecter, avec une lecture attentive de leur potentiel et de leurs contraintes.",
  },
  {
    title: "Une approche structurée du projet",
    desc: "Nous accompagnons chaque mission avec méthode, clarté et rigueur, afin de rendre le processus plus lisible et plus serein pour le client.",
  },
  {
    title: "Un accompagnement humain et professionnel",
    desc: "Nous attachons autant d'importance à la qualité architecturale qu'à la relation de confiance, au dialogue et à la compréhension des besoins réels du projet.",
  },
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3530]/75 via-[#1e3530]/30 to-[#1e3530]" />

        <div className="absolute bottom-20 left-8 right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-[#8aaf9f]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]" style={{ fontFamily: "var(--font-inter)" }}>
              Domaines d&apos;intervention
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#f7f5f0]"
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
              className="group border border-[#2c4a3e]/10 p-10 hover:border-[#2c4a3e]/30 transition-all duration-500 bg-[#ebe8e0] hover:bg-[#efefea]"
            >
              <span
                className="block text-[11px] tracking-[0.3em] text-[#7a7a72] mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {service.number}
              </span>
              <h3
                className="font-light text-[#1a1a1a] mb-4 group-hover:text-[#2c4a3e] transition-colors duration-400"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem" }}
              >
                {service.title}
              </h3>
              <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Typologies */}
      <section className="py-24 px-8 bg-[#ebe8e0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="block w-8 h-px bg-[#2c4a3e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]" style={{ fontFamily: "var(--font-inter)" }}>
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
                <span className="w-1 h-1 rounded-full bg-[#2c4a3e] shrink-0" />
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
          <span className="block w-8 h-px bg-[#2c4a3e]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]" style={{ fontFamily: "var(--font-inter)" }}>
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
              className="border border-[#2c4a3e]/10 p-8 bg-[#ebe8e0]"
            >
              <h3
                className="font-light text-[#2c4a3e] mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem" }}
              >
                {c.label}
              </h3>
              <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 px-8 bg-[#ebe8e0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="block w-8 h-px bg-[#2c4a3e]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]" style={{ fontFamily: "var(--font-inter)" }}>
              Notre Méthode
            </span>
          </motion.div>
          <div className="overflow-hidden mb-16">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Un accompagnement structuré
              <br />à chaque étape
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <span
                  className="block text-[11px] tracking-[0.3em] text-[#2c4a3e] mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p.step}
                </span>
                <div className="w-12 h-px bg-[#2c4a3e]/30 mb-5" />
                <h3
                  className="font-light text-[#1a1a1a] mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem" }}
                >
                  {p.title}
                </h3>
                <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="block w-8 h-px bg-[#2c4a3e]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#2c4a3e]" style={{ fontFamily: "var(--font-inter)" }}>
                Nos Engagements
              </span>
            </motion.div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-light text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
              >
                Pourquoi faire appel
                <br />à notre bureau ?
              </motion.h2>
            </div>
            <div className="space-y-8">
              {whyUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle size={16} className="text-[#2c4a3e] mt-1 shrink-0" />
                  <div>
                    <p className="text-[#1a1a1a] text-sm font-medium mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.title}
                    </p>
                    <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[550px] overflow-hidden"
          >
            <Image
              src="https://www.premierart.be/assets/img/property-12.jpg"
              alt="Atelier Premier Art"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3530]/30 to-transparent" />
          </motion.div>
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
          <p className="text-[#7a7a72] text-sm mb-8" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}>
            Chaque projet commence par un premier échange permettant de comprendre vos besoins, le contexte du site et les premières orientations possibles.
          </p>
          <Link
            href="/brief"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-5 bg-[#2c4a3e] text-[#f7f5f0] hover:bg-[#4a7c68] hover:text-[#f7f5f0] transition-colors duration-300"
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
