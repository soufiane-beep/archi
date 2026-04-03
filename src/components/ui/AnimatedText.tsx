"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  once = true,
  tag: Tag = "p",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="overflow-hidden"
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span variants={wordVariant} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
