import { publicationManifest } from './publication-manifest.mjs';

const html = '<!doctype html><html><body>Motorista Demo</body></html>';
const input = {
  slug: 'motorista-demo',
  templateKey: 'driver-standard',
  templateVersion: 1,
  html
};

const first = publicationManifest(input);
const second = publicationManifest(input);

if (first.sha256 !== second.sha256) throw new Error('Manifest hash is not deterministic');
if (first.bytes !== Buffer.byteLength(html, 'utf8')) throw new Error('Manifest byte count is incorrect');
if (first.schemaVersion !== 1) throw new Error('Unexpected manifest schema version');

console.log('publication manifest verification: ok');
