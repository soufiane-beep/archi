"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section data-header-theme="dark" className="py-32 px-8 bg-[#1e3530]" style={{ clipPath: "polygon(0 2%, 100% 0%, 100% 100%, 0 100%)" }}>
      <div ref={ref} className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 pt-8">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="flex items-center gap-4 mb-6"
            >
              <span className="block w-8 h-px bg-[#8aaf9f]/60" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#8aaf9f]">
                Expertises
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1 }}
              >
                Un Savoir-Faire Global
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 flex items-end justify-end"
          >
            <Link
              href="/domaines"
              className="font-body group flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8aaf9f] hover:text-white transition-colors duration-300"
            >
              Toutes nos expertises
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Services list */}
        <div className="border-t border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group flex items-start md:items-center justify-between gap-8 py-8 pl-4 pr-0 border-b border-white/10 cursor-default transition-all duration-500 border-l-2 ${
                hovered === i ? "border-l-[#8aaf9f]" : "border-l-transparent"
              }`}
            >
              <div className="flex items-start md:items-center gap-8 md:gap-12 flex-1">
                {/* Number */}
                <span className="font-body text-[11px] tracking-[0.2em] text-[#8aaf9f]/40 font-light mt-1 md:mt-0 shrink-0">
                  {service.number}
                </span>

                {/* Title */}
                <h3
                  className={`font-display font-light transition-colors duration-300 ${
                    hovered === i ? "text-[#8aaf9f]" : "text-white"
                  }`}
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                >
                  {service.title}
                </h3>

                {/* Description (visible on hover) */}
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={hovered === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-body hidden lg:block text-sm text-[#8aaf9f]/70 max-w-md"
                >
                  {service.description}
                </motion.p>
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hovered === i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 border border-[#8aaf9f]/40 flex items-center justify-center shrink-0"
              >
                <ArrowUpRight size={14} className="text-[#8aaf9f]" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
