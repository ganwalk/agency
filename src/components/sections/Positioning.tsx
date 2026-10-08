import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

// A essência do documento de identidade: a frase de posicionamento em
// destaque e, embaixo, propósito, missão, visão e o porquê do nome.
export function Positioning({ dict }: { dict: Dictionary }) {
  const pos = dict.positioning;

  return (
    <section style={{ background: "var(--cream)" }}>
      <div className="container-level py-14 sm:py-20">
        <Reveal>
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase mb-5"
            style={{ color: "var(--muted)" }}
          >
            {pos.eyebrow}
          </p>
          <p
            className="type-display text-2xl sm:text-3xl lg:text-4xl max-w-4xl leading-snug"
            style={{ color: "var(--ink)" }}
          >
            {noOrphan(pos.title)}
          </p>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {pos.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <h3 className="text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "var(--ink)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
