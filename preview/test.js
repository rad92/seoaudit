const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('file://' + process.cwd() + '/schools-pm-card-preview.html', { waitUntil: 'load', timeout: 60000 });
  const card = p.locator('.product-card--anchored');
  await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  // SEO checks
  const links = await card.locator('a').evaluateAll(as => as.map(a => ({ text: a.textContent.trim(), href: a.href })));
  console.log('Links inside card:', JSON.stringify(links));
  console.log('Nested <a> in card:', await card.evaluate(c => c.querySelectorAll('a a').length));
  console.log('Heading tag:', await card.locator('.product-name').evaluate(e => e.tagName + ' / inside link? ' + !!e.closest('a')));
  // Click tests: what element gets hit at several points of the card
  const box = await card.boundingBox();
  const pts = { 'heading area': [0.5, 0.1], 'top-left corner': [0.05, 0.05], 'non-link body text': [0.7, 0.6], 'Explore arrow': [0.15, 0.9], 'bottom-right': [0.95, 0.95] };
  for (const [name, [fx, fy]] of Object.entries(pts)) {
    const hit = await p.evaluate(([x, y]) => { const el = document.elementFromPoint(x, y); const a = el && el.closest('a'); return a ? a.href : 'NO LINK (' + (el && el.className) + ')'; }, [box.x + box.width * fx, box.y + box.height * fy]);
    console.log(`Click at ${name}: ->`, hit);
  }
  // Real navigation test (intercept so no network needed)
  await p.route('https://upkeep.com/product/preventive-maintenance/**', r => r.fulfill({ body: '<h1>PM page reached</h1>', contentType: 'text/html' }));
  await card.hover(); await p.waitForTimeout(400);
  await p.screenshot({ path: 'preview-hover.png', clip: { x: box.x - 420, y: box.y - 230, width: 1100, height: 560 } });
  // keyboard: tab focus
  const prev = await p.evaluate(() => { const g = document.querySelector('.product-card--anchored').previousElementSibling.previousElementSibling; return !!g; });
  await p.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.1);
  await p.waitForURL('**/preventive-maintenance/**'); console.log('After clicking heading area, URL =', p.url());
  await p.goto('file://' + process.cwd() + '/schools-pm-card-preview.html'); await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  await p.locator('.product-card-link').focus(); await p.waitForTimeout(300);
  await p.screenshot({ path: 'preview-focus.png', clip: { x: box.x - 420, y: box.y - 230, width: 1100, height: 560 } });
  await p.keyboard.press('Enter'); await p.waitForURL('**/preventive-maintenance/**'); console.log('After keyboard Enter, URL =', p.url());
  // mobile
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto('file://' + process.cwd() + '/schools-pm-card-preview.html', { waitUntil: 'load', timeout: 60000 });
  const mc = m.locator('.product-card--anchored'); await mc.scrollIntoViewIfNeeded(); await m.waitForTimeout(1200);
  await mc.screenshot({ path: 'preview-mobile.png' });
  await b.close();
})();
