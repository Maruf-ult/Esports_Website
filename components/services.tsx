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
      <div className="font-mono text-xs text-arena-muted mb-8">
        WHAT WE DO
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-arena-border">
        {services.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.08}>
            <div className="bg-arena-bg p-8 h-full transition-transform duration-200 hover:-translate-y-1">
              <div className="font-mono text-xs text-arena-accent mb-4">
                {s.tag}
              </div>
              <h3 className="text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-arena-muted leading-relaxed">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}