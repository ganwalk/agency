"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// O "quadro" da hero: em vez de uma foto estática, uma composição De Stijl
// gerada uma vez (blocos e linhas, como um Mondrian) com muitas partículas
// vivas por cima. Tudo em Canvas 2D puro — sem lib de partículas nem
// three.js — porque o efeito (poucas centenas de formas simples, sem
// iluminação 3D de verdade) não precisa de WebGL, e um canvas 2D fica leve
// o bastante pra rodar em qualquer aparelho sem custar bundle. A profundidade
// é simulada: cada partícula tem um "depth" que multiplica o quanto ela
// desloca com o mouse, então as mais "próximas" reagem mais que a grade ao
// fundo — paralaxe, não projeção 3D de verdade, mas lê como perspectiva.

const PALETTE = {
  red: "#d5342b",
  blue: "#1a4fa0",
  yellow: "#f0c419",
  cream: "#f2eee2",
  black: "#14161c",
} as const;

const PARTICLE_COLORS = [PALETTE.red, PALETTE.blue, PALETTE.yellow, PALETTE.cream, PALETTE.black];

type GridRect = { x: number; y: number; w: number; h: number; fill: string | null };

type Particle = {
  baseX: number;
  baseY: number;
  depth: number;
  size: number;
  color: string;
  shape: "square" | "circle";
  rotation: number;
  rotSpeed: number;
  driftAmpX: number;
  driftAmpY: number;
  driftSpeed: number;
  phase: number;
  glow: boolean;
};

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

// Divide o quadro recursivamente em retângulos (como um Mondrian de verdade
// é composto), depois pinta alguns dos retângulos-folha nas cores primárias.
function generateGrid(random: () => number): GridRect[] {
  const rects: GridRect[] = [];
  const minSize = 0.16;

  function split(x: number, y: number, w: number, h: number, depth: number) {
    const canSplit = depth < 4 && (w > minSize * 1.8 || h > minSize * 1.8);
    if (!canSplit || random() < 0.22) {
      rects.push({ x, y, w, h, fill: null });
      return;
    }
    const vertical = w > h ? true : w < h ? false : random() > 0.5;
    const ratio = 0.32 + random() * 0.36;
    if (vertical && w > minSize * 1.8) {
      const w1 = w * ratio;
      split(x, y, w1, h, depth + 1);
      split(x + w1, y, w - w1, h, depth + 1);
    } else if (!vertical && h > minSize * 1.8) {
      const h1 = h * ratio;
      split(x, y, w, h1, depth + 1);
      split(x, y + h1, w, h - h1, depth + 1);
    } else {
      rects.push({ x, y, w, h, fill: null });
    }
  }
  split(0, 0, 1, 1, 0);

  const colorable = rects.filter((r) => r.w * r.h > 0.03);
  const colors = [PALETTE.red, PALETTE.blue, PALETTE.yellow];
  const shuffled = [...colorable].sort(() => random() - 0.5);
  const colorCount = Math.min(colors.length + 1, Math.max(2, Math.floor(colorable.length * 0.25)));
  for (let i = 0; i < colorCount; i++) {
    shuffled[i].fill = colors[i % colors.length];
  }
  return rects;
}

function generateParticles(random: () => number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    baseX: random(),
    baseY: random(),
    depth: 0.25 + random() * 0.9,
    size: 3 + random() * 10,
    color: PARTICLE_COLORS[Math.floor(random() * PARTICLE_COLORS.length)],
    shape: random() > 0.5 ? "square" : "circle",
    rotation: random() * Math.PI * 2,
    rotSpeed: (random() - 0.5) * 0.4,
    driftAmpX: 0.01 + random() * 0.025,
    driftAmpY: 0.01 + random() * 0.025,
    driftSpeed: 0.15 + random() * 0.35,
    phase: random() * Math.PI * 2,
    glow: random() > 0.88,
  }));
}

export function HeroMondrian() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const random = mulberry32(20260917);
    const grid = generateGrid(random);
    const particles = generateParticles(random, 160);

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

    function drawGrid(offsetX: number, offsetY: number) {
      for (const rect of grid) {
        ctx!.fillStyle = rect.fill ?? PALETTE.cream;
        ctx!.fillRect(rect.x * width + offsetX, rect.y * height + offsetY, rect.w * width, rect.h * height);
      }
      ctx!.strokeStyle = PALETTE.black;
      ctx!.lineWidth = Math.max(3, width * 0.007);
      for (const rect of grid) {
        ctx!.strokeRect(rect.x * width + offsetX, rect.y * height + offsetY, rect.w * width, rect.h * height);
      }
    }

    function drawParticles(t: number, offsetX: number, offsetY: number) {
      for (const p of particles) {
        const driftX = Math.sin(t * p.driftSpeed + p.phase) * p.driftAmpX * width;
        const driftY = Math.cos(t * p.driftSpeed * 0.85 + p.phase) * p.driftAmpY * height;
        const px = p.baseX * width + driftX + offsetX * p.depth;
        const py = p.baseY * height + driftY + offsetY * p.depth;
        ctx!.save();
        ctx!.translate(px, py);
        ctx!.rotate(p.rotation + t * p.rotSpeed);
        ctx!.fillStyle = p.color;
        ctx!.shadowBlur = p.glow ? p.size * 2 : 0;
        ctx!.shadowColor = p.color;
        if (p.shape === "square") {
          ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx!.beginPath();
          ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.restore();
      }
    }

    function render(t: number, offsetX: number, offsetY: number) {
      ctx!.clearRect(0, 0, width, height);
      drawGrid(offsetX * 0.25, offsetY * 0.25);
      drawParticles(t, offsetX, offsetY);
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
