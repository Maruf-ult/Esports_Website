"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = ["Services", "Events", "Clients", "Team", "Gallery", "Contact"];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => link.toLowerCase());
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-arena-bg/90 backdrop-blur-sm px-6 md:px-12 py-2 border-b border-arena-border">
      <div className="flex items-center justify-between">
        <a
          href="#top"
          className="cursor-pointer flex items-center"
        >
          <div className="logo-mask h-13 w-20" aria-label="Logo" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm text-arena-muted">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`group relative cursor-pointer hover:text-arena-fg transition-colors pb-1 ${isActive ? "text-arena-fg" : ""
                  }`}
              >
                {link.toUpperCase()}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-arena-accent transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </a>
            );
          })}
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
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`group relative w-fit cursor-pointer hover:text-arena-fg transition-colors pb-1 ${isActive ? "text-arena-fg" : ""
                  }`}
              >
                {link.toUpperCase()}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-arena-accent transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
