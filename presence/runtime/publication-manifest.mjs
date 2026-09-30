import { createHash } from 'node:crypto';

export function publicationManifest({ slug, templateKey, templateVersion, html }) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid slug');
  const sha256 = createHash('sha256').update(html, 'utf8').digest('hex');
  return { schemaVersion: 1, slug, templateKey, templateVersion, sha256, bytes: Buffer.byteLength(html, 'utf8') };
}
