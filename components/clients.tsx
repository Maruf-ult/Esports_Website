const clients = [
  "Vivo",
  "Airtel",
  "Axiata",
  "Bkash",
  "Daraz",
  "Oppo",
  "Realme",
  "Robi",
];

export function Clients() {
  return (
    <section id="clients" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="font-mono text-xs text-arena-muted mb-8">
        OUR CLIENTS
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-arena-border">
        {clients.map((c) => (
          <div
            key={c}
            className="bg-arena-bg p-8 flex items-center justify-center text-arena-muted text-sm tracking-wide transition-colors duration-200 hover:text-arena-fg"
          >
            {c.toUpperCase()}
          </div>
        ))}
      </div>
    </section>
  );
}