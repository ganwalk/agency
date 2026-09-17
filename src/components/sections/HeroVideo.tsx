"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { withBasePath } from "@/lib/site";

// O "quadro" da hero: um vídeo em loop bumerangue (toca pra frente, depois
// "rebobina" quadro a quadro até o início, e só aí retoma) em vez do loop
// nativo, que saltaria de volta pro começo com uma quebra visível no corte.
// A rebobinagem é feita manualmente via rAF ajustando currentTime pra trás
// — não dá pra usar playbackRate negativo pra tocar em reverso, navegador
// nenhum suporta isso de verdade. Pausa se a aba ou a hero saem de vista,
// pra não gastar CPU/bateria à toa; sob prefers-reduced-motion, o vídeo só
// mostra o primeiro quadro, parado.
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    let reversing = false;
    let lastTimestamp: number | null = null;
    let raf = 0;
    let tabVisible = document.visibilityState === "visible";
    let inView = true;

    function reverseStep(timestamp: number) {
      if (!tabVisible || !inView) {
        lastTimestamp = null;
        raf = requestAnimationFrame(reverseStep);
        return;
      }
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const next = video!.currentTime - delta;
      if (next <= 0) {
        video!.currentTime = 0;
        reversing = false;
        video!.play().catch(() => {});
        return;
      }
      video!.currentTime = next;
      raf = requestAnimationFrame(reverseStep);
    }

    function onEnded() {
      reversing = true;
      lastTimestamp = null;
      video!.pause();
      raf = requestAnimationFrame(reverseStep);
    }

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    function onVisibilityChange() {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible && inView && !reversing) video!.play().catch(() => {});
      if (!tabVisible && !reversing) video!.pause();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView && tabVisible && !reversing) video!.play().catch(() => {});
      if (!inView && !reversing) video!.pause();
    });
    intersectionObserver.observe(video);

    return () => {
      cancelAnimationFrame(raf);
      video!.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      intersectionObserver.disconnect();
    };
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={withBasePath("/gemini_generated_video_5267ea2d.mp4")}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
