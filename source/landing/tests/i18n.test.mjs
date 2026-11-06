import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createTranslator,languages,localeFromPath} from '../src/i18n.mjs';
import {prepareTripRequest} from '../src/trip-request.mjs';
import messages from '../src/messages.json' with {type:'json'};

test('all translations exist and preserve interpolation fields',()=>{
  for(const [source,translations] of Object.entries(messages))for(const locale of ['en','es']){
    assert.ok(translations[locale]?.trim(),`${locale}: ${source}`);
    const fields=text=>[...text.matchAll(/\{\w+\}/g)].map(match=>match[0]).sort();
    assert.deepEqual(fields(translations[locale]),fields(source),source);
  }
  assert.throws(()=>createTranslator('en')('untranslated new copy'),/Missing en translation/);
  assert.equal(localeFromPath('/en/'),'en');assert.equal(localeFromPath('/es/'),'es');
  assert.equal(localeFromPath('/enough/'),'pt');assert.equal(localeFromPath('/'),'pt');
});

for(const locale of languages)test(`${locale.code}: complete indexable page, reciprocal SEO, assets and translated service links`,()=>{
  const html=fs.readFileSync(`dist${locale.path}index.html`,'utf8'),t=createTranslator(locale.code);
  assert.ok(html.includes(`<html lang="${locale.lang}">`));
  assert.ok(html.includes(`rel="canonical" href="https://www.motoristaops.com.br${locale.path}"`));
  assert.equal((html.match(/class="service"/g)||[]).length,8);
  assert.equal((html.match(/<details>/g)||[]).length,10);
  assert.equal((html.match(/class="review"/g)||[]).length,2);
  assert.ok(html.includes(t('Nada é enviado automaticamente. O atendimento só é reservado após confirmação.')));
  assert.ok(html.includes('69.099.839/0001-25'));assert.ok(html.includes('/assets/hero-v4-3.webp'));
  for(const item of languages){
    assert.ok(html.includes(`hreflang="${item.lang}" href="https://www.motoristaops.com.br${item.path}"`));
    assert.ok(html.includes(`href="${item.path}" lang="${item.lang}"`));
  }
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const webpage=graph['@graph'].find(item=>item['@type']==='WebPage');
  assert.equal(webpage.inLanguage,locale.lang);assert.equal(webpage.url,'https://www.motoristaops.com.br'+locale.path);
  const links=[...html.matchAll(/href="(https:\/\/wa.me\/[^\"]+)"/g)].map(match=>new URL(match[1]).searchParams.get('text'));
  assert.equal(links.length,18);
  for(const message of links)assert.ok(message.startsWith(locale.code==='en'?'Hello, Henrico!':locale.code==='es'?'¡Hola, Henrico!':'Olá, Henrico!'));
  if(locale.code!=='pt'){
    assert.ok(html.includes(t('Avaliações traduzidas do português.')));
    for(const source of ['Perguntas frequentes.','Pular para o conteúdo','Adiante os detalhes','Proteções já aplicadas'])assert.ok(!html.includes(source),source);
  }
});

for(const locale of ['en','es'])test(`${locale}: form errors, schedule and WhatsApp message use selected language and keep user input`,()=>{
  const t=createTranslator(locale);
  const invalid=prepareTripRequest({origem:' ',destino:'',passageiros:'5'},'2026-11-06',locale);
  assert.equal(invalid.errors.origem,t('Informe o endereço de partida.'));
  assert.equal(invalid.errors.passageiros,t('Selecione de 1 a 4 passageiros.'));
  assert.equal(invalid.href,undefined);
  const input={origem:'Av. Paulista, 1000',destino:'GRU Terminal 3',data:'2026-11-07',horario:'',passageiros:'2',detalhes:'2 malas & mochila\nRetorno às 17h?'};
  const result=prepareTripRequest(input,'2026-11-06',locale);
  assert.deepEqual(result.errors,{});
  assert.ok(result.message.includes(t('Origem')+': '+input.origem));
  assert.ok(result.message.includes(t('Horário')+': '+t('A combinar')));
  assert.ok(result.message.includes(input.detalhes));
  assert.equal(new URL(result.href).searchParams.get('text'),result.message);
  assert.equal(result.summary.horario,t('A combinar'));
  assert.ok(!result.summary.data.includes('/'),'month name avoids day/month ambiguity');
});

test('sitemap publishes exactly the three language URLs with alternates',()=>{
  const xml=fs.readFileSync('dist/sitemap.xml','utf8');
  assert.equal((xml.match(/<loc>/g)||[]).length,3);
  assert.equal((xml.match(/xhtml:link/g)||[]).length,12);
  for(const locale of languages)assert.ok(xml.includes(`<loc>https://www.motoristaops.com.br${locale.path}</loc>`));
});

test('release manifest uses URL paths on Windows and Linux',()=>{
  const manifest=JSON.parse(fs.readFileSync('dist/release-manifest.json','utf8'));
  assert.ok(manifest.files.every(file=>!file.path.includes('\\')));
  assert.ok(manifest.files.some(file=>file.path==='en/index.html'));
  assert.ok(manifest.files.some(file=>file.path==='es/index.html'));
});
