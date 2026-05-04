"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { references } from "@/lib/data";

const STATUT_STYLES: Record<string, string> = {
  "Réalisé":       "bg-accent/10 text-accent",
  "Permis Obtenu": "bg-[#4a7c6f]/10 text-[#4a7c6f]",
  "En cours":      "bg-[#c9a96e]/15 text-[#8a6a30]",
  "Étude":         "bg-[#5e5e56]/10 text-[#5e5e56]",
};

function statutStyle(statut: string): string {
  for (const key of Object.keys(STATUT_STYLES)) {
    if (statut.startsWith(key)) return STATUT_STYLES[key];
  }
  return "bg-[#5e5e56]/10 text-[#5e5e56]";
}

const SECTEURS = ["Tous", "Résidentiel", "Médical", "Industriel"];

export default function ReferencesPage() {
  const [filtre, setFiltre] = useState("Tous");

  const liste = filtre === "Tous"
    ? references
    : references.filter((r) => r.secteur.includes(filtre));

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <div className="pt-40 pb-20 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-8 h-px bg-accent" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-accent">
            Depuis 2020
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-ink"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95 }}
          >
            Références
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-[#5e5e56] max-w-xl text-sm leading-relaxed"
        >
          Une sélection de projets réalisés ou en cours à travers la Belgique — rénovation, extension, nouvelle construction et reconversion, en secteur résidentiel, médical et industriel.
        </motion.p>
      </div>

      {/* Filtres */}
      <div className="px-8 max-w-[1400px] mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          {SECTEURS.map((s) => (
            <button
              key={s}
              onClick={() => setFiltre(s)}
              className={`font-body text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-colors duration-300 ${
                filtre === s
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-[#5e5e56] border-accent/20 hover:border-accent/60"
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Table */}
      <div className="px-8 max-w-[1400px] mx-auto pb-32">
        {/* En-tête */}
        <div className="hidden md:grid grid-cols-[80px_1fr_160px_180px_160px_100px_130px] gap-4 pb-4 border-b border-accent/10 mb-2">
          {["Année", "Projet", "Secteur", "Type", "Localisation", "Surface", "Statut"].map((col) => (
            <span
              key={col}
              className="font-body text-[9px] tracking-[0.3em] uppercase text-ink-muted"
            >
              {col}
            </span>
          ))}
        </div>

        {/* Lignes */}
        {liste.map((ref, i) => (
          <motion.div
            key={`${ref.annee}-${ref.nom}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            className="group grid grid-cols-1 md:grid-cols-[80px_1fr_160px_180px_160px_100px_130px] gap-4 py-5 border-b border-accent/[0.08] hover:bg-bg-alt transition-colors duration-200 items-center"
          >
            <span className="font-body text-ink-muted text-sm">
              {ref.annee}
            </span>

            <span
              className="font-display font-light text-ink group-hover:text-accent transition-colors duration-200"
              style={{ fontSize: "1.15rem" }}
            >
              {ref.nom}
            </span>

            <span className="font-body text-[#5e5e56] text-xs hidden md:block">
              {ref.secteur}
            </span>

            <span className="font-body text-[#5e5e56] text-xs hidden md:block">
              {ref.type}
            </span>

            <span className="font-body text-[#5e5e56] text-xs">
              {ref.localisation}
            </span>

            <span className="font-body text-[#5e5e56] text-xs hidden md:block">
              {ref.surface}
            </span>

            <span
              className={`font-body text-[9px] tracking-[0.2em] uppercase px-2.5 py-1.5 inline-block w-fit ${statutStyle(ref.statut)}`}
            >
              {ref.statut}
            </span>
          </motion.div>
        ))}

        {/* Compteur */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body mt-8 text-[10px] tracking-[0.25em] uppercase text-ink-muted text-right"
        >
          {liste.length} projet{liste.length > 1 ? "s" : ""}
          {filtre !== "Tous" ? ` · ${filtre}` : ""}
        </motion.p>
      </div>
    </div>
  );
}
