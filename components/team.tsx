import { Reveal } from "@/components/reveal";
import { TeamCarousel, type TeamMember } from "@/components/team-carousel";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";

const fallbackTeam: TeamMember[] = [
  { name: "Afk", role: "Founder & CEO", instagram: "https://www.instagram.com/ar_rahman_sohan", linkedin: "https://www.linkedin.com/in/AR-RAHMAN-SOHAN/", discord: "https://discord.com/users/486666134725066752", whatsapp: "https://wa.me/8801670229737" },
  { name: "afk", role: "Founder & COO", instagram: "https://instagram.com/ig_puffedrice", linkedin: "https://www.linkedin.com/in/md-rashid-uz-zaman", discord: "https://discordapp.com/users/440500176017424384", whatsapp: "https://wa.me/8801996806227" },
  { name: "afk", role: "Head of Operations", instagram: "https://instagram.com/_rosh.malai_", linkedin: "https://www.linkedin.com/in/rafsan-islam-38825a204", discord: "https://discord.com/users/222766364945809408", whatsapp: "https://wa.me/8801715948527" },
  { name: "afk", role: "Head of Design", instagram: "https://instagram.com/darkidop", linkedin: "https://www.linkedin.com/in/farhannur/", discord: "https://discord.com/users/522340125380706314", whatsapp: "https://wa.me/8801868313256" },
  { name: "afk", role: "Head of PR and Contents", instagram: "https://www.instagram.com/ayaan.juarez/", discord: "https://discord.com/users/527487377061576705" },
  { name: "afk", role: "Chief HR Officer", instagram: "https://www.instagram.com/hafizistuq.zeshan/", linkedin: "https://www.linkedin.com/in/hafiz-istuq-zeshan-171188190", discord: "https://discord.com/users/484028302378663937" },
];

interface SanityMember {
  name?: string;
  designation?: string;
  photo?: Parameters<typeof urlFor>[0];
  socials?: Omit<TeamMember, "name" | "role" | "photoUrl">;
}

export async function Team() {
  let sanityMembers: SanityMember[] = [];
  try {
    sanityMembers = await client.fetch<SanityMember[]>(teamMembersQuery);
  } catch (error) {
    console.error("Failed to fetch team members from Sanity:", error);
  }

  const displayTeam: TeamMember[] = sanityMembers.length
    ? sanityMembers.map((member) => ({
      name: member.name || "Team Member",
      role: member.designation || "Team Member",
      ...member.socials,
      photoUrl: member.photo ? urlFor(member.photo).url() : undefined,
    }))
    : fallbackTeam;

  // Find the Executive Director so the carousel starts on that card
  const featuredIndex = displayTeam.findIndex(
    (m) => m.role.toLowerCase().includes("executive director"),
  );

  return (
    <section id="team" className="scroll-mt-24 px-6 py-16 md:px-12">
      <Reveal>
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-3 font-mono text-[10px] tracking-[0.24em] text-arena-muted">THE PEOPLE BEHIND THE PLAY</div>
          <h2 className="flex items-center justify-center gap-2.5 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            <span className="relative pb-1.5 text-arena-fg after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-arena-accent after:content-['']">OUR</span>
            <span className="text-arena-accent">TEAM</span>
          </h2>
        </div>
      </Reveal>
      <Reveal>
        <TeamCarousel
          members={displayTeam}
          initialIndex={featuredIndex >= 0 ? featuredIndex : 0}
          featuredDurationMs={10000}
        />
      </Reveal>
    </section>
  );
}
