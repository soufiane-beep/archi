"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

const ALL_CATEGORIES = "Tous";

// Pattern éditorial : définit la hauteur et la largeur relative de chaque carte selon sa position dans le groupe de 3
function getCardConfig(indexInGroup: number): { height: string; colSpan: string } {
  // Groupe de 3 : grand (2/3) | petit (1/3) | puis 2 medium | puis inverse
  const patterns = [
    { height: "480px", colSpan: "md:col-span-2" },   // grande
    { height: "320px", colSpan: "md:col-span-1" },   // petite
    { height: "280px", colSpan: "md:col-span-1" },   // petite
    { height: "420px", colSpan: "md:col-span-2" },   // grande
    { height: "360px", colSpan: "md:col-span-1" },   // medium
    { height: "360px", colSpan: "md:col-span-2" },   // medium large
    { height: "300px", colSpan: "md:col-span-1" },   // petite
    { height: "460px", colSpan: "md:col-span-1" },   // grande
    { height: "320px", colSpan: "md:col-span-2" },   // large
  ];
  return patterns[indexInGroup % patterns.length];
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-[#2c4a3e]/10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#2c4a3e] text-[#f7f5f0]"
                : "border border-[#2c4a3e]/20 text-[#7a7a72] hover:border-[#2c4a3e]/50 hover:text-[#2c4a3e]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects grid — layout éditorial asymétrique */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
        {filtered.map((project, i) => {
          const { height, colSpan } = getCardConfig(i);
          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={colSpan}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block relative overflow-hidden rounded-sm"
                style={{ height }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3530]/88 via-[#1e3530]/15 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                <div className="absolute top-5 left-5 z-10">
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase text-[#8aaf9f] bg-[#1e3530]/70 backdrop-blur-sm px-3 py-1.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-5 right-5 w-9 h-9 bg-[#2c4a3e] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={14} className="text-[#f7f5f0]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase text-[#8aaf9f] mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {project.location} · {project.year}
                  </p>
                  <h2
                    className="font-light text-[#f7f5f0] text-3xl"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {project.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
