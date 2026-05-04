"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { stats } from "@/lib/data";

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
            src="/projets/rue-des-nobles/0.JPG"
            alt="Ahmed Chedly ISMAIL — Architecte"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-20 left-8 right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-white/50" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-white/75">
              Le Bureau
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
            >
              Une architecture
              <br />rigoureuse, pensée
              <br />pour être vécue
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Profile */}
      <ProfileSection />

      {/* À propos cards */}
      <section className="py-24 px-8 bg-bg-card">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="block w-8 h-px bg-accent" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
              Ma Pratique
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Une pratique indépendante et engagée",
                text: "J'exerce en tant qu'architecte indépendant, ce qui garantit un suivi direct et personnel sur chaque projet. Je m'appuie sur un réseau de collaborateurs spécialisés — ingénieurs, coordinateurs, entrepreneurs — activés selon les besoins spécifiques de chaque mission.",
              },
              {
                title: "Une approche sur mesure",
                text: "Chaque projet est unique. Qu'il s'agisse d'une rénovation, d'une extension ou d'une construction neuve, je développe une réponse cohérente et durable, adaptée au contexte, au programme et aux usages propres à chaque client.",
              },
              {
                title: "Une relation simple et transparente",
                text: "Je place la clarté du processus et la confiance au centre de la relation avec mes clients. Vous êtes accompagnés à chaque étape, informés des décisions, et avez un interlocuteur unique du début à la fin du projet.",
              },
              {
                title: "Pour des projets porteurs de sens",
                text: "J'interviens pour des particuliers comme pour des promoteurs, avec la même exigence : concevoir des projets bien pensés, qui créent des lieux durables et intemporels. Chaque projet est une collaboration — traduire vos besoins en architecture est ce qui donne du sens à ma pratique.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-bg-alt p-8 border-t-2 border-accent/20"
              >
                <h3
                  className="font-display font-light text-ink mb-4"
                  style={{ fontSize: "1.7rem" }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-[#5e5e56] text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="block w-8 h-px bg-accent" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
              En chiffres
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-accent/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg p-8 text-center">
                <span
                  className="font-display block font-light text-accent mb-2"
                  style={{ fontSize: "3.5rem" }}
                >
                  {stat.value}
                </span>
                <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#5e5e56]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 px-8 bg-bg-card">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="block w-8 h-px bg-accent" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
              Ce qui guide mes projets
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
                text: "Je conçois des espaces adaptés à leur usage, ergonomiques, logiques dans leur circulation et cohérents avec le programme.",
              },
              {
                title: "Cohérence",
                text: "Chaque décision architecturale s'inscrit dans une logique d'ensemble, du volume à la matière, de la structure au détail.",
              },
              {
                title: "Faisabilité",
                text: "Je maintiens une vision réaliste du projet à chaque étape — budget, technique, réglementation — pour garantir une réalisation aboutie.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-accent/10 pt-8"
              >
                <h3
                  className="font-display font-light text-ink mb-4"
                  style={{ fontSize: "1.8rem" }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-[#5e5e56] text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 border-t border-accent/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-light text-ink mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Parlons de votre projet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-[#5e5e56] mb-10 max-w-md mx-auto text-sm"
            style={{ lineHeight: 1.7 }}
          >
            Transformation, extension, construction neuve ou réaffectation — chaque projet commence par un premier échange pour comprendre vos besoins et explorer les possibilités.
          </motion.p>
        </div>
      </section>
    </div>
  );
}

function ProfileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const profileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: profileRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={profileRef} className="py-32 px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Photo */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden" style={{ height: "560px" }}>
            <motion.div style={{ y: photoY }} className="absolute inset-0 scale-110">
              <Image
                src="/profil/photo-profil.png"
                alt="Ahmed Chedly ISMAIL — Architecte Indépendant"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 bg-bg border-t border-r border-accent/10 px-6 py-4">
              <p
                className="font-display text-ink font-light"
                style={{ fontSize: "1.15rem" }}
              >
                Ahmed Chedly ISMAIL
              </p>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-accent mt-1">
                Architecte Indépendant
              </p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div ref={ref} className="lg:col-span-7 lg:pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="flex items-center gap-4 mb-8"
          >
            <span className="block w-8 h-px bg-accent" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
              À Propos
            </span>
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-ink leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Concevoir avec justesse.
              <br />
              Accompagner avec rigueur.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-ink-mid leading-relaxed mb-10"
            style={{ fontSize: "0.9375rem" }}
          >
            Architecte basé en Belgique, je développe une approche de l'architecture centrée sur la justesse des espaces, la qualité des usages et la maîtrise du projet dans sa globalité. Mon travail s'inscrit dans une recherche d'équilibre entre esthétique, fonctionnalité et durabilité, avec une attention constante portée aux détails qui font la qualité d'un lieu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border-t border-accent/10 pt-8 grid grid-cols-3 gap-6"
          >
            {["Rigueur", "Écoute", "Transparence"].map((val) => (
              <div key={val} className="text-center">
                <p
                  className="font-display font-light text-accent"
                  style={{ fontSize: "1.4rem" }}
                >
                  {val}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
