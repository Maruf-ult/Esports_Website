"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";

// Define TypeScript interfaces for our gallery items
interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  image?: any;
  category: string;
  date?: string;
  imagePath?: string; // Used for fallback images
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const categories = ["ALL", "GATHERING", "TOURNAMENT", "BEHIND THE SCENES"];

const fallbackImages: GalleryImage[] = [
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

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine Sanity images and fallback images if Sanity has no images
  const displayImages = images && images.length > 0 ? images : fallbackImages;

  // Filter images based on active tab
  const filteredImages = displayImages.filter((img) => {
    if (activeCategory === "ALL") return true;
    return img.category.toUpperCase() === activeCategory;
  });

  // Lightbox navigation functions
  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1;
    });
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1;
    });
  }, [lightboxIndex, filteredImages.length]);

  // Bind keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling behind lightbox
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Tabs */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`font-mono text-[10px] tracking-wider font-semibold uppercase px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-arena-accent border-arena-accent text-arena-bg shadow-[0_0_15px_rgba(192,115,255,0.4)]"
                    : "border-arena-border text-arena-muted hover:border-arena-accent/50 hover:text-arena-fg"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Images Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => {
            // Determine the image source URI
            const imageSrc = img.imagePath ? img.imagePath : urlFor(img.image).url();

            return (
              <motion.div
                layout
                key={img._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="group relative aspect-[16/10] overflow-hidden border border-arena-border bg-arena-surface cursor-pointer rounded-lg hover:border-arena-accent/50 transition-all duration-300"
              >
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="w-full h-full relative"
                >
                  {/* Image */}
                  <Image
                    src={imageSrc}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Cyberpunk Grid Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-arena-bg via-arena-bg/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Hover Reveal Card details */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                      <div className="max-w-[85%]">
                        <span className="font-mono text-[9px] font-bold text-arena-accent uppercase tracking-widest block mb-1">
                          {img.category}
                        </span>
                        <h3 className="text-sm font-bold text-arena-fg line-clamp-1 group-hover:text-white transition-colors duration-300">
                          {img.title}
                        </h3>
                        {img.description && (
                          <p className="text-[11px] text-arena-muted line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {img.description}
                          </p>
                        )}
                      </div>
                      {/* Zoom Icon */}
                      <div className="bg-arena-accent text-arena-bg p-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(192,115,255,0.4)]">
                        <ZoomIn size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Dynamic Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
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
                  {filteredImages[lightboxIndex].category}
                </span>
                {filteredImages[lightboxIndex].date && (
                  <span className="font-mono text-[10px] text-arena-muted flex items-center gap-1.5">
                    <Calendar size={11} />
                    {filteredImages[lightboxIndex].date}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleClose}
                className="text-arena-muted hover:text-arena-fg transition-colors p-2 cursor-pointer hover:bg-arena-border/50 rounded-full"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="relative flex-grow flex items-center justify-center my-4 w-full">
              {/* Left navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Middle Image frame */}
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
                    src={
                      filteredImages[lightboxIndex].imagePath
                        ? filteredImages[lightboxIndex].imagePath
                        : urlFor(filteredImages[lightboxIndex].image).url()
                    }
                    alt={filteredImages[lightboxIndex].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Right navigation */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 text-arena-muted hover:text-arena-fg transition-colors p-3 hover:bg-arena-border/50 rounded-full cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Captions */}
            <div className="text-center max-w-2xl mx-auto pb-4 z-10">
              <h2 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-arena-fg">
                {filteredImages[lightboxIndex].title}
              </h2>
              {filteredImages[lightboxIndex].description && (
                <p className="text-xs md:text-sm text-arena-muted mt-2 leading-relaxed">
                  {filteredImages[lightboxIndex].description}
                </p>
              )}
              <div className="font-mono text-[9px] text-arena-muted mt-3 uppercase tracking-wider">
                IMAGE {lightboxIndex + 1} OF {filteredImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
