"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export interface GalleryTickerItem {
  _id: string;
  image?: any;
  imagePath?: string;
}

const fallbackImages: GalleryTickerItem[] = [
  { _id: "fb-1", imagePath: "/images/gallery/gathering.png" },
  { _id: "fb-2", imagePath: "/images/gallery/tournament.png" },
  { _id: "fb-3", imagePath: "/images/gallery/behind_scenes.png" },
];

function getImageSrc(item: GalleryTickerItem): string {
  return item.imagePath ? item.imagePath : urlFor(item.image).width(600).url();
}

function getFullImageSrc(item: GalleryTickerItem): string {
  return item.imagePath ? item.imagePath : urlFor(item.image).width(1400).url();
}

// ─── Ticker row ─────────────────────────────────────────────────────────────
// Renders two copies of the image strip side-by-side and uses CSS animation
// to translate the first copy left by 100 % of its own width, creating a
// seamless infinite loop. On hover of any card the animation pauses.

export function GalleryTicker({ images }: { images: GalleryTickerItem[] }) {
  const displayImages =
    images && images.length > 0 ? images : fallbackImages;

  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // We need a unique list for lightbox navigation
  const uniqueImages = displayImages;

  // ── Lightbox helpers ────────────────────────────────────────────────────
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index % uniqueImages.length);
  }, [uniqueImages.length]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const moveLightbox = useCallback(
    (dir: number) =>
      setLightboxIndex((prev) =>
        prev === null ? null : (prev + dir + uniqueImages.length) % uniqueImages.length
      ),
    [uniqueImages.length]
  );

  // Keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, closeLightbox, moveLightbox]);

  // ── Compute animation duration based on image count ─────────────────────
  const speed = Math.max(displayImages.length * 4, 16); // seconds per full cycle

  return (
    <>
      {/* Ticker strip */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Gradient masks on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-arena-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-arena-bg to-transparent" />

        <div
          className="flex w-max ticker-track"
          style={{
            animationDuration: `${speed}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* Render the strip twice for seamless loop */}
          {[0, 1].map((copy) =>
            displayImages.map((item, i) => {
              const globalIndex = copy * displayImages.length + i;
              return (
                <div
                  key={`${item._id}-${copy}`}
                  className="shrink-0 px-2"
                >
                  <div
                    className="group relative h-[220px] w-[300px] sm:h-[280px] sm:w-[380px] rounded-xl overflow-hidden border border-arena-border bg-arena-surface cursor-pointer transition-all duration-300 hover:border-arena-accent hover:shadow-[0_0_20px_rgba(192,115,255,0.25)] hover:scale-[1.03]"
                    onClick={() => openLightbox(globalIndex)}
                  >
                    <Image
                      src={getImageSrc(item)}
                      alt={`Event photo ${i + 1}`}
                      fill
                      unoptimized
                      sizes="(min-width: 640px) 380px, 300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-arena-bg/0 group-hover:bg-arena-bg/30 transition-colors duration-300" />

                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 z-10 bg-arena-accent text-arena-bg p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(192,115,255,0.4)]">
                      <ZoomIn size={14} />
                    </div>

                    {/* Bottom shine line */}
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-arena-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Inline style for the ticker keyframe */}
      <style jsx>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          animation: ticker-scroll linear infinite;
        }
      `}</style>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-arena-bg/95 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Header */}
            <div className="flex justify-end items-center w-full max-w-7xl mx-auto z-10">
              <button
                onClick={closeLightbox}
                className="text-arena-muted hover:text-arena-fg transition-colors p-2 cursor-pointer hover:bg-arena-border/50 rounded-full"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main image stage */}
            <div className="relative flex-grow flex items-center justify-center my-4 w-full">
              <button
                onClick={() => moveLightbox(-1)}
                className="absolute left-2 sm:left-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative w-full max-w-5xl h-[55vh] md:h-[65vh]"
                >
                  <Image
                    src={getFullImageSrc(uniqueImages[lightboxIndex])}
                    alt={`Event photo ${lightboxIndex + 1}`}
                    fill
                    sizes="(min-width: 1024px) 1000px, 90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => moveLightbox(1)}
                className="absolute right-2 sm:right-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom counter */}
            <div className="text-center max-w-2xl mx-auto pb-4 z-10">
              <div className="font-mono text-[9px] text-arena-muted uppercase tracking-wider">
                IMAGE {lightboxIndex + 1} OF {uniqueImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
