import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {safeAnalyticsReferrer} from '../src/analytics-referrer.mjs';
import {legalPages,renderLegalPage} from '../scripts/legal-pages.mjs';

const get = path => fs.readFileSync(path,'utf8');

test('GA4 referrer sanitizer keeps source domain but strips PII in path, credentials and parameters',()=>{
  assert.equal(safeAnalyticsReferrer('https://user:secret@referral.example/client/maria?email=maria%40example.com&cpf=123#frag'),'https://referral.example/');
  assert.equal(safeAnalyticsReferrer('https://example.com/?text=Rua%20Exemplo%20234'),'https://example.com/');
  assert.equal(safeAnalyticsReferrer('http://localhost:3000/secret?phone=555'),'http://localhost:3000/');
  for (const invalid of ['', 'not a url', 'javascript:alert(1)', 'data:text/plain,secret', 'mailto:person@example.org']) {
    assert.equal(safeAnalyticsReferrer(invalid),'',invalid);
  }
});

test('both home variants ship sanitizer with consent-gated GA4',()=>{
  const source=get('src/analytics.mjs'),built=get('dist/assets/mobile-analytics.js');
  assert.ok(source.includes("page_referrer:safeAnalyticsReferrer(document.referrer)"));
  assert.ok(source.includes("import {safeAnalyticsReferrer} from './analytics-referrer.mjs'"));
  assert.ok(built.includes("page_referrer:safeAnalyticsReferrer(document.referrer)"));
  assert.ok(get('dist/assets/analytics-referrer.mjs').includes('url.origin'));
  const manifest=JSON.parse(get('dist/release-manifest.json'));
  assert.ok(manifest.files.some(f=>f.path==='assets/analytics-referrer.mjs'));
  assert.ok(get('dist/mobile/index.html').includes("/assets/mobile-analytics.js?v=20261124"));
});

test('service page tracker never includes raw referrer or sensitive query parameters in GA4 config',()=>{
  const script=get('dist/servicos/track.js');
  new vm.Script(script);
  const scripts=[];
  const events=[];
  const ctx={
    URL,URLSearchParams,Date,
    localStorage:{getItem:key=>key==='motoristaops.analytics'?'yes':null},
    location:{pathname:'/servicos/transfer-aeroportos/',origin:'https://www.motoristaops.com.br',search:'?name=PessoaTeste&email=pessoa%40example.test&gclid=test123'},
    document:{
      referrer:'https://referrer.example/cliente/pessoa-teste?cpf=00000000000&email=pessoa%40example.test#private',
      createElement(){return {};},
      head:{appendChild(s){scripts.push(s);}},
      addEventListener(event,cb){events.push(event)}
    },
    window:{}
  };
  vm.runInNewContext(script,ctx);
  assert.equal(scripts.length,1,'tag loads only after stored explicit opt-in');
  const gtag=ctx.window.dataLayer;
  assert.ok(gtag && gtag.length>0,'consent and GA4 config recorded');
  const config=gtag.find(args=>args[0]==='config')[2];
  assert.equal(config.page_referrer,'https://referrer.example/');
  assert.equal(config.page_location,'https://www.motoristaops.com.br/servicos/transfer-aeroportos/?gclid=test123');
  const sent=JSON.stringify(gtag);
  for (const bad of ['PessoaTeste','pessoa%40example.test','00000000000','cliente/pessoa-teste'])assert.ok(!sent.includes(bad),bad);
  assert.equal(gtag.find(args=>args[0]==='consent'&&args[1]==='default')[2].analytics_storage,'denied');
  assert.equal(gtag.find(args=>args[0]==='consent'&&args[1]==='update')[2].analytics_storage,'granted');
});

test('legal pages offer accessible, opt-in, generic privacy and refund requests, without personal info',()=>{
  for(const route of ['/privacidade/','/cancelamento/']){
    const html=renderLegalPage(legalPages.find(page=>page.path===route),'/assets/app/test.css');
    assert.ok(html.includes('class="legal-action"'));
    const link=html.match(/<a href="(https:\/\/wa\.me\/5511988329725\?text=[^"]+)"/);
    assert.ok(link,'action needs confirmed WhatsApp recipient');
    const message=new URL(link[1]).searchParams.get('text');
    assert.ok(message.startsWith('Olá, gostaria'),'generic request without customer data');
    assert.ok(html.includes('Nenhuma mensagem será enviada à MotoristaOPS sem sua confirmação'));
    assert.ok(!message.includes('CPF:')&&!message.includes('Origem:')&&!message.includes('Nome:'));
  }
  const terms=renderLegalPage(legalPages.find(page=>page.path==='/termos-de-uso/'),'/assets/app/test.css');
  assert.ok(!terms.includes('class="legal-action"'));
});
