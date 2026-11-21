import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {seoPages,renderSeoPage,BASE} from '../scripts/seo-pages.mjs';
import {sitemap} from '../scripts/locale-html.mjs';

test('service pages render indexable, unique HTML with consistent brand and real contact path', () => {
  assert.equal(seoPages.length, 4);
  const slugs = new Set();
  const titles = new Set();
  for (const page of seoPages) {
    assert.ok(!slugs.has(page.slug), page.slug);
    assert.ok(!titles.has(page.title), page.title);
    slugs.add(page.slug);
    titles.add(page.title);
    const html = renderSeoPage(page, '/assets/app/index-test.css');
    assert.ok(html.includes('<html lang="pt-BR">'));
    assert.ok(html.includes('<h1>'+page.name+'</h1>'));
    assert.ok(html.includes('<title>'+page.title+'</title>'));
    assert.ok(html.includes('<link rel="canonical" href="'+BASE+page.path+'">'));
    assert.ok(html.includes('name="robots" content="index,follow'));
    assert.ok(html.includes('src="/assets/logo-horizontal.webp"'));
    assert.ok(html.includes('href="/assets/app/index-test.css"'));
    assert.ok(html.includes('data-cookie-settings'));
    assert.ok(html.includes('href="/privacidade/"'));
    assert.ok(html.includes('href="/termos-de-uso/"'));
    assert.ok(html.includes('src="/assets/site-preferences.js"'));
    assert.ok(html.includes('href="/assets/cookie-consent.css"'));
    assert.ok(html.includes('src="/servicos/track.js?v=20261121"'));
    assert.equal((html.match(/<h1>/g)||[]).length,1);
    assert.ok(!html.includes('fonts.googleapis.com'));
    assert.ok(!html.includes('24 horas garantidas'));
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(ld['@graph'].map(node=>node['@type']),['Organization','Service','WebPage','BreadcrumbList']);
    const service = ld['@graph'].find(node=>node['@type']==='Service');
    assert.equal(service.url,BASE+page.path);
    assert.equal(service.provider['@id'],BASE+'/#organization');
    assert.equal(service.areaServed.name,'São Paulo');
    assert.ok(page.path.startsWith('/servicos/') && page.path.endsWith('/'));
    assert.ok((html.match(/data-whatsapp-service=/g)||[]).length===2);
    assert.ok(html.includes('Abrir o WhatsApp não envia a mensagem automaticamente'));
    for (const other of seoPages.filter(item=>item.slug!==page.slug)) {
      assert.ok(html.includes('href="'+other.path+'"'),other.path);
    }
  }
});

test('XML sitemap keeps all three home language URLs, service pages and two legal pages', () => {
  const xml=sitemap();
  for (const locale of ['/','/en/','/es/']) assert.ok(xml.includes('<loc>'+BASE+locale+'</loc>'));
  for (const page of seoPages) {
    assert.ok(xml.includes('<loc>'+BASE+page.path+'</loc>'),page.path);
    assert.ok(!xml.includes('<loc>'+BASE+page.path.slice(0,-1)+'</loc>'));
  }
  assert.equal((xml.match(/<url>/g)||[]).length,9);
});

test('the production build emits four independent pages and one consented click tracker', () => {
  if (!fs.existsSync('dist/release-manifest.json')) return;
  const manifest=JSON.parse(fs.readFileSync('dist/release-manifest.json','utf8'));
  const tracking=fs.readFileSync('dist/servicos/track.js','utf8');
  assert.ok(tracking.includes("analytics_storage: 'granted'"));
  assert.ok(tracking.includes("ad_storage: 'denied'"));
  assert.ok(tracking.includes("'whatsapp_click'"));
  assert.ok(!tracking.includes('CompleteRegistration'));
  for (const page of seoPages) {
    const file=path.join('dist',...page.path.split('/').filter(Boolean),'index.html');
    assert.ok(fs.existsSync(file),'Missing '+file);
    const html=fs.readFileSync(file,'utf8');
    assert.ok(html.includes('href="/assets/app/'));
    assert.ok(manifest.files.some(entry=>entry.path===page.path.slice(1)+'index.html'));
  }
  assert.ok(manifest.files.some(entry=>entry.path==='servicos/track.js'));
  assert.ok(fs.existsSync('dist/index.html'),'Existing homepage output must remain present');
});
