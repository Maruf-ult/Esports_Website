import { Reveal } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaDiscord, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-16 pb-10 border-t border-arena-border bg-arena-bg overflow-hidden">
      <Reveal>
        <div className="max-w-7xl mx-auto">
          {/* Top Footer 4 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
            
            {/* Column 1: Brand & Mission (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-arena-surface border border-arena-border flex items-center justify-center font-display text-sm font-bold text-arena-accent">
                  Z
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-arena-fg">
                  ZENETIC<span className="text-arena-accent">.</span>
                </span>
              </div>
              <p className="text-xs md:text-sm text-arena-muted max-w-sm leading-relaxed">
                360° Esports solutions agency focusing to accelerate competitive gaming, live broadcasts, and brand partnerships across South East Asia.
              </p>
              <ThemeToggle />
            </div>

            {/* Column 2: Navigation Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-arena-fg">
                BROWSE
              </h4>
              <ul className="space-y-2 text-xs font-mono text-arena-muted">
                <li>
                  <a href="#top" className="hover:text-arena-accent transition-colors">Home</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-arena-accent transition-colors">Services</a>
                </li>
                <li>
                  <a href="#events" className="hover:text-arena-accent transition-colors">Featured Events</a>
                </li>
                <li>
                  <a href="#clients" className="hover:text-arena-accent transition-colors">Clients</a>
                </li>
                <li>
                  <a href="#team" className="hover:text-arena-accent transition-colors">Our Team</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-arena-fg">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-xs font-mono text-arena-muted">
                <li>
                  <a href="#events" className="hover:text-arena-accent transition-colors">All Events</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-arena-accent transition-colors">Media Kit</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-arena-accent transition-colors">Careers</a>
                </li>
                <li>
                  <span className="hover:text-arena-accent transition-colors cursor-pointer">Privacy Policy</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-arena-fg">
                CONTACT INFO
              </h4>
              <div className="space-y-2 text-xs font-mono text-arena-muted leading-relaxed">
                <div>
                  <span className="text-arena-accent font-semibold">Address: </span>
                  <span>House 77, Rd No 9, Dhaka 1212</span>
                </div>
                <div>
                  <span className="text-arena-accent font-semibold">Email: </span>
                  <span>contact@zenetic-esports.com</span>
                </div>
                <div>
                  <span className="text-arena-accent font-semibold">Region: </span>
                  <span>Bangladesh & SEA Operations</span>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-arena-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="font-mono text-xs text-arena-muted">
              © 2026 ZENETIC ESPORTS • ALL RIGHTS RESERVED
            </span>

            {/* Social Links Bar */}
            <div className="flex items-center gap-4 text-arena-muted">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="LinkedIn">
                <FaLinkedin size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-arena-accent transition-colors p-1" title="Discord">
                <FaDiscord size={16} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
