// Gera os SVGs das alternativas de símbolo da Ritmo a partir de uma fonte só.
// Mesma diretriz da marca Level: grade 32×32, monocromático em currentColor,
// círculos do mesmo raio, um sólido e o resto em contorno de traço 3.
// Uso: node brand-assets/ritmo/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const S = 3; // espessura do traço, igual à da Level
const solid = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="currentColor"/>`;
const ring = (cx, cy, r) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="${S}"/>`;
const line = (d) =>
  `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${S}" stroke-linecap="round" stroke-linejoin="round"/>`;

export const marks = [
  {
    id: "compasso",
    name: "Compasso",
    body: ring(9.5, 16, 7.5) + solid(22.5, 16, 7.5),
  },
  {
    id: "tempo-forte",
    name: "Tempo forte",
    body: ring(5.5, 16, 4) + ring(16, 16, 4) + solid(26.5, 16, 5.5),
  },
  {
    id: "convergencia",
    name: "Convergência",
    body:
      line("M3 7 C 11 7, 14 16, 21 16") +
      line("M3 16 H 21") +
      line("M3 25 C 11 25, 14 16, 21 16") +
      solid(24.5, 16, 6),
  },
  {
    id: "pendulo",
    name: "Pêndulo",
    body: ring(8, 9, 5) + line("M16 28.5 L 21.6 13.6") + solid(23.5, 9, 6.5),
  },
  {
    id: "ciclo",
    name: "Ciclo",
    body: ring(16, 16, 11) + solid(23.8, 8.2, 6),
  },
  {
    id: "monograma",
    name: "Monograma r",
    body: line("M8.5 6.5 V 27.5") + line("M8.5 15 C 8.5 9.5, 12 6.5, 16 6.5") + solid(22.5, 9, 6),
  },
];

const here = dirname(fileURLToPath(import.meta.url));
for (const m of marks) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" style="color:#11141c">${m.body}</svg>\n`;
  writeFileSync(join(here, `${m.id}.svg`), svg);
}

console.log(marks.map((m) => m.id).join(" "));
