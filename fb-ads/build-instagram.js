// Generates Instagram assets: profile photo (1080x1080) and feed posts (1080x1350, 4:5).
// Key content stays inside the central 1012px so the 3:4 profile-grid crop doesn't cut it.
// Run: node fb-ads/build-instagram.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BRAND = 'AI Vidljivost'; // <- zamenite imenom vaše agencije
const HANDLE = '@aividljivost'; // <- zamenite vašim Instagram nalogom
const OUT = path.join(__dirname, 'instagram');

const spark = (s, c = 'currentColor') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="${c}" d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/></svg>`;
const arrow = (s = 30) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const NAVY = `radial-gradient(900px 700px at 85% -5%,#1d3b8f 0%,transparent 60%),radial-gradient(700px 600px at 0% 105%,#3b2387 0%,transparent 60%),linear-gradient(160deg,#0a1230,#060a1c)`;
const GRAD = 'linear-gradient(90deg,#7cc4ff,#a78bfa)';

const base = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.d{font-family:'Inter Display','Inter',sans-serif}
.post{position:relative;width:1080px;height:1350px;padding:88px 100px;display:flex;flex-direction:column;overflow:hidden}
.dark{background:${NAVY};color:#fff}
.light{background:#f3f4fb;color:#0b1330}
.top{display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:600}
.brand{display:flex;align-items:center;gap:12px;font-weight:700;font-size:26px}
.brand i{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#2f6bff,#8b5cf6);color:#fff;font-style:normal}
.grad{background:${GRAD};-webkit-background-clip:text;color:transparent}
.grow{flex:1}
.handle{font-size:22px;opacity:.6;font-weight:500}
.pager{font-size:22px;font-weight:600;opacity:.6;font-variant-numeric:tabular-nums}`;

const brand = `<div class="brand"><i>${spark(22)}</i>${BRAND}</div>`;

// ---------- Profile photo ----------
const profile = `<style>
body{width:1080px;height:1080px;background:${NAVY};display:grid;place-items:center}
.mark{width:620px;height:620px;border-radius:168px;background:linear-gradient(135deg,#2f6bff,#8b5cf6);display:grid;place-items:center;color:#fff;box-shadow:0 40px 120px rgba(47,107,255,.45),inset 0 3px 0 rgba(255,255,255,.25)}
</style><div class="mark">${spark(340)}</div>`;

// ---------- Carousel ----------
const steps = [
  ['Sredite Google profil', 'Google AI i ChatGPT podatke o lokalnim firmama uzimaju iz Google i Bing profila. Proverite adresu, telefon, radno vreme i dodajte prave fotografije.', 'Bing Places je besplatan i mnogi ga preskaču.'],
  ['Isti podaci svuda', 'Naziv, adresa i telefon moraju biti isti na sajtu, Facebook-u, Instagramu i u imenicima. Kada se razlikuju, AI manje veruje svakom od njih.', 'Jedan glavni broj telefona je bolji od pet.'],
  ['Odgovorite na pitanja kupaca', 'Napišite na sajtu ono što ljudi pitaju: okvirne cene, rokove, kako izgleda saradnja. AI citira konkretne odgovore, a ne slogane.', 'Cena „od … dinara” je bolja nego nikakva.'],
  ['Skupljajte recenzije', 'AI češće preporučuje firme sa više dobrih recenzija. Zamolite svakog zadovoljnog kupca da ostavi ocenu na Google-u.', 'Pošaljite link odmah posle posla, dok je utisak svež.'],
];

const cover = `<style>
h1{font-size:112px;line-height:1;letter-spacing:-4.5px;font-weight:800;margin-top:150px}
.sub{font-size:38px;line-height:1.35;color:#b8c4e6;margin-top:44px;max-width:760px}
.chat{margin-top:70px;align-self:flex-start;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:26px 26px 26px 8px;padding:22px 30px;font-size:28px;color:#dbe3fa;display:flex;gap:14px;align-items:center}
.chat i{color:#a78bfa;display:flex}
.swipe{display:flex;align-items:center;gap:14px;font-size:28px;font-weight:700;color:#fff}
</style>
<div class="post dark">
  <div class="top">${brand}<span class="pager">1 / 6</span></div>
  <h1 class="d">Kako da vas <span class="grad">ChatGPT</span> preporuči kupcima</h1>
  <p class="sub">4 koraka koja možete da počnete već danas, bez ikakvog budžeta.</p>
  <div class="chat"><i>${spark(26)}</i>„Preporuči mi dobrog majstora u mom gradu…”</div>
  <div class="grow"></div>
  <div class="top"><span class="handle">${HANDLE}</span><span class="swipe">Prevucite ${arrow(34)}</span></div>
</div>`;

const stepSlide = (i, [title, body, tip]) => `<style>
.n{font-size:330px;font-weight:800;letter-spacing:-12px;line-height:.85;margin-top:130px;margin-left:-8px}
h2{font-size:92px;line-height:1.02;letter-spacing:-3.4px;font-weight:800;margin-top:60px;max-width:880px}
.body{font-size:42px;line-height:1.45;color:#3b4566;margin-top:44px;max-width:880px}
.tip{margin-top:64px;display:flex;gap:18px;align-items:flex-start;background:#fff;border:1px solid #e1e4f2;border-radius:22px;padding:30px 34px;font-size:32px;line-height:1.4;color:#0b1330;max-width:880px}
.tip i{flex:none;width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#2f6bff,#8b5cf6);color:#fff;display:grid;place-items:center}
.light .brand{color:#0b1330}
</style>
<div class="post light">
  <div class="top">${brand}<span class="pager">${i + 2} / 6</span></div>
  <div class="n d grad" style="background-image:linear-gradient(90deg,#2f6bff,#8b5cf6)">0${i + 1}</div>
  <h2 class="d">${title}</h2>
  <p class="body">${body}</p>
  <div class="tip"><i>${spark(22)}</i><span><b>Savet:</b> ${tip}</span></div>
  <div class="grow"></div>
  <div class="top"><span class="handle">${HANDLE}</span>${i < 3 ? `<span class="pager" style="display:flex;align-items:center;gap:10px">Dalje ${arrow(26)}</span>` : ''}</div>
</div>`;

const ctaSlide = `<style>
h2{font-size:96px;line-height:1.02;letter-spacing:-3.8px;font-weight:800;margin-top:150px}
.p{font-size:36px;line-height:1.45;color:#b8c4e6;margin-top:40px;max-width:820px}
.kw{margin-top:64px;display:flex;flex-direction:column;gap:18px}
.kw span{font-size:26px;color:#9fb4e8;font-weight:600;letter-spacing:2px;text-transform:uppercase}
.kw b{align-self:flex-start;font-size:64px;letter-spacing:2px;padding:18px 40px;border-radius:20px;background:#fff;color:#0a1230}
.save{display:flex;align-items:center;gap:14px;font-size:28px;font-weight:600;color:#dbe3fa}
</style>
<div class="post dark">
  <div class="top">${brand}<span class="pager">6 / 6</span></div>
  <h2 class="d">Želite da znate šta <span class="grad">AI kaže o vama?</span></h2>
  <p class="p">Proverićemo šta ChatGPT i Google AI danas kažu o vašoj firmi i o vašoj konkurenciji. Besplatno.</p>
  <div class="kw"><span>Pošaljite nam poruku sa rečju</span><b>PROVERA</b></div>
  <div class="grow"></div>
  <div class="top"><span class="handle">${HANDLE}</span><span class="save">Sačuvajte objavu za kasnije</span></div>
</div>`;

// ---------- Single posts ----------
const statPost = `<style>
.eb{margin-top:150px;font-size:28px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#4f46e5}
.big{font-size:268px;font-weight:800;letter-spacing:-12px;line-height:.9;margin-top:24px;margin-left:-10px;background:linear-gradient(100deg,#0b1330 35%,#4f46e5);-webkit-background-clip:text;color:transparent}
h2{font-size:64px;line-height:1.1;letter-spacing:-1.8px;font-weight:700;margin-top:34px;max-width:860px}
h2 b{color:#4f46e5}
.bars{margin-top:100px;display:flex;flex-direction:column;gap:44px}
.bl{display:flex;justify-content:space-between;font-size:34px;font-weight:600;margin-bottom:14px}
.track{height:34px;background:#e1e4f2;border-radius:999px;overflow:hidden}
.fill{height:100%;border-radius:999px}
.src{font-size:22px;color:#6b7393;line-height:1.4}
.light .brand{color:#0b1330}
</style>
<div class="post light">
  <div class="top">${brand}</div>
  <div class="eb">Istraživanje · 2026</div>
  <div class="big d">+120%</div>
  <h2 class="d">više klikova dobijaju sajtovi koje <b>Google AI navodi kao izvor</b>.</h2>
  <div class="bars">
    <div><div class="bl"><span>Citirani u AI odgovoru</span><span>20.743</span></div><div class="track"><div class="fill" style="width:62%;background:linear-gradient(90deg,#2f6bff,#8b5cf6)"></div></div></div>
    <div><div class="bl" style="color:#6b7393"><span>Nisu citirani</span><span>9.445</span></div><div class="track"><div class="fill" style="width:28%;background:#a3a9c2"></div></div></div>
  </div>
  <div class="grow"></div>
  <div class="src">Klikovi na 1.000.000 prikaza u pretrazi.<br>Izvor: Seer Interactive, april 2026 (53 brenda, 2,43 mlrd. prikaza)</div>
</div>`;

const testPost = `<style>
h2{font-size:104px;line-height:1.02;letter-spacing:-4px;font-weight:800;margin-top:140px}
.chatbox{margin-top:80px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:30px;padding:34px;display:flex;flex-direction:column;gap:24px}
.q{align-self:flex-end;background:#2f6bff;padding:22px 30px;border-radius:26px 26px 8px 26px;font-size:38px;line-height:1.5;font-weight:500;max-width:92%}
.q span{background:rgba(255,255,255,.22);border-radius:8px;padding:0 8px;white-space:nowrap}
.a{display:flex;gap:18px;align-items:center;font-size:30px;color:#c9d3ee}
.a i{flex:none;width:54px;height:54px;border-radius:50%;background:${GRAD};display:grid;place-items:center;color:#0a1230}
.dots{display:flex;gap:8px}.dots b{width:12px;height:12px;border-radius:50%;background:#7c8bb8}
.ask{font-size:64px;line-height:1.15;font-weight:800;letter-spacing:-2px;margin-top:90px;max-width:880px}
.ask span{color:#9fb4e8;font-weight:500;display:block;font-size:38px;letter-spacing:0;margin-top:22px;line-height:1.4}
</style>
<div class="post dark">
  <div class="top">${brand}<span class="pager">Test za 30 sekundi</span></div>
  <h2 class="d">Otvorite ChatGPT i <span class="grad">upišite ovo:</span></h2>
  <div class="chatbox">
    <div class="q">Preporuči mi <span>vašu delatnost</span> u <span>vašem gradu</span></div>
    <div class="a"><i>${spark(26)}</i><div class="dots"><b></b><b></b><b></b></div></div>
  </div>
  <div class="ask d">Da li ste na listi?<span>Ako niste, kupac koji pita AI zove nekog drugog. Napišite u komentaru šta ste dobili.</span></div>
  <div class="grow"></div>
  <div class="top"><span class="handle">${HANDLE}</span></div>
</div>`;

const vsPost = `<style>
h2{font-size:88px;line-height:1.02;letter-spacing:-3.4px;font-weight:800;margin-top:100px}
.cols{margin-top:70px;display:grid;grid-template-columns:1fr 1fr;gap:24px}
.col{border-radius:28px;padding:40px 36px;display:flex;flex-direction:column;gap:26px}
.g{background:#fff;border:1px solid #e1e4f2}
.c{background:linear-gradient(160deg,#2f6bff,#7c3aed);color:#fff}
.lab{font-size:24px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase}
.g .lab{color:#6b7393}
.it{font-size:32px;line-height:1.3;font-weight:600}
.it small{display:block;font-size:24px;font-weight:500;opacity:.7;margin-top:6px}
.end{font-size:46px;line-height:1.2;font-weight:700;margin-top:60px;max-width:860px}
.end b{color:#4f46e5}
.light .brand{color:#0b1330}
</style>
<div class="post light">
  <div class="top">${brand}</div>
  <h2 class="d">Kako ljudi traže firme danas</h2>
  <div class="cols">
    <div class="col g"><div class="lab">Google pretraga</div>
      <div class="it">10 linkova<small>i oglasi iznad njih</small></div>
      <div class="it">Kupac sam poredi<small>otvara više sajtova</small></div>
      <div class="it">Odlučuje kasnije<small>često se vrati na pretragu</small></div>
    </div>
    <div class="col c"><div class="lab">ChatGPT i AI</div>
      <div class="it">Nekoliko preporuka<small>sa objašnjenjem zašto</small></div>
      <div class="it">AI poredi umesto njega<small>cene, recenzije, iskustva</small></div>
      <div class="it">Kupac odmah zove<small>jednu od preporučenih firmi</small></div>
    </div>
  </div>
  <div class="end d">Ako niste među preporukama, <b>kupac ni ne sazna za vas.</b></div>
  <div class="grow"></div>
  <div class="top"><span class="handle">${HANDLE}</span></div>
</div>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const jobs = [
    ['profilna_1080.png', 1080, profile],
    ['karusel-1-naslovna.png', 1350, cover],
    ...steps.map((s, i) => [`karusel-${i + 2}-korak-${i + 1}.png`, 1350, stepSlide(i, s)]),
    ['karusel-6-poziv.png', 1350, ctaSlide],
    ['objava-statistika-120.png', 1350, statPost],
    ['objava-test-chatgpt.png', 1350, testPost],
    ['objava-google-vs-ai.png', 1350, vsPost],
  ];
  for (const [file, h, body] of jobs) {
    const page = await browser.newPage({ viewport: { width: 1080, height: h } });
    await page.setContent(`<!doctype html><html lang="sr"><head><meta charset="utf-8"><style>${base}</style></head><body>${body}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, file) });
    const over = await page.evaluate(() => { const p = document.querySelector('.post'); return p ? p.scrollHeight > p.clientHeight + 1 : false; });
    console.log(file, over ? 'OVERFLOW' : 'ok');
    await page.close();
  }
  await browser.close();
})();
