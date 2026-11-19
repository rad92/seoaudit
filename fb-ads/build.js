// Generates Facebook ad creatives (1:1 1080x1080 and 4:5 1080x1350) as PNG.
// Run: node fb-ads/build.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BRAND = 'AI Vidljivost'; // <- zamenite imenom vaše agencije
const OUT = path.join(__dirname, 'png');

const base = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:var(--h);overflow:hidden}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','cv11'}
.d{font-family:'Inter Display','Inter',sans-serif}
.ad{position:relative;width:1080px;height:var(--h);padding:72px 80px;display:flex;flex-direction:column;overflow:hidden}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;font-size:26px;letter-spacing:-.2px}
.brand i{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-style:normal;font-size:22px}
.top{display:flex;justify-content:space-between;align-items:center}
.pill{font-size:20px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:10px 18px;border-radius:999px}
.cta{flex:none;white-space:nowrap;display:inline-flex;align-items:center;gap:14px;font-weight:700;font-size:30px;padding:26px 40px;border-radius:18px}
.src{font-size:19px;line-height:1.4}
.grow{flex:1}
`;

const spark = `<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/></svg>`;
const arrow = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const check = (c) => `<svg width="34" height="34" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="${c}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cross = `<svg width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#cbd2dc"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>`;

const brand = (bg, fg, col) =>
  `<div class="brand" style="color:${col}"><i style="background:${bg};color:${fg}">${spark}</i>${BRAND}</div>`;

// ---------- Concepts ----------
const ads = {
  // 1. Chat mockup — konkurencija je preporučena, vi niste
  '01-chat-konkurencija': (tall) => `
<style>
.ad{background:radial-gradient(1200px 700px at 85% -10%,#1d3b8f 0%,transparent 60%),linear-gradient(160deg,#0a1230,#060a1c);color:#fff}
h1{font-size:${tall ? 74 : 64}px;line-height:1.04;letter-spacing:-2.4px;font-weight:800;margin-top:${tall ? 56 : 40}px}
h1 em{font-style:normal;background:linear-gradient(90deg,#7cc4ff,#a78bfa);-webkit-background-clip:text;color:transparent}
.chat{margin-top:${tall ? 52 : 36}px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:${tall ? 34 : 26}px;display:flex;flex-direction:column;gap:${tall ? 22 : 16}px;backdrop-filter:blur(8px)}
.q{align-self:flex-end;background:#2f6bff;padding:18px 26px;border-radius:22px 22px 6px 22px;font-size:27px;font-weight:500;max-width:85%;white-space:nowrap}
.a{display:flex;gap:16px;align-items:flex-start}
.av{flex:none;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#7cc4ff,#a78bfa);display:grid;place-items:center;color:#0a1230}
.ans{font-size:24px;color:#c9d3ee;line-height:1.45;flex:1}
.row{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.06);border-radius:14px;padding:${tall ? 15 : 11}px 20px;margin-top:10px;color:#fff;font-weight:600}
.row span{color:#ffd166;font-weight:600;font-size:22px}
.you{border:2px dashed #ff6b8b;background:rgba(255,107,139,.08);color:#ff9fb3}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:30px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:${tall ? 40 : 26}px}
.st{border-radius:20px;padding:${tall ? '24px 22px' : '18px 20px'};background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)}
.st b{display:block;font-size:${tall ? 46 : 38}px;letter-spacing:-1.5px;background:linear-gradient(90deg,#7cc4ff,#a78bfa);-webkit-background-clip:text;color:transparent}
.st span{display:block;font-size:${tall ? 20 : 18}px;color:#9fb4e8;line-height:1.3;margin-top:4px}
.line{font-size:28px;line-height:1.3;color:#c9d3ee;max-width:470px}
.line b{color:#fff}
.cta{background:#fff;color:#0a1230}
</style>
<div class="ad">
  <div class="top">${brand('#2f6bff', '#fff', '#fff')}<div class="pill" style="background:rgba(255,255,255,.1);color:#9fb4e8">AI pretraga</div></div>
  <h1 class="d">Vaši kupci više ne „guglaju”. <em>Pitaju ChatGPT.</em></h1>
  <div class="chat">
    <div class="q">Preporuči mi dobrog stomatologa u Novom Sadu</div>
    <div class="a"><div class="av">${spark}</div>
      <div class="ans">Evo tri proverene opcije sa odličnim recenzijama:
        <div class="row">1. Konkurent A <span>★ 4,9</span></div>
        <div class="row">2. Konkurent B <span>★ 4,8</span></div>
        <div class="row you">3. Vaš biznis? <span style="color:#ff9fb3">nije pomenut</span></div>
      </div>
    </div>
  </div>
  <div class="stats">
    <div class="st"><b class="d">800M+</b><span>ljudi nedeljno koristi ChatGPT¹</span></div>
    <div class="st"><b class="d">+120%</b><span>više klikova kad vas AI citira²</span></div>
    <div class="st"><b class="d">4,4×</b><span>vredniji posetilac iz AI pretrage³</span></div>
  </div>
  <div class="grow"></div>
  <div class="src" style="color:#5d6b92;font-size:16px;margin-bottom:22px">¹ OpenAI, 2025 · ² Seer Interactive, 2026 · ³ Semrush, 2025</div>
  <div class="bottom">
    <div class="line">Ako vas AI ne preporučuje — <b>preporučuje vašu konkurenciju.</b></div>
    <div class="cta">Proverite besplatno ${arrow}</div>
  </div>
</div>`,

  // 2. Glavna statistika +120% (Seer Interactive 2026)
  '02-statistika-120': (tall) => `
<style>
.ad{background:#f5f3ee;color:#0d1321}
.eyebrow{margin-top:${tall ? 70 : 44}px;font-size:24px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#e4572e}
.big{font-size:${tall ? 290 : 250}px;font-weight:800;letter-spacing:-14px;line-height:.9;margin-top:14px;margin-left:-10px;background:linear-gradient(100deg,#0d1321 30%,#e4572e);-webkit-background-clip:text;color:transparent}
h2{font-size:${tall ? 56 : 46}px;line-height:1.12;letter-spacing:-1.4px;font-weight:700;margin-top:${tall ? 26 : 16}px;max-width:860px}
h2 b{color:#e4572e}
.bars{margin-top:${tall ? 80 : 34}px;display:flex;flex-direction:column;gap:${tall ? 30 : 16}px}
.bl{display:flex;justify-content:space-between;font-size:${tall ? 28 : 24}px;font-weight:600;margin-bottom:8px}
.bl span{font-weight:800}
.track{height:${tall ? 38 : 24}px;background:#e6e1d6;border-radius:999px;overflow:hidden}
.fill{height:100%;border-radius:999px}
.note{font-size:20px;color:#6b7280;margin-top:10px}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.cta{background:#0d1321;color:#fff}
</style>
<div class="ad">
  <div class="top">${brand('#0d1321', '#fff', '#0d1321')}<div class="pill" style="background:#0d1321;color:#fff">Studija 2026</div></div>
  <div class="eyebrow">Citirani u Google AI odgovorima</div>
  <div class="big d">+120%</div>
  <h2 class="d">više klikova za biznise koje <b>AI navodi kao izvor</b> — u odnosu na one koje ne navodi.</h2>
  <div class="bars">
    <div><div class="bl">Vaš sajt je citiran u AI odgovoru <span>20.743 klika</span></div><div class="track"><div class="fill" style="width:62%;background:linear-gradient(90deg,#e4572e,#ff8a5b)"></div></div></div>
    <div><div class="bl" style="color:#6b7280">Nije citiran <span>9.445 klikova</span></div><div class="track"><div class="fill" style="width:28%;background:#9ca3af"></div></div></div>
    <div class="note">na svakih 1.000.000 prikaza u pretrazi</div>
  </div>
  <div class="grow"></div>
  <div class="bottom">
    <div class="src" style="color:#6b7280">Izvor: Seer Interactive, „AIO Impact on Google CTR”, april 2026.<br>53 brenda · 5,47 mil. upita · 2,43 mlrd. prikaza</div>
    <div class="cta">Postanite izvor ${arrow}</div>
  </div>
</div>`,

  // 3. 4,4× vredniji posetilac (Semrush 2025)
  '03-posetilac-4-4x': (tall) => `
<style>
.ad{background:linear-gradient(145deg,#06302b 0%,#0b4d43 45%,#0e6b5a 100%);color:#fff}
.glow{position:absolute;width:900px;height:900px;border-radius:50%;right:-320px;top:${tall ? 160 : 60}px;background:radial-gradient(circle,rgba(132,255,201,.35),transparent 65%)}
.wrap{position:relative;display:flex;flex-direction:column;height:100%}
.big{font-size:${tall ? 380 : 270}px;font-weight:800;letter-spacing:-12px;line-height:.85;margin-top:${tall ? 100 : 50}px;color:#84ffc9}
h2{font-size:${tall ? 62 : 48}px;line-height:1.1;letter-spacing:-1.6px;font-weight:700;margin-top:${tall ? 70 : 40}px;max-width:900px}
p.sub{font-size:${tall ? 34 : 30}px;line-height:1.4;color:#b9e8d9;margin-top:${tall ? 28 : 18}px;max-width:820px}
.chips{display:flex;gap:14px;margin-top:${tall ? 40 : 26}px;flex-wrap:wrap}
.chip{font-size:22px;font-weight:600;padding:12px 20px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18)}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.cta{background:#84ffc9;color:#06302b}
</style>
<div class="ad"><div class="glow"></div><div class="wrap">
  <div class="top">${brand('#84ffc9', '#06302b', '#fff')}<div class="pill" style="background:rgba(255,255,255,.12);color:#b9e8d9">Podaci</div></div>
  <div class="big d">4,4×</div>
  <h2 class="d">Posetilac iz AI pretrage vredi 4,4 puta više od posetioca iz klasične pretrage.</h2>
  <p class="sub">Dolazi informisan, sa preporukom u ruci — i spreman da kupi.</p>
  <div class="chips"><div class="chip">ChatGPT</div><div class="chip">Google AI Overviews</div><div class="chip">Gemini</div><div class="chip">Perplexity</div></div>
  <div class="grow"></div>
  <div class="bottom">
    <div class="src" style="color:#9fd6c4">Izvor: Semrush, AI Search &amp; SEO Traffic Study, 2025<br>(stopa konverzije, prosek)</div>
    <div class="cta">Želim te kupce ${arrow}</div>
  </div>
</div></div>`,

  // 4. Šta dobijate — checklista usluge
  '04-sta-dobijate': (tall) => `
<style>
.ad{background:#fff;color:#0f172a}
.band{position:absolute;inset:0 0 auto 0;height:${tall ? 470 : 400}px;background:linear-gradient(135deg,#4f46e5,#7c3aed);}
.wrap{position:relative;display:flex;flex-direction:column;height:100%}
h1{color:#fff;font-size:${tall ? 72 : 64}px;line-height:1.03;letter-spacing:-2.4px;font-weight:800;margin-top:${tall ? 54 : 38}px}
.lead{color:#e0e7ff;font-size:28px;margin-top:18px}
.card{margin-top:${tall ? 56 : 34}px;background:#fff;border-radius:28px;box-shadow:0 30px 70px rgba(30,27,75,.18),0 0 0 1px #eef0f6;padding:${tall ? '48px 48px' : '28px 40px'};display:flex;flex-direction:column;gap:${tall ? 34 : 16}px}
.it{display:flex;gap:20px;align-items:flex-start}
.it svg{flex:none;margin-top:2px}
.it b{display:block;font-size:${tall ? 29 : 27}px;letter-spacing:-.4px}
.it span{display:block;font-size:${tall ? 22 : 20}px;color:#64748b;margin-top:4px;line-height:1.35}
.bottom{display:flex;justify-content:space-between;align-items:center;gap:24px}
.cta{background:#4f46e5;color:#fff}
.small{font-size:22px;color:#64748b;line-height:1.35;max-width:400px}
</style>
<div class="ad"><div class="band"></div><div class="wrap">
  <div class="top">${brand('#fff', '#4f46e5', '#fff')}<div class="pill" style="background:rgba(255,255,255,.18);color:#fff">Usluga</div></div>
  <h1 class="d">Postavite svoj biznis u ChatGPT i Google AI odgovore.</h1>
  <div class="lead">Evo šta tačno dobijate:</div>
  <div class="card">
    <div class="it">${check('#4f46e5')}<div><b>AI audit vidljivosti</b><span>Šta ChatGPT, Gemini i Google AI danas kažu o vama</span></div></div>
    <div class="it">${check('#4f46e5')}<div><b>Optimizovani profili i izvori</b><span>Google Business profil, katalozi i recenzije koje AI čita</span></div></div>
    <div class="it">${check('#4f46e5')}<div><b>Tehnička podešavanja sajta</b><span>Schema markup, struktura i brzina za AI pretraživače</span></div></div>
    <div class="it">${check('#4f46e5')}<div><b>Sadržaj koji AI citira</b><span>Pitanja i odgovori, poređenja, cene — na srpskom</span></div></div>
    ${tall ? `<div class="it">${check('#4f46e5')}<div><b>Mesečni izveštaj</b><span>Praćenje AI pominjanja vas i konkurencije</span></div></div>` : ''}
  </div>
  <div class="grow"></div>
  <div class="bottom">
    <div class="small">Prvi korak je besplatan: analiza vaše AI vidljivosti.</div>
    <div class="cta">Zakažite analizu ${arrow}</div>
  </div>
</div></div>`,

  // 5. Pre / posle — split
  '05-pre-posle': (tall) => `
<style>
.ad{background:#0b0f1a;color:#fff;padding:0}
.head{padding:${tall ? '72px 80px 50px' : '64px 80px 38px'}}
h1{font-size:${tall ? 76 : 66}px;line-height:1.02;letter-spacing:-2.6px;font-weight:800;margin-top:${tall ? 44 : 30}px}
h1 em{font-style:normal;color:#ffcf4a}
.split{flex:1;display:grid;grid-template-columns:1fr 1fr}
.col{padding:${tall ? '50px 46px' : '36px 40px'};display:flex;flex-direction:column;justify-content:center;gap:${tall ? 40 : 30}px}
.l{background:#e9edf3;color:#5b6474}
.r{background:linear-gradient(160deg,#ffcf4a,#ff9f1c);color:#1a1200}
.lab{font-size:20px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
.it{display:flex;gap:14px;align-items:center;font-size:27px;font-weight:600;line-height:1.2}
.lab{margin-bottom:6px}
.it svg{flex:none}
.l .it{text-decoration:line-through;text-decoration-color:rgba(91,100,116,.5)}
.foot{display:flex;justify-content:space-between;align-items:center;padding:${tall ? '40px 80px' : '30px 80px'};gap:24px}
.cta{background:#ffcf4a;color:#1a1200;font-size:28px;padding:22px 36px}
</style>
<div class="ad">
  <div class="head">
    <div class="top">${brand('#ffcf4a', '#1a1200', '#fff')}<div class="pill" style="background:rgba(255,255,255,.1);color:#cfd6e4">Pre / posle</div></div>
    <h1 class="d">Ista firma.<br><em>Potpuno drugačija vidljivost.</em></h1>
  </div>
  <div class="split">
    <div class="col l">
      <div class="lab">Bez AI optimizacije</div>
      <div class="it">${cross} ChatGPT vas ne pominje</div>
      <div class="it">${cross} Nevidljivi u AI odgovorima</div>
      <div class="it">${cross} Kupci odlaze konkurenciji</div>
      <div class="it">${cross} Sve skuplji oglasi</div>
    </div>
    <div class="col r">
      <div class="lab">Sa AI optimizacijom</div>
      <div class="it">${check('#1a1200')} Preporučeni u AI odgovorima</div>
      <div class="it">${check('#1a1200')} Do +120% više klikova*</div>
      <div class="it">${check('#1a1200')} 4,4× vredniji posetioci*</div>
      <div class="it">${check('#1a1200')} Kupci koji već biraju vas</div>
    </div>
  </div>
  <div class="foot">
    <div class="src" style="color:#8a93a6">*Seer Interactive 2026; Semrush 2025</div>
    <div class="cta">Pređite na desnu stranu ${arrow}</div>
  </div>
</div>`,

  // 6. Minimalističko pitanje — scroll-stopper
  '06-da-li-ai-zna': (tall) => `
<style>
.ad{background:#111;color:#f4f1ea;justify-content:space-between}
.q{font-size:${tall ? 112 : 100}px;line-height:1;letter-spacing:-4.5px;font-weight:800}
.q span{color:#7c7c7c}
.cur{display:inline-block;width:14px;height:.82em;background:#3ddc97;vertical-align:-4px;margin-left:10px;border-radius:2px}
.box{border:1px solid #2c2c2c;border-radius:24px;padding:28px 32px;display:flex;align-items:center;gap:20px;background:#181818}
.box .ic{flex:none;width:56px;height:56px;border-radius:16px;background:#3ddc97;color:#111;display:grid;place-items:center}
.box p{font-size:26px;line-height:1.4;color:#bdbab3}
.box b{color:#f4f1ea}
.bottom{display:flex;justify-content:space-between;align-items:center;gap:24px}
.cta{background:#3ddc97;color:#111}
.stat{font-size:22px;color:#8d8a84;line-height:1.4;max-width:420px}
</style>
<div class="ad">
  <div class="top">${brand('#3ddc97', '#111', '#f4f1ea')}<div class="pill" style="border:1px solid #333;color:#9a978f">Pitanje za vlasnike</div></div>
  <div>
    <div class="q d">Da li ChatGPT zna da <span>vaša firma</span> postoji?<i class="cur"></i></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:${tall ? 40 : 28}px">
    <div class="box"><div class="ic">${spark}</div><p>Proverićemo šta ChatGPT i Google AI kažu o vama — <b>i šta kažu o vašoj konkurenciji.</b></p></div>
    <div class="bottom">
      <div class="stat">Citirani biznisi dobijaju +120% više klikova (Seer Interactive, 2026).</div>
      <div class="cta">Besplatna provera ${arrow}</div>
    </div>
  </div>
</div>`,
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const sizes = [
    { tag: '4x5', h: 1350, tall: true },
    { tag: '1x1', h: 1080, tall: false },
  ];
  for (const [name, tpl] of Object.entries(ads)) {
    for (const s of sizes) {
      const page = await browser.newPage({ viewport: { width: 1080, height: s.h }, deviceScaleFactor: 1 });
      const html = `<!doctype html><html lang="sr"><head><meta charset="utf-8"><style>:root{--h:${s.h}px}${base}</style></head><body>${tpl(s.tall)}</body></html>`;
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(OUT, `${name}_${s.tag}.png`);
      await page.screenshot({ path: file });
      // overflow check
      const over = await page.evaluate(() => document.querySelector('.ad').scrollHeight > document.querySelector('.ad').clientHeight + 1);
      console.log(file, over ? 'OVERFLOW' : 'ok');
      await page.close();
    }
  }
  await browser.close();
})();
