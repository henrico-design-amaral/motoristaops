import { createHash } from 'node:crypto';

const TEMPLATE_KEYS = new Set([
  'driver-standard',
  'driver-executive',
  'driver-creator',
  'driver-recurring'
]);

export function publicationManifest({ slug, templateKey, templateVersion, html }) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid slug');
  if (!TEMPLATE_KEYS.has(templateKey)) throw new Error('Invalid template key');
  if (!Number.isInteger(templateVersion) || templateVersion < 1) throw new Error('Invalid template version');
  if (typeof html !== 'string' || html.length === 0) throw new Error('Invalid HTML artifact');

  const sha256 = createHash('sha256').update(html, 'utf8').digest('hex');

  return {
    schemaVersion: 1,
    slug,
    templateKey,
    templateVersion,
    sha256,
    bytes: Buffer.byteLength(html, 'utf8')
  };
}
