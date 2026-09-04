import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const configPath = path.join(root, 'visual-parity.config.json');
const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function resolveFromRoot(p) {
  return path.resolve(root, p);
}

export const config = {
  ...raw,
  reference: resolveFromRoot(raw.reference),
  actual: resolveFromRoot(raw.actual),
  normalizedActual: resolveFromRoot(raw.normalizedActual),
  diff: resolveFromRoot(raw.diff),
  overlay: resolveFromRoot(raw.overlay),
  report: resolveFromRoot(raw.report),
};
