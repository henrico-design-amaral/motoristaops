import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'dist');
const publicOut = join(root, 'dist-public');
const dashboardOut = join(root, 'dist-dashboard');

async function assertExists(path, label) {
  try { await stat(path); } catch { throw new Error(`${label} ausente: ${path}`); }
}

await assertExists(join(source, 'index.html'), 'Dashboard index');
await assertExists(join(source, 'motorista', 'index.html'), 'Landing Page index');
await assertExists(join(source, 'temp', 'index.html'), 'Temp Landing Page index');
await assertExists(join(source, '_astro'), 'Astro assets');

await rm(publicOut, { recursive: true, force: true });
await rm(dashboardOut, { recursive: true, force: true });
await mkdir(publicOut, { recursive: true });

// Dashboard: preserve the complete operational build, but remove public landing routes.
await cp(source, dashboardOut, { recursive: true });
await rm(join(dashboardOut, 'motorista'), { recursive: true, force: true });
await rm(join(dashboardOut, 'temp'), { recursive: true, force: true });

// Public site: promote /motorista/ to root and preserve /temp/ for homologation.
await cp(join(source, 'motorista', 'index.html'), join(publicOut, 'index.html'));
await cp(join(source, 'temp'), join(publicOut, 'temp'), { recursive: true });
await cp(join(source, '_astro'), join(publicOut, '_astro'), { recursive: true });

const publicHtaccess = `RewriteEngine On
RewriteCond %{HTTP_HOST} ^motoristaops\\.com\\.br$ [NC]
RewriteRule ^ https://www.motoristaops.com.br%{REQUEST_URI} [R=301,L,NE]
`;
await writeFile(join(publicOut, '.htaccess'), publicHtaccess, 'utf8');

await assertExists(join(publicOut, 'index.html'), 'Public index');
await assertExists(join(publicOut, 'temp', 'index.html'), 'Public temp index');
await assertExists(join(publicOut, '_astro'), 'Public assets');
await assertExists(join(publicOut, '.htaccess'), 'Public canonical redirect');
await assertExists(join(dashboardOut, 'index.html'), 'Dashboard output');

console.log('OK: artefatos separados em dist-public e dist-dashboard, incluindo /temp no site publico.');
