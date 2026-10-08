// Gera os SVGs das alternativas de símbolo da Ritmo a partir de uma fonte só.
// Mesma diretriz da marca Level: grade 32×32, monocromático em currentColor,
// círculos do mesmo raio, um sólido e o resto em contorno de traço 3.
// Uso: node brand-assets/ritmo/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
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

// Família do metrônomo: variações da opção Pêndulo. Mesmas regras: um
// único elemento sólido (o peso, que também lê como o ponto de "Ritmo.").
export const metronomo = [
  {
    id: "pendulo",
    name: "Pêndulo",
    body: ring(8, 9, 5) + line("M16 28.5 L 21.6 13.6") + solid(23.5, 9, 6.5),
  },
  {
    id: "andamento",
    name: "Andamento",
    body: line("M5 28 H 27") + line("M13 28 L 22.5 4") + solid(18.9, 13, 5),
  },
  {
    id: "batida",
    name: "Batida",
    body: ring(7.5, 9, 5) + line("M16 28 L 9.6 13.6") + line("M16 28 L 21.9 14.7") + solid(24.5, 9, 6),
  },
  {
    id: "tres-tempos",
    name: "Três tempos",
    body: ring(5.5, 15.6, 3.5) + ring(16, 12, 3.5) + line("M16 28.5 L 24.3 19") + solid(26.5, 15.6, 5),
  },
  {
    id: "piramide",
    name: "Pirâmide",
    body: line("M12 5 H 20 L 26.5 28 H 5.5 Z") + line("M16 24 L 20 9.5") + solid(18.4, 15.3, 4),
  },
  {
    id: "r-pendular",
    name: "R pendular",
    body: line("M8 28 V 4.5 H 14.5 A 6.25 6.25 0 0 1 14.5 17 H 8") + line("M13.5 17 L 19.5 23") + solid(23, 26, 5),
  },
];

// Família da convergência: variações da opção Convergência, que sai do
// diagrama da página 1 do documento (pessoas, processos e tecnologia
// chegando a uma escolha útil). Traços em 3, o ponto de chegada sólido.
export const convergencia = [
  {
    id: "convergencia",
    name: "Convergência",
    body:
      line("M3 7 C 11 7, 14 16, 21 16") + line("M3 16 H 21") + line("M3 25 C 11 25, 14 16, 21 16") + solid(24.5, 16, 6),
  },
  {
    id: "espaco",
    name: "Espaço",
    body:
      line("M3 7 C 9 7, 11 16, 14 16") + line("M3 16 H 14") + line("M3 25 C 9 25, 11 16, 14 16") + solid(24.5, 16, 6),
  },
  {
    id: "saida",
    name: "Saída",
    body:
      line("M2.5 7 C 7.5 7, 9 16, 12.5 16") + line("M2.5 16 H 12.5") + line("M2.5 25 C 7.5 25, 9 16, 12.5 16") +
      solid(16.5, 16, 4.5) + line("M23.5 16 H 30"),
  },
  {
    id: "feixe",
    name: "Feixe",
    body: line("M3 5.5 L 19 16") + line("M3 16 H 19") + line("M3 26.5 L 19 16") + solid(24.5, 16, 6),
  },
  {
    id: "origens",
    name: "Origens",
    body:
      ring(4.5, 7, 2.5) + ring(4.5, 16, 2.5) + ring(4.5, 25, 2.5) +
      line("M8.5 7.5 C 13 8.5, 15 16, 19 16") + line("M8.5 16 H 19") + line("M8.5 24.5 C 13 23.5, 15 16, 19 16") +
      solid(24.5, 16, 6),
  },
];

const here = dirname(fileURLToPath(import.meta.url));
for (const m of marks) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" style="color:#11141c">${m.body}</svg>\n`;
  writeFileSync(join(here, `${m.id}.svg`), svg);
}

mkdirSync(join(here, "metronomo"), { recursive: true });
for (const m of metronomo) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" style="color:#11141c">${m.body}</svg>\n`;
  writeFileSync(join(here, "metronomo", `${m.id}.svg`), svg);
}
mkdirSync(join(here, "convergencia"), { recursive: true });
for (const m of convergencia) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" style="color:#11141c">${m.body}</svg>\n`;
  writeFileSync(join(here, "convergencia", `${m.id}.svg`), svg);
}
console.log(marks.map((m) => m.id).join(" "));
