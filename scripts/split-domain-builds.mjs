import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'dist');
const publicOut = join(root, 'dist-public');
const dashboardOut = join(root, 'dist-dashboard');

async function assertExists(path, label) {
  try {
    await stat(path);
  } catch {
    throw new Error(`${label} ausente: ${path}`);
  }
}

await assertExists(join(source, 'index.html'), 'Dashboard index');
await assertExists(join(source, 'motorista', 'index.html'), 'Landing Page index');
await assertExists(join(source, '_astro'), 'Astro assets');

await rm(publicOut, { recursive: true, force: true });
await rm(dashboardOut, { recursive: true, force: true });
await mkdir(publicOut, { recursive: true });

// Dashboard: preserve the complete operational build, but remove the public landing route.
await cp(source, dashboardOut, { recursive: true });
await rm(join(dashboardOut, 'motorista'), { recursive: true, force: true });

// Public site: promote /motorista/ to the root and copy only the compiled assets it needs.
await cp(join(source, 'motorista', 'index.html'), join(publicOut, 'index.html'));
await cp(join(source, '_astro'), join(publicOut, '_astro'), { recursive: true });

// Canonical host: redirect only the apex domain to www, preserving paths and query strings.
const publicHtaccess = `RewriteEngine On
RewriteCond %{HTTP_HOST} ^motoristaops\\.com\\.br$ [NC]
RewriteRule ^ https://www.motoristaops.com.br%{REQUEST_URI} [R=301,L,NE]
`;
await writeFile(join(publicOut, '.htaccess'), publicHtaccess, 'utf8');

await assertExists(join(publicOut, 'index.html'), 'Public index');
await assertExists(join(publicOut, '_astro'), 'Public assets');
await assertExists(join(publicOut, '.htaccess'), 'Public canonical redirect');
await assertExists(join(dashboardOut, 'index.html'), 'Dashboard output');

console.log('OK: artefatos separados em dist-public e dist-dashboard.');
