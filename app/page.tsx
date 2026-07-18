import { Nav } from "@/components/nav";
import { Ticker } from "@/components/ticker";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Events } from "@/components/events";
import { Clients } from "@/components/clients";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Ticker />
      <Hero />
      <Services />
      <Reveal>
        <Events />
      </Reveal>
      <Reveal>
        <Clients />
      </Reveal>
      <Team />
      <Reveal>
        <Contact />
      </Reveal>
      <Footer />
    </main>
  );
}