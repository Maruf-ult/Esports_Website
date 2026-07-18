import { Reveal } from "@/components/reveal";
import { FaInstagram, FaLinkedin, FaDiscord, FaWhatsapp } from "react-icons/fa";

// Defined interface to make object mapping fully type-safe
interface TeamMember {
  name: string;
  role: string;
  instagram?: string;
  linkedin?: string;
  discord?: string;
  whatsapp?: string;
}

const team: TeamMember[] = [
  {
    name: "AR Rahman Sohan",
    role: "Founder & CEO",
    instagram: "https://www.instagram.com/ar_rahman_sohan",
    linkedin: "https://www.linkedin.com/in/AR-RAHMAN-SOHAN/",
    discord: "https://discord.com/users/486666134725066752",
    whatsapp: "https://wa.me/8801670229737",
  },
  {
    name: "Md Rashid Uz Zaman",
    role: "Founder & COO",
    instagram: "https://instagram.com/ig_puffedrice",
    linkedin: "https://www.linkedin.com/in/md-rashid-uz-zaman",
    discord: "https://discordapp.com/users/440500176017424384",
    whatsapp: "https://wa.me/8801996806227",
  },
  {
    name: "Rafsan Islam",
    role: "Head of Operations",
    instagram: "https://instagram.com/_rosh.malai_",
    linkedin: "https://www.linkedin.com/in/rafsan-islam-38825a204",
    discord: "https://discord.com/users/222766364945809408",
    whatsapp: "https://wa.me/8801715948527",
  },
  {
    name: "Farhan Ashhab Nur",
    role: "Head of Design",
    instagram: "https://instagram.com/darkidop",
    linkedin: "https://www.linkedin.com/in/farhannur/",
    discord: "https://discord.com/users/522340125380706314",
    whatsapp: "https://wa.me/8801868313256",
  },
  {
    name: "Ayaan Shams Siddiquee",
    role: "Head of PR and Contents",
    instagram: "https://www.instagram.com/ayaan.juarez/",
    discord: "https://discord.com/users/527487377061576705",
  },
  {
    name: "Hafiz Istuq Zeshan",
    role: "Chief HR Officer",
    instagram: "https://www.instagram.com/hafizistuq.zeshan/",
    linkedin: "https://www.linkedin.com/in/hafiz-istuq-zeshan-171188190",
    discord: "https://discord.com/users/484028302378663937",
  },
];

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  whatsapp: FaWhatsapp,
};

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 px-6 md:px-12 py-16">
      <div className="font-mono text-xs text-arena-muted mb-8">
        OUR TEAM
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-arena-border">
        {team.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div className="bg-arena-bg p-8 h-full transition-colors duration-200 hover:bg-arena-surface">
              <div className="w-12 h-12 rounded-full bg-arena-surface border border-arena-border flex items-center justify-center font-mono text-sm text-arena-accent mb-4">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="text-base mb-1">{t.name}</h3>
              <p className="font-mono text-xs text-arena-muted mb-4">
                {t.role.toUpperCase()}
              </p>
              <div className="flex gap-3">
                {(Object.keys(iconMap) as Array<keyof typeof iconMap>).map((key) => {
                  const url = t[key];
                  if (!url) return null;
                  const Icon = iconMap[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-arena-muted hover:text-arena-accent transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
