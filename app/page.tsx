import { Nav } from "@/components/nav";
import { Ticker } from "@/components/ticker";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Events, EventsSkeleton } from "@/components/events";
import { Clients } from "@/components/clients";
import { Team } from "@/components/team";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Suspense } from "react";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Ticker />
      <Hero />
      <Services />
      <Gallery />
      <Suspense fallback={<EventsSkeleton />}>
        <Events />
      </Suspense>
      <Clients />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}