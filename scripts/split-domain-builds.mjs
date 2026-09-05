import { cp, mkdir, readdir, rm, stat, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'dist');
const publicOut = join(root, 'dist-public');
const dashboardOut = join(root, 'dist-dashboard');
const finalParts = join(root, 'release', 'landing-final', 'parts');

async function assertExists(path, label) {
  try { await stat(path); } catch { throw new Error(`${label} ausente: ${path}`); }
}

await assertExists(join(source, 'index.html'), 'Dashboard index');
await assertExists(join(source, 'motorista', 'index.html'), 'Landing legado index');
await assertExists(join(source, 'temp', 'index.html'), 'Temp Landing Page index');
await assertExists(join(source, 'landing-v3'), 'Landing static assets');
await assertExists(join(source, '_astro'), 'Astro assets');
await assertExists(finalParts, 'Landing final parts');

await rm(publicOut, { recursive: true, force: true });
await rm(dashboardOut, { recursive: true, force: true });
await mkdir(publicOut, { recursive: true });

await cp(source, dashboardOut, { recursive: true });
await rm(join(dashboardOut, 'motorista'), { recursive: true, force: true });
await rm(join(dashboardOut, 'temp'), { recursive: true, force: true });

const partNames = (await readdir(finalParts))
  .filter((name) => name.endsWith('.htmlfrag'))
  .sort();
if (partNames.length === 0) throw new Error('Landing final sem partes HTML.');
const finalHtml = (await Promise.all(partNames.map((name) => readFile(join(finalParts, name), 'utf8')))).join('');
await writeFile(join(publicOut, 'index.html'), finalHtml, 'utf8');

// Mantem /temp e seus assets versionados para QA; a home publica e o HTML final aprovado ficam isolados.
await cp(join(source, 'temp'), join(publicOut, 'temp'), { recursive: true });
await cp(join(source, 'landing-v3'), join(publicOut, 'landing-v3'), { recursive: true });
await cp(join(source, 'landing-v3'), join(publicOut, 'temp', 'landing-v3'), { recursive: true });
await cp(join(source, '_astro'), join(publicOut, '_astro'), { recursive: true });

const publicHtaccess = `RewriteEngine On
RewriteCond %{HTTP_HOST} ^motoristaops\\.com\\.br$ [NC]
RewriteRule ^ https://www.motoristaops.com.br%{REQUEST_URI} [R=301,L,NE]
`;
await writeFile(join(publicOut, '.htaccess'), publicHtaccess, 'utf8');

await assertExists(join(publicOut, 'index.html'), 'Public final index');
await assertExists(join(publicOut, 'landing-v3', 'logo-header-v3.svg'), 'Public logo asset');
await assertExists(join(publicOut, 'landing-v3', 'hero-motoristaops-v4.webp'), 'Public hero asset');
await assertExists(join(publicOut, 'landing-v3', 'henrico-amaral-v4.webp'), 'Public portrait asset');
await assertExists(join(publicOut, 'temp', 'index.html'), 'Public temp index');
await assertExists(join(publicOut, '_astro'), 'Public temp assets');
await assertExists(join(publicOut, '.htaccess'), 'Public canonical redirect');
await assertExists(join(dashboardOut, 'index.html'), 'Dashboard output');

console.log('OK: landing final aprovada montada de fonte versionada; dashboard e /temp preservados isoladamente.');
