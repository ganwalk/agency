"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

// Marcas de "canvas de design" (cantos, mira, linhas de alinhamento) que
// piscam sobre a hero assim que a página carrega, como se o conteúdo
// estivesse sendo posicionado por uma ferramenta de design antes do quadro
// de fundo ser revelado. Toca uma vez, ao montar. Só aparece em telas
// grandes: as coordenadas são aproximadas por porcentagem, calibradas para
// o layout desktop da hero, e não valeria a pena recalcular para o
// empilhamento do mobile.

const GUIDE_DURATION = 1.3;
const TIMES: [number, number, number, number] = [0, 0.22, 0.68, 1];
const GUIDE_COLOR = "var(--on-dark)";

function Corner({ style }: { style: CSSProperties }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute w-4 h-4 pointer-events-none"
      style={{ borderColor: GUIDE_COLOR, borderStyle: "solid", ...style }}
      initial={{ opacity: 0, scale: 1.6 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [1.6, 1, 1, 0.85] }}
      transition={{ duration: GUIDE_DURATION, times: TIMES }}
    />
  );
}

function CornerFrame({ left, top, right, bottom }: { left: string; top: string; right: string; bottom: string }) {
  const t = 2;
  return (
    <>
      <Corner style={{ left, top, borderWidth: `${t}px 0 0 ${t}px` }} />
      <Corner style={{ right, top, borderWidth: `${t}px ${t}px 0 0` }} />
      <Corner style={{ left, bottom, borderWidth: `0 0 ${t}px ${t}px` }} />
      <Corner style={{ right, bottom, borderWidth: `0 ${t}px ${t}px 0` }} />
    </>
  );
}

function Crosshair({ style }: { style: CSSProperties }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{ width: 16, height: 16, ...style }}
      initial={{ opacity: 0, scale: 1.8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [1.8, 1, 1, 0.7] }}
      transition={{ duration: GUIDE_DURATION, times: TIMES }}
    >
      <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2" style={{ background: GUIDE_COLOR }} />
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2" style={{ background: GUIDE_COLOR }} />
    </motion.span>
  );
}

function GuideLine({ orientation, style }: { orientation: "h" | "v"; style: CSSProperties }) {
  const isH = orientation === "h";
  return (
    <motion.span
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        ...(isH
          ? { left: 0, right: 0, height: 0, borderTop: `1px dashed ${GUIDE_COLOR}` }
          : { top: 0, bottom: 0, width: 0, borderLeft: `1px dashed ${GUIDE_COLOR}` }),
        ...style,
      }}
      initial={{ opacity: 0, scaleX: isH ? 0 : 1, scaleY: isH ? 1 : 0 }}
      animate={{
        opacity: [0, 0.55, 0.55, 0],
        scaleX: isH ? [0, 1, 1, 1] : 1,
        scaleY: isH ? 1 : [0, 1, 1, 1],
      }}
      transition={{ duration: GUIDE_DURATION, times: TIMES }}
    />
  );
}

export function HeroGuides() {
  return (
    <div className="hidden lg:block absolute inset-0 z-[15] pointer-events-none overflow-hidden" aria-hidden="true">
      <GuideLine orientation="h" style={{ top: "74%" }} />
      <GuideLine orientation="v" style={{ left: "70.5%" }} />

      <CornerFrame left="6.5%" top="58%" right="55.2%" bottom="8.5%" />
      <CornerFrame left="70.5%" top="79%" right="6.5%" bottom="7%" />

      <Crosshair style={{ left: "6.5%", top: "58%", transform: "translate(-50%, -50%)" }} />
      <Crosshair style={{ left: "92.5%", top: "20%", transform: "translate(-50%, -50%)" }} />
    </div>
  );
}
