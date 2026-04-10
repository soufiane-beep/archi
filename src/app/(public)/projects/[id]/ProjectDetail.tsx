"use client";

import { useRef, lazy, Suspense } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Ruler, Users } from "lucide-react";
import type { Project } from "@/lib/types";

const ModelViewer = lazy(() => import("@/components/ModelViewer"));
const HeroModel3D = lazy(() => import("@/components/HeroModel3D"));

export default function ProjectDetail({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {project.model3d ? (
          <>
            {/* Background neutre pour le viewer 3D */}
            <div className="absolute inset-0 bg-[#f1ede6]" />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(#253d32 1px, transparent 1px),
                  linear-gradient(90deg, #253d32 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
            {/* 3D Wireframe */}
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <HeroModel3D url={project.model3d} />
              </Suspense>
            </div>
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          </>
        )}

        {/* Back link */}
        <div className="absolute top-28 left-8 z-10">
          <Link
            href="/projects"
            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#f9f7f4]/70 hover:text-[#f9f7f4] transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Tous les projets
          </Link>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-20 left-8 right-8 max-w-[1400px] mx-auto z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block text-[10px] tracking-[0.35em] uppercase text-[#f9f7f4]/80 bg-black/20 border border-white/20 px-4 py-2 mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.category}
          </motion.span>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-[#f9f7f4]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3rem, 9vw, 8rem)",
                lineHeight: 0.9,
              }}
            >
              {project.title}
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-6 mt-6"
          >
            <span className="flex items-center gap-2 text-[11px] text-[#f9f7f4]/70" style={{ fontFamily: "var(--font-inter)" }}>
              <MapPin size={12} className="text-[#f9f7f4]/60" />
              {project.location}
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-2 text-[11px] text-[#f9f7f4]/70" style={{ fontFamily: "var(--font-inter)" }}>
              <Calendar size={12} className="text-[#f9f7f4]/60" />
              {project.year}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Content: text + specs */}
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="block w-8 h-px bg-[#253d32]" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Le Projet
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-light text-[#4a4a4a] mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#5e5e56] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem" }}
            >
              {project.fullDescription}
            </motion.p>
          </div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="border border-[#2c4a3e]/10 p-8 bg-[#eae6de]">
              <h3
                className="text-[10px] tracking-[0.4em] uppercase text-[#253d32] mb-8"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Données du Projet
              </h3>
              <div className="space-y-6">
                {[
                  { icon: <Ruler size={14} />, label: "Surface", value: project.specs.surface },
                  { icon: <Calendar size={14} />, label: "Durée", value: project.specs.duration },
                  { icon: <MapPin size={14} />, label: "Localisation", value: project.location },
                  { icon: <Users size={14} />, label: "Équipe", value: project.specs.team },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-start gap-4 pb-6 border-b border-[#2c4a3e]/10 last:border-0 last:pb-0">
                    <span className="text-[#253d32] mt-0.5">{spec.icon}</span>
                    <div>
                      <span
                        className="block text-[10px] tracking-[0.25em] uppercase text-[#5e5e56] mb-1"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-[#1a1a1a] font-light"
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem" }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-[1400px] mx-auto px-8 pb-24">
        {project.model3d && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-8 h-px bg-[#253d32]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#253d32]" style={{ fontFamily: "var(--font-inter)" }}>
                Plan 3D Interactif
              </span>
            </div>
            <div className="w-full border border-[#253d32]/10 overflow-hidden" style={{ height: "480px" }}>
              <ModelViewer url={project.model3d} />
            </div>
          </motion.div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
              style={{ height: i === 0 ? "500px" : "360px" }}
            >
              <Image
                src={img}
                alt={`${project.title} — vue ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="py-24 border-t border-[#2c4a3e]/10">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex items-center justify-between mb-16">
              <h2
                className="font-light text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Projets Similaires
              </h2>
              <Link
                href="/projects"
                className="text-[11px] tracking-[0.3em] uppercase text-[#253d32] hover:text-[#1a1a1a] transition-colors duration-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={`/projects/${p.id}`} className="group block relative overflow-hidden" style={{ height: "280px" }}>
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-[#f9f7f4]/60 mb-1" style={{ fontFamily: "var(--font-inter)" }}>{p.category}</p>
                      <h3 className="font-light text-[#f9f7f4] text-2xl" style={{ fontFamily: "var(--font-cormorant)" }}>{p.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
