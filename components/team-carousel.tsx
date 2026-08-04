"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

export interface TeamMember {
  name: string;
  role: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  discord?: string;
  whatsapp?: string;
  photoUrl?: string;
}

const iconMap = { instagram: FaInstagram, facebook: FaFacebook, twitter: FaTwitter, linkedin: FaLinkedin, discord: FaDiscord, whatsapp: FaWhatsapp };

function getOffset(index: number, activeIndex: number, length: number) {
  const offset = index - activeIndex;
  const half = Math.floor(length / 2);
  if (offset > half) return offset - length;
  if (offset < -half) return offset + length;
  return offset;
}

export function TeamCarousel({ members, initialIndex = 0, featuredDurationMs = 15000 }: { members: TeamMember[]; initialIndex?: number; featuredDurationMs?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const move = useCallback(
    (direction: number) => setActiveIndex((current) => (current + direction + members.length) % members.length),
    [members.length],
  );

  useEffect(() => {
    if (!isInView || isPaused || members.length < 2) return;

    // Featured card stays visible longer every time it appears, starting when scrolled into view
    const delay = activeIndex === initialIndex ? featuredDurationMs : 3500;
    const timer = window.setTimeout(() => move(1), delay);
    return () => window.clearTimeout(timer);
  }, [isInView, isPaused, members.length, move, activeIndex, initialIndex, featuredDurationMs]);

  if (!members.length) return null;

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[360px] overflow-hidden cursor-grab touch-pan-y select-none sm:h-[410px] active:cursor-grabbing"
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
      aria-label="Team member carousel. Drag left or right to browse members."
    >
      {members.map((member, index) => {
        const offset = getOffset(index, activeIndex, members.length);
        const distance = Math.abs(offset);
        const isActive = offset === 0;

        return (
          <motion.article
            key={member.name}
            className={`absolute top-2 left-1/2 h-[320px] w-[210px] -ml-[105px] overflow-hidden rounded-xl border bg-arena-surface shadow-2xl transition-colors sm:h-[370px] sm:w-[260px] sm:-ml-[130px] ${
              isActive
                ? "border-arena-border hover:border-arena-accent hover:shadow-[0_0_0_2px_rgba(232,255,60,0.18),0_20px_44px_rgba(0,0,0,0.42)]"
                : "border-arena-border"
            }`}
            animate={{ x: offset * 230, scale: isActive ? 1 : distance === 1 ? 0.86 : 0.74, opacity: isActive ? 1 : distance === 1 ? 0.58 : 0.2, filter: isActive ? "brightness(1)" : "brightness(0.55)" }}
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
            style={{ zIndex: 10 - distance, pointerEvents: isActive ? "auto" : "none" }}
          >
            <div className="relative h-full">
              {member.photoUrl ? (
                <Image src={member.photoUrl} alt={member.name} fill unoptimized sizes="(min-width: 640px) 260px, 210px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_#303446,_#141519_65%)] font-display text-6xl font-extrabold text-arena-accent">
                  {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-arena-bg via-arena-bg/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <h3 className="font-display text-lg font-extrabold leading-tight text-arena-fg">{member.name}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-arena-accent">{member.role.toUpperCase()}</p>
                <div className="mt-4 flex justify-center gap-3">
                  {(Object.keys(iconMap) as Array<keyof typeof iconMap>).map((key) => {
                    const url = member[key];
                    if (!url) return null;
                    const Icon = iconMap[key];
                    return <a key={key} href={url} target="_blank" rel="noopener noreferrer" onPointerDown={(event) => event.stopPropagation()} className="cursor-pointer text-arena-fg transition-all hover:scale-110 hover:text-arena-accent" aria-label={`${member.name} on ${key}`}><Icon size={17} /></a>;
                  })}
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
