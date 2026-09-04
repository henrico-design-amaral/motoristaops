import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';
import { config } from './config.mjs';

const expected = PNG.sync.read(fs.readFileSync(config.reference));
const actual = PNG.sync.read(fs.readFileSync(config.normalizedActual));
if (expected.width !== actual.width || expected.height !== actual.height) {
  throw new Error(`Dimension mismatch: reference ${expected.width}x${expected.height}, actual ${actual.width}x${actual.height}`);
}

const diff = new PNG({ width: expected.width, height: expected.height });
const diffPixels = pixelmatch(expected.data, actual.data, diff.data, expected.width, expected.height, {
  threshold: config.threshold,
  includeAA: false,
  alpha: 0.15
});
const totalPixels = expected.width * expected.height;
const diffRatio = diffPixels / totalPixels;

fs.mkdirSync(path.dirname(config.diff), { recursive: true });
fs.writeFileSync(config.diff, PNG.sync.write(diff));

await sharp(config.reference)
  .composite([{ input: config.diff, blend: 'over', opacity: 0.72 }])
  .png()
  .toFile(config.overlay);

const report = {
  passed: diffRatio <= config.maxDiffRatio,
  diffPixels,
  totalPixels,
  diffRatio,
  diffPercent: Number((diffRatio * 100).toFixed(3)),
  threshold: config.threshold,
  maxDiffRatio: config.maxDiffRatio,
  artifacts: {
    reference: config.reference,
    actual: config.normalizedActual,
    diff: config.diff,
    overlay: config.overlay
  }
};
fs.writeFileSync(config.report, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.passed ? 0 : 2;
