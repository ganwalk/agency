import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { withBasePath } from "@/lib/site";
import { noOrphan } from "@/lib/text";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <Reveal>
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--ink)" }}
              >
                {dict.process.eyebrow}
              </p>
              <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
                {noOrphan(dict.process.title)}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                {dict.process.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 relative aspect-4/3 rounded-2xl overflow-hidden hidden lg:block">
                <Image
                  src={withBasePath("/images/process-planning.jpg")}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ProcessSteps steps={dict.process.steps} />
        </div>
      </div>
    </section>
  );
}
