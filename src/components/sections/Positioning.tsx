import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

// Cantos de instrumento de medição, como os da hero (HeroGuides) — o mesmo
// vocabulário de "ferramenta de design" reaparecendo aqui, não um ícone
// decorativo novo. currentColor deixa o CSS do card (.positioning-card)
// comandar a cor no hover, sem JS.
function CornerMarks() {
  return (
    <>
      <span aria-hidden="true" className="corner-mark absolute left-3 top-3 h-2.5 w-2.5 border-l border-t" />
      <span aria-hidden="true" className="corner-mark absolute right-3 top-3 h-2.5 w-2.5 border-r border-t" />
      <span aria-hidden="true" className="corner-mark absolute left-3 bottom-3 h-2.5 w-2.5 border-l border-b" />
      <span aria-hidden="true" className="corner-mark absolute right-3 bottom-3 h-2.5 w-2.5 border-r border-b" />
    </>
  );
}

export function Positioning({ dict }: { dict: Dictionary }) {
  return (
    <section style={{ background: "var(--cream)" }}>
      <div className="container-level py-16 sm:py-20">
        <Reveal>
          <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl mb-10 sm:mb-12" style={{ color: "var(--ink)" }}>
            {noOrphan(dict.positioning.title)}
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.positioning.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="positioning-card relative rounded-xl p-5 sm:p-6">
                <CornerMarks />
                <span className="positioning-index font-mono text-xs" style={{ color: "var(--muted)" }}>
                  0{i + 1}
                </span>
                <h3 className="positioning-title mt-3 font-semibold text-sm sm:text-base" style={{ color: "var(--ink)" }}>
                  {noOrphan(item.title)}
                </h3>
                <p className="positioning-desc mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
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
