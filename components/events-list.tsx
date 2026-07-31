"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function EventsList({ events, isFallback = false }: { events: any[], isFallback?: boolean }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredEvents = events.filter((e) => {
    if (activeFilter === "ALL") return true;
    return e.event_format?.toUpperCase() === activeFilter;
  });

  const hasMoreThan4 = filteredEvents.length > 4;
  const hasMoreThan8 = filteredEvents.length > 8;

  let btnWrapperClass = isExpanded ? "hidden" : "mt-10 flex justify-center";

  if (!isExpanded) {
    if (!hasMoreThan4) {
      btnWrapperClass = "hidden";
    } else if (!hasMoreThan8) {
      btnWrapperClass = "mt-10 flex justify-center sm:hidden";
    } else {
      btnWrapperClass = "mt-10 flex justify-center";
    }
  }

  return (
    <>
      {/* Category Tabs */}
      <Reveal>
        <div className="flex items-center justify-center gap-2.5 mb-10">
          {["ALL", "LAN", "ONLINE"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setIsExpanded(false); // Reset expansion when filter changes
                }}
                className={`font-mono text-[10px] tracking-wider font-semibold uppercase px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-arena-accent border-arena-accent text-arena-bg shadow-[0_0_15px_rgba(192,115,255,0.4)]"
                    : "border-arena-border text-arena-muted hover:border-arena-accent/50 hover:text-arena-fg"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-px bg-transparent sm:bg-arena-border overflow-hidden">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((e, i) => {
            const hiddenClass = isExpanded
              ? ""
              : i >= 8
                ? "hidden"
                : i >= 4
                  ? "hidden sm:block"
                  : "";

            const content = (
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className={`bg-arena-surface sm:bg-arena-bg p-5 h-full relative overflow-hidden group ${e.url ? "cursor-pointer" : "cursor-default"} flex flex-col justify-between rounded-lg border border-arena-border sm:rounded-none sm:border-0`}
              >
                {/* Yellow diagonal fill overlay */}
                <div className="absolute inset-0 bg-arena-accent origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {!isFallback && e.banner_image && (
                    <div className="mb-3 relative w-full aspect-video overflow-hidden rounded-sm border border-arena-border group-hover:border-arena-bg/20 transition-colors">
                      <Image
                        src={urlFor(e.banner_image).url()}
                        alt={e.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="font-mono text-[10px] text-arena-muted mb-2 flex justify-between items-center transition-colors duration-300 group-hover:text-arena-bg/70">
                    <span>{e.tagline || e.event_format || "EVENT"}</span>
                    {e.event_format && (
                      <span className="bg-arena-border text-arena-accent px-2 py-0.5 rounded text-[10px] font-semibold uppercase transition-colors duration-300 group-hover:bg-arena-bg group-hover:text-arena-accent">
                        {e.event_format}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-arena-fg transition-colors duration-300 group-hover:text-arena-bg">
                    {e.title}
                  </h3>
                  <div className="text-xs text-arena-muted mb-3 flex-grow transition-colors duration-300 group-hover:text-arena-bg/70">
                    {e.edition}
                  </div>

                  {((!isFallback && (e.prize_pool_amount || e.prize_pool_currency)) || (isFallback && e.prize)) && (
                    <div className="border-t border-dashed border-arena-border group-hover:border-arena-bg/30 pt-3 flex justify-between items-center mt-auto transition-colors duration-300">
                      <span className="font-mono text-[10px] text-arena-muted tracking-wider transition-colors duration-300 group-hover:text-arena-bg/70">
                        PRIZEPOOL
                      </span>
                      <span className="font-mono text-sm font-bold text-arena-accent transition-colors duration-300 group-hover:text-arena-bg">
                        {isFallback ? e.prize : `${e.prize_pool_currency || ""} ${e.prize_pool_amount?.toLocaleString() || ""}`}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );

            return (
              <motion.div
                layout
                key={e._id || e.title}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className={`h-full ${hiddenClass}`}
              >
                {e.url ? (
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="block h-full" aria-label={`Open ${e.title}`}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className={btnWrapperClass}>
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-arena-bg bg-arena-accent overflow-hidden transition-transform active:scale-95 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            See More Events
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </>
  );
}
