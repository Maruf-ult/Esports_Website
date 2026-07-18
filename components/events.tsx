const events = [
  {
    title: "Acer Predator League",
    tag: "DOTA 2 / VALORANT",
    season: "BD Qualifiers 2024",
    prize: "৳7,55,000",
  },
  {
    title: "D1 Cup Bangladesh",
    tag: "DOTA 2 / VALORANT / MLBB",
    season: "Season 2",
    prize: "৳40,00,000",
  },
  {
    title: "MLBB Bangladesh Championship",
    tag: "MOBILE LEGENDS",
    season: "Season 1",
    prize: "$1,000",
  },
  {
    title: "Fifa Royale",
    tag: "FIFA",
    season: "Season 1",
    prize: "৳1,50,00,000",
  },
];

export function Events() {
  return (
    <section id="events" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="font-mono text-xs text-arena-muted mb-8">
        FEATURED EVENTS
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((e) => (
          <div
            key={e.title}
            className="border border-arena-border bg-arena-surface p-6 transition-colors duration-200 hover:border-arena-accent"
          >
            <div className="font-mono text-xs text-arena-muted mb-2">
              {e.tag}
            </div>
            <h3 className="text-lg mb-1">{e.title}</h3>
            <div className="text-sm text-arena-muted mb-4">{e.season}</div>
            <div className="border-t border-dashed border-arena-border pt-3 flex justify-between items-center">
              <span className="font-mono text-xs text-arena-muted">
                PRIZEPOOL
              </span>
              <span className="font-mono text-sm text-arena-accent">
                {e.prize}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}