import { Reveal } from "@/components/reveal";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const fallbackEvents = [
  {
    title: "Acer Predator League",
    tagline: "DOTA 2 / VALORANT",
    edition: "BD Qualifiers 2024",
    prize: "৳7,55,000",
  },
  {
    title: "D1 Cup Bangladesh",
    tagline: "DOTA 2 / VALORANT / MLBB",
    edition: "Season 2",
    prize: "৳40,00,000",
  },
  {
    title: "MLBB Bangladesh Championship",
    tagline: "MOBILE LEGENDS",
    edition: "Season 1",
    prize: "$1,000",
  },
  {
    title: "Fifa Royale",
    tagline: "FIFA",
    edition: "Season 1",
    prize: "৳1,50,00,000",
  },
];

export async function Events() {
  let sanityEvents: any[] = [];
  try {
    sanityEvents = await client.fetch(eventsQuery);
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }

  const hasSanityEvents = sanityEvents && sanityEvents.length > 0;

  return (
    <section id="events" className="scroll-mt-24 px-6 md:px-12 py-16">
      <Reveal>
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
            <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
              FEATURED
            </span>
            <span className="text-arena-accent">EVENTS</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-arena-border">
        {hasSanityEvents
          ? sanityEvents.map((e, i) => {
            const content = (
              <div className={`bg-arena-bg p-5 h-full relative overflow-hidden group ${e.url ? "cursor-pointer" : "cursor-default"}`}>
                {/* Yellow diagonal fill overlay */}
                <div className="absolute inset-0 bg-arena-accent origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full cursor-pointer">
                  {e.banner_image && (
                    <div className="mb-3 relative w-full h-32 overflow-hidden rounded-sm border border-arena-border group-hover:border-arena-bg/20 transition-colors">
                      <Image
                        src={urlFor(e.banner_image).url()}
                        alt={e.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                  {(e.prize_pool_amount || e.prize_pool_currency) && (
                    <div className="border-t border-dashed border-arena-border group-hover:border-arena-bg/30 pt-3 flex justify-between items-center mt-auto transition-colors duration-300">
                      <span className="font-mono text-[10px] text-arena-muted tracking-wider transition-colors duration-300 group-hover:text-arena-bg/70">
                        PRIZEPOOL
                      </span>
                      <span className="font-mono text-sm font-bold text-arena-accent transition-colors duration-300 group-hover:text-arena-bg">
                        {e.prize_pool_currency || ""} {e.prize_pool_amount?.toLocaleString() || ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <Reveal key={e._id || e.title} delay={i * 0.08} className="h-full">
                {e.url ? (
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="block h-full" aria-label={`Open ${e.title}`}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })
          : fallbackEvents.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08} className="h-full">
              <div className="bg-arena-bg p-5 h-full relative overflow-hidden group cursor-default flex flex-col justify-between">
                {/* Yellow diagonal fill overlay */}
                <div className="absolute inset-0 bg-arena-accent origin-top-left scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="font-mono text-[10px] text-arena-muted mb-2 transition-colors duration-300 group-hover:text-arena-bg/70">
                    {e.tagline}
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-arena-fg transition-colors duration-300 group-hover:text-arena-bg">
                    {e.title}
                  </h3>
                  <div className="text-xs text-arena-muted mb-3 flex-grow transition-colors duration-300 group-hover:text-arena-bg/70">
                    {e.edition}
                  </div>
                  <div className="border-t border-dashed border-arena-border group-hover:border-arena-bg/30 pt-3 flex justify-between items-center mt-auto transition-colors duration-300">
                    <span className="font-mono text-[10px] text-arena-muted tracking-wider transition-colors duration-300 group-hover:text-arena-bg/70">
                      PRIZEPOOL
                    </span>
                    <span className="font-mono text-sm font-bold text-arena-accent transition-colors duration-300 group-hover:text-arena-bg">
                      {e.prize}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
      </div>
    </section>
  );
}
