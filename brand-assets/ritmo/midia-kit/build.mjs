// Gera as peças do mídia kit em PNG a partir de kit.html.
// Uso: node brand-assets/ritmo/midia-kit/build.mjs
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../..");
const OUT = path.join(HERE, "pecas");
const TYPES = { ".html": "text/html", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  const file = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try { res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" }); res.end(await readFile(file)); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/brand-assets/ritmo/midia-kit/kit.html`;
await mkdir(OUT, { recursive: true });
const browser = await pw.chromium.launch();
const probe = await browser.newPage();
await probe.goto(base);
const list = await probe.evaluate(() => window.LIST);
for (const [id, w, h] of list) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${base}?peca=${id}`);
  await page.evaluate(() => window.ready);
  await page.screenshot({ path: path.join(OUT, `ritmo-${id}.png`), clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`ritmo-${id}.png ${w}x${h}`);
  await page.close();
}
await browser.close();
server.close();
