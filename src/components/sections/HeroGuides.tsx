"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

// Marcas de "canvas de design" (cantos, mira, réguas, linha de varredura)
// que montam a hero como se uma ferramenta de design estivesse posicionando
// o conteúdo, antes do quadro de fundo ser revelado. Toca uma vez, ao
// montar, num relógio único (END) compartilhado com Hero.tsx: os elementos
// somem exatamente na janela em que o quadro e o título consolidam (ver
// HERO_TIMELINE), então a dissolução das guias e o surgimento do quadro
// leem como a mesma transformação, não dois efeitos paralelos. Só aparece
// em telas grandes: as coordenadas são aproximadas por porcentagem,
// calibradas para o layout desktop da hero.

export const HERO_TIMELINE = {
  assembleEnd: 1.2,
  holdEnd: 2.8,
  end: 4.4,
};

const END = HERO_TIMELINE.end;
const OUT_START = HERO_TIMELINE.holdEnd / END;
const GUIDE_COLOR = "var(--on-dark)";

function frac(seconds: number): number {
  return seconds / END;
}

// [aparece, totalmente dentro, começa a sumir, sumiu] — todo elemento entra
// numa janela própria (inStart→inEnd) e sai todos juntos (OUT_START→1).
function keyTimes(inStart: number, inEnd: number): [number, number, number, number, number] {
  return [0, frac(inStart), frac(inEnd), OUT_START, 1];
}

function Corner({
  style,
  inStart,
  inEnd,
  size = "w-4 h-4",
}: {
  style: CSSProperties;
  inStart: number;
  inEnd: number;
  size?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute ${size} pointer-events-none`}
      style={{ borderColor: GUIDE_COLOR, borderStyle: "solid", ...style }}
      initial={{ opacity: 0, scale: 1.7, rotate: -10 }}
      animate={{
        opacity: [0, 0, 1, 1, 0],
        scale: [1.7, 1.7, 1, 1, 0.82],
        rotate: [-10, -10, 0, 0, 0],
      }}
      transition={{ duration: END, times: keyTimes(inStart, inEnd) }}
    />
  );
}

function CornerFrame({
  left,
  top,
  right,
  bottom,
  inStart,
  inEnd,
  thickness = 2,
  size,
}: {
  left: string;
  top: string;
  right: string;
  bottom: string;
  inStart: number;
  inEnd: number;
  thickness?: number;
  size?: string;
}) {
  const t = thickness;
  return (
    <>
      <Corner style={{ left, top, borderWidth: `${t}px 0 0 ${t}px` }} inStart={inStart} inEnd={inEnd} size={size} />
      <Corner
        style={{ right, top, borderWidth: `${t}px ${t}px 0 0` }}
        inStart={inStart}
        inEnd={inEnd}
        size={size}
      />
      <Corner
        style={{ left, bottom, borderWidth: `0 0 ${t}px ${t}px` }}
        inStart={inStart}
        inEnd={inEnd}
        size={size}
      />
      <Corner
        style={{ right, bottom, borderWidth: `0 ${t}px ${t}px 0` }}
        inStart={inStart}
        inEnd={inEnd}
        size={size}
      />
    </>
  );
}

function Crosshair({ style, inStart, inEnd }: { style: CSSProperties; inStart: number; inEnd: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{ width: 16, height: 16, ...style }}
      initial={{ opacity: 0, scale: 2.1 }}
      animate={{ opacity: [0, 0, 1, 1, 0], scale: [2.1, 2.1, 1, 1.12, 0.7] }}
      transition={{ duration: END, times: keyTimes(inStart, inEnd) }}
    >
      <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2" style={{ background: GUIDE_COLOR }} />
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2" style={{ background: GUIDE_COLOR }} />
    </motion.span>
  );
}

function GuideLine({
  orientation,
  style,
  inStart,
  inEnd,
}: {
  orientation: "h" | "v";
  style: CSSProperties;
  inStart: number;
  inEnd: number;
}) {
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
        opacity: [0, 0, 0.55, 0.55, 0],
        scaleX: isH ? [0, 0, 1, 1, 1] : 1,
        scaleY: isH ? 1 : [0, 0, 1, 1, 1],
      }}
      transition={{ duration: END, times: keyTimes(inStart, inEnd) }}
    />
  );
}

// Réguas: fileira de traços que "medem" o topo da hora, surgindo em
// cascata, um vocabulário de ferramenta de design a mais além dos cantos.
function RulerTicks() {
  const count = 14;
  const ticks = Array.from({ length: count }, (_, i) => 8 + (i * 84) / (count - 1));
  return (
    <>
      {ticks.map((leftPct, i) => {
        const inStart = 0.35 + i * 0.045;
        const inEnd = inStart + 0.25;
        return (
          <motion.span
            key={leftPct}
            aria-hidden="true"
            className="absolute w-px pointer-events-none"
            style={{
              left: `${leftPct}%`,
              top: "5%",
              height: i % 3 === 0 ? 10 : 6,
              background: GUIDE_COLOR,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.5, 0.5, 0] }}
            transition={{ duration: END, times: keyTimes(inStart, inEnd) }}
          />
        );
      })}
    </>
  );
}

// Linha de varredura: passa uma vez pela hora inteira durante a fase de
// espera, como um scanner medindo o layout, reforçando o dinamismo da
// longa pausa antes do quadro consolidar.
function ScanLine() {
  const start = frac(1.3);
  const end = frac(2.6);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{ background: GUIDE_COLOR, boxShadow: `0 0 12px 1px ${GUIDE_COLOR}` }}
      initial={{ top: "4%", opacity: 0 }}
      animate={{ top: ["4%", "4%", "92%", "92%"], opacity: [0, 0.7, 0.7, 0] }}
      transition={{ duration: END, times: [0, start, end, end + 0.02] }}
    />
  );
}

export function HeroGuides() {
  return (
    <div className="hidden lg:block absolute inset-0 z-[15] pointer-events-none overflow-hidden" aria-hidden="true">
      <RulerTicks />
      <ScanLine />

      <GuideLine orientation="h" style={{ top: "74%" }} inStart={0.5} inEnd={1.15} />
      <GuideLine orientation="v" style={{ left: "70.5%" }} inStart={0.65} inEnd={1.2} />
      <GuideLine orientation="v" style={{ left: "6.5%" }} inStart={0.75} inEnd={1.25} />

      <CornerFrame left="3%" top="6%" right="3%" bottom="6%" inStart={0.15} inEnd={0.6} size="w-6 h-6" />
      <CornerFrame left="6.5%" top="58%" right="55.2%" bottom="8.5%" inStart={0.35} inEnd={0.85} />
      <CornerFrame left="70.5%" top="79%" right="6.5%" bottom="7%" inStart={0.5} inEnd={1.0} />

      <Crosshair style={{ left: "6.5%", top: "58%", transform: "translate(-50%, -50%)" }} inStart={0.25} inEnd={0.65} />
      <Crosshair
        style={{ left: "92.5%", top: "20%", transform: "translate(-50%, -50%)" }}
        inStart={0.6}
        inEnd={1.05}
      />
      <Crosshair style={{ left: "50%", top: "9%", transform: "translate(-50%, -50%)" }} inStart={0.8} inEnd={1.2} />
    </div>
  );
}
