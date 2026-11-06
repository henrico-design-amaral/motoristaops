import {createTranslator,language,languages} from '../src/i18n.mjs';

export const BASE='https://www.motoristaops.com.br';
export const RELEASE='landing-2026-11-06-i18n';
const escape=text=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');

export function localizeDocument(template,markup,locale) {
  const current=language(locale),t=createTranslator(locale),url=BASE+current.path;
  let html=template.replace('<html lang="pt-BR">',`<html lang="${current.lang}">`);
  html=html.replace(/<title>(.*?)<\/title>/,(_,title)=>`<title>${escape(t(title))}</title>`);
  html=html.replace(/<meta (name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)" content="([^"]*)">/g,(_,kind,key,value)=>`<meta ${kind}="${key}" content="${escape(t(value))}">`);
  html=html.replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="${url}">`);
  html=html.replace(/<link rel="alternate"[^>]*>\s*/g,'');
  const alternates=languages.map(item=>`<link rel="alternate" hreflang="${item.lang}" href="${BASE+item.path}">`).join('\n')+`\n<link rel="alternate" hreflang="x-default" href="${BASE}/">`;
  html=html.replace('<link rel="icon"',alternates+'\n<link rel="icon"');
  html=html.replace(/<meta property="og:locale"[^>]*>/,`<meta property="og:locale" content="${current.og}">\n`+languages.filter(item=>item.code!==current.code).map(item=>`<meta property="og:locale:alternate" content="${item.og}">`).join('\n'));
  html=html.replace(/<meta property="og:url"[^>]*>/,`<meta property="og:url" content="${url}">`);
  html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,(_,json)=>{
    const graph=JSON.parse(json);
    for(const node of graph['@graph']){
      if(node['@type']==='ImageObject')node.caption=t(node.caption);
      if(node['@type']==='WebSite'){node.inLanguage=languages.map(item=>item.lang);node.description=t(node.description);}
      if(node['@type']==='WebPage'){node['@id']=url+'#webpage';node.url=url;node.inLanguage=current.lang;node.name=t(node.name);node.description=t(node.description);}
      if(node['@type']==='Service'){node.name=t(node.name);node.serviceType=t(node.serviceType);}
    }
    return '<script type="application/ld+json">'+JSON.stringify(graph).replaceAll('<','\\u003c')+'</script>';
  });
  html=html.replace(/(<meta name="motoristaops-release" content=")[^"]+/,`$1${RELEASE}`);
  return html.replace('<!--app-html-->',()=>markup);
}

export function sitemap() {
  const links=languages.map(item=>`<xhtml:link rel="alternate" hreflang="${item.lang}" href="${BASE+item.path}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`;
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+languages.map(item=>`<url><loc>${BASE+item.path}</loc>${links}</url>`).join('')+'</urlset>\n';
}
