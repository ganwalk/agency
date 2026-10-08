// Regera a trilha de um vídeo já renderizado e troca só o áudio do MP4, sem
// renderizar a imagem de novo (útil quando só CUES, CHORDS ou score.mjs mudam).
//
//   node video/trilha.mjs ritmo-apresentacao video/export/ritmo-apresentacao-16x9.mp4 [...mais MP4]
//   node video/trilha.mjs ritmo-apresentacao --wav saida.wav    # só a trilha, para ouvir
//
// Lê DURATION, CUES e CHORDS da página e usa score.mjs. Precisa de Playwright
// e ffmpeg (FFMPEG ou PATH).
import { createServer } from "node:http";
import { readFile, rename, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync, execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { writeScore } from "./score.mjs";

const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FFMPEG = process.env.FFMPEG || "ffmpeg";

const [pageName, ...rest] = process.argv.slice(2);
if (!pageName) { console.error("uso: node video/trilha.mjs <página> <mp4...> | --wav <arquivo>"); process.exit(1); }

const srv = createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try { const b = await readFile(f); res.writeHead(200, { "Content-Type": f.endsWith(".html") ? "text/html" : "application/octet-stream" }); res.end(b); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => srv.listen(0, "127.0.0.1", r));
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`http://127.0.0.1:${srv.address().port}/video/${pageName}.html?frame=1`);
const { duration, cues, chords } = await page.evaluate(() => ({ duration: window.DURATION, cues: window.CUES, chords: window.CHORDS }));
await browser.close();
srv.close();

const wi = rest.indexOf("--wav");
const wav = wi >= 0 ? path.resolve(rest[wi + 1]) : path.join(os.tmpdir(), `${pageName}-trilha.wav`);
await writeScore(wav, { duration, cues, chords });
console.log(`trilha: ${path.relative(process.cwd(), wav)} (${duration}s, ${cues.length} sons)`);

for (const mp4 of rest.filter((a, i) => wi < 0 || (i !== wi && i !== wi + 1))) {
  const tmp = mp4.replace(/\.mp4$/, ".trilha.mp4");
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-i", mp4, "-i", wav, "-map", "0:v", "-map", "1:a",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", tmp]);
  await rename(tmp, mp4);
  console.log(`áudio trocado: ${mp4}`);
}
if (wi < 0) await rm(wav);
