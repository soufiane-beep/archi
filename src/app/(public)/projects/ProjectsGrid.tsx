"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

const ALL_CATEGORIES = "Tous";

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
        className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-white/5"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#c8a97e] text-[#080808]"
                : "border border-white/10 text-[#666055] hover:border-white/25 hover:text-[#c8c2b8]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group block relative overflow-hidden"
              style={{ height: "360px" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

              <div className="absolute top-5 left-5 z-10">
                <span
                  className="text-[9px] tracking-[0.3em] uppercase text-[#c8a97e] bg-[#080808]/70 backdrop-blur-sm px-3 py-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.category}
                </span>
              </div>

              <div className="absolute top-5 right-5 w-9 h-9 bg-[#c8a97e] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={14} className="text-[#080808]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p
                  className="text-[10px] tracking-[0.25em] uppercase text-[#c8a97e] mb-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {project.location} · {project.year}
                </p>
                <h2
                  className="font-light text-[#f0ece4] text-3xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {project.title}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
