"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Uma mira de design que segue o cursor pelo site inteiro, como se o
// visitante estivesse manuseando a mesma ferramenta usada para posicionar
// os elementos na hero: o controle passa para a mão de quem visita.
// mixBlendMode: "difference" com branco puro garante contraste em cima de
// qualquer fundo, claro ou escuro, sem precisar saber a cor por baixo.
// Só em telas com mouse de verdade (pointer: fine) e fora de
// prefers-reduced-motion: em touch não existe cursor, e quem pediu menos
// movimento não pega uma mira saltitante atrás do dedo.
export function MouseFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-cursor-follower");
    // Só liga o componente depois de confirmar mouse de verdade, no cliente.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);

    function onMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [role='button'], input, textarea, select"));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor-follower");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- liga uma vez só
  }, []);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[110] pointer-events-none"
      style={{ x: springX, y: springY, mixBlendMode: "difference", opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: hovering ? 1.7 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="12" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="2" fill="#fff" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
