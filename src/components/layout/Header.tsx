"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Réalisations", href: "/projects" },
  { label: "Domaines", href: "/domaines" },
  { label: "Le Bureau", href: "/le-bureau" },
  { label: "Méthode", href: "/methode" },
  { label: "Références", href: "/references" },
];

const DARK_HERO_PATHS = ["/", "/le-bureau", "/methode", "/domaines", "/contact"];

function hasDarkHero(pathname: string) {
  return DARK_HERO_PATHS.includes(pathname) || /^\/projects\/.+/.test(pathname);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [sectionTheme, setSectionTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Détection dynamique de la section derrière le header
  useEffect(() => {
    // Initialisation depuis le path pour éviter le flash au chargement
    setSectionTheme(hasDarkHero(pathname) ? "dark" : "light");

    const detectSection = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme]")
      );
      if (!sections.length) return;

      // La section active est la dernière dont le top a dépassé y=0
      // (la plus basse parmi celles qui ont commencé à scroller)
      let active: HTMLElement | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 0) {
          active = section;
        }
      }
      if (!active) active = sections[0];

      if (active?.dataset.headerTheme) {
        setSectionTheme(active.dataset.headerTheme as "dark" | "light");
      }
    };

    const observer = new IntersectionObserver(() => detectSection(), {
      threshold: 0,
    });

    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
    sections.forEach((s) => observer.observe(s));
    detectSection();

    window.addEventListener("scroll", detectSection, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", detectSection);
    };
  }, [pathname]);

  const isTransparent = !scrolled && !menuOpen;
  const isDark = sectionTheme === "dark";
  const isOverDark = isTransparent && isDark;
  const isScrolledOnDark = scrolled && isDark && !menuOpen;

  const barColor = isOverDark || isScrolledOnDark ? "bg-white" : "bg-ink";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] py-5 transition-all duration-500 ${
          isTransparent
            ? isOverDark
              ? "bg-gradient-to-b from-black/50 to-transparent border-b border-transparent"
              : "bg-transparent border-b border-transparent"
            : isScrolledOnDark
            ? "bg-ink/90 backdrop-blur-md border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            : "bg-bg/95 backdrop-blur-md border-b border-rule/60 shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Logo — inversé (blanc) sur fond sombre, normal sinon */}
          <Link href="/" aria-label="Premier Art — Accueil">
            <div className={`transition-[filter] duration-200 ${isOverDark || isScrolledOnDark ? "brightness-0 invert" : ""}`}>
              <Image
                src="/logo.png"
                alt="Premier Art Architecture"
                width={120}
                height={120}
                style={{ width: "auto", height: "60px" }}
                className="block"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body group relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200 ${
                  isOverDark || isScrolledOnDark
                    ? "text-white/70 hover:text-white"
                    : "text-ink-mid hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOverDark || isScrolledOnDark ? "bg-white" : "bg-accent"
                  } ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="/brief"
              className={`font-body ml-4 relative overflow-hidden inline-flex items-center text-[10px] tracking-[0.25em] uppercase font-medium px-6 py-3 border transition-all duration-200 ${
                isOverDark
                  ? "border-bg/50 bg-black/30 backdrop-blur-sm"
                  : isScrolledOnDark
                  ? "border-bg/60"
                  : "border-accent"
              }`}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  backgroundColor: isOverDark || isScrolledOnDark ? "#ffffff" : "#253d32",
                  transformOrigin: "left",
                }}
                initial={false}
                animate={{ scaleX: ctaHovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="relative z-10"
                animate={{
                  color: ctaHovered
                    ? (isOverDark || isScrolledOnDark ? "#253d32" : "#ffffff")
                    : (isOverDark || isScrolledOnDark ? "#ffffff" : "#253d32"),
                }}
                transition={{ duration: 0.25, delay: ctaHovered ? 0.1 : 0 }}
              >
                Votre Projet
              </motion.span>
            </Link>
          </nav>

          {/* Mobile hamburger — toutes les barres de la même couleur */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[7px] -mr-2 hover:opacity-70 active:opacity-50 transition-opacity duration-200"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px transition-all duration-500 origin-center ${barColor} ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block h-px transition-all duration-500 ${barColor} ${
                menuOpen ? "opacity-0 w-0" : "w-4"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-500 origin-center ${barColor} ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
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
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center border-l border-rule"
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
                    className={`font-display text-4xl sm:text-5xl font-light transition-colors duration-300 hover:text-accent ${
                      pathname === link.href ? "text-accent" : "text-ink"
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="block h-px bg-accent mt-1 opacity-60" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* CTA — séparé visuellement des liens de navigation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 pt-8 border-t border-accent/15 flex flex-col items-center gap-3"
              >
                <span className="font-body text-[9px] tracking-[0.45em] uppercase text-ink-muted">
                  Démarrer
                </span>
                <Link
                  href="/brief"
                  className="font-display text-4xl sm:text-5xl font-light text-accent hover:text-ink transition-colors duration-300"
                >
                  Votre Projet
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 font-body text-[10px] tracking-[0.3em] text-ink-muted uppercase"
            >
              Bruxelles · Belgique
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
