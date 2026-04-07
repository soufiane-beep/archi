"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Premier échange",
    desc: "Nous analysons votre besoin, le contexte du projet et ses objectifs. Cette première rencontre nous permet de définir ensemble le cadre de la mission et d'établir une relation de confiance.",
  },
  {
    step: "02",
    title: "Étude & faisabilité",
    desc: "Nous évaluons le potentiel du site, les contraintes réglementaires et les premières orientations possibles. Cette phase structure le projet et pose les bases d'une conception cohérente.",
  },
  {
    step: "03",
    title: "Conception architecturale",
    desc: "Nous développons une réponse cohérente, fonctionnelle et adaptée à vos usages, par étapes successives validées avec vous — de l'esquisse à l'avant-projet définitif.",
  },
  {
    step: "04",
    title: "Démarches administratives",
    desc: "Nous vous accompagnons dans la constitution des dossiers nécessaires au développement du projet : permis d'urbanisme, demandes spécifiques, coordination avec les autorités compétentes.",
  },
  {
    step: "05",
    title: "Dossier technique",
    desc: "Nous préparons les éléments nécessaires à la bonne mise en œuvre du chantier par les entreprises : plans d'exécution, cahier des charges, consultation des entrepreneurs.",
  },
  {
    step: "06",
    title: "Suivi de réalisation",
    desc: "Nous veillons à la cohérence entre la conception, les choix réalisés et l'exécution du projet. Visites de chantier régulières, coordination des intervenants, réception des travaux.",
  },
];

const benefits = [
  {
    title: "Plus de clarté",
    desc: "Chaque étape est définie, expliquée et validée avec vous. Vous savez toujours où en est votre projet.",
  },
  {
    title: "Meilleure anticipation",
    desc: "Les points de décision sont identifiés en amont, ce qui réduit les imprévus et les dépassements.",
  },
  {
    title: "Cohérence d'ensemble",
    desc: "La conception et la réalisation sont portées par le même regard, garantissant la fidélité du résultat.",
  },
  {
    title: "Relation de confiance",
    desc: "Un interlocuteur unique, disponible et réactif, tout au long de votre projet.",
  },
];

export default function MethodePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://www.premierart.be/assets/img/slide-03.jpg"
          alt="Méthode Premier Art Architecture"
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
              Notre Méthode
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
              Un accompagnement
              <br />structuré à chaque étape
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#4a4a4a] leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontSize: "1rem" }}
          >
            Chaque projet architectural nécessite une approche structurée. Notre méthode de travail repose sur six étapes claires, conçues pour accompagner le maître d'ouvrage avec transparence et rigueur, de la première idée jusqu'à la réalisation.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[#2c4a3e]/10 p-10 bg-[#ebe8e0] hover:bg-[#efefea] transition-colors duration-500"
            >
              <span
                className="block text-[11px] tracking-[0.3em] text-[#2c4a3e] mb-5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {step.step}
              </span>
              <div className="w-10 h-px bg-[#2c4a3e]/30 mb-6" />
              <h3
                className="font-light text-[#1a1a1a] mb-4"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.7rem" }}
              >
                {step.title}
              </h3>
              <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
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
              Ce que cela vous apporte
            </span>
          </motion.div>
          <div className="overflow-hidden mb-14">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Une méthode au service
              <br />de votre projet
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-[#2c4a3e]/10 pt-8"
              >
                <h3
                  className="font-light text-[#1a1a1a] mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem" }}
                >
                  {b.title}
                </h3>
                <p className="text-[#7a7a72] text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-[#7a7a72] text-sm mb-8" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}>
            Contactez-nous pour un premier échange sans engagement. Ensemble, nous définirons le cadre de votre projet et les premières orientations possibles.
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
