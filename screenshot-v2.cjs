const { chromium } = require('playwright');
const path = require('path');

const DIR = path.join(__dirname, 'screenshots');
const BASE = 'http://localhost:5174';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // 1. HOME — full page
  console.log('1. Home');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(DIR, 'v2-01-home.png'), fullPage: true });

  // 2. BROWSE — full page
  console.log('2. Browse');
  await page.click('text=Browse all');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(DIR, 'v2-02-browse.png'), fullPage: true });

  // Go back home
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 3. TYPING TEST — full page
  console.log('3. Typing test');
  await page.click('text=Try it out');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(DIR, 'v2-03-typing.png'), fullPage: true });

  // Type into it
  await page.click('textarea');
  await page.keyboard.type('hello world testing mechanical keyboard sounds', { delay: 50 });
  await page.waitForTimeout(300);
  await page.click('text=Tactile');
  await page.waitForTimeout(300);
  await page.keyboard.type(' now with tactile switches', { delay: 50 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(DIR, 'v2-03b-typing-active.png'), fullPage: true });

  // 4. QUIZ
  console.log('4. Quiz Q1');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.click('text=Start quiz');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(DIR, 'v2-04-quiz-q1.png'), fullPage: true });

  // Answer Q1
  await page.click('text=75%');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DIR, 'v2-05-quiz-q2.png'), fullPage: true });

  // Answer Q2
  await page.click('text=Linear');
  await page.waitForTimeout(450);
  // Q3
  await page.click('text=Mid-range');
  await page.waitForTimeout(450);
  // Q4
  await page.click('text=Gaming');
  await page.waitForTimeout(450);
  // Q5
  await page.click('text=Wireless');
  await page.waitForTimeout(450);

  // Q6 - last question screenshot
  console.log('5. Quiz Q6 (last question)');
  await page.screenshot({ path: path.join(DIR, 'v2-06-quiz-q6.png'), fullPage: true });

  // Answer Q6 - try both possible labels
  console.log('6. Results');
  try {
    await page.click('text=Pre-built', { timeout: 3000 });
  } catch(e) {
    try {
      await page.click('text=Custom', { timeout: 3000 });
    } catch(e2) {
      // click first visible button
      const btns = await page.$$('button');
      if (btns.length > 0) await btns[0].click();
    }
  }
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(DIR, 'v2-07-results.png'), fullPage: true });

  await browser.close();
  console.log('DONE - all screenshots saved');
})().catch(e => { console.error(e.message); process.exit(1); });
