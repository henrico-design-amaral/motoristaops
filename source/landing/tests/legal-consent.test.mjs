import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {legalPages,renderLegalPage} from '../scripts/legal-pages.mjs';
import {sitemap} from '../scripts/locale-html.mjs';

test('two basic legal pages have truthful public metadata, contact and consent controls', () => {
  assert.deepEqual(legalPages.map(page=>page.path),['/privacidade/','/termos-de-uso/']);
  for (const page of legalPages) {
    const html=renderLegalPage(page,'/assets/app/index-test.css');
    assert.ok(html.includes('<html lang="pt-BR">'));
    assert.ok(html.includes('<h1>'+page.heading+'</h1>'));
    assert.ok(html.includes('<link rel="canonical" href="https://www.motoristaops.com.br'+page.path+'">'));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('name="viewport"'));
    assert.ok(html.includes('69.099.839/0001-25'));
    assert.ok(html.includes('98832-9725'));
    assert.ok(html.includes('21 de novembro de 2026'));
    assert.ok(html.includes('href="/privacidade/"') && html.includes('href="/termos-de-uso/"'));
    assert.ok(html.includes('data-cookie-settings'));
    assert.ok(html.includes('src="/assets/cookie-consent.js"'));
    assert.ok(html.includes('src="/servicos/track.js"'));
    assert.ok(!html.includes('cookies são obrigatórios para continuar'));
    const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/)[1]);
    assert.equal(schema['@type'],'WebPage');
    assert.equal(schema.url,'https://www.motoristaops.com.br'+page.path);
  }
});
test('sitemap and production build include legal pages and shared consent assets', () => {
  const xml=sitemap();
  for(const page of legalPages) {
    assert.ok(xml.includes('<loc>https://www.motoristaops.com.br'+page.path+'</loc>'));
    const full=path.join('dist',...page.path.split('/').filter(Boolean),'index.html');
    assert.ok(fs.existsSync(full),'missing '+full);
  }
  for(const lang of ['/','/en/','/es/']) {
    const html=fs.readFileSync('dist'+lang+'index.html','utf8');
    assert.ok(html.includes('src="/assets/cookie-consent.js"'),lang);
    assert.ok(html.includes('href="/assets/cookie-consent.css"'),lang);
    assert.ok(html.includes('id="privacidade"'),lang);
  }
  for (const asset of ['cookie-consent.js','cookie-consent.css']) assert.ok(fs.existsSync('dist/assets/'+asset));
  const banner=fs.readFileSync('dist/assets/cookie-consent.js','utf8');
  assert.ok(banner.includes('window.addEventListener(\'load\''));
  assert.ok(banner.includes('href="/privacidade/"'));
  assert.ok(banner.includes('href="/termos-de-uso/"'));
  assert.ok(banner.includes('data-cookie-settings'));
  const manifest=JSON.parse(fs.readFileSync('dist/release-manifest.json','utf8'));
  for (const entry of ['privacidade/index.html','termos-de-uso/index.html','assets/cookie-consent.js','assets/cookie-consent.css'])
    assert.ok(manifest.files.some(file=>file.path===entry),entry);
  const deploy=fs.readFileSync('../../scripts/deploy-landing.sh','utf8');
  for (const directory of ['privacidade','termos-de-uso'])
    assert.ok(deploy.includes('mirror --reverse --verbose source/landing/dist/'+directory));
});
test('shared banner initially rejects optional analytics and can explicitly accept or revoke', () => {
  const source=fs.readFileSync('scripts/cookie-consent.js','utf8');
  new vm.Script(source);
  const store=new Map(),handlers={};
  const controls=Object.fromEntries(['reject','accept','customize','save','back'].map(name=>[name,{
    hidden:false,
    addEventListener(event,fn){this[event]=fn;}
  }]));
  const preferences={hidden:true},option={checked:false,focus(){}};
  const panel={
    hidden:false,
    setAttribute(){},
    addEventListener(){},
    querySelector(selector){
      if(selector==='.mops-cookie-preferences')return preferences;
      if(selector==='.mops-cookie-analytics')return option;
      const match=selector.match(/data-cookie-action="([^"]+)"/);
      return controls[match?.[1]];
    }
  };
  const events=[];
  const document={
    documentElement:{lang:'pt-BR'},
    createElement(){return panel;},
    body:{appendChild(element){assert.equal(element,panel);}},
    addEventListener(event,fn){handlers[event]=fn;}
  };
  const window={addEventListener(event,fn){handlers['window-'+event]=fn;},dispatchEvent(event){events.push(event);}};
  const localStorage={getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,value)};
  class CustomEvent{constructor(type,options){this.type=type;this.detail=options.detail;}}
  vm.runInNewContext(source,{document,window,localStorage,CustomEvent});
  assert.equal(panel.hidden,false,'banner must show until a decision exists');
  controls.reject.click();
  assert.equal(localStorage.getItem('motoristaops.analytics'),'no');
  assert.equal(events.at(-1).detail.analytics,false);
  assert.equal(panel.hidden,true);
  handlers.click({target:{closest:()=>({})},preventDefault(){}});
  assert.equal(panel.hidden,false,'settings can reopen a saved choice');
  assert.equal(preferences.hidden,false);
  option.checked=true;
  controls.save.click();
  assert.equal(localStorage.getItem('motoristaops.analytics'),'yes');
  assert.equal(events.at(-1).detail.analytics,true);
  assert.equal(panel.hidden,true);
});
