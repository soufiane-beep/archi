"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer
      ref={ref}
      className="bg-[#080808] border-t border-white/5 pt-20 pb-10 px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-16 border-b border-white/5">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <div className="mb-6">
              <span
                className="block text-3xl font-light tracking-[0.2em] text-[#f0ece4] uppercase mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Premier Art
              </span>
              <span
                className="text-[10px] tracking-[0.35em] text-[#c8a97e] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Architecture
              </span>
            </div>
            <p
              className="text-sm text-[#666055] leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cabinet d'architecture belge spécialisé en transformation, extension, construction neuve et réaffectation. Particuliers, investisseurs, promoteurs et entreprises — partout en Belgique.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#c8c2b8] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all duration-300 text-[11px] tracking-widest"
                aria-label="Instagram"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                IG
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#c8c2b8] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all duration-300 text-[11px] tracking-widest"
                aria-label="LinkedIn"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                LI
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Réalisations", href: "/projects" },
                { label: "Domaines d'intervention", href: "/domaines" },
                { label: "Le Bureau", href: "/le-bureau" },
                { label: "Méthode", href: "/methode" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666055] hover:text-[#f0ece4] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Domaines
            </h4>
            <ul className="space-y-3">
              {[
                "Transformation & Rénovation",
                "Extension & Agrandissement",
                "Construction Neuve",
                "Réaffectation & Valorisation",
              ].map((s) => (
                <li key={s}>
                  <span
                    className="text-sm text-[#666055]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3"
          >
            <h4
              className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact
            </h4>
            <address
              className="not-italic space-y-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p className="text-sm text-[#666055]">
                Chaussée de Mons 725<br />
                1070 Anderlecht, Bruxelles
              </p>
              <a
                href="tel:+32493876106"
                className="block text-sm text-[#666055] hover:text-[#c8a97e] transition-colors duration-300"
              >
                +32 493 87 61 06
              </a>
              <a
                href="mailto:contact@premierart.be"
                className="flex items-center gap-1 text-sm text-[#666055] hover:text-[#c8a97e] transition-colors duration-300"
              >
                contact@premierart.be
                <ArrowUpRight size={12} />
              </a>
            </address>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p
            className="text-[11px] text-[#3d3a36] tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Premier Art Architecture. Tous droits réservés.
          </p>
          <p
            className="text-[11px] text-[#3d3a36] tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Bruxelles · Belgique
          </p>
        </div>
      </div>
    </footer>
  );
}
