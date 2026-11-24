import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {legalIdentity} from '../src/legal-identity.mjs';
import {legalPages,renderLegalPage} from '../scripts/legal-pages.mjs';

const get = path => fs.readFileSync(path,'utf8');
const root = get('dist/index.html');
const en = get('dist/en/index.html');
const es = get('dist/es/index.html');
const mobile = get('dist/mobile/index.html');

function channel(hex){
  const x=parseInt(hex,16)/255;
  return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;
}
function contrast(a,b){
  const l=h=>[0,2,4].reduce((sum,pos,i)=>sum+[0.2126,0.7152,0.0722][i]*channel(h.slice(pos+1,pos+3)),0);
  const x=l(a),y=l(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}

test('legal identity is from CCMEI and CPF is not included anywhere in release HTML',()=>{
  assert.equal(legalIdentity.cnpj,'69.099.839/0001-25');
  assert.equal(legalIdentity.cnae,'4923-0/02');
  assert.ok(legalIdentity.registeredName.includes('CARLOS HENRICO AMARAL DE ASSIS'));
  for(const html of [root,en,es,mobile,...legalPages.map(page=>renderLegalPage(page,'/assets/app/test.css'))]){
    assert.ok(html.includes(legalIdentity.cnpj),'CNPJ must be displayed');
    assert.ok(html.includes(legalIdentity.registeredName),'registered business name must be displayed');
    assert.ok(!/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/.test(html),'CPF must never be public');
  }
});

test('all three legal pages are indexable and accessible from both home variants',()=>{
  assert.deepEqual(legalPages.map(x=>x.path),['/privacidade/','/termos-de-uso/','/cancelamento/']);
  for(const page of legalPages){
    const path='dist'+page.path+'index.html';
    assert.ok(fs.existsSync(path),path);
    const html=get(path);
    assert.ok(html.includes('<h1>'+page.heading+'</h1>'));
    assert.ok(html.includes('href="/privacidade/"') && html.includes('href="/termos-de-uso/"') && html.includes('href="/cancelamento/"'));
    assert.ok(html.includes('Nome empresarial') || html.includes('69.099.839 CARLOS'));
    assert.ok(html.includes('Minuta operacional sujeita a revisão jurídica.'));
    assert.ok(html.includes('data-cookie-settings'));
    assert.ok(html.includes('src="/assets/site-preferences.js?v=20261123"'));
  }
  for(const html of [root,en,es,mobile]){
    for(const url of ['/privacidade/','/termos-de-uso/','/cancelamento/']) assert.ok(html.includes('href="'+url+'"'),url);
  }
  const sitemap=get('dist/sitemap.xml');
  assert.equal((sitemap.match(/<loc>/g)||[]).length,10);
  assert.ok(sitemap.includes('<loc>https://www.motoristaops.com.br/cancelamento/</loc>'));
});

test('desktop and mobile quote disclose purpose and terms without required consent',()=>{
  for(const html of [root,en,es]){
    assert.ok(html.includes('class="mops-form-privacy"'));
    assert.ok(html.includes('href="/privacidade/"'));
    assert.ok(html.includes('class="trip-form"'));
  }
  assert.ok(mobile.includes('class="privacy legal-form-links"'));
  assert.ok(mobile.includes('Finalidade: solicitar orçamento'));
  assert.ok(mobile.includes('<button id="open-whatsapp" type="button"'));
  assert.ok(!mobile.includes('<a id="open-whatsapp"'));
  assert.ok(!mobile.includes('open.href='));
  assert.ok(mobile.includes('preparedWhatsappUrl='));
  assert.ok(mobile.includes("window.open(preparedWhatsappUrl,'_blank','noopener,noreferrer')"));
  assert.ok(mobile.includes("recordContact('formulario_mobile')"));
  assert.ok(!/<input[^>]*type="checkbox"[^>]*checked/i.test(mobile),'optional analytics cannot be prechecked');
});

test('GA4 basic consent defaults denied and requires explicit opt-in; form PII stays off event links',()=>{
  const sources=[get('dist/assets/mobile-analytics.js'),get('dist/servicos/track.js')];
  for(const source of sources){
    assert.ok(source.includes("analytics_storage:'denied'")||source.includes("analytics_storage: 'denied'"));
    assert.ok(source.includes("analytics_storage:'granted'")||source.includes("analytics_storage: 'granted'"));
    assert.ok(source.includes("ad_user_data:'denied'")||source.includes("ad_user_data: 'denied'"));
    assert.ok(source.includes('googletagmanager.com/gtag/js?id='));
    assert.ok(source.includes('motoristaops.analytics'));
    assert.ok(!source.includes('user_id:'));
    assert.ok(!source.includes('Nome:'));
    assert.ok(!source.includes('Origem:'));
  }
  assert.ok(mobile.includes('motoristaops:quote-open'));
  assert.ok(mobile.includes('/assets/mobile-analytics.js?v=20261124'));
});

test('mobile essential controls meet static AA contrast and minimum 12px typography',()=>{
  const source=get('public/mobile/index.html');
  assert.ok(source.includes('.quote .kicker{color:var(--grafite)}'));
  assert.ok(source.includes('border:1px solid var(--sombra);background:var(--marfim)'));
  assert.ok(contrast('#151518','#F3EFE4') >= 4.5);
  assert.ok(contrast('#947546','#F3EFE4') >= 3);
  for(const m of source.matchAll(/font-size:(\d+(?:\.\d+)?)px/g))assert.ok(Number(m[1])>=12,m[0]);
});

test('unlicensed dealership photos and unverified named testimonials are not published',()=>{
  for(const path of ['omoda-luxury-cabin.webp','omoda-luxury-front-seats.webp','omoda-luxury-rear-seats.webp','omoda-luxury-sunroof.webp']){
    assert.ok(!fs.existsSync('dist/assets/'+path),'remove until publication license documented: '+path);
  }
  for(const html of [root,en,es]){
    assert.ok(!html.includes('Thaís Barbosa')&&!html.includes('Fernanda Josias'));
    assert.ok(html.includes('Leia as avaliações')||html.includes('Read the reviews')||html.includes('evaluaciones'));
    assert.ok(html.includes('omoda-front.webp'));
  }
});
