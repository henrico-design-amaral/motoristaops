#!/usr/bin/env python3
"""Verify deployed bytes, SEO, removed legacy assets, and dashboard isolation."""
import concurrent.futures, hashlib, json, re, time, urllib.request
from pathlib import Path
BASE='https://www.motoristaops.com.br/'
EXPECTED=json.loads(Path('source/landing/dist/release-manifest.json').read_text()) if Path('source/landing/dist/release-manifest.json').exists() else None
def get(url,user_agent=None):
    req=urllib.request.Request(url,headers={'Cache-Control':'no-cache','User-Agent':user_agent or 'MotoristaOPS-Release-Check/1.0'})
    with urllib.request.urlopen(req,timeout=30) as res:
        assert res.status==200,(url,res.status)
        return res.read(),res.headers,res.url
def verify():
    raw,_,_=get(BASE+'release-manifest.json?verify='+str(time.time_ns()))
    manifest=json.loads(raw)
    assert manifest['release']=='landing-2026-11-21-mobile-oficial'
    if EXPECTED: assert manifest==EXPECTED,'Public manifest differs from build'
    def check(f):
        body,headers,_=get(BASE+f['path']+'?verify='+f['sha256'][:12]+'-'+str(time.time_ns()))
        assert hashlib.sha256(body).hexdigest()==f['sha256'],f['path']+' hash mismatch'
        if f['path'].endswith('.woff2'):assert 'font' in headers.get('Content-Type',''),headers.get('Content-Type')
        return f['path']
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: checked=list(pool.map(check,manifest['files']))
    html,headers,_=get(BASE+'?verify='+str(time.time_ns()));html=html.decode()
    assert 'noindex' not in headers.get('X-Robots-Tag','').lower()
    for text in ['name="motoristaops-release" content="landing-2026-11-21-mobile-oficial"','rel="canonical" href="'+BASE+'"','Sua agenda merece','id="o-carro"','id="quem-dirige"','Perguntas frequentes.','Preparar mensagem','Nada é enviado automaticamente.']:
        assert text in html,text
    for bad in ['noindex','/temp/','landing-v3','fonts.googleapis.com']:assert bad not in html,bad
    for path,lang,marker,form in [('','pt-BR','Sua agenda merece','Preparar mensagem'),('en/','en','Your schedule deserves','Prepare message'),('es/','es','Tu agenda merece','Preparar mensaje')]:
        body,locale_headers,_=get(BASE+path+'?verify='+str(time.time_ns()));body=body.decode()
        for text in [f'<html lang="{lang}">',f'rel="canonical" href="{BASE+path}"',marker,form,'class="language-selector"']:
            assert text in body,(path,text)
        for target,target_lang in [('', 'pt-BR'),('en/','en'),('es/','es')]:
            assert f'hreflang="{target_lang}" href="{BASE+target}"' in body,(path,target)
        header=re.search(r'<header\b[\s\S]*?</header>',body).group(0)
        assert 'data-header-revision="2026-11-20-nav"' in header,path
        assert 'class="header-brand"' in header and 'class="header-location"' in header,path
        assert '<svg' not in header and 'header-divider' not in header,path
        assert 'noindex' not in body and 'noindex' not in locale_headers.get('X-Robots-Tag','').lower(),path
    # Mobile and desktop must be returned at the same canonical public URL.
    iphone='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    phone,phone_headers,_=get(BASE+'?verify='+str(time.time_ns()),iphone)
    phone=phone.decode()
    for marker in ['motoristaops-mobile-revision','mobile-oficial-2026-11-21','id="servicos"','id="veiculos"','id="orcamento"','Acompanhe a MotoristaOPS','index,follow','rel="canonical" href="'+BASE+'"']:
        assert marker in phone,('mobile',marker)
    for invalid in ['noindex','Visitar o site oficial','fonts.googleapis.com','Bio Executiva']:
        assert invalid not in phone,('mobile',invalid)
    phone_vary=phone_headers.get('Vary','').lower()
    phone_cache=phone_headers.get('Cache-Control','').lower()
    assert 'user-agent' in phone_vary or 'no-store' in phone_cache,('Mobile response must either Vary or be non-cacheable',phone_vary,phone_cache)
    assert 'mobile-oficial-2026-11-21' not in html,'Desktop must remain distinct'
    desktop_vary=headers.get('Vary','').lower()
    desktop_cache=headers.get('Cache-Control','').lower()
    assert 'user-agent' in desktop_vary or 'no-store' in desktop_cache,('Desktop response must either Vary or be non-cacheable',desktop_vary,desktop_cache)
    vehicle=re.search(r'<section[^>]*id="veiculos"[\s\S]*?</section>',html).group(0)
    for marker in ['Omoda 5 Luxury','SUV da operação','Veículos de parceiros','Consultar um veículo','omoda-front.webp']:
        assert marker in vehicle,marker
    for marker in ['href="#veiculos"','href="#orcamento"','id="privacidade"']:
        assert marker in html,marker
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
