import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

export function Positioning({ dict }: { dict: Dictionary }) {
  return (
    <section style={{ background: "var(--cream)" }}>
      <div className="container-level py-12 sm:py-14">
        <Reveal>
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase mb-8"
            style={{ color: "var(--muted)" }}
          >
            {noOrphan(dict.positioning.title)}
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {dict.positioning.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <span className="text-xs font-mono" style={{ color: "var(--ink)" }}>
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-semibold text-sm sm:text-base" style={{ color: "var(--ink)" }}>
                  {noOrphan(item.title)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
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
