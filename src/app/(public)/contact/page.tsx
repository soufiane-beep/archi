"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "",
  });
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-10%" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes = [
    "Résidence Privée",
    "Architecture Commerciale",
    "Design d'Intérieur",
    "Patrimoine & Restauration",
    "Autre",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src="https://www.premierart.be/assets/img/slide-01.jpg"
          alt="Contact Premier Art"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3530]/80 via-[#1e3530]/40 to-[#1e3530]" />

        <div className="absolute bottom-16 left-8 right-8 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mb-5"
          >
            <span className="block w-8 h-px bg-[#8aaf9f]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]" style={{ fontFamily: "var(--font-inter)" }}>
              Parlons de Votre Projet
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#f7f5f0]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.95 }}
            >
              Nous Contacter
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-light text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.1 }}
              >
                Commençons une
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #2c4a3e 0%, #c2d9cf 50%, #2c4a3e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Conversation
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#7a7a72] text-sm leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Que vous ayez un projet précis ou simplement une envie à explorer, nous sommes là pour vous accompagner. La première consultation est toujours gratuite.
            </motion.p>

            {/* Info blocks */}
            <div className="space-y-8">
              {[
                {
                  icon: <MapPin size={16} />,
                  label: "Adresse",
                  lines: ["Chaussée de Mons 725", "1070 Anderlecht, Bruxelles"],
                },
                {
                  icon: <Phone size={16} />,
                  label: "Téléphone",
                  lines: ["+32 493 87 61 06"],
                  href: "tel:+32493876106",
                },
                {
                  icon: <Mail size={16} />,
                  label: "Email",
                  lines: ["contact@premierart.be"],
                  href: "mailto:contact@premierart.be",
                },
                {
                  icon: <Clock size={16} />,
                  label: "Horaires",
                  lines: ["Lun – Ven : 9h – 18h", "Sur rendez-vous le week-end"],
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 border border-[#2c4a3e]/10 flex items-center justify-center text-[#2c4a3e] shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className="block text-[10px] tracking-[0.25em] uppercase text-[#7a7a72] mb-1.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </span>
                    {item.lines.map((line) =>
                      item.href ? (
                        <a
                          key={line}
                          href={item.href}
                          className="block text-sm text-[#4a4a4a] hover:text-[#2c4a3e] transition-colors duration-300"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {line}
                        </a>
                      ) : (
                        <p
                          key={line}
                          className="text-sm text-[#4a4a4a]"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <div ref={formRef} className="lg:col-span-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center h-full text-center py-24"
              >
                <div className="w-16 h-16 border border-[#2c4a3e]/30 flex items-center justify-center mb-8">
                  <CheckCircle size={28} className="text-[#2c4a3e]" />
                </div>
                <h3
                  className="font-light text-[#1a1a1a] mb-4"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem" }}
                >
                  Message Envoyé
                </h3>
                <p className="text-[#7a7a72] max-w-md" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Merci pour votre message. Notre équipe vous contactera dans les 24 heures pour donner suite à votre demande.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Nom complet *" placeholder="Jean Dupont" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <FormField label="Email *" type="email" placeholder="jean@exemple.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Téléphone" placeholder="+32 " value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#7a7a72] mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                      Type de Projet
                    </label>
                    <div className="relative">
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-[#ebe8e0] border border-[#2c4a3e]/10 text-[#4a4a4a] px-4 py-3.5 pr-10 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 appearance-none"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">Sélectionnez un type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2c4a3e]">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
                </div>

                {/* Subject */}
                <FormField label="Objet" placeholder="Sujet de votre demande" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />

                {/* Message */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#7a7a72] mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre projet, vos aspirations, votre budget indicatif..."
                    className="w-full bg-[#ebe8e0] border border-[#2c4a3e]/10 text-[#4a4a4a] px-4 py-3.5 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 resize-none placeholder:text-[#7a7a72]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-[#7a7a72]" style={{ fontFamily: "var(--font-inter)" }}>
                    * Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase font-medium px-10 py-4 bg-[#2c4a3e] text-[#f7f5f0] hover:bg-[#4a7c68] hover:text-[#f7f5f0] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Envoyer le Message
                    <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.25em] uppercase text-[#7a7a72] mb-3" style={{ fontFamily: "var(--font-inter)" }}>
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#ebe8e0] border border-[#2c4a3e]/10 text-[#4a4a4a] px-4 py-3.5 text-sm focus:outline-none focus:border-[#2c4a3e] transition-colors duration-300 placeholder:text-[#7a7a72]"
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </div>
  );
}
