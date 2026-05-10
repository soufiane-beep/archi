"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

const ALL_CATEGORIES = "Tous";

// Pattern éditorial : cycles de 7 items formant des rangées valides dans une grille 3 colonnes
// Chaque rangée = somme des col-span égale 3 (2+1, 1+2, 1+1+1)
function getCardConfig(indexInGroup: number): { height: string; colSpan: string } {
  const patterns = [
    { height: "clamp(250px, 55vh, 480px)", colSpan: "md:col-span-2" }, // rangée A : 2
    { height: "clamp(220px, 42vh, 340px)", colSpan: "md:col-span-1" }, // rangée A : 1 → total 3 ✓
    { height: "clamp(200px, 38vh, 300px)", colSpan: "md:col-span-1" }, // rangée B : 1
    { height: "clamp(240px, 50vh, 440px)", colSpan: "md:col-span-2" }, // rangée B : 2 → total 3 ✓
    { height: "clamp(220px, 44vh, 380px)", colSpan: "md:col-span-1" }, // rangée C : 1
    { height: "clamp(200px, 38vh, 320px)", colSpan: "md:col-span-1" }, // rangée C : 1
    { height: "clamp(210px, 40vh, 360px)", colSpan: "md:col-span-1" }, // rangée C : 1 → total 3 ✓
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
        className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-accent/10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-body text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 ${
              activeCategory === cat
                ? "bg-accent text-white"
                : "border border-accent/20 text-[#5e5e56] hover:border-accent/50 hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects grid — layout éditorial asymétrique, grid-flow-dense évite les trous */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start grid-flow-dense">
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
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)" }} />

                <div className="absolute top-5 left-5 z-10">
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white bg-black/50 backdrop-blur-sm px-3 py-1.5">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-5 right-5 w-9 h-9 bg-accent flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={14} className="text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#8aaf9f] mb-2">
                    {project.location} · {project.year}
                  </p>
                  <h2 className="font-display font-light text-white text-3xl" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
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
