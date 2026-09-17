"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

type Step = { readonly title: string; readonly description: string };

export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    // Janela de ~10% no meio da tela: o item que estiver cruzando ali vira o
    // ativo, dando movimento à lista conforme a pessoa rola.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = itemsRef.current.indexOf(entry.target as HTMLLIElement);
          if (index !== -1) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    itemsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div>
      <div
        className="flex items-baseline gap-2 mb-2 font-mono text-xs tracking-wide"
        style={{ color: "var(--muted)" }}
        aria-hidden="true"
      >
        <span style={{ color: "var(--ink)" }}>{String(active + 1).padStart(2, "0")}</span>
        <span>/ {String(steps.length).padStart(2, "0")}</span>
      </div>
      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const isActive = active === i;
          return (
            <Reveal key={step.title} delay={i * 0.07}>
              <li
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="flex gap-5 py-6"
                style={{
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === steps.length - 1 ? "1px solid var(--line)" : undefined,
                }}
              >
                <span
                  className="type-display text-2xl shrink-0 w-10 transition-colors duration-300"
                  style={{ color: isActive ? "var(--ink)" : "var(--line)" }}
                >
                  0{i + 1}
                </span>
                <div>
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
  );
}
