import { Reveal, RevealContainer, RevealText } from "@/components/reveal";
import { client } from "@/sanity/lib/client";
import { clientsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const fallbackClients = [
  { name: "Vivo" },
  { name: "Airtel" },
  { name: "Axiata" },
  { name: "Bkash" },
  { name: "Daraz" },
  { name: "Oppo" },
  { name: "Realme" },
  { name: "Robi" },
];

interface SanityClient {
  _id: string;
  name?: string;
  logo?: Parameters<typeof urlFor>[0];
  url?: string;
}

export async function Clients() {
  let sanityClients: SanityClient[] = [];
  try {
    sanityClients = await client.fetch<SanityClient[]>(clientsQuery);
  } catch (error) {
    console.error("Failed to fetch clients from Sanity:", error);
  }

  const hasSanityClients = sanityClients && sanityClients.length > 0;

  return (
    <section id="clients" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="font-mono text-[10px] text-arena-muted tracking-[0.24em] mb-3">
          OUR CLIENTS
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-center gap-2.5">
          <span className="text-arena-fg relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-arena-accent">
            <RevealText text="TRUSTED" as="span" />
          </span>
          <RevealText text="PARTNERS" as="span" className="text-arena-accent" />
        </h2>
      </div>

      <RevealContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-arena-border">
        {hasSanityClients
          ? sanityClients.map((c, i) => {
              const content = (
                <div className="bg-arena-bg p-6 flex flex-col items-center justify-center text-arena-muted text-sm tracking-wide h-full min-h-[120px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)] group">
                  <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {c.logo ? (
                    <div className="relative w-24 h-14 mb-2">
                      <Image
                        src={urlFor(c.logo).url()}
                        alt={c.name || "Client logo"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                  {c.name && (
                    <span className="font-mono text-[10px] font-semibold">
                      {c.name.toUpperCase()}
                    </span>
                  )}
                  </div>
                </div>
              );

              return (
                <Reveal key={c._id} type="scale-in" className="h-full">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })
          : fallbackClients.map((c, i) => (
              <Reveal key={c.name} type="scale-in" className="h-full">
                <div className="bg-arena-bg p-6 flex items-center justify-center text-arena-muted text-xs font-mono tracking-wider h-full min-h-[120px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                  <span>
                    {c.name.toUpperCase()}
                  </span>
                </div>
              </Reveal>
            ))}
      </RevealContainer>
    </section>
  );
}
