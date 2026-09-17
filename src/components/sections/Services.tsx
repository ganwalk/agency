"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  LayoutIcon,
  Layers01Icon,
  ShoppingBag01Icon,
  FlowIcon,
  JusticeScale01Icon,
  TradeUpIcon,
} from "@hugeicons/core-free-icons";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { services, type Service } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { noOrphan } from "@/lib/text";

const icons: Record<Service["icon"], IconSvgElement> = {
  layout: LayoutIcon,
  layers: Layers01Icon,
  "shopping-bag": ShoppingBag01Icon,
  workflow: FlowIcon,
  scale: JusticeScale01Icon,
  "trending-up": TradeUpIcon,
};

// Coluna fixa com o argumento da dobra + lista numerada rolando ao lado,
// no lugar da grade de cards: a versão em bento repetia o mesmo cartão seis
// vezes e ainda deixava espaço vazio nos maiores. Aqui só um serviço lê por
// vez, o numeral que cruza a faixa central preenche (mesmo truque de
// contorno da hero), e dá pra ver de relance quantos serviços existem.
export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

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
  }, []);

  return (
    <section id="services" className="section-pad" style={{ background: "var(--cream)" }}>
      <div className="container-level">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--ink)" }}
              >
                {dict.services.eyebrow}
              </p>
              <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
                {noOrphan(dict.services.title)}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                {dict.services.intro}
              </p>
              <div
                className="flex items-baseline gap-3 mt-10 pt-6"
                style={{ borderTop: "1px solid var(--line)" }}
                aria-hidden="true"
              >
                <span className="type-display text-4xl" style={{ color: "var(--ink)" }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-mono tracking-wide" style={{ color: "var(--muted)" }}>
                  / {String(services.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          </div>

          <ol className="flex flex-col">
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <Reveal key={service.slug} delay={i * 0.06}>
                  <li
                    ref={(el) => {
                      itemsRef.current[i] = el;
                    }}
                    className="grid grid-cols-[auto_1fr] items-start gap-5 sm:gap-8 py-7 sm:py-8"
                    style={{ borderTop: i === 0 ? undefined : "1px solid var(--line)" }}
                  >
                    <span
                      className="type-display text-4xl sm:text-5xl leading-none"
                      style={{
                        WebkitTextStrokeWidth: "1.5px",
                        WebkitTextStrokeColor: isActive ? "var(--ink)" : "var(--line)",
                        color: isActive ? "var(--ink)" : "transparent",
                        transition: "color 0.3s ease",
                      }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-3">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors duration-300"
                        style={{ background: isActive ? "var(--ink)" : "var(--line)" }}
                      >
                        <HugeiconsIcon
                          icon={icons[service.icon]}
                          size={17}
                          color={isActive ? "var(--paper)" : "var(--muted)"}
                        />
                      </div>
                      <h3
                        className="font-semibold text-lg sm:text-xl transition-colors duration-300"
                        style={{ color: isActive ? "var(--ink)" : "var(--muted)" }}
                      >
                        {noOrphan(service.title[locale])}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: "var(--muted)" }}>
                        {service.description[locale]}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>
            {dict.services.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
