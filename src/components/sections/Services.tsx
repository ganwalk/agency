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

// Bento em vez de grade uniforme: o primeiro e o último serviço ganham o
// dobro da largura (layout interno horizontal, ícone ao lado do texto), e
// o segundo ganha o dobro da altura, pra fugir do "seis caixas iguais" e
// dar ritmo à disposição, só a partir do desktop.
const WIDE = new Set([0, 5]);
const TALL = new Set([1]);

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="services" className="section-pad" style={{ background: "var(--cream)" }}>
      <div className="container-level">
        <div className="max-w-2xl">
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
            <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              {dict.services.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense gap-5">
          {services.map((service, i) => {
            const wide = WIDE.has(i);
            const tall = TALL.has(i);
            const spanClass = [wide ? "sm:col-span-2" : "", tall ? "lg:row-span-2" : ""]
              .filter(Boolean)
              .join(" ");
            return (
              <Reveal key={service.slug} delay={i * 0.06} className={spanClass || undefined}>
                <article
                  className={`relative h-full overflow-hidden rounded-2xl p-6 flex gap-4 ${wide ? "flex-col sm:flex-row sm:items-start" : "flex-col"}`}
                  style={{ background: "var(--paper)" }}
                >
                  {(wide || tall) && (
                    <HugeiconsIcon
                      icon={icons[service.icon]}
                      size={tall ? 190 : 130}
                      color="var(--line)"
                      className="absolute -right-6 -bottom-6 pointer-events-none hidden sm:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3 sm:block">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                      style={{ background: "var(--navy)" }}
                    >
                      <HugeiconsIcon icon={icons[service.icon]} size={20} color="var(--on-dark)" />
                    </div>
                    <span
                      className="font-mono text-xs sm:hidden"
                      style={{ color: "var(--muted)" }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className={`relative z-10 flex flex-col gap-2 ${tall ? "sm:justify-between sm:flex-1" : ""}`}>
                    <span
                      className="hidden sm:block font-mono text-xs"
                      style={{ color: "var(--muted)" }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "var(--ink)" }}>
                        {noOrphan(service.title[locale])}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                        {service.description[locale]}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
