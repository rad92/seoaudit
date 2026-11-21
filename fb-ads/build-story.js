// Generates a 3-frame Instagram/Facebook Story sequence (1080x1920).
// Top 250px and bottom 340px are kept free of key content (Instagram's profile bar and reply box).
// Run: node fb-ads/build-story.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BRAND = 'AI Vidljivost'; // <- zamenite imenom vaše agencije
const OUT = path.join(__dirname, 'instagram', 'story');

const spark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/></svg>`;
const check = `<svg width="56" height="56" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#84ffc9"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#0a1230" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const down = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16M6 14l6 6 6-6"/></svg>`;

const NAVY = `radial-gradient(1000px 900px at 90% 0%,#1d3b8f 0%,transparent 60%),radial-gradient(900px 800px at 0% 100%,#3b2387 0%,transparent 60%),linear-gradient(165deg,#0a1230,#060a1c)`;
const GRAD = 'linear-gradient(90deg,#7cc4ff,#a78bfa)';

const base = `*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1920px;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden;background:${NAVY};color:#fff}
.d{font-family:'Inter Display','Inter',sans-serif}
.s{position:absolute;inset:250px 90px 340px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;font-size:30px}
.brand i{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#2f6bff,#8b5cf6);font-style:normal}
.grad{background:${GRAD};-webkit-background-clip:text;color:transparent}
.grow{flex:1}`;
const brand = `<div class="brand"><i>${spark(26)}</i>${BRAND}</div>`;

// 1. Hook — leaves room at the bottom for a native poll sticker.
const hook = `<style>
h1{font-size:132px;line-height:.98;letter-spacing:-5.5px;font-weight:800;margin-top:120px}
p{font-size:44px;line-height:1.35;color:#b8c4e6;margin-top:50px;max-width:820px}
.hint{display:flex;align-items:center;gap:16px;font-size:34px;font-weight:600;color:#9fb4e8}
.slot{height:330px}
</style>
<div class="s">
  ${brand}
  <h1 class="d">Da li vas <span class="grad">ChatGPT</span> preporučuje kupcima?</h1>
  <p>Sve više ljudi pita AI koga da izabere, umesto da traži na Google-u.</p>
  <div class="grow"></div>
  <div class="hint">Odgovorite iskreno ${down}</div>
  <div class="slot"></div>
</div>`;

// 2. Problem — AI recommends competitors.
const problem = `<style>
h2{font-size:92px;line-height:1.02;letter-spacing:-3.4px;font-weight:800;margin-top:80px;text-wrap:balance}
.chat{margin-top:60px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:34px;padding:40px;display:flex;flex-direction:column;gap:28px}
.q{align-self:flex-end;background:#2f6bff;padding:24px 32px;border-radius:28px 28px 8px 28px;font-size:36px;font-weight:500}
.a{display:flex;gap:20px}
.av{flex:none;width:60px;height:60px;border-radius:50%;background:${GRAD};display:grid;place-items:center;color:#0a1230}
.ans{flex:1;display:flex;flex-direction:column;gap:14px;font-size:32px;color:#c9d3ee}
.row{display:flex;justify-content:space-between;background:rgba(255,255,255,.07);border-radius:18px;padding:20px 26px;color:#fff;font-weight:600}
.row span{color:#ffd166}
.you{border:3px dashed #ff6b8b;background:rgba(255,107,139,.1);color:#ff9fb3}
.stat{margin-top:56px;display:flex;align-items:baseline;gap:24px}
.stat b{font-size:120px;letter-spacing:-5px;line-height:1}
.stat span{font-size:34px;line-height:1.3;color:#c9d3ee}
.src{font-size:24px;color:#7c8bb8;margin-top:14px}
</style>
<div class="s">
  ${brand}
  <h2 class="d">Ovo kupac vidi kad pita AI:</h2>
  <div class="chat">
    <div class="q">Preporuči mi frizera u Novom Sadu</div>
    <div class="a"><div class="av">${spark(28)}</div>
      <div class="ans">Evo nekoliko odličnih opcija:
        <div class="row">1. Konkurent A <span>★ 4,9</span></div>
        <div class="row">2. Konkurent B <span>★ 4,8</span></div>
        <div class="row you">Vaša firma? <span style="color:#ff9fb3">nije na listi</span></div>
      </div>
    </div>
  </div>
  <div class="stat"><b class="d grad">+120%</b><span>više klikova za firme koje AI navodi kao izvor</span></div>
  <div class="src">Seer Interactive, april 2026</div>
</div>`;

// 3. CTA — reply with a keyword (reply box sits right below the safe area).
const cta = `<style>
h2{font-size:120px;line-height:1;letter-spacing:-4.8px;font-weight:800;margin-top:100px}
.list{margin-top:90px;display:flex;flex-direction:column;gap:56px}
.it{display:flex;gap:26px;align-items:center;font-size:50px;font-weight:700;line-height:1.2;letter-spacing:-.5px}
.it svg{flex:none}
.kw{display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center}
.kw span{font-size:34px;color:#9fb4e8;font-weight:600}
.kw b{font-size:96px;letter-spacing:4px;padding:26px 60px;border-radius:28px;background:#fff;color:#0a1230}
.kw i{color:#fff;display:flex;margin-top:10px}
</style>
<div class="s">
  ${brand}
  <h2 class="d">Proverićemo vas <span class="grad">besplatno.</span></h2>
  <div class="list">
    <div class="it">${check}Šta ChatGPT i Google AI kažu o vama</div>
    <div class="it">Koga preporučuju umesto vas</div>
    <div class="it">${check}3 stvari koje odmah možete da popravite</div>
  </div>
  <div class="grow"></div>
  <div class="kw"><span>Odgovorite na ovu priču rečju</span><b>PROVERA</b><i>${down}</i></div>
</div>`.replace('<div class="it">Koga', `<div class="it">${check}Koga`);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const [file, body] of [['story-1-pitanje.png', hook], ['story-2-problem.png', problem], ['story-3-poziv.png', cta]]) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
    await page.setContent(`<!doctype html><html lang="sr"><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, file) });
    const over = await page.evaluate(() => { const s = document.querySelector('.s'); return s.scrollHeight > s.clientHeight + 1; });
    console.log(file, over ? 'OVERFLOW' : 'ok');
    await page.close();
  }
  await browser.close();
})();
