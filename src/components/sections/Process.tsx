import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="section-pad" style={{ background: "var(--paper)" }}>
      <div className="container-level">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <Reveal>
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--accent)" }}
              >
                {dict.process.eyebrow}
              </p>
              <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
                {dict.process.title}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                {dict.process.intro}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 relative aspect-4/3 rounded-2xl overflow-hidden hidden lg:block">
                <Image
                  src="/images/process-planning.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ol className="flex flex-col">
            {dict.process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <li
                  className="flex gap-5 py-6"
                  style={{
                    borderTop: "1px solid var(--line)",
                    borderBottom:
                      i === dict.process.steps.length - 1 ? "1px solid var(--line)" : undefined,
                  }}
                >
                  <span
                    className="type-display text-2xl shrink-0 w-10"
                    style={{ color: "var(--accent)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: "var(--ink)" }}>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
