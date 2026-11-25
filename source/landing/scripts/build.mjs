import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {build} from 'vite';
import {languages} from '../src/i18n.mjs';
import {localizeDocument,sitemap,RELEASE} from './locale-html.mjs';
import {seoPages,renderSeoPage} from './seo-pages.mjs';
import {legalPages,renderLegalPage} from './legal-pages.mjs';
await build();
await build({build:{ssr:'src/entry-server.jsx',outDir:'.server-build',emptyOutDir:true}});
const {render}=await import(pathToFileURL(path.resolve('.server-build/entry-server.js')));
const html=fs.readFileSync('dist/index.html','utf8').replaceAll('\r\n','\n').replace('</head>','<link rel="stylesheet" href="/assets/cookie-consent.css?v=20261123b">\n<script defer src="/assets/site-preferences.js?v=20261123"></script>\n</head>');
if(!html.includes('<!--app-html-->'))throw Error('Prerender placeholder absent');
for(const locale of languages){
  const target=path.join('dist',locale.path);
  fs.mkdirSync(target,{recursive:true});
  fs.writeFileSync(path.join(target,'index.html'),localizeDocument(html,render(locale.code),locale.code));
}
// Supplementary SEO pages: prerendered and published without altering home markup.
const cssMatch=html.split('<link').slice(1).map(chunk=>chunk.split('>')[0]).map(tag=>tag.match(/href="([^"]+)"/)?.[1]).find(href=>href?.startsWith('/assets/')&&href.endsWith('.css'));
if(!cssMatch)throw Error('Production stylesheet missing; service pages require official Instrument Sans');
for(const page of seoPages){
  const target=path.join('dist',page.path.split('/').filter(Boolean).join('/'));
  fs.mkdirSync(target,{recursive:true});
  fs.writeFileSync(path.join(target,'index.html'),renderSeoPage(page,cssMatch));
}
for(const page of legalPages){
  const target=path.join('dist',page.path.split('/').filter(Boolean).join('/'));
  fs.mkdirSync(target,{recursive:true});
  fs.writeFileSync(path.join(target,'index.html'),renderLegalPage(page,cssMatch));
}
fs.copyFileSync('scripts/service-tracking.js','dist/servicos/track.js');
fs.copyFileSync('scripts/cookie-consent.js','dist/assets/site-preferences.js');
fs.copyFileSync('scripts/cookie-consent.css','dist/assets/cookie-consent.css');
// Reuse the same consent-gated GA4 implementation as the desktop.
fs.copyFileSync('src/analytics.mjs','dist/assets/mobile-analytics.js');
fs.copyFileSync('src/places-autocomplete.mjs','dist/assets/places-autocomplete.mjs');
fs.copyFileSync('src/places-autocomplete.css','dist/assets/places-autocomplete.css');
// Browser keys must be restricted by referrer and APIs at Google Cloud.
// Explicit opt-in flag is mandatory; missing key fails closed at build time.
const mapsEnabled=process.env.MOPS_PLACES_ENABLED==='true';
const mapsBrowserKey=(process.env.MOPS_PLACES_BROWSER_KEY||'').trim();
if(mapsEnabled && !/^AIza[0-9A-Za-z_-]{30,}$/.test(mapsBrowserKey))
  throw new Error('Places enabled but a valid referrer-restricted browser key was not configured');
fs.writeFileSync('dist/assets/places-config.json',JSON.stringify({
  enabled:mapsEnabled,browserKey:mapsEnabled?mapsBrowserKey:''
})+'\n');

fs.copyFileSync('src/analytics-referrer.mjs','dist/assets/analytics-referrer.mjs');
fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n\nSitemap: https://www.motoristaops.com.br/sitemap.xml\n');
fs.writeFileSync('dist/sitemap.xml',sitemap());
fs.copyFileSync('apache.htaccess','dist/.htaccess');
// Replace mobile placeholders with the actual hashed, self-hosted Instrument Sans files.
const mobilePath='dist/mobile/index.html';
const fontEntries=fs.readdirSync('dist/assets/app');
const fontPath=(style)=>{
 const file=fontEntries.find(name=>name.startsWith('instrument-sans-'+style+'-')&&name.endsWith('.woff2'));
 if(!file)throw Error('Official Instrument Sans '+style+' missing');
 return '/assets/app/'+file;
};
const mobileHtml=fs.readFileSync(mobilePath,'utf8')
 .replaceAll('__MOPS_FONT_NORMAL__',fontPath('normal'))
 .replaceAll('__MOPS_FONT_ITALIC__',fontPath('italic'));
if(mobileHtml.includes('__MOPS_FONT_')||mobileHtml.includes('noindex'))throw Error('Mobile SEO/font release gate failed');
fs.writeFileSync(mobilePath,mobileHtml);
const files=[];
const visit=dir=>{for(const n of fs.readdirSync(dir).sort()){const p=path.join(dir,n);if(fs.statSync(p).isDirectory())visit(p);else if(n!=='.htaccess') files.push({path:p.slice(5).split(path.sep).join('/'),bytes:fs.statSync(p).size,sha256:createHash('sha256').update(fs.readFileSync(p)).digest('hex')});}};
visit('dist');
fs.writeFileSync('dist/release-manifest.json',JSON.stringify({release:RELEASE,files},null,2)+'\n');
fs.rmSync('.server-build',{recursive:true});
console.log('Production prerender complete:',files.length,'files');
