import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

// Os seis compromissos do documento de identidade, numa grade de 3 colunas
// no mesmo desenho dos itens de Positioning (régua no topo, numeral mono),
// e embaixo a divisão de papéis entre cliente e Ritmo.
export function Principles({ dict }: { dict: Dictionary }) {
  const p = dict.principles;

  return (
    <section id="principles" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
              {noOrphan(p.title)}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
              {p.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {p.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-base sm:text-lg" style={{ color: "var(--ink)" }}>
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: "var(--line)" }}>
            {p.roles.map((role) => (
              <div key={role.who} className="p-6 sm:p-7" style={{ background: "var(--cream)" }}>
                <dt className="text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "var(--ink)" }}>
                  {role.who}
                </dt>
                <dd className="mt-2 text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {role.what}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
