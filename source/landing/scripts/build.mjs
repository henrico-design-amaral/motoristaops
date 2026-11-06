import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {build} from 'vite';
import {languages} from '../src/i18n.mjs';
import {localizeDocument,sitemap,RELEASE} from './locale-html.mjs';
await build();
await build({build:{ssr:'src/entry-server.jsx',outDir:'.server-build',emptyOutDir:true}});
const {render}=await import(pathToFileURL(path.resolve('.server-build/entry-server.js')));
const html=fs.readFileSync('dist/index.html','utf8');
if(!html.includes('<!--app-html-->'))throw Error('Prerender placeholder absent');
for(const locale of languages){
  const target=path.join('dist',locale.path);
  fs.mkdirSync(target,{recursive:true});
  fs.writeFileSync(path.join(target,'index.html'),localizeDocument(html,render(locale.code),locale.code));
}
fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n\nSitemap: https://www.motoristaops.com.br/sitemap.xml\n');
fs.writeFileSync('dist/sitemap.xml',sitemap());
fs.copyFileSync('apache.htaccess','dist/.htaccess');
const files=[];
const visit=dir=>{for(const n of fs.readdirSync(dir).sort()){const p=path.join(dir,n);if(fs.statSync(p).isDirectory())visit(p);else if(n!=='.htaccess') files.push({path:p.slice(5),bytes:fs.statSync(p).size,sha256:createHash('sha256').update(fs.readFileSync(p)).digest('hex')});}};
visit('dist');
fs.writeFileSync('dist/release-manifest.json',JSON.stringify({release:RELEASE,files},null,2)+'\n');
fs.rmSync('.server-build',{recursive:true});
console.log('Production prerender complete:',files.length,'files');
