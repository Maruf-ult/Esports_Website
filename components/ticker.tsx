"use client";

import { Reveal } from "@/components/reveal";

const stats = [
  { value: "144+", label: "EVENTS" },
  { value: "80+", label: "CLIENTS" },
  { value: "400+", label: "HOURS STREAMED" },
  { value: "75k+", label: "PLAYERS" },
  { value: "1.1Cr+ BDT", label: "PRIZEPOOL" },
];

export function Ticker() {
  const doubled = [...stats, ...stats];

  return (
    <Reveal>
      <div className="overflow-hidden border-b border-arena-border py-2 bg-arena-surface">
        <div className="flex gap-12 animate-ticker whitespace-nowrap font-mono text-xs text-arena-accent">
          {doubled.map((s, i) => (
            <span key={i}>
              {s.value} <span className="text-arena-muted">{s.label}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}