import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('dist/mobile/index.html','utf8');
const rule=fs.readFileSync('dist/.htaccess','utf8');
const deploy=fs.readFileSync('../../scripts/deploy-landing.sh','utf8');
test('official mobile page has SEO, destinations and no redundant site link',()=>{
 for(const marker of ['mobile-oficial-2026-11-21','name="robots" content="index,follow','rel="canonical" href="https://www.motoristaops.com.br/"','Falar pelo WhatsApp','Preencher orçamento','Instagram','TikTok','id="servicos"','id="veiculos"','id="orcamento"','Privacidade','Termos de uso'])assert.ok(html.includes(marker),marker);
 for(const bad of ['noindex','Visitar o site oficial','fonts.googleapis.com','Bio Executiva','__MOPS_FONT_','class="action site-action"','data:image/'])assert.ok(!html.includes(bad),bad);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert.equal((html.match(/class="mini-card service-card"/g)||[]).length,5);
 assert.equal((html.match(/class="mini-card fleet-card"/g)||[]).length,5);
 assert.ok(html.includes('.compact-section{padding:30px 0 16px;background:var(--noite);border-top:0;}'));
 assert.ok(html.includes('/assets/app/instrument-sans-normal-')&&html.includes('/assets/app/instrument-sans-italic-'));
 for(const asset of ['mops-mobile-hero.webp','mops-mobile-frota-sedan.webp','mops-mobile-frota-van.webp'])assert.ok(fs.existsSync('dist/assets/'+asset),asset);
});
test('Apache selects a mobile document on the same URL and preserves the desktop',()=>{
 for(const value of ['RewriteCond %{REQUEST_URI} ^/assert.ok(rule.includes(value),value);
 assert.ok(deploy.includes('mirror --reverse --verbose source/landing/dist/mobile'));
 assert.ok(deploy.includes('put source/landing/scripts/mobile-router.php'));
 const router=fs.readFileSync('scripts/mobile-router.php','utf8');
 for(const requirement of ["header('Vary: User-Agent')",'no-store','HTTP_USER_AGENT','iPhone','Android.*Mobile','Googlebot-Smartphone',"dirname(__DIR__) . '/index.html'"])assert.ok(router.includes(requirement),requirement);
});,'RewriteRule ^$ mobile/router.php [L]'])assert.ok(rule.includes(value),value);
 assert.ok(deploy.includes('mirror --reverse --verbose source/landing/dist/mobile'));
 assert.ok(deploy.includes('put source/landing/scripts/mobile-router.php'));
 const router=fs.readFileSync('scripts/mobile-router.php','utf8');
 for(const requirement of ["header('Vary: User-Agent')",'no-store','HTTP_USER_AGENT','Googlebot-Smartphone',"dirname(__DIR__) . '/index.html'"])assert.ok(router.includes(requirement),requirement);
});