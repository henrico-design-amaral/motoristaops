import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { config } from './config.mjs';

fs.mkdirSync(path.dirname(config.actual), { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: config.viewport, deviceScaleFactor: 1 });
await page.goto(config.url, { waitUntil: 'networkidle' });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.addStyleTag({
  content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition: none !important;
      caret-color: transparent !important;
    }
    html { scroll-behavior: auto !important; }
  `,
});
await page.screenshot({ path: config.actual, fullPage: config.fullPage });
await browser.close();

const refMeta = await sharp(config.reference).metadata();
if (!refMeta.width || !refMeta.height) throw new Error('Reference image has no dimensions');

let pipeline = sharp(config.actual).resize({ width: refMeta.width });
if (config.normalization?.cropToReferenceHeight) {
  pipeline = pipeline.extract({ left: 0, top: 0, width: refMeta.width, height: refMeta.height });
}
await pipeline.png().toFile(config.normalizedActual);

console.log(JSON.stringify({
  url: config.url,
  viewport: config.viewport,
  reference: { width: refMeta.width, height: refMeta.height },
  actual: config.actual,
  normalizedActual: config.normalizedActual
}, null, 2));
