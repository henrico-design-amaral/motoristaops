import assert from 'node:assert/strict';
import { publicationManifest } from './publication-manifest.mjs';

const input = {
  slug: 'motorista-demo',
  templateKey: 'driver-standard',
  templateVersion: 1,
  html: '<!doctype html><html><body>Motorista Demo</body></html>'
};

const first = publicationManifest(input);
const second = publicationManifest(input);

assert.equal(first.sha256, second.sha256);
assert.equal(first.bytes, Buffer.byteLength(input.html, 'utf8'));
assert.equal(first.slug, input.slug);
assert.equal(first.templateKey, input.templateKey);
assert.equal(first.templateVersion, input.templateVersion);

for (const invalid of [
  { ...input, slug: '../escape' },
  { ...input, templateKey: 'freeform' },
  { ...input, templateVersion: 0 },
  { ...input, html: '' }
]) {
  assert.throws(() => publicationManifest(invalid));
}

console.log('publication manifest tests: ok');
