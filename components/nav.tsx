"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Services", "Events", "Clients", "Team", "Contact"];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-arena-bg/90 backdrop-blur-sm px-6 md:px-12 py-6 border-b border-arena-border">
      <div className="flex items-center justify-between">
        <a
          href="#top"
          className="cursor-pointer font-display text-lg tracking-wide hover:text-arena-accent transition-colors"
        >
          ZENETIC<span className="text-arena-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm text-arena-muted">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="cursor-pointer hover:text-arena-fg transition-colors"
            >
              {link.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-arena-fg cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 pt-6 text-sm text-arena-muted">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-arena-fg transition-colors"
            >
              {link.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
