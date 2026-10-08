import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { noOrphan } from "@/lib/text";

export function Process({ dict }: { dict: Dictionary }) {
  const scale = dict.process.scale;

  return (
    <section id="process" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        {/* Sem imagem: no desktop a timeline vira horizontal e precisa da
            largura toda, então o título fica em cima, não numa coluna fixa
            ao lado. */}
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
              {noOrphan(dict.process.title)}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
              {dict.process.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-16">
          <ProcessSteps steps={dict.process.steps} outputLabel={dict.process.outputLabel} />
        </div>

        <Reveal delay={0.2}>
          <p
            className="mt-14 pt-6 text-sm leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}
          >
            {dict.process.note}
          </p>
        </Reveal>

        {/* Escala da intervenção: do mais leve ao mais pesado, com o último
            nível destacado como no documento de identidade. */}
        <div className="mt-16">
          <Reveal>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase" style={{ color: "var(--muted)" }}>
              {scale.title}
            </p>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {scale.items.map((item, i) => {
              const last = i === scale.items.length - 1;
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div
                    className="h-full rounded-xl p-4 sm:p-5"
                    style={{ background: last ? "var(--ink)" : "var(--cream)" }}
                  >
                    <h3
                      className="text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase"
                      style={{ color: last ? "var(--paper)" : "var(--ink)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: last ? "var(--paper)" : "var(--muted)", opacity: last ? 0.75 : 1 }}>
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
              {scale.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
