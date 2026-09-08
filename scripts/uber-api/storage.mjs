import fs from 'node:fs';
import path from 'node:path';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  try { fs.chmodSync(dir, 0o700); } catch {}
}
function atomicWriteJson(filePath, payload) {
  ensureDir(path.dirname(filePath));
  const tempPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(tempPath, filePath);
  try { fs.chmodSync(filePath, 0o600); } catch {}
  return filePath;
}
export function createPrivateStorage(privateRoot) {
  const uberRoot = path.join(privateRoot, 'uber');
  const rawRoot = path.join(uberRoot, 'raw');
  const normalizedRoot = path.join(uberRoot, 'normalized');
  const tokenPath = path.join(uberRoot, 'oauth.json');
  ensureDir(rawRoot); ensureDir(normalizedRoot);
  return {
    tokenPath,
    readTokens() { if (!fs.existsSync(tokenPath)) return null; return JSON.parse(fs.readFileSync(tokenPath, 'utf8')); },
    writeTokens(tokens) { return atomicWriteJson(tokenPath, tokens); },
    writeRaw(kind, payload, stamp = new Date().toISOString().replace(/[:.]/g, '-')) { return atomicWriteJson(path.join(rawRoot, `${stamp}-${kind}.json`), payload); },
    writeNormalized(payload, stamp = new Date().toISOString().replace(/[:.]/g, '-')) {
      const snapshot = atomicWriteJson(path.join(normalizedRoot, `${stamp}-sync.json`), payload);
      atomicWriteJson(path.join(normalizedRoot, 'latest.json'), payload);
      return snapshot;
    },
  };
}
