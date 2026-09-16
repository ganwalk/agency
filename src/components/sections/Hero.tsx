"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { HeroGuides } from "@/components/sections/HeroGuides";

const AUTO_DELAY_MS = 2400;
const REVEAL_GUIDE_MS = 1400;

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<0 | 1>(0);
  const [revealing, setRevealing] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(() => setStage(1), AUTO_DELAY_MS);
    return () => clearTimeout(timer);
  }, [reduced]);

  // Cada vez que a fase rica entra em cena (pelo timer ou por clique manual
  // nos pontos), as âncoras de design piscam de novo e o conteúdo reencena
  // a entrada, como se estivesse sendo posicionado ali na hora.
  useEffect(() => {
    if (stage !== 1) return;
    /* eslint-disable react-hooks/set-state-in-effect -- reage à entrada na
       fase rica (timer ou clique manual), não deriva estado de render */
    setRevealing(true);
    setRevealKey((k) => k + 1);
    /* eslint-enable react-hooks/set-state-in-effect */
    const timer = setTimeout(() => setRevealing(false), REVEAL_GUIDE_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  const s = dict.hero.simple;
  const r = dict.hero.rich;

  // Sem preferência por movimento reduzido: as duas fases empilham
  // verticalmente, sem nenhuma transição automática de posição.
  if (reduced) {
    return (
      <section data-hero>
        <HeroSimplePanel locale={locale} s={s} minHeight="90dvh" />
        <HeroRichPanel locale={locale} r={r} minHeight="90dvh" reveal={false} revealKey={0} />
      </section>
    );
  }

  return (
    <section data-hero className="relative h-dvh overflow-hidden" style={{ background: "var(--paper)" }}>
      <motion.div
        className="flex h-full"
        style={{ width: "200%" }}
        animate={{ x: stage === 0 ? "0%" : "-50%" }}
        transition={{ duration: 1.15, ease: [0.65, 0, 0.24, 1] }}
      >
        <div className="h-full" style={{ width: "50%" }}>
          <HeroSimplePanel locale={locale} s={s} minHeight="100%" />
        </div>
        <div className="h-full" style={{ width: "50%" }}>
          <HeroRichPanel locale={locale} r={r} minHeight="100%" reveal={revealing} revealKey={revealKey} />
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {[0, 1].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStage(i as 0 | 1)}
            aria-label={`${i + 1}`}
            aria-current={stage === i}
            className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: stage === i ? 22 : 8,
              background: stage === i ? "var(--accent)" : "rgba(120,120,120,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSimplePanel({
  locale,
  s,
  minHeight,
}: {
  locale: Locale;
  s: Dictionary["hero"]["simple"];
  minHeight: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{ minHeight, background: "var(--paper)" }}
    >
      <div className="container-level w-full">
        <div className="max-w-xl">
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
            style={{ color: "var(--accent)" }}
          >
            {s.eyebrow}
          </p>
          <h1 className="type-display text-4xl sm:text-5xl lg:text-6xl" style={{ color: "var(--ink)" }}>
            {s.headlinePre}
            <span style={{ color: "var(--accent)" }}>{s.headlineHighlight}</span>
            {s.headlinePost}
          </h1>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-md"
            style={{ color: "var(--muted)" }}
          >
            {s.sub}
          </p>
          <div className="mt-9 flex items-center gap-5">
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-fg)" }}
            >
              {s.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 right-6 lg:right-10 flex-col items-center gap-1.5 opacity-70">
        <span className="text-xs tracking-wide" style={{ color: "var(--muted)" }}>
          {s.scrollHint}
        </span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--muted)" }}
        >
          <ChevronDown size={16} className="-rotate-90" />
        </motion.span>
      </div>
    </div>
  );
}

function HeroRichPanel({
  locale,
  r,
  minHeight,
  reveal,
  revealKey,
}: {
  locale: Locale;
  r: Dictionary["hero"]["rich"];
  minHeight: string;
  reveal: boolean;
  revealKey: number;
}) {
  return (
    <div className="relative flex items-end" style={{ minHeight }}>
      <Image
        src="/images/hero-rich.jpg"
        alt="Impression, Sunrise, Claude Monet"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,20,28,0.42) 0%, rgba(17,20,28,0.45) 40%, rgba(17,20,28,0.88) 100%)",
        }}
      />

      <HeroGuides show={reveal} />

      <div className="container-level relative z-10 w-full pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <motion.div
            key={`headline-${revealKey}`}
            className="max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--accent-soft)" }}
            >
              {r.eyebrow}
            </p>
            <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl" style={{ color: "var(--on-dark)" }}>
              {r.headline}
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "var(--on-dark)" }}>
              {r.sub}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: "var(--accent)", color: "var(--navy)" }}
            >
              {r.cta}
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            key={`card-${revealKey}`}
            className="w-full lg:w-80 rounded-2xl p-6 shrink-0"
            style={{ background: "var(--chip-bg)" }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="type-display text-xl" style={{ color: "var(--navy)" }}>
              {r.card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--chip-muted)" }}>
              {r.card.body}
            </p>
            <Link
              href={`/${locale}/#team`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--navy)" }}
            >
              {r.card.cta}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
