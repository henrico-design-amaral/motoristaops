#!/usr/bin/env python3
"""Verify deployed bytes, SEO, removed legacy assets, and dashboard isolation."""
import concurrent.futures, hashlib, json, re, time, urllib.request
from pathlib import Path
BASE='https://www.motoristaops.com.br/'
EXPECTED=json.loads(Path('source/landing/dist/release-manifest.json').read_text()) if Path('source/landing/dist/release-manifest.json').exists() else None
def get(url):
    req=urllib.request.Request(url,headers={'Cache-Control':'no-cache','User-Agent':'MotoristaOPS-Release-Check/1.0'})
    with urllib.request.urlopen(req,timeout=30) as res:
        assert res.status==200,(url,res.status)
        return res.read(),res.headers,res.url
def verify():
    raw,_,_=get(BASE+'release-manifest.json?verify='+str(time.time_ns()))
    manifest=json.loads(raw)
    assert manifest['release']=='landing-2026-11-06-header-r02'
    if EXPECTED: assert manifest==EXPECTED,'Public manifest differs from build'
    def check(f):
        body,headers,_=get(BASE+f['path']+'?verify='+f['sha256'][:12]+'-'+str(time.time_ns()))
        assert hashlib.sha256(body).hexdigest()==f['sha256'],f['path']+' hash mismatch'
        if f['path'].endswith('.woff2'):assert 'font' in headers.get('Content-Type',''),headers.get('Content-Type')
        return f['path']
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: checked=list(pool.map(check,manifest['files']))
    html,headers,_=get(BASE+'?verify='+str(time.time_ns()));html=html.decode()
    assert 'noindex' not in headers.get('X-Robots-Tag','').lower()
    for text in ['name="motoristaops-release" content="landing-2026-11-06-header-r02"','rel="canonical" href="'+BASE+'"','Seu compromisso','id="o-carro"','id="quem-dirige"','Perguntas frequentes.','Preparar mensagem','Nada é enviado automaticamente.']:
        assert text in html,text
    for bad in ['noindex','/temp/','landing-v3','fonts.googleapis.com']:assert bad not in html,bad
    for path,lang,marker,form in [('','pt-BR','Seu compromisso','Preparar mensagem'),('en/','en','Your journey','Prepare message'),('es/','es','Tu compromiso','Preparar mensaje')]:
        body,locale_headers,_=get(BASE+path+'?verify='+str(time.time_ns()));body=body.decode()
        for text in [f'<html lang="{lang}">',f'rel="canonical" href="{BASE+path}"',marker,form,'class="language-selector"']:
            assert text in body,(path,text)
        for target,target_lang in [('', 'pt-BR'),('en/','en'),('es/','es')]:
            assert f'hreflang="{target_lang}" href="{BASE+target}"' in body,(path,target)
        header=re.search(r'<header\b[\s\S]*?</header>',body).group(0)
        assert 'data-header-revision="2026-11-06-r02"' in header,path
        assert 'class="header-brand"' in header and 'class="header-location"' in header,path
        assert '<svg' not in header and 'header-divider' not in header,path
        assert 'noindex' not in body and 'noindex' not in locale_headers.get('X-Robots-Tag','').lower(),path
    vehicle=re.search(r'<section[^>]*id="o-carro"[\s\S]*?</section>',html).group(0)
    for text in ['data-vehicle-revision="2026-10-27"','Conheça o conforto por dentro.','Proteções já aplicadas','PPF Full','PS20','G5 / G20','Vitrificação Full','Anti-Trinco','omoda-luxury-cabin.webp','omoda-luxury-front-seats.webp','omoda-luxury-rear-seats.webp','omoda-luxury-sunroof.webp']:assert text in vehicle,text
    for bad in ['previstos na preparação','Consultar ficha técnica','Imagens conceituais','vehicle-footnote']:assert bad not in vehicle,bad
    for name in ['hero-claude.avif','hero-omoda-56c0068f8b55.avif','logo-claude.avif','service-cards.webp','henrico-profile.webp']:
        try:get(BASE+'assets/'+name+'?verify='+str(time.time_ns()))
        except urllib.error.HTTPError as error:assert error.code in [404,410],(name,error.code)
        else:raise AssertionError('Obsolete landing asset still publicly available: '+name)
    _,_,canonical=get('http://motoristaops.com.br/');assert canonical==BASE,canonical
    dashboard,_,_=get('https://dashboard.motoristaops.com.br/');dashboard=dashboard.decode()
    for marker in ['MotoristaOPS · Dashboard','Plano operacional','Performance','Particular']:assert marker in dashboard,marker
    for route,marker in [('brand-system-v2/','BRAND SYSTEM V2'),('brand-system-v2/brandbook-v2.html','Brand Book V2')]:
        page,_,_=get(BASE+route);assert marker in page.decode(),route
    print('PASS:',len(checked),'published files verified byte-for-byte; canonical SEO, old-asset removal and dashboard operational markers confirmed.')
for attempt in range(1,7):
    try:verify();break
    except Exception as e:
        print('Attempt',attempt,':',e,flush=True)
        if attempt==6:raise
        time.sleep(10)
