import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { LinkedinIcon } from "@hugeicons/core-free-icons";
import type { Dictionary } from "@/i18n/dictionaries";
import { team } from "@/data/team";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/site";

export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="team" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        <Reveal>
          <div className="max-w-2xl">
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--ink)" }}
            >
              {dict.about.eyebrow}
            </p>
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
              {dict.about.title}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
              {dict.about.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <Reveal key={member.slug} delay={i * 0.08}>
              <article
                className="h-full rounded-2xl overflow-hidden flex flex-col"
                style={{ background: "var(--cream)" }}
              >
                <div className="relative aspect-3/4">
                  <Image
                    src={withBasePath(member.photo)}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base" style={{ color: "var(--ink)" }}>
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                        {member.role[locale]}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={dict.about.linkedinLabel}
                        className="p-1.5 -m-1.5 rounded-full hover:opacity-60 transition-opacity shrink-0"
                        style={{ color: "var(--muted)" }}
                      >
                        <HugeiconsIcon icon={LinkedinIcon} size={16} />
                      </a>
                    )}
                  </div>
                  <p className="hidden sm:block text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {member.bio[locale]}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
