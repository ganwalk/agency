// Renderiza level-intro.html em MP4, quadro a quadro, nos dois formatos.
//
//   node video/render.mjs            # 16:9 e 9:16
//   node video/render.mjs 9x16       # só um formato
//
// Precisa de Playwright (Chromium) e de um ffmpeg com libx264. O caminho do
// ffmpeg vem de FFMPEG, ou do PATH. Cada quadro chama render(t) na página,
// então o resultado é determinístico: nenhum quadro é perdido, independente
// da velocidade da máquina.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    const globalRoot = execSync("npm root -g").toString().trim();
    return require(path.join(globalRoot, "playwright"));
  }
}
const { chromium } = loadPlaywright();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "video", "export");
const FPS = 30;
const FFMPEG = process.env.FFMPEG || "ffmpeg";

const FORMATS = {
  "16x9": { w: 1920, h: 1080 },
  "9x16": { w: 1080, h: 1920 },
};

const TYPES = { ".html": "text/html", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".mjs": "text/javascript" };

function serve() {
  const server = createServer(async (req, res) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise(resolve => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function renderFormat(browser, port, name, { w, h }) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/video/level-intro.html?w=${w}&h=${h}&frame=1`);
  await page.evaluate(() => window.ready);
  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * FPS);

  const out = path.join(OUT, `level-intro-${name}.mp4`);
  const ff = spawn(FFMPEG, [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
    "-c:v", "libx264", "-preset", "slow", "-crf", "16",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    out,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => ff.on("close", c => (c === 0 ? res() : rej(new Error(`ffmpeg saiu com ${c}`)))));

  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / FPS);
    const png = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once("drain", r));
    if (i % 60 === 0) process.stdout.write(`\r${name}: ${i}/${total}`);
  }
  ff.stdin.end();
  await done;
  process.stdout.write(`\r${name}: ${total}/${total} -> ${path.relative(ROOT, out)}\n`);
  await page.close();
}

const wanted = process.argv.slice(2);
const targets = Object.entries(FORMATS).filter(([n]) => !wanted.length || wanted.includes(n));

await mkdir(OUT, { recursive: true });
const server = await serve();
const browser = await chromium.launch();
try {
  for (const [name, size] of targets) await renderFormat(browser, server.address().port, name, size);
} finally {
  await browser.close();
  server.close();
}
