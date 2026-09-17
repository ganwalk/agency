"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

type Step = { readonly title: string; readonly description: string };

// Trilho vertical no mobile/tablet, horizontal a partir do desktop — a
// mesma posição de rolagem decide o preenchimento do trilho e qual etapa
// está "ativa" nas duas orientações, então não precisa de um mecanismo
// separado por layout. Os nós ficam centralizados em colunas de largura
// igual (sem gap, com padding em cada item) pra régua bater exatamente no
// centro do primeiro ao último nó via um simples inset em porcentagem.
export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive(index);
  });

  const insetPercent = 100 / (steps.length * 2);

  return (
    <div>
      <div
        className="flex items-baseline gap-2 mb-8 font-mono text-xs tracking-wide"
        style={{ color: "var(--muted)" }}
        aria-hidden="true"
      >
        <span style={{ color: "var(--ink)" }}>{String(active + 1).padStart(2, "0")}</span>
        <span>/ {String(steps.length).padStart(2, "0")}</span>
      </div>

      <div ref={railRef} className="relative">
        <span
          aria-hidden="true"
          className="lg:hidden absolute top-5 bottom-5 left-5 w-px -translate-x-1/2"
          style={{ background: "var(--line)" }}
        />
        <motion.span
          aria-hidden="true"
          className="lg:hidden absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 origin-top"
          style={{ background: "var(--ink)", scaleY: reduced ? 1 : scrollYProgress }}
        />

        <span
          aria-hidden="true"
          className="hidden lg:block absolute top-5 h-px -translate-y-1/2"
          style={{ left: `${insetPercent}%`, right: `${insetPercent}%`, background: "var(--line)" }}
        />
        <motion.span
          aria-hidden="true"
          className="hidden lg:block absolute top-5 h-px -translate-y-1/2 origin-left"
          style={{
            left: `${insetPercent}%`,
            right: `${insetPercent}%`,
            background: "var(--ink)",
            scaleX: reduced ? 1 : scrollYProgress,
          }}
        />

        <ol className="relative flex flex-col gap-10 lg:flex-row lg:gap-0">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <Reveal key={step.title} delay={i * 0.07} className="lg:flex-1">
                <li className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:px-3 lg:text-center">
                  <span
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-colors duration-300"
                    style={{
                      borderColor: isActive ? "var(--ink)" : "var(--line)",
                      background: isActive ? "var(--ink)" : "var(--paper)",
                      color: isActive ? "var(--paper)" : "var(--muted)",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div className="pt-1.5 lg:pt-0">
                    <h3
                      className="font-semibold text-base transition-colors duration-300"
                      style={{ color: isActive ? "var(--ink)" : "var(--muted)" }}
                    >
                      {noOrphan(step.title)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
