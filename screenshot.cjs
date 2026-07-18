const { chromium } = require('playwright');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const BASE = 'http://localhost:5174';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. HOME
  console.log('📸 Home...');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-home.png'), fullPage: false });
  console.log('  ✅ home');

  // 2. BROWSE
  console.log('📸 Browse...');
  await page.click('text=Browse all');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-browse.png'), fullPage: false });
  console.log('  ✅ browse');

  // 3. TYPING TEST
  console.log('📸 Typing test...');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.click('text=Try it out');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-typing.png'), fullPage: false });
  console.log('  ✅ typing-test');

  // 4. QUIZ Q1
  console.log('📸 Quiz...');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.click('text=Start quiz');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-quiz.png'), fullPage: false });
  console.log('  ✅ quiz');

  // Answer to results
  await page.click('text=75%');
  await page.waitForTimeout(350);
  await page.click('text=Linear');
  await page.waitForTimeout(350);
  await page.click('text=Mid-range');
  await page.waitForTimeout(350);
  await page.click('text=Gaming');
  await page.waitForTimeout(350);
  await page.click('text=Wireless');
  await page.waitForTimeout(350);
  try {
    await page.click('text=Pre-built', { timeout: 5000 });
    await page.waitForTimeout(800);
  } catch(e) {
    console.log('  ⚠️ Pre-built not found, trying alternative...');
    await page.click('text=Custom', { timeout: 5000 });
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-results.png'), fullPage: true });
  console.log('  ✅ results');

  await browser.close();
  console.log('\n🎉 All done!');
})().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
