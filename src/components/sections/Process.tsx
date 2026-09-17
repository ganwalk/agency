import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { noOrphan } from "@/lib/text";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        {/* Sem imagem: no desktop a timeline vira horizontal e precisa da
            largura toda, então o título fica em cima, não numa coluna fixa
            ao lado. */}
        <div className="max-w-2xl">
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
        </div>

        <div className="mt-14 lg:mt-16">
          <ProcessSteps steps={dict.process.steps} />
        </div>
      </div>
    </section>
  );
}
