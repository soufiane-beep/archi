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

// Pages qui ont un hero sombre en haut (logo + nav blancs au chargement)
const DARK_HERO_ROUTES = ["/", "/le-bureau", "/contact", "/methode", "/domaines"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hero sombre = page connue + non scrollée OU route projet individuel (sauf 3D)
  const hasDarkHero =
    DARK_HERO_ROUTES.includes(pathname) ||
    /^\/projects\/(?!$).+/.test(pathname);

  // Le header est "light" (logo/nav sombres) quand scrollé OU sans hero sombre
  const light = scrolled || !hasDarkHero;

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
            ? "py-4 bg-[#f7f5f0]/95 backdrop-blur-md border-b border-[#2c4a3e]/10"
            : "py-7"
        }`}
      >

        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Premier Art — Accueil">
            <Image
              src="/logo.png"
              alt="Premier Art Architecture"
              width={120}
              height={120}
              style={{ width: "auto", height: "68px" }}
              className={`block transition-all duration-700 ${
                light ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                  light
                    ? pathname === link.href
                      ? "text-[#2c4a3e]"
                      : "text-[#4a4a4a] hover:text-[#1a1a1a]"
                    : pathname === link.href
                      ? "text-[#8aaf9f]"
                      : "text-[#f7f5f0]/80 hover:text-[#f7f5f0]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    light ? "bg-[#2c4a3e]" : "bg-[#8aaf9f]"
                  } ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/brief"
              className={`ml-4 text-[10px] tracking-[0.25em] uppercase font-medium px-6 py-3 border transition-all duration-300 ${
                light
                  ? "border-[#2c4a3e] text-[#2c4a3e] hover:bg-[#2c4a3e] hover:text-[#f7f5f0]"
                  : "border-[#f7f5f0]/60 text-[#f7f5f0] hover:border-[#f7f5f0] hover:bg-[#f7f5f0]/10"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Votre Projet
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
              className={`block w-6 h-px transition-all duration-500 origin-center ${
                light ? "bg-[#1a1a1a]" : "bg-[#f7f5f0]"
              } ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
            />
            <span
              className={`block h-px transition-all duration-500 ${
                light ? "bg-[#2c4a3e]" : "bg-[#f7f5f0]/60"
              } ${menuOpen ? "opacity-0 w-0" : "w-4"}`}
            />
            <span
              className={`block w-6 h-px transition-all duration-500 origin-center ${
                light ? "bg-[#1a1a1a]" : "bg-[#f7f5f0]"
              } ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
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
            className="fixed inset-0 z-40 bg-[#1e3530] flex flex-col items-center justify-center"
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
                    className="font-display text-5xl font-light text-[#f7f5f0] hover:text-[#8aaf9f] transition-colors duration-300"
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
                  className="font-display text-5xl font-light text-[#8aaf9f] hover:text-[#f7f5f0] transition-colors duration-300"
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
              className="absolute bottom-12 text-[10px] tracking-[0.3em] text-[#8aaf9f]/70 uppercase"
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
