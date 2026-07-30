import { Reveal, RevealText } from "@/components/reveal";
import { client } from "@/sanity/lib/client";
import { eventsQuery } from "@/sanity/lib/queries";
import { EventsList } from "./events-list";

const fallbackEvents = [
  {
    title: "Acer Predator League",
    tagline: "DOTA 2 / VALORANT",
    edition: "BD Qualifiers 2024",
    prize: "৳7,55,000",
    event_format: "LAN",
  },
  {
    title: "D1 Cup Bangladesh",
    tagline: "DOTA 2 / VALORANT / MLBB",
    edition: "Season 2",
    prize: "৳40,00,000",
    event_format: "LAN",
  },
  {
    title: "MLBB Bangladesh Championship",
    tagline: "MOBILE LEGENDS",
    edition: "Season 1",
    prize: "$1,000",
    event_format: "Online",
  },
  {
    title: "Fifa Royale",
    tagline: "FIFA",
    edition: "Season 1",
    prize: "৳1,50,00,000",
    event_format: "Online",
  },
];

export async function Events() {
  let sanityEvents: any[] = [];
  try {
    // Artificial delay to demonstrate the skeleton loading state
    await new Promise((resolve) => setTimeout(resolve, 2500));
    sanityEvents = await client.fetch(eventsQuery);
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }

  const hasSanityEvents = sanityEvents && sanityEvents.length > 0;

  return (
    <section id="events" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
          <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
            <RevealText text="FEATURED" as="span" />
          </span>
          <RevealText text="EVENTS" as="span" className="text-arena-accent" />
        </h2>
      </div>

      {hasSanityEvents ? (
        <EventsList events={sanityEvents} />
      ) : (
        <EventsList events={fallbackEvents} isFallback />
      )}
    </section>
  );
}

export function EventsSkeleton() {
  return (
    <section className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
          <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent/50">
            FEATURED
          </span>
          <span className="text-arena-accent/50">EVENTS</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-arena-border">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-arena-bg p-5 h-full relative overflow-hidden flex flex-col min-h-[300px]">
            <div className="flex flex-col h-full animate-pulse">
              {/* Image Skeleton */}
              <div className="w-full aspect-video bg-arena-border/30 mb-3 rounded-sm"></div>
              
              {/* Tagline Skeleton */}
              <div className="h-3 w-1/3 bg-arena-border/40 mb-3 rounded-sm"></div>
              
              {/* Title Skeleton */}
              <div className="h-4 w-4/5 bg-arena-border/50 mb-2 rounded-sm"></div>
              <div className="h-4 w-2/3 bg-arena-border/50 mb-2 rounded-sm"></div>
              
              {/* Edition Skeleton */}
              <div className="h-3 w-1/2 bg-arena-border/30 mb-4 rounded-sm flex-grow"></div>
              
              {/* Prize Pool Skeleton */}
              <div className="border-t border-dashed border-arena-border/50 pt-3 flex justify-between items-center mt-auto">
                <div className="h-3 w-16 bg-arena-border/40 rounded-sm"></div>
                <div className="h-4 w-24 bg-arena-border/50 rounded-sm"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
