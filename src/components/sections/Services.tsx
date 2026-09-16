import { Layout, Layers, ShoppingBag, Workflow, Scale, TrendingUp } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { services, type Service } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<Service["icon"], typeof Layout> = {
  layout: Layout,
  layers: Layers,
  "shopping-bag": ShoppingBag,
  workflow: Workflow,
  scale: Scale,
  "trending-up": TrendingUp,
};

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="services" className="section-pad" style={{ background: "var(--cream)" }}>
      <div className="container-level">
        <div className="max-w-2xl">
          <Reveal>
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--accent)" }}
            >
              {dict.services.eyebrow}
            </p>
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
              {dict.services.title}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              {dict.services.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <article
                  className="h-full rounded-2xl p-6 flex flex-col gap-4"
                  style={{ background: "var(--paper)" }}
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{ background: "var(--navy)" }}
                  >
                    <Icon size={20} style={{ color: "var(--on-dark)" }} />
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: "var(--ink)" }}>
                    {service.title[locale]}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {service.description[locale]}
                  </p>
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
