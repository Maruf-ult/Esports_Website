"use client";

import { Reveal, RevealContainer, RevealText } from "@/components/reveal";
import { motion } from "framer-motion";

const services = [
  {
    tag: "EVENTS",
    title: "Esports Events",
    desc: "LAN and online tournaments run end to end across five SEA markets.",
  },
  {
    tag: "BRAND",
    title: "Esports Branding",
    desc: "Connecting brands and investors into the competitive gaming scene.",
  },
  {
    tag: "CAST",
    title: "Broadcasting",
    desc: "In-house studio and crew delivering premium stream production.",
  },
  {
    tag: "MEDIA",
    title: "Content Production",
    desc: "Fast turnaround creative built for the pace of live esports.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
          <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
            <RevealText text="WHAT" as="span" />
          </span>
          <RevealText text="WE DO" as="span" className="text-arena-accent" />
        </h2>
      </div>

      <RevealContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-px bg-transparent sm:bg-arena-border">
        {services.map((s, i) => (
          <Reveal key={s.tag} type="scale-in">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="service-card bg-arena-surface sm:bg-arena-bg p-8 h-full relative overflow-hidden group cursor-default rounded-lg border border-arena-border sm:rounded-none sm:border-0"
            >
              <div className="absolute inset-0 bg-arena-accent origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" />

              {/* Content */}
              <div className="relative z-10">
                <div className="font-mono text-xs text-arena-accent mb-4 transition-colors duration-300 group-hover:text-arena-bg">
                  {s.tag}
                </div>
                <h3 className="text-lg mb-2 transition-colors duration-300 group-hover:text-arena-bg font-semibold">
                  {s.title}
                </h3>
                <p className="text-sm text-arena-muted leading-relaxed transition-colors duration-300 group-hover:text-arena-bg/70">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </RevealContainer>
    </section>
  );
}