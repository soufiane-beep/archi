"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Réalisations", href: "/projects" },
  { label: "Domaines d'intervention", href: "/domaines" },
  { label: "Le Bureau", href: "/le-bureau" },
  { label: "Méthode", href: "/methode" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-4 bg-[#080808]/95 backdrop-blur-md border-b border-white/5"
            : "py-7"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col gap-0">
            <span
              className="font-display text-2xl font-light tracking-[0.2em] text-[#f0ece4] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Premier Art
            </span>
            <span
              className="text-[10px] tracking-[0.35em] text-[#c8a97e] uppercase font-light"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Architecture
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.2em] uppercase font-light hover-line transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#c8a97e]"
                    : "text-[#c8c2b8] hover:text-[#f0ece4]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/brief"
              className="ml-4 text-[10px] tracking-[0.25em] uppercase font-medium px-6 py-3 border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-[#080808] transition-all duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Votre Projet
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-6 flex flex-col justify-between"
            aria-label="Menu"
          >
            <span
              className={`block w-full h-px bg-[#f0ece4] transition-all duration-500 origin-center ${
                menuOpen ? "rotate-45 translate-y-[11px]" : ""
              }`}
            />
            <span
              className={`block w-2/3 h-px bg-[#c8a97e] transition-all duration-500 ${
                menuOpen ? "opacity-0 w-0" : ""
              }`}
            />
            <span
              className={`block w-full h-px bg-[#f0ece4] transition-all duration-500 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[11px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center"
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
                    className="font-display text-5xl font-light text-[#f0ece4] hover:text-[#c8a97e] transition-colors duration-300"
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
                  className="font-display text-5xl font-light text-[#c8a97e] hover:text-[#f0ece4] transition-colors duration-300"
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
              className="absolute bottom-12 text-[10px] tracking-[0.3em] text-[#666055] uppercase"
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
