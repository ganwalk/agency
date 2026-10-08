// Trilha sonora sintetizada, sincronizada com window.CUES da página.
//
// Sem sample nem arquivo externo: pad de acordes em senoides levemente
// desafinadas (estéreo largo), impactos graves nas viradas de cena, ticks
// curtos nos detalhes (cartões, check da proposta), ruído filtrado subindo
// antes do colapso e um risco de caneta na assinatura. Gera WAV 48kHz 16 bit.
//
// Para uma trilha mais discreta há "pluck" (nota macia, com frequência em f),
// "thump" (grave de ataque lento) e "swell" (ar filtrado), todos com ganho g;
// "pluck" com soft: true fica mais grave no timbre, com ataque lento e mais baixo;
// "bloom" é uma transição tonal (acorde aberto que cresce e se apaga), no lugar
// do ruído do "swell".
import { writeFile } from "node:fs/promises";

const SR = 48000;

export async function writeScore(file, { duration, cues, chords }) {
  const N = Math.ceil(duration * SR);
  const L = new Float32Array(N), R = new Float32Array(N);
  const TAU = Math.PI * 2;

  // Ruído determinístico.
  let seed = 22222;
  const noise = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

  // --- Pad -----------------------------------------------------------------
  const ATT = 2.2, REL = 2.6;
  for (const [a, b, freqs] of chords) {
    const s0 = Math.max(0, Math.floor((a - 0.2) * SR));
    const s1 = Math.min(N, Math.ceil((b + REL) * SR));
    freqs.forEach((f, n) => {
      const amp = 0.055 * (n === 0 ? 1.15 : 1) * (f > 300 ? 0.7 : 1);
      const ph = n * 1.3;
      for (let i = s0; i < s1; i++) {
        const t = i / SR, lt = t - (a - 0.2);
        const env = Math.min(1, lt / ATT) * (t < b ? 1 : Math.max(0, 1 - (t - b) / REL));
        if (env <= 0) continue;
        const trem = 1 + 0.12 * Math.sin(TAU * 0.17 * t + ph);
        const e = amp * env * env * trem;
        L[i] += e * (Math.sin(TAU * f * 0.9985 * t + ph) * 0.7 + Math.sin(TAU * f * 2 * t) * 0.08);
        R[i] += e * (Math.sin(TAU * f * 1.0015 * t + ph * 1.7) * 0.7 + Math.sin(TAU * f * 2.001 * t) * 0.08);
      }
    });
  }

  // --- Ar: ruído bem filtrado de fundo --------------------------------------
  let lpL = 0, lpR = 0;
  for (let i = 0; i < N; i++) {
    lpL += 0.02 * (noise() - lpL);
    lpR += 0.02 * (noise() - lpR);
    L[i] += lpL * 0.05;
    R[i] += lpR * 0.05;
  }

  // --- Eventos -------------------------------------------------------------
  const add = (t0, len, fn) => {
    const s0 = Math.max(0, Math.floor(t0 * SR)), s1 = Math.min(N, Math.floor((t0 + len) * SR));
    for (let i = s0; i < s1; i++) { const [l, r] = fn((i - s0) / SR); L[i] += l; R[i] += r; }
  };
  for (const c of cues) {
    if (c.type === "hit") {
      const g = c.soft ? 0.45 : 1;
      let ph = 0, lp = 0;
      add(c.t, 2.6, t => {
        const f = 38 + 34 * Math.exp(-t * 9);
        ph += TAU * f / SR;
        lp += 0.08 * (noise() - lp);
        const body = Math.sin(ph) * Math.exp(-t * 2.2) * 0.55;
        const air = lp * Math.exp(-t * 3.5) * 0.35;
        const v = (body + air) * g;
        return [v, v];
      });
    } else if (c.type === "tick") {
      add(c.t, 0.12, t => {
        const v = Math.sin(TAU * 2100 * t) * Math.exp(-t * 70) * 0.07 + noise() * Math.exp(-t * 260) * 0.05;
        return [v, v * 0.8];
      });
    } else if (c.type === "rise" || c.type === "swish") {
      const len = c.end - c.t;
      const big = c.type === "rise";
      let a = 0, b = 0;
      add(c.t, len, t => {
        const k = t / len;
        const fc = big ? 250 + 5500 * k * k : 900 + 3000 * Math.sin(Math.PI * k);
        const co = 1 - Math.exp(-TAU * fc / SR);
        a += co * (noise() - a);
        b += co * (noise() - b);
        const env = big ? k * k * 0.22 : Math.sin(Math.PI * k) ** 2 * 0.07;
        return [a * env * (big ? 1 : 1 - k * 0.6), b * env * (big ? 1 : 0.4 + k * 0.6)];
      });
    } else if (c.type === "pluck") {
      // Nota curta e macia, entre marimba e sino: substitui os ticks.
      const f = c.f || 329.63, g = (c.g ?? 1) * (c.soft ? 0.028 : 0.045), pan = 0.5 + 0.35 * Math.sin(f);
      const atk = c.soft ? 45 : 140, h2 = c.soft ? 0.08 : 0.22, h3 = c.soft ? 0 : 0.06;
      add(c.t, 1.6, t => {
        const env = (1 - Math.exp(-t * atk)) * Math.exp(-t * 4.2);
        const v = (Math.sin(TAU * f * t) + h2 * Math.sin(TAU * f * 2 * t) * Math.exp(-t * 6) + h3 * Math.sin(TAU * f * 3.01 * t) * Math.exp(-t * 9)) * env * g;
        return [v * (1.2 - pan), v * (0.2 + pan)];
      });
    } else if (c.type === "thump") {
      // Grave discreto, com ataque lento: marca virada de cena sem impacto.
      const g = (c.g ?? 1) * 0.11;
      let lp = 0;
      add(c.t, 2.2, t => {
        lp += 0.03 * (noise() - lp);
        const env = Math.min(1, t / 0.06) * Math.exp(-t * 2.6);
        const v = (Math.sin(TAU * 55 * t) * 0.8 + lp * 0.5) * env * g;
        return [v, v];
      });
    } else if (c.type === "swell") {
      // Ar filtrado que sobe e desce: acompanha transições e movimentos.
      const len = c.end - c.t, g = (c.g ?? 1) * 0.035;
      let a = 0, b = 0;
      add(c.t, len, t => {
        const k = t / len;
        const fc = 300 + 1600 * Math.sin(Math.PI * k);
        const co = 1 - Math.exp(-TAU * fc / SR);
        a += co * (noise() - a);
        b += co * (noise() - b);
        const env = Math.sin(Math.PI * k) ** 2 * g;
        return [a * env, b * env];
      });
    } else if (c.type === "bloom") {
      // Transição tonal: um acorde aberto (fundamental, quinta e oitava) que
      // cresce devagar, sobe de leve na afinação e se apaga. Substitui o woosh.
      const f = c.f || 523.25, g = (c.g ?? 1) * 0.026, len = c.len || 2.4;
      const parts = [[1, 1], [1.5, 0.55], [2, 0.35]];
      add(c.t, len, t => {
        const k = t / len;
        const env = Math.min(1, t / 0.45) ** 2 * Math.exp(-Math.max(0, t - 0.45) * 2.2);
        const glide = 1 + 0.004 * Math.min(1, t / 0.45);
        let l = 0, r = 0;
        parts.forEach(([m, a], n) => {
          const ph = TAU * f * m * glide * t;
          l += Math.sin(ph * 0.999 + n) * a;
          r += Math.sin(ph * 1.001 + n * 1.7) * a;
        });
        const v = env * g * (1 - k * 0.2);
        return [l * v, r * v];
      });
    } else if (c.type === "scribble") {
      const len = c.end - c.t;
      let a = 0;
      add(c.t, len, t => {
        a += 0.35 * (noise() - a);
        const stroke = 0.55 + 0.45 * Math.sin(TAU * 7 * t) * Math.sin(TAU * 2.3 * t);
        const env = Math.min(1, t / 0.05) * Math.min(1, (len - t) / 0.1);
        const v = a * stroke * env * 0.05;
        return [v * 0.8, v];
      });
    }
  }

  // --- Master: fades, saturação suave, normalização --------------------------
  const fin = 1.2 * SR, fout = 2.4 * SR;
  let peak = 0;
  for (let i = 0; i < N; i++) {
    const g = Math.min(1, i / fin) * Math.min(1, (N - i) / fout);
    L[i] = Math.tanh(L[i] * g * 1.3) / 1.3;
    R[i] = Math.tanh(R[i] * g * 1.3) / 1.3;
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const norm = 0.85 / peak;

  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4);
  }
  await writeFile(file, buf);
}
