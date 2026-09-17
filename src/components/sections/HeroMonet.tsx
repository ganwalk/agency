"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// O "quadro" da hero: uma releitura generativa e animada de "Impression,
// Sunrise" de Monet (o mesmo quadro que a foto estática mostrava antes) —
// dabs de tinta impressionistas (elipses macias, cor e opacidade variadas)
// em vez de uma foto fixa. Canvas 2D puro, sem lib de partículas nem
// three.js: um punhado de elipses simples não precisa de WebGL, e fica leve
// o bastante pra rodar em qualquer aparelho sem custar bundle. A
// profundidade é simulada: cada partícula tem um "depth" que multiplica o
// quanto ela desloca com o mouse, então as mais "próximas" reagem mais que o
// céu/água ao fundo — paralaxe, não projeção 3D de verdade, mas lê como
// perspectiva.

const PALETTE = {
  skyTop: "#7c93aa",
  skyMid: "#96a7b6",
  haze: "#c7cdcd",
  water: "#546b80",
  waterDeep: "#3d5265",
  sun: "#e8703c",
  sunCore: "#f7b26b",
  reflection: "#d9622f",
  silhouette: "#262b33",
  highlight: "#dfe4e2",
} as const;

const HORIZON = 0.56; // fração da altura onde o céu encontra a água
const SUN_POS = { x: 0.58, y: 0.26 }; // posição do sol, como no quadro original

type Dab = {
  baseX: number;
  baseY: number;
  depth: number;
  rx: number;
  ry: number;
  angle: number;
  color: string;
  alpha: number;
  driftAmpX: number;
  driftAmpY: number;
  driftSpeed: number;
  phase: number;
};

type Boat = { x: number; y: number; w: number; h: number };

// PRNG determinístico: a composição fica igual a cada carregamento (parte do
// design, não decoração aleatória a cada visita) sem precisar guardar um
// arquivo de dados à parte.
function mulberry32(seed: number) {
  let state = seed;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateSkyAndWaterDabs(random: () => number, count: number): Dab[] {
  return Array.from({ length: count }, () => {
    const baseY = random();
    const isWater = baseY > HORIZON;
    const palette = isWater
      ? [PALETTE.water, PALETTE.waterDeep, PALETTE.highlight]
      : [PALETTE.skyTop, PALETTE.skyMid, PALETTE.haze];
    return {
      baseX: random(),
      baseY,
      depth: 0.2 + random() * 0.85,
      rx: 4 + random() * 9,
      ry: 2 + random() * 5,
      angle: (random() - 0.5) * 1.2 + (isWater ? 0 : Math.PI / 6),
      color: palette[Math.floor(random() * palette.length)],
      alpha: 0.35 + random() * 0.4,
      driftAmpX: 0.006 + random() * 0.016,
      driftAmpY: 0.004 + random() * 0.012,
      driftSpeed: 0.12 + random() * 0.3,
      phase: random() * Math.PI * 2,
    };
  });
}

// O reflexo do sol na água: uma coluna de dabs quentes descendo do sol até
// abaixo da linha do horizonte, mais largos perto do sol e afinando embaixo.
function generateReflectionDabs(random: () => number, count: number): Dab[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / count;
    const baseY = SUN_POS.y + t * (HORIZON + 0.22 - SUN_POS.y);
    const spread = 0.02 + t * 0.05;
    return {
      baseX: SUN_POS.x + (random() - 0.5) * spread,
      baseY,
      depth: 0.5 + random() * 0.5,
      rx: 5 + random() * 10 * (1 - t * 0.4),
      ry: 2 + random() * 3,
      angle: 0,
      color: random() > 0.4 ? PALETTE.reflection : PALETTE.sun,
      alpha: 0.5 + random() * 0.35,
      driftAmpX: 0.004 + random() * 0.01,
      driftAmpY: 0.002 + random() * 0.006,
      driftSpeed: 0.2 + random() * 0.4,
      phase: random() * Math.PI * 2,
    };
  });
}

function generateBoats(random: () => number): Boat[] {
  return Array.from({ length: 3 }, () => ({
    x: random(),
    y: HORIZON + 0.01 + random() * 0.03,
    w: 0.02 + random() * 0.025,
    h: 0.006 + random() * 0.006,
  }));
}

export function HeroMonet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const random = mulberry32(20260917);
    const dabs = [...generateSkyAndWaterDabs(random, 150), ...generateReflectionDabs(random, 26)];
    const boats = generateBoats(random);

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Setting width/height limpa o canvas — e ResizeObserver sempre dispara
      // uma vez, de forma assíncrona, assim que observe() é chamado (mesmo
      // sem nada ter mudado). Sob prefers-reduced-motion não há loop de rAF
      // pra redesenhar no frame seguinte, então sem isso o quadro sumia
      // pouco depois do primeiro desenho.
      if (reduced) render(0, 0, 0);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let inView = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
    });
    intersectionObserver.observe(canvas);

    let tabVisible = true;
    function onVisibilityChange() {
      tabVisible = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function drawSkyAndWater() {
      // Um gradiente só, do topo ao fundo: o horizonte é a névoa onde o céu
      // encontra a água, não uma emenda dura entre dois blocos de cor.
      const gradient = ctx!.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, PALETTE.skyTop);
      gradient.addColorStop(0.35, PALETTE.skyMid);
      gradient.addColorStop(HORIZON - 0.04, PALETTE.haze);
      gradient.addColorStop(HORIZON + 0.05, PALETTE.water);
      gradient.addColorStop(1, PALETTE.waterDeep);
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);
    }

    function drawSun(offsetX: number, offsetY: number) {
      const sx = SUN_POS.x * width + offsetX * 0.15;
      const sy = SUN_POS.y * height + offsetY * 0.15;
      const r = Math.min(width, height) * 0.05;

      ctx!.save();
      ctx!.globalAlpha = 0.35;
      ctx!.fillStyle = PALETTE.sunCore;
      ctx!.beginPath();
      ctx!.arc(sx, sy, r * 2.2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      ctx!.save();
      ctx!.fillStyle = PALETTE.sun;
      ctx!.shadowColor = PALETTE.sun;
      ctx!.shadowBlur = r * 1.5;
      ctx!.beginPath();
      ctx!.arc(sx, sy, r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function drawBoats(offsetX: number, offsetY: number) {
      for (const boat of boats) {
        const x = boat.x * width + offsetX * 0.1;
        const y = boat.y * height + offsetY * 0.1;
        ctx!.save();
        ctx!.globalAlpha = 0.65;
        ctx!.fillStyle = PALETTE.silhouette;
        ctx!.beginPath();
        ctx!.ellipse(x, y, boat.w * width, boat.h * height, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    function drawDabs(t: number, offsetX: number, offsetY: number) {
      for (const d of dabs) {
        const driftX = Math.sin(t * d.driftSpeed + d.phase) * d.driftAmpX * width;
        const driftY = Math.cos(t * d.driftSpeed * 0.85 + d.phase) * d.driftAmpY * height;
        const px = d.baseX * width + driftX + offsetX * d.depth;
        const py = d.baseY * height + driftY + offsetY * d.depth;
        ctx!.save();
        ctx!.globalAlpha = d.alpha;
        ctx!.fillStyle = d.color;
        ctx!.translate(px, py);
        ctx!.rotate(d.angle);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, d.rx, d.ry, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    function render(t: number, offsetX: number, offsetY: number) {
      drawSkyAndWater();
      drawSun(offsetX, offsetY);
      drawBoats(offsetX, offsetY);
      drawDabs(t, offsetX, offsetY);
    }

    if (reduced) {
      render(0, 0, 0);
      return () => {
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }

    let raf = requestAnimationFrame(frame);
    const start = performance.now();

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!tabVisible || !inView) return;
      const t = (now - start) / 1000;
      smoothX += (targetX - smoothX) * 0.045;
      smoothY += (targetY - smoothY) * 0.045;
      const maxParallax = Math.min(width, height) * 0.05;
      render(t, smoothX * maxParallax, smoothY * maxParallax);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true" />;
}
