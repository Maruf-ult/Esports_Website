"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-arena-accent mb-4 tracking-wider">
            SINCE 2021 — LIVE ACROSS SEA
          </div>

          <h1 className="mb-5 font-display text-3xl leading-[1.04] sm:text-4xl md:text-6xl">
            EXCELLENCE YOU EXPECT
            <br />
            <span className="text-arena-accent">TRUST YOU KEEP.</span>
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-arena-muted md:text-base">
            Esports events, brand partnerships, broadcasting, and content —
            built for Bangladesh&apos;s gaming industry and beyond.
          </p>
        </motion.div>
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
