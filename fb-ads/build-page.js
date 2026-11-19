// Generates Facebook Page assets: profile photo + cover photo.
// Run: node fb-ads/build-page.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BRAND = 'AI Vidljivost'; // <- zamenite imenom vaše agencije
const OUT = path.join(__dirname, 'page');

const spark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/></svg>`;

const base = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.d{font-family:'Inter Display','Inter',sans-serif}`;

const bg = `radial-gradient(900px 600px at 80% 0%,#1d3b8f 0%,transparent 60%),radial-gradient(700px 500px at 10% 110%,#4c2a9e 0%,transparent 60%),linear-gradient(160deg,#0a1230,#060a1c)`;

// Profile photo: 720x720, shown as a circle -> keep the mark centered.
const profile = (variant) => `
<style>
body{width:720px;height:720px;background:${bg};display:grid;place-items:center;color:#fff}
.mark{width:420px;height:420px;border-radius:112px;background:linear-gradient(135deg,#2f6bff,#8b5cf6);display:grid;place-items:center;box-shadow:0 30px 80px rgba(47,107,255,.45),inset 0 2px 0 rgba(255,255,255,.25)}
.mono{display:flex;flex-direction:column;align-items:center;gap:26px}
.mono .mark{width:300px;height:300px;border-radius:80px}
.mono b{font-size:64px;letter-spacing:-2px;font-weight:800}
</style>
${variant === 'icon'
  ? `<div class="mark">${spark(230)}</div>`
  : `<div class="mono"><div class="mark">${spark(165)}</div><b class="d">${BRAND}</b></div>`}`;

// Cover photo: 1640x624 (2x of 820x312). Mobile shows only the center ~1110px,
// desktop crops ~8px top/bottom, and the profile photo overlaps bottom-left on mobile.
const cover = `
<style>
body{width:1640px;height:624px;background:${bg};color:#fff;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 280px}
.pill{display:inline-flex;align-items:center;gap:10px;font-size:20px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#9fb4e8;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);padding:10px 20px;border-radius:999px}
.pill i{color:#7cc4ff;display:flex}
h1{font-size:70px;line-height:1.04;letter-spacing:-2.6px;font-weight:800;margin-top:26px}
h1 em{font-style:normal;background:linear-gradient(90deg,#7cc4ff,#a78bfa);-webkit-background-clip:text;color:transparent}
p{font-size:26px;color:#b8c4e6;margin-top:20px}
.chips{display:flex;gap:12px;margin-top:30px}
.chip{font-size:19px;font-weight:600;padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#dbe3fa}
/* decorative floating chat cards on the sides (cropped on mobile, that's fine) */
.card{position:absolute;width:250px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:20px 22px;text-align:left}
.card .q{font-size:17px;color:#fff;background:#2f6bff;padding:10px 14px;border-radius:14px 14px 4px 14px;display:inline-block}
.card .a{margin-top:14px;font-size:16px;color:#b8c4e6;line-height:1.45}
.card .a b{color:#fff}
.stat{position:absolute;text-align:left}
.stat b{display:block;font-size:64px;letter-spacing:-2px;font-weight:800;background:linear-gradient(90deg,#7cc4ff,#a78bfa);-webkit-background-clip:text;color:transparent;line-height:1}
.stat span{display:block;font-size:17px;color:#9fb4e8;margin-top:8px;max-width:260px;line-height:1.35}
</style>
<div class="grid"></div>
<div class="card" style="left:70px;top:250px;transform:rotate(-4deg)"><div class="q">Najbolji računovođa u Beogradu?</div><div class="a">Preporučujem <b>tri proverene agencije</b> sa odličnim recenzijama…</div></div>
<div class="stat" style="left:90px;top:80px"><b class="d">4,4×</b><span>vredniji posetilac iz AI pretrage</span></div>
<div class="card" style="right:50px;bottom:58px;transform:rotate(4deg)"><div class="q">Gde da kupim nameštaj u Nišu?</div><div class="a">Evo opcija koje kupci <b>najčešće preporučuju</b>…</div></div>
<div class="stat" style="right:90px;top:80px;text-align:right"><b class="d">+120%</b><span style="margin-left:auto">više klikova kad vas AI citira</span></div>
<div class="wrap">
  <div class="pill"><i>${spark(18)}</i>${BRAND}</div>
  <h1 class="d">Postavite svoj biznis u<br><em>ChatGPT i Google AI odgovore.</em></h1>
  <p>Da vas AI preporuči kad kupci pitaju — ne vašu konkurenciju.</p>
  <div class="chips"><div class="chip">ChatGPT</div><div class="chip">Google AI Overviews</div><div class="chip">Gemini</div><div class="chip">Perplexity</div></div>
</div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const jobs = [
    ['profilna-ikonica_720.png', 720, 720, profile('icon')],
    ['profilna-sa-imenom_720.png', 720, 720, profile('name')],
    ['naslovna_1640x624.png', 1640, 624, cover],
  ];
  for (const [file, w, h, body] of jobs) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(`<!doctype html><html lang="sr"><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, file) });
    console.log(file);
    await page.close();
  }
  await browser.close();
})();
