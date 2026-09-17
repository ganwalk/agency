"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

type Step = { readonly title: string; readonly description: string };

// Trilho vertical que preenche conforme a rolagem cruza a lista: em vez de
// só divisórias horizontais entre etapas, agora dá pra ver de relance
// quantas etapas existem e o quanto falta, como uma barra de progresso do
// próprio processo.
export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    // Janela de ~10% no meio da tela: o item que estiver cruzando ali vira o
    // ativo, dando movimento à lista conforme a pessoa rola. Guarda todos os
    // índices cruzando a faixa num Set e usa o menor (o mais alto na tela):
    // ao montar, o observer dispara um retorno inicial pra cada item de uma
    // vez, e sem isso o último a entrar no forEach vencia, não o certo.
    const visiveis = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = itemsRef.current.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) visiveis.add(index);
          else visiveis.delete(index);
        }
        if (visiveis.size > 0) setActive(Math.min(...visiveis));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    itemsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

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
        <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2" style={{ background: "var(--line)" }} />
        <motion.span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 origin-top"
          style={{ background: "var(--ink)", scaleY: reduced ? 1 : fillScale }}
        />

        <ol className="relative flex flex-col gap-10">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <Reveal key={step.title} delay={i * 0.07}>
                <li
                  ref={(el) => {
                    itemsRef.current[i] = el;
                  }}
                  className="relative flex gap-5"
                >
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
                  <div className="pt-1.5">
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
