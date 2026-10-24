import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const html=fs.readFileSync('dist/index.html','utf8');
const manifest=JSON.parse(fs.readFileSync('dist/release-manifest.json','utf8'));
test('indexable HTML includes the complete approved page before JavaScript',()=>{
 for(const text of ['Seu compromisso','Perguntas frequentes.','id="o-carro"','id="quem-dirige"','id="orcamento"','Preparar mensagem','O serviço leva meu nome.'])assert.ok(html.includes(text),text);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert.equal((html.match(/<details>/g)||[]).length,10);
 assert.ok(html.includes('name="robots" content="index,follow'));
 assert.ok(html.includes('rel="canonical" href="https://www.motoristaops.com.br/"'));
 for(const bad of ['noindex','/temp/','landing-v3','fonts.googleapis.com','5511953970704','henrico.driver.amaral'])assert.ok(!html.includes(bad),bad);
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))assert.doesNotThrow(()=>JSON.parse(match[1]));
});
test('all same-origin HTML resources exist and all published file hashes agree',()=>{
 const refs=[...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)(?:\?[^"]*)?"/g)].map(m=>m[1]);
 assert.ok(refs.length>20);
 assert.ok(manifest.files.every(f=>!f.path.startsWith('.')),'Server configuration must not be fetched through public HTTP');
 assert.ok(fs.readFileSync('dist/.htaccess','utf8').includes('DirectoryIndex index.html'));
 assert.ok(fs.readFileSync('dist/.htaccess','utf8').includes('https://www.motoristaops.com.br%{REQUEST_URI}'));
 for(const ref of refs)assert.ok(fs.existsSync('dist'+ref),ref);
 for(const file of manifest.files){assert.ok(!file.path.includes('..'));const bytes=fs.readFileSync('dist/'+file.path);assert.equal(bytes.length,file.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256);}
});
test('typography is self-hosted Instrument Sans with no font below 12px',()=>{
 const css=manifest.files.filter(f=>f.path.endsWith('.css')).map(f=>fs.readFileSync('dist/'+f.path,'utf8')).join('\n');
 assert.ok(css.includes('Instrument Sans'));
 assert.equal(manifest.files.filter(f=>f.path.endsWith('.woff2')).length,2);
 for(const m of css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g))assert.ok(+m[1]>=12,m[0]);
 assert.ok(!/Georgia|Times New Roman|Bebas|fonts\.googleapis/.test(css));
});
test('approved assets, contact and removed CTAs remain intact',()=>{
 assert.ok(html.includes('/assets/hero-v4-3.webp'));assert.ok(html.includes('/assets/henrico-original.webp'));
 const header=html.split('</header>')[0];assert.ok(!header.includes('wa.me'));
 const hero=html.split('class="trust-strip"')[0];assert.ok(!hero.includes('wa.me'));
 assert.ok(html.includes('https://wa.me/5511988329725?text='));
 assert.ok(!html.includes('henrico-outfit'));assert.ok(!html.includes('process-bottom'));
 assert.ok(html.includes('Nada é enviado automaticamente.'));
});
