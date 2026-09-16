import Image from "next/image";
import { Linkedin } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { team } from "@/data/team";
import type { Locale } from "@/i18n/config";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="team" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--accent)" }}
              >
                {dict.about.eyebrow}
              </p>
              <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
                {dict.about.title}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                {dict.about.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 relative aspect-4/3 rounded-2xl overflow-hidden hidden lg:block">
                <Image
                  src="/images/about-office.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {team.map((member, i) => (
              <Reveal key={member.slug} delay={i * 0.08}>
                <article
                  className="h-full rounded-2xl p-6 flex flex-col gap-4"
                  style={{ background: "var(--cream)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Avatar member={member} size={64} />
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={dict.about.linkedinLabel}
                        className="p-1.5 rounded-full hover:opacity-60 transition-opacity"
                        style={{ color: "var(--muted)" }}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: "var(--ink)" }}>
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "var(--accent)" }}>
                      {member.role[locale]}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {member.bio[locale]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
