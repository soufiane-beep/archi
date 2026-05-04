"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-20%" });

  return (
    <footer className="bg-[#141414] border-t border-white/[0.06]">
      {/* Large display title — decorative ghost text */}
      <div
        ref={titleRef}
        className="relative overflow-hidden border-b border-white/[0.06] px-8 pt-16 pb-4"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block w-8 h-px bg-[#d8d3c8]/30" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#8c8c84]">
              Bruxelles · Belgique
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={titleInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-white/[0.07] leading-[0.88] tracking-tight select-none"
              style={{ fontSize: "clamp(5rem, 15vw, 14rem)" }}
            >
              Premier Art
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div ref={ref} className="pt-16 pb-10 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14 pb-14 border-b border-white/[0.08]">

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-4"
            >
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Premier Art Architecture"
                  width={120}
                  height={120}
                  style={{ width: "auto", height: "60px" }}
                  className="block brightness-0 invert opacity-90"
                />
              </div>
              <p className="font-body text-sm text-[#a0a09a] leading-relaxed max-w-xs">
                Cabinet d'architecture belge spécialisé en transformation, extension, construction neuve et réaffectation. Partout en Belgique.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-2"
            >
              <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#d8d3c8]/60 mb-6">
                Navigation
              </h3>
              <ul className="space-y-3.5">
                {[
                  { label: "Réalisations", href: "/projects" },
                  { label: "Références", href: "/references" },
                  { label: "Domaines", href: "/domaines" },
                  { label: "Le Bureau", href: "/le-bureau" },
                  { label: "Méthode", href: "/methode" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-[#a0a09a] hover:text-[#f9f7f4] transition-colors duration-300"
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
              <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#d8d3c8]/60 mb-6">
                Domaines
              </h3>
              <ul className="space-y-3.5">
                {[
                  "Transformation & Rénovation",
                  "Extension & Agrandissement",
                  "Construction Neuve",
                  "Réaffectation & Valorisation",
                ].map((s) => (
                  <li key={s}>
                    <span className="font-body text-sm text-[#a0a09a]/80">
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
              <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#d8d3c8]/60 mb-6">
                Contact
              </h3>
              <address className="font-body not-italic space-y-4">
                <p className="text-sm text-[#a0a09a] leading-relaxed">
                  Chaussée de Mons 725<br />
                  1070 Anderlecht, Bruxelles
                </p>
                <a
                  href="tel:+32493876106"
                  className="block text-sm text-[#a0a09a] hover:text-[#f9f7f4] transition-colors duration-300"
                >
                  +32 493 87 61 06
                </a>
                <a
                  href="mailto:contact@premierart.be"
                  className="inline-flex items-center gap-1.5 text-sm text-[#a0a09a] hover:text-[#f9f7f4] transition-colors duration-300"
                >
                  contact@premierart.be
                  <ArrowUpRight size={11} />
                </a>
              </address>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <p className="font-body text-[11px] text-[#8c8c84] tracking-widest">
              © {new Date().getFullYear()} Premier Art Architecture. Tous droits réservés.
            </p>
            <Link
              href="/brief"
              className="font-body text-[10px] tracking-[0.3em] uppercase text-[#a0a09a] hover:text-[#f9f7f4] transition-colors duration-300"
            >
              Parler de Votre Projet →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
