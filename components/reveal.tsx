"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "none";
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  type = "fade-up",
  duration = 0.8,
}: RevealProps) {
  if (type === "none") {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    "fade-up": { y: 24, x: 0 },
    "fade-down": { y: -24, x: 0 },
    "fade-left": { y: 0, x: 24 },
    "fade-right": { y: 0, x: -24 },
    "scale-in": { y: 0, x: 0, scale: 0.94 },
  };

  const selected = directions[type] || directions["fade-up"];

  return (
    <motion.div
      initial={{ opacity: 0, ...selected }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, ...selected },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 16,
            duration,
          }
        }
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 16,
        delay,
        duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealContainer({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}) {
  const words = text.split(" ");
  const Component = as;

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "105%" },
    show: {
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 17,
      },
    },
  };

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden pb-[0.08em] mt-[-0.08em]">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}