// Auditoria de legibilidade de um vídeo: percorre o filme a cada 0,1s, nos
// dois formatos, e aponta texto que fica pouco tempo na tela ou sai cortado
// pela borda do quadro.
//
//   node video/auditar-textos.mjs                       # ritmo-apresentacao
//   node video/auditar-textos.mjs ritmo-apresentacao 9x16
//
// Regra: cada texto precisa ficar totalmente visível, nítido (sem desfoque,
// opacidade acima de 95%, letras assentadas) e inteiro dentro do quadro por
// pelo menos 1,5s, ou 0,3s por palavra quando isso der mais. A página precisa
// expor window.TEXT_SELECTOR com os elementos de texto e window.render(t).
// Sai com código 1 se algum texto falhar, para dar para usar antes do render.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2" };
const srv = createServer(async (req, res) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try { const b = await readFile(f); res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); res.end(b); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => srv.listen(0, "127.0.0.1", r));
const port = srv.address().port;

const args = process.argv.slice(2);
const FORMATS = { "16x9": [1920, 1080], "9x16": [1080, 1920] };
const pageName = args.find(a => !FORMATS[a]) || "ritmo-apresentacao";
const wanted = args.filter(a => FORMATS[a]);
const browser = await pw.chromium.launch();
let failed = 0;
for (const [fmt, [w, h]] of Object.entries(FORMATS)) {
  if (wanted.length && !wanted.includes(fmt)) continue;
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.goto(`http://127.0.0.1:${port}/video/${pageName}.html?w=${w}&h=${h}&frame=1`);
  await p.evaluate(() => window.ready);
  const res = await p.evaluate(({ W, H }) => {
    const SEL = window.TEXT_SELECTOR;
    const els = [...document.querySelectorAll(SEL)];
    const name = el => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
    const shown = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return false; } return true; };
    const effOp = el => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; };
    const blur = el => { const m = /blur\(([\d.]+)px\)/.exec(getComputedStyle(el).filter); return m ? +m[1] : 0; };
    const state = el => {
      if (!shown(el)) return { v: 0, cut: false };
      let op = effOp(el), bl = blur(el);
      el.querySelectorAll(".w").forEach(x => { op = Math.min(op, effOp(x)); bl = Math.max(bl, blur(x)); });
      let aligned = true;
      el.querySelectorAll(".m").forEach(m => {
        const i = m.firstElementChild; if (!i) return;
        if (Math.abs(m.getBoundingClientRect().top - i.getBoundingClientRect().top) > 2) aligned = false;
      });
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      const parts = el.querySelectorAll(".w, .m, b, span");
      (parts.length ? [...parts] : [el]).forEach(s => {
        const q = s.getBoundingClientRect();
        if (q.width && q.height) { x0 = Math.min(x0, q.left); x1 = Math.max(x1, q.right); y0 = Math.min(y0, q.top); y1 = Math.max(y1, q.bottom); }
      });
      if (x0 === Infinity) { const r = el.getBoundingClientRect(); x0 = r.left; x1 = r.right; y0 = r.top; y1 = r.bottom; }
      const inside = x0 >= -1 && x1 <= W + 1 && y0 >= -1 && y1 <= H + 1;
      const readable = op > 0.95 && bl < 0.6 && aligned;
      return { v: readable && inside ? 1 : 0, cut: op > 0.3 && !inside };
    };
    const D = window.DURATION, out = [];
    els.forEach(el => out.push({ name: name(el), best: 0, cur: 0, cuts: [] }));
    for (let t = 0; t <= D; t += 0.1) {
      window.render(t);
      els.forEach((el, i) => {
        const s = state(el), o = out[i];
        if (!o.name) o.name = name(el);
        if (s.v) { o.cur += 0.1; o.best = Math.max(o.best, o.cur); } else o.cur = 0;
        if (s.cut && o.cuts.length < 4) o.cuts.push(t.toFixed(1));
      });
    }
    return out;
  }, { W: w, H: h });
  console.log(`\n== ${fmt}`);
  let ok = 0;
  for (const o of res) {
    const words = o.name.split(" ").filter(Boolean).length;
    const need = Math.max(1.5, words * 0.3);
    const short = o.best + 0.05 < need;
    if (short || o.cuts.length) {
      failed++;
      console.log(`${short ? "CURTO" : "     "} ${o.cuts.length ? "CORTE@" + o.cuts.join(",") : ""}  ${o.best.toFixed(1)}s/${need.toFixed(1)}s  ${o.name}`);
    } else ok++;
  }
  console.log(`${ok} textos ok`);
  await p.close();
}
await browser.close();
srv.close();
process.exit(failed ? 1 : 0);
