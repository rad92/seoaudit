// Renders the Facebook/Instagram ad creatives to PNG.
// Usage:  node build.js            (from this folder; needs Playwright + Chromium)
// Change BRAND / CTA below and re-run to regenerate every file.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BRAND = "okreni.rs";
const CTA = "Uzmi ponudu";
// Images are inlined as data URIs (a page built with setContent cannot read file:// URLs).
const SRC_DIR = path.join(__dirname, "src");
const img = (f) => "data:" + (f.endsWith(".png") ? "image/png" : "image/jpeg") + ";base64," + fs.readFileSync(path.join(SRC_DIR, f)).toString("base64");
const OUT = path.join(__dirname, "png");

const FORMATS = {
  "1x1": [1080, 1080],   // Feed (Facebook + Instagram)
  "4x5": [1080, 1350],   // Feed, takes more screen on mobile
  "9x16": [1080, 1920],  // Stories + Reels
};

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&display=swap">`;

const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#101a2e;--amber:#f3a53c;--signal:#e5484d;--paper:#fcfcf9;--muted:#5b6475}
html,body{width:var(--w);height:var(--h);overflow:hidden;background:var(--ink);color:#fff;font-family:"Figtree",sans-serif;-webkit-font-smoothing:antialiased}
h1{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;letter-spacing:-0.025em;line-height:1.0}
h1 em{font-style:normal;color:var(--amber)}
h1 .red{color:#ff6b6f}
.sub{font-size:34px;line-height:1.3;color:#d5dbe6;font-weight:500}
.pill{display:inline-flex;align-items:center;gap:14px;background:var(--amber);color:var(--ink);font:700 34px/1 "Figtree",sans-serif;padding:24px 38px;border-radius:999px}
.pill::after{content:"→";font-weight:600}
.brand{display:inline-flex;align-items:center;gap:12px;font:700 30px/1 "Bricolage Grotesque",sans-serif;color:#fff;letter-spacing:-0.01em}
.brand i{width:14px;height:28px;border-radius:4px;background:linear-gradient(#a6b0c3 0 18%,var(--amber) 18% 92%,#a6b0c3 92%);box-shadow:0 0 14px rgba(243,165,60,.7)}
.chip{display:inline-flex;align-items:center;gap:12px;font:600 26px/1 "Figtree",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--amber)}
.chip::before{content:"";width:12px;height:12px;border-radius:50%;background:currentColor}
.chip.red{color:#ff6b6f}
.foot{display:flex;align-items:center;justify-content:space-between;gap:24px}
.photo{position:relative;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
.band{background:var(--ink);display:flex;flex-direction:column;justify-content:center;gap:22px;padding:0 64px}
`;

// ---------- Photo concepts ----------
// Each concept: photo + copy. Layout: text band(s) + photo; for 1:1 some use an overlay.
const photoConcepts = [
  {
    id: "A-konobar-dolazi",
    img: "waitress-red-lamp.jpg",
    chip: "Lampa za poziv konobara",
    h1: "Gost okrene lampu.<br><em>Konobar dolazi.</em>",
    sub: "Bez aplikacije, bez Wi‑Fi mreže. Spremno za 10 minuta.",
    overlay1x1: { pos: "left", h1Size: 78 },
    objPos: "center 30%",
  },
  {
    id: "B-diskretan-signal",
    img: "table-champagne.jpg",
    chip: "Za restorane i hotele",
    chipRed: true,
    h1: "Diskretan poziv.<br><em>Ambijent ostaje isti.</em>",
    sub: "Crveno svetlo pokazuje vašem timu koji sto čeka. Bez zvona i mahanja.",
    objPos: "center 100%",
  },
  {
    id: "C-7-boja",
    img: "lamps-7-colours.jpg",
    chip: "Stona lampa + poziv konobara",
    h1: "7 boja. <em>Jedna lampa.</em>",
    sub: "Uklopite je u enterijer, temu ili večerašnji događaj.",
    objPos: "center 55%",
  },
  {
    id: "E-manji-racun",
    img: "waitress-red-lamp.jpg",
    chip: "Za vlasnike lokala",
    chipRed: true,
    h1: "Gost koji čeka konobara <span class=\"red\">poruči manje.</span>",
    sub: "Gost okrene lampu, a ceo tim vidi koji sto ih treba.",
    overlay1x1: { pos: "left", h1Size: 70 },
    objPos: "center 30%",
  },
];

function photoHTML(c, fmt, w, h) {
  const chip = `<span class="chip${c.chipRed ? " red" : ""}">${c.chip}</span>`;
  const foot = `<div class="foot"><span class="pill">${CTA}</span><span class="brand"><i></i>${BRAND}</span></div>`;

  if ((fmt === "1x1" || fmt === "4x5") && c.overlay1x1) {
    return `<div class="photo" style="position:absolute;inset:0"><img src="${img(c.img)}"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse 82% 72% at 0% 0%,rgba(10,16,30,.94) 50%,rgba(10,16,30,0) 100%),linear-gradient(0deg,rgba(10,16,30,.55),rgba(10,16,30,0) 18%)"></div>
    <div style="position:absolute;left:64px;top:72px;width:560px;display:flex;flex-direction:column;gap:26px">
      ${chip}<h1 style="font-size:${c.overlay1x1.h1Size}px">${c.h1}</h1><p class="sub" style="font-size:30px">${c.sub}</p>
    </div>
    <div style="position:absolute;right:56px;bottom:56px;display:flex;align-items:center;gap:28px"><span class="brand"><i></i>${BRAND}</span><span class="pill">${CTA}</span></div>`;
  }

  if (fmt === "9x16") {
    return `<div class="band" style="height:700px;justify-content:flex-start;padding-top:250px">
        ${chip}<h1 style="font-size:92px">${c.h1}</h1><p class="sub">${c.sub}</p><div><span class="pill">${CTA}</span></div>
      </div>
      <div class="photo" style="height:1000px"><img src="${img(c.img)}" style="object-position:${c.objPos}"></div>
      <div class="band" style="height:220px;align-items:center"><span class="brand"><i></i>${BRAND}</span></div>`;
  }
  // Band layouts
  const sizes = { "1x1": { top: 330, bottom: 150, h1: 70 }, "4x5": { top: 400, bottom: 170, h1: 78 }, "9x16": { top: 640, bottom: 280, h1: 96 } }[fmt];
  const photoH = h - sizes.top - sizes.bottom;
  return `<div class="band" style="height:${sizes.top}px;padding-top:${fmt === "9x16" ? 120 : 0}px">
      ${chip}<h1 style="font-size:${sizes.h1}px">${c.h1}</h1><p class="sub"${fmt === "1x1" ? ' style="font-size:30px"' : ""}>${c.sub}</p>
    </div>
    <div class="photo" style="height:${photoH}px"><img src="${img(c.img)}" style="object-position:${c.objPos}"></div>
    <div class="band" style="height:${sizes.bottom}px;${fmt === "9x16" ? "justify-content:flex-start;padding-top:56px" : ""}">${foot}</div>`;
}

// ---------- Comparison concept (rebuilt in Serbian) ----------
const ICONS = {
  bell: '<path d="M18 40h28M22 40V28a10 10 0 0 1 20 0v12M29 46a3 3 0 0 0 6 0M32 14v4"/>',
  eye: '<path d="M8 32s9-14 24-14 24 14 24 14-9 14-24 14S8 32 8 32z"/><circle cx="32" cy="32" r="6"/>',
  palette: '<path d="M32 10a22 22 0 1 0 0 44c3 0 4-2 4-4 0-3-3-4-3-7s2-4 5-4h6c5 0 10-4 10-10 0-11-10-19-22-19z"/><circle cx="21" cy="30" r="2.5"/><circle cx="27" cy="21" r="2.5"/><circle cx="38" cy="20" r="2.5"/>',
  card: '<rect x="8" y="18" width="48" height="30" rx="5"/><path d="M16 30h18M16 37h12"/><circle cx="45" cy="33" r="4"/>',
};
const ROWS = [
  ["bell", "Okrene se i pozove konobara. Bez aplikacije i dugmića."],
  ["eye", "Ceo tim vidi koji sto ih treba."],
  ["palette", "7 boja za vaš prostor i atmosferu."],
  ["card", "Vaš logo graviran na svakoj lampi."],
];

function compareHTML(fmt, w, h) {
  const top = { "1x1": 0, "4x5": 0, "9x16": 470 }[fmt];
  const bottom = { "1x1": 0, "4x5": 170, "9x16": 250 }[fmt];
  const headH = { "1x1": 400, "4x5": 470, "9x16": 480 }[fmt];
  const rowText = fmt === "1x1" ? 27 : 30;
  const check = `<svg viewBox="0 0 64 64" width="70" height="70"><path fill="#c9a24a" d="M32 2l6 7 9-3 2 9 9 2-3 9 7 6-7 6 3 9-9 2-2 9-9-3-6 7-6-7-9 3-2-9-9-2 3-9-7-6 7-6-3-9 9-2 2-9 9 3z"/><path d="M21 33l7 7 15-15" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const cross = `<svg viewBox="0 0 64 64" width="56" height="56"><path d="M14 14l36 36M50 14L14 50" stroke="#8a8f98" stroke-width="5" stroke-linecap="round"/></svg>`;
  const rows = ROWS.map(([ic, t]) => `
    <div class="r-l"><svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICONS[ic]}</svg><span style="font-size:${rowText}px">${t}</span></div>
    <div class="r-m">${check}</div><div class="r-r">${cross}</div>`).join("");

  return `<style>
    .cmp{position:absolute;left:0;right:0;top:${top}px;bottom:${bottom}px;display:grid;grid-template-columns:43% 28.5% 28.5%;grid-template-rows:${headH}px repeat(4,1fr);background:var(--paper);color:#111}
    .cmp>div{border-bottom:2px solid #1b1b1b}
    .cmp>div:nth-last-child(-n+3){border-bottom:0}
    .h-l{padding:0 0 0 56px;display:flex;flex-direction:column;justify-content:center;gap:26px}
    .h-l h1{color:#111;font-size:${fmt === "1x1" ? 58 : 64}px;line-height:1.02}
    .h-l h1 mark{white-space:nowrap;background:#ecebe2;color:#111;padding:0 10px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
    .h-l p{font:600 28px/1.2 "Figtree";letter-spacing:.04em;text-transform:uppercase}
    .h-m{background:#141414;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:36px;text-align:center;color:#fff}
    .h-m img{width:80%;-webkit-mask-image:radial-gradient(closest-side,#000 72%,transparent 100%);mask-image:radial-gradient(closest-side,#000 72%,transparent 100%)}
    .h-r{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:36px;text-align:center;color:#6c7079}
    .h-r img{width:76%;mix-blend-mode:multiply;-webkit-mask-image:radial-gradient(closest-side,#000 75%,transparent 100%);mask-image:radial-gradient(closest-side,#000 75%,transparent 100%)}
    .lbl{font:400 30px/1.2 "Figtree"} .lbl b{display:block;font:800 36px/1.1 "Bricolage Grotesque";letter-spacing:-0.01em}
    .r-l{display:flex;align-items:center;gap:26px;padding:0 28px 0 56px;line-height:1.25;font-weight:500}
    .r-l svg{flex:none}
    .r-m{background:#141414;display:grid;place-items:center;border-bottom-color:#2c2c2c!important}
    .r-r{display:grid;place-items:center}
  </style>
  ${top ? `<div class="band" style="position:absolute;top:0;left:0;right:0;height:${top}px;justify-content:flex-start;padding-top:250px"><span class="chip">Lampa za poziv konobara</span><h1 style="font-size:76px">Zašto ne obična lampa?</h1></div>` : ""}
  <div class="cmp">
    <div class="h-l"><h1>Prva lampa<br><mark>sve u jednom</mark></h1><p>Za ugostitelje</p></div>
    <div class="h-m"><img src="${img("lamp-flipme.png")}"><div class="lbl"><b>FlipMe</b>lampa za poziv</div></div>
    <div class="h-r"><img src="${img("lamp-regular.png")}"><div class="lbl"><b style="font-weight:600">Obična</b>stona lampa</div></div>
    ${rows}
  </div>
  ${bottom ? `<div class="band" style="position:absolute;bottom:0;left:0;right:0;height:${bottom}px">${fmt === "9x16" ? `<div style="text-align:center"><span class="brand"><i></i>${BRAND}</span></div>` : `<div class="foot"><span class="pill">${CTA}</span><span class="brand"><i></i>${BRAND}</span></div>`}</div>` : ""}`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const jobs = [];
  for (const [fmt, [w, h]] of Object.entries(FORMATS)) {
    for (const c of photoConcepts) jobs.push([`${c.id}_${fmt}`, w, h, photoHTML(c, fmt, w, h)]);
    jobs.push([`D-poredjenje_${fmt}`, w, h, compareHTML(fmt, w, h)]);
  }
  for (const [name, w, h, body] of jobs) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(`<!doctype html><html lang="sr"><head><meta charset="utf-8">${FONTS}<style>${BASE_CSS}</style><style>:root{--w:${w}px;--h:${h}px}</style></head><body style="position:relative">${body}</body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, name + ".png") });
    await page.close();
    console.log("rendered", name);
  }
  await browser.close();
})();
