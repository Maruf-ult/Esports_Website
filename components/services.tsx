"use client";

import { Reveal } from "@/components/reveal";

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
      <Reveal>
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
            <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
              WHAT
            </span>
            <span className="text-arena-accent">WE DO</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-arena-border">
        {services.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.08}>
            <div className="service-card bg-arena-bg p-8 h-full relative overflow-hidden group cursor-default">
              {/* Yellow diagonal fill overlay */}
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}