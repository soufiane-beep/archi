"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

export default function FeaturedProjects({ featured }: { featured: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!featured.length) return null;

  return (
    <section ref={ref} className="py-32 px-8 max-w-[1400px] mx-auto">
      {/* Section header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="block w-8 h-px bg-[#253d32]" />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Réalisations
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-light"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              Projets en Vedette
            </motion.h2>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/projects"
            className="group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#253d32] hover:text-[#1a1a1a] transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Voir tous les projets
            <span className="w-8 h-px bg-[#253d32] group-hover:w-12 transition-all duration-400" />
          </Link>
        </motion.div>
      </div>

      {/* Projects grid — asymétrique avec décalage vertical */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large featured project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <ProjectCard
            project={featured[0]}
            index={0}
            isHovered={hoveredIndex === 0}
            onHover={setHoveredIndex}
            large
          />
        </motion.div>

        {/* Two smaller projects — décalés vers le bas */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:mt-16">
          {featured.slice(1, 3).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={project}
                index={i + 1}
                isHovered={hoveredIndex === i + 1}
                onHover={setHoveredIndex}
                large={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  large,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (i: number | null) => void;
  large: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block relative overflow-hidden rounded-sm"
      style={{ height: large ? "clamp(480px, 65vh, 780px)" : "clamp(230px, 30vh, 380px)" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3530]/90 via-[#1e3530]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

      <div className="absolute top-6 left-6 z-10">
        <span
          className="text-[9px] tracking-[0.35em] uppercase text-[#8aaf9f] bg-[#1e3530]/70 backdrop-blur-sm px-3 py-1.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {project.category}
        </span>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 bg-[#253d32] flex items-center justify-center"
        >
          <ArrowUpRight size={16} className="text-[#f9f7f4]" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p
          className="text-[10px] tracking-[0.3em] uppercase text-[#8aaf9f] mb-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {project.location} · {project.year}
        </p>
        <h3
          className={`font-light text-[#f9f7f4] leading-tight transition-all duration-500 ${
            large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
          }`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {project.title}
        </h3>
        {large && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="mt-3 text-sm text-[#d6d1c7] leading-relaxed max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.description}
          </motion.p>
        )}
      </div>
    </Link>
  );
}
