"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const projectTypes = ["Résidence Privée", "Bureaux", "Commerce", "Rénovation", "Autre"];
const budgets = ["< 100k €", "100k – 500k €", "500k – 1M €", "> 1M €"];

export default function BriefPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    type: "",
    surface: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-8 mb-20"
        >
          <h1
            className="shrink-0 font-light tracking-[0.18em] uppercase text-[#1a1a1a]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              lineHeight: 1,
            }}
          >
            Votre Projet
          </h1>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block flex-1 h-px bg-[#2c4a3e] origin-left"
          />
        </motion.div>

        {/* Form container with corner markers */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-[#2c4a3e]/10 p-16 md:p-24 flex flex-col items-center justify-center text-center min-h-[500px]"
            >
              <CornerMarkers />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-14 h-14 border border-[#2c4a3e]/40 flex items-center justify-center mb-8"
              >
                <CheckCircle size={24} className="text-[#2c4a3e]" />
              </motion.div>
              <h2
                className="font-light text-[#1a1a1a] tracking-[0.15em] uppercase mb-4"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                Message Reçu
              </h2>
              <p
                className="text-[#7a7a72] max-w-md leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem" }}
              >
                Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h pour donner suite à votre projet.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="relative border border-[#2c4a3e]/15"
              style={{ borderColor: "rgba(44,74,62,0.15)" }}
            >
              <CornerMarkers />

              <form onSubmit={handleSubmit} className="p-8 md:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-0">

                  {/* ── LEFT COLUMN — Identité ── */}
                  <div className="flex flex-col gap-10 pb-10 lg:pb-0 lg:border-r lg:border-[#2c4a3e]/10 lg:pr-20">
                    <SectionLabel label="Identité" delay={0.1} isInView={isInView} />

                    <FormField
                      label="Nom"
                      placeholder="Jean Dupont"
                      value={form.nom}
                      onChange={(v) => setForm({ ...form, nom: v })}
                      required
                      delay={0.15}
                      isInView={isInView}
                    />
                    <FormField
                      label="Email"
                      type="email"
                      placeholder="jean@exemple.com"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                      delay={0.2}
                      isInView={isInView}
                    />
                    <FormField
                      label="Téléphone"
                      type="tel"
                      placeholder="+32 "
                      value={form.telephone}
                      onChange={(v) => setForm({ ...form, telephone: v })}
                      delay={0.25}
                      isInView={isInView}
                    />
                  </div>

                  {/* ── RIGHT COLUMN — Votre Vision ── */}
                  <div className="flex flex-col gap-10 pt-10 lg:pt-0 lg:pl-0 border-t border-[#2c4a3e]/10 lg:border-t-0">
                    <SectionLabel label="Votre Vision" delay={0.1} isInView={isInView} />

                    {/* Type de projet */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FieldLabel label="Type de Projet" />
                      <div className="flex flex-wrap gap-2 mt-4">
                        {projectTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, type: t })}
                            className={`text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                              form.type === t
                                ? "border-[#2c4a3e] text-[#2c4a3e] bg-[#2c4a3e]/8"
                                : "border-[#2c4a3e]/20 text-[#7a7a72] hover:border-[#2c4a3e]/50 hover:text-[#2c4a3e]"
                            }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Surface */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FieldLabel label="Surface" />
                      <div className="relative mt-4">
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={form.surface}
                          onChange={(e) => setForm({ ...form, surface: e.target.value })}
                          className="w-full bg-transparent border-b border-[#2c4a3e]/20 text-[#1a1a1a] pb-3 pr-10 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 placeholder:text-[#b0aba3]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        />
                        <span
                          className="absolute right-0 bottom-3 text-[11px] text-[#2c4a3e] tracking-widest"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          m²
                        </span>
                      </div>
                    </motion.div>

                    {/* Budget */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <FieldLabel label="Budget" />
                      <div className="flex flex-col gap-3 mt-4" role="radiogroup" aria-label="Budget">
                        {budgets.map((b) => (
                          <div
                            key={b}
                            role="radio"
                            aria-checked={form.budget === b}
                            tabIndex={0}
                            onClick={() => setForm({ ...form, budget: b })}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setForm({ ...form, budget: b }); } }}
                            className="flex items-center gap-4 cursor-pointer group"
                          >
                            <span
                              className={`w-4 h-4 rounded-full border transition-all duration-300 shrink-0 flex items-center justify-center ${
                                form.budget === b
                                  ? "border-[#2c4a3e]"
                                  : "border-[#2c4a3e]/25 group-hover:border-[#2c4a3e]/50"
                              }`}
                            >
                              {form.budget === b && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="block w-1.5 h-1.5 rounded-full bg-[#2c4a3e]"
                                />
                              )}
                            </span>
                            <span
                              className={`text-sm transition-colors duration-300 ${
                                form.budget === b ? "text-[#2c4a3e]" : "text-[#7a7a72] group-hover:text-[#4a4a4a]"
                              }`}
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* ── BOTTOM — Description ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-14 pt-14 border-t border-[#2c4a3e]/10"
                >
                  <FieldLabel label="Décrivez Votre Projet" />
                  <textarea
                    rows={5}
                    required
                    placeholder="Partagez votre vision, vos contraintes, vos inspirations..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full mt-4 bg-transparent border-b border-[#2c4a3e]/20 text-[#1a1a1a] pb-3 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 placeholder:text-[#b0aba3] resize-none leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </motion.div>

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-12 flex justify-end"
                >
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase font-medium px-10 py-4 bg-[#2c4a3e] text-[#f7f5f0] hover:bg-[#4a7c68] hover:text-[#f7f5f0] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Envoyer
                    <Send
                      size={12}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function CornerMarkers() {
  return (
    <>
      {/* Top-left */}
      <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-[#2c4a3e]" />
      {/* Top-right */}
      <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-[#2c4a3e]" />
      {/* Bottom-left */}
      <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-[#2c4a3e]" />
      {/* Bottom-right */}
      <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-[#2c4a3e]" />
    </>
  );
}

function SectionLabel({
  label,
  delay,
  isInView,
}: {
  label: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-[10px] tracking-[0.45em] uppercase text-[#2c4a3e] text-right"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {label}
    </motion.p>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <p
      className="text-[10px] tracking-[0.35em] uppercase text-[#7a7a72]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {label}
    </p>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  delay,
  isInView,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <FieldLabel label={label} />
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-4 bg-transparent border-b border-[#2c4a3e]/20 text-[#1a1a1a] pb-3 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 placeholder:text-[#b0aba3]"
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </motion.div>
  );
}
