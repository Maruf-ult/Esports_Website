"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { RevealText } from "@/components/reveal";

const images = [
  { id: "valorant", src: "/images/valorant.jpg", alt: "Valorant" },
  { id: "pubg", src: "/images/pubj.jpg", alt: "PUBG Mobile" },
  { id: "freefire", src: "/images/free_fire.jpeg", alt: "Free Fire" },
  { id: "mlbb", src: "/images/mlbbnew.jpg", alt: "MLBB" },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = images[currentIndex];

  return (
    <section className="relative flex h-[75vh] items-center overflow-hidden px-6 md:h-[80vh] md:px-12">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0 bg-arena-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-center lg:object-[center_20%] hero-img-brightness"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 hero-overlay-bottom z-[1]" />
        <div className="absolute inset-0 hero-overlay-left z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl hero-text">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs text-arena-accent mb-4 tracking-wider"
          >
            SINCE 2021 — LIVE ACROSS SEA
          </motion.div>

          <RevealText
            text="EXCELLENCE YOU EXPECT"
            as="h1"
            delay={0.2}
            className="font-display text-3xl leading-[1.04] sm:text-4xl md:text-6xl font-extrabold uppercase tracking-tight block"
          />
          <RevealText
            text="TRUST YOU KEEP."
            as="h1"
            delay={0.4}
            className="mb-5 font-display text-3xl leading-[1.04] sm:text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-arena-accent block"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md text-sm leading-relaxed text-arena-muted md:text-base"
          >
            Esports events, brand partnerships, broadcasting, and content —
            built for Bangladesh&apos;s gaming industry and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#events"
              className="group relative px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-arena-bg bg-arena-accent overflow-hidden transition-transform active:scale-95 shadow-[0_0_20px_rgba(192,115,255,0.3)] hover:shadow-[0_0_30px_rgba(192,115,255,0.5)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Discover Events
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <a
              href="#contact"
              className="group relative px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-arena-fg border border-arena-border hover:border-arena-accent/50 transition-colors active:scale-95 cursor-pointer bg-arena-surface/40 hover:bg-arena-surface/80"
            >
              Get In Touch
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-arena-accent group-hover:w-full transition-all duration-300" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-6 md:left-12 z-10 flex gap-2 hero-text">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${i === currentIndex
              ? "w-8 bg-arena-accent"
              : "w-4 bg-arena-muted/40 hover:bg-arena-muted"
              }`}
          />
        ))}
      </div>
      <div className="absolute top-6 right-6 md:right-12 z-20">
        <ThemeToggle />
      </div>
    </section>
  );
}
