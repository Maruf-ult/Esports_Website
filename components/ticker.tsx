"use client";

const stats = [
  { value: "93", label: "EVENTS" },
  { value: "26+", label: "CLIENTS" },
  { value: "1,274+", label: "HOURS STREAMED" },
  { value: "76K+", label: "PLAYERS" },
  { value: "1.71Cr+ BDT", label: "PRIZEPOOL" },
];

export function Ticker() {
  const doubled = [...stats, ...stats];

  return (
    <div className="overflow-hidden border-b border-arena-border py-2 bg-arena-surface">
      <div className="flex gap-12 animate-ticker whitespace-nowrap font-mono text-xs text-arena-accent">
        {doubled.map((s, i) => (
          <span key={i}>
            {s.value} <span className="text-arena-muted">{s.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}