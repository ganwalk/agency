import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { noOrphan } from "@/lib/text";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        {/* Sem imagem: a coluna da esquerda fica fixa (sticky) enquanto a
            timeline da direita rola, no lugar de uma foto estática. */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
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

          <ProcessSteps steps={dict.process.steps} />
        </div>
      </div>
    </section>
  );
}
