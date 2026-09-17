"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { HeroGuides } from "@/components/sections/HeroGuides";
import { withBasePath } from "@/lib/site";

// Sem slide: o quadro só aparece depois que as âncoras de design terminam de
// posicionar o conteúdo, nunca ao mesmo tempo. Sob prefers-reduced-motion,
// tudo já nasce no lugar, sem nenhuma das duas animações.
const IMAGE_REVEAL_DELAY = 1.3;

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduced = useReducedMotion();
  const h = dict.hero;

  return (
    <section
      data-hero
      className="design-canvas relative h-dvh min-h-[640px] overflow-hidden flex items-end"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 1.1, delay: IMAGE_REVEAL_DELAY, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={withBasePath("/images/hero-rich.jpg")}
          alt="Impression, Sunrise, Claude Monet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,20,28,0.5) 0%, rgba(17,20,28,0.5) 40%, rgba(17,20,28,0.9) 100%)",
        }}
      />

      {!reduced && <HeroGuides />}

      <div className="container-level relative z-10 w-full pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <motion.div
            className="max-w-xl"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--muted-on-navy)" }}
            >
              {h.eyebrow}
            </p>
            <h1 className="type-display text-4xl sm:text-5xl lg:text-6xl" style={{ color: "var(--on-dark)" }}>
              {h.headlinePre}
              <span className="underline decoration-2 underline-offset-8">{h.headlineHighlight}</span>
              {h.headlinePost}
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--on-dark)" }}>
              {h.sub}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: "var(--chip-bg)", color: "var(--navy)" }}
            >
              {h.cta}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </motion.div>

          <motion.div
            className="w-full lg:w-80 rounded-2xl p-6 shrink-0"
            style={{ background: "var(--chip-bg)" }}
            initial={reduced ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="type-display text-xl" style={{ color: "var(--navy)" }}>
              {h.card.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--chip-muted)" }}>
              {h.card.body}
            </p>
            <Link
              href={`/${locale}/#team`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--navy)" }}
            >
              {h.card.cta}
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
