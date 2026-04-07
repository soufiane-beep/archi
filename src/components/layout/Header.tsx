"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Réalisations", href: "/projects" },
  { label: "Domaines d'intervention", href: "/domaines" },
  { label: "Le Bureau", href: "/le-bureau" },
  { label: "Méthode", href: "/methode" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 bg-[#f9f7f4]/95 backdrop-blur-md border-b border-[#d8d3c8]/60">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Premier Art — Accueil">
            <Image
              src="/logo.png"
              alt="Premier Art Architecture"
              width={120}
              height={120}
              style={{ width: "auto", height: "60px" }}
              className="block"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 text-[#4a4a46] hover:text-[#141414]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#253d32] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/brief"
              className="ml-4 relative overflow-hidden inline-flex items-center text-[10px] tracking-[0.25em] uppercase font-medium px-6 py-3 border border-[#253d32]"
              style={{ fontFamily: "var(--font-inter)" }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <motion.span
                className="absolute inset-0 bg-[#253d32]"
                initial={false}
                animate={{ scaleX: ctaHovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left", originX: 0 }}
              />
              <motion.span
                className="relative z-10"
                animate={{ color: ctaHovered ? "#f9f7f4" : "#253d32" }}
                transition={{ duration: 0.25, delay: ctaHovered ? 0.1 : 0 }}
              >
                Votre Projet
              </motion.span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[7px] -mr-2"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px bg-[#141414] transition-all duration-500 origin-center ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-[#253d32] transition-all duration-500 ${
                menuOpen ? "opacity-0 w-0" : "w-4"
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#141414] transition-all duration-500 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — panel light */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#f9f7f4] flex flex-col items-center justify-center border-l border-[#d8d3c8]"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-5xl font-light text-[#141414] hover:text-[#253d32] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/brief"
                  className="font-display text-5xl font-light text-[#253d32] hover:text-[#141414] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Votre Projet
                </Link>
              </motion.div>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-[10px] tracking-[0.3em] text-[#8c8c84] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Bruxelles · Belgique
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
