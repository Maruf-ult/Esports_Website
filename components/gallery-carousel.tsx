"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ZoomIn, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  image?: any;
  category: string;
  date?: string;
  imagePath?: string;
}

const fallbackImages: GalleryItem[] = [
  {
    _id: "fb-1",
    title: "Esports Community Meetup 2026",
    description: "RTD Esports players, staff, and gaming enthusiasts gathering together for a group photo at our local lounge meet.",
    category: "Gathering",
    date: "2026-05-15",
    imagePath: "/images/gallery/gathering.png"
  },
  {
    _id: "fb-2",
    title: "Predator League Grand Finals Stage",
    description: "The championship stage lit up in purple and blue neon, with players on rig setups and fans filling the arena.",
    category: "Tournament",
    date: "2026-06-20",
    imagePath: "/images/gallery/tournament.png"
  },
  {
    _id: "fb-3",
    title: "Broadcast Production Control Room",
    description: "Behind the scenes with our live streaming crew monitoring multi-camera feeds and broadcasting match overlays.",
    category: "Behind the Scenes",
    date: "2026-07-02",
    imagePath: "/images/gallery/behind_scenes.png"
  }
];

function getOffset(index: number, activeIndex: number, length: number) {
  const offset = index - activeIndex;
  const half = Math.floor(length / 2);
  if (offset > half) return offset - length;
  if (offset < -half) return offset + length;
  return offset;
}

export function GalleryCarousel({ images }: { images: GalleryItem[] }) {
  const displayImages = images && images.length > 0 ? images : fallbackImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const move = useCallback(
    (direction: number) =>
      setActiveIndex((current) => (current + direction + displayImages.length) % displayImages.length),
    [displayImages.length],
  );

  useEffect(() => {
    if (isPaused || lightboxOpen || displayImages.length < 2) return;
    const timer = window.setInterval(() => move(1), 4000);
    return () => window.clearInterval(timer);
  }, [isPaused, lightboxOpen, displayImages.length, move]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen, move]);

  if (!displayImages.length) return null;

  const activeImage = displayImages[activeIndex];
  const activeImageSrc = activeImage.imagePath
    ? activeImage.imagePath
    : urlFor(activeImage.image).url();

  return (
    <>
      <motion.div
        className="relative h-[380px] overflow-hidden cursor-grab touch-pan-y select-none sm:h-[440px] active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) >= 35) move(info.offset.x < 0 ? 1 : -1);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        aria-label="Event showcase carousel. Drag left or right to browse events."
      >
        {displayImages.map((item, index) => {
          const offset = getOffset(index, activeIndex, displayImages.length);
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const imageSrc = item.imagePath ? item.imagePath : urlFor(item.image).url();

          return (
            <motion.article
              key={item._id}
              className={`absolute top-2 left-1/2 h-[340px] w-[280px] -ml-[140px] overflow-hidden rounded-xl border bg-arena-surface shadow-2xl transition-colors sm:h-[400px] sm:w-[360px] sm:-ml-[180px] ${
                isActive
                  ? "border-arena-border hover:border-arena-accent hover:shadow-[0_0_0_2px_rgba(192,115,255,0.18),0_20px_44px_rgba(0,0,0,0.42)]"
                  : "border-arena-border"
              }`}
              animate={{
                x: offset * 300,
                scale: isActive ? 1 : distance === 1 ? 0.86 : 0.74,
                opacity: isActive ? 1 : distance === 1 ? 0.58 : 0.2,
                filter: isActive ? "brightness(1)" : "brightness(0.55)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              style={{ zIndex: 10 - distance, pointerEvents: isActive ? "auto" : "none" }}
            >
              <div
                className="relative h-full group cursor-pointer"
                onClick={() => {
                  if (isActive) setLightboxOpen(true);
                }}
              >
                {/* Image */}
                <Image
                  src={imageSrc}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(min-width: 640px) 360px, 280px"
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-arena-bg via-arena-bg/30 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="font-mono text-[9px] font-bold text-arena-bg bg-arena-accent px-2 py-1 rounded uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>

                {/* Zoom icon on hover */}
                <div className="absolute top-3 right-3 z-10 bg-arena-accent text-arena-bg p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(192,115,255,0.4)]">
                  <ZoomIn size={14} />
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <h3 className="font-display text-base sm:text-lg font-extrabold leading-tight text-arena-fg line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 font-mono text-[10px] text-arena-muted line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-arena-accent flex items-center justify-center gap-1">
                      <Calendar size={10} />
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {displayImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "bg-arena-accent w-6 shadow-[0_0_8px_rgba(192,115,255,0.5)]"
                : "bg-arena-border hover:bg-arena-muted"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-arena-bg/95 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Header Controls */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-arena-accent bg-arena-border px-2.5 py-1 rounded font-bold uppercase tracking-widest">
                  {activeImage.category}
                </span>
                {activeImage.date && (
                  <span className="font-mono text-[10px] text-arena-muted flex items-center gap-1.5">
                    <Calendar size={11} />
                    {activeImage.date}
                  </span>
                )}
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="text-arena-muted hover:text-arena-fg transition-colors p-2 cursor-pointer hover:bg-arena-border/50 rounded-full"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative flex-grow flex items-center justify-center my-4 w-full">
              <button
                onClick={() => move(-1)}
                className="absolute left-2 sm:left-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative w-full max-w-5xl h-[55vh] md:h-[65vh]"
                >
                  <Image
                    src={activeImageSrc}
                    alt={activeImage.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => move(1)}
                className="absolute right-2 sm:right-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Captions */}
            <div className="text-center max-w-2xl mx-auto pb-4 z-10">
              <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-arena-fg">
                {activeImage.title}
              </h2>
              {activeImage.description && (
                <p className="text-xs md:text-sm text-arena-muted mt-2 leading-relaxed">
                  {activeImage.description}
                </p>
              )}
              <div className="font-mono text-[9px] text-arena-muted mt-3 uppercase tracking-wider">
                IMAGE {activeIndex + 1} OF {displayImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
