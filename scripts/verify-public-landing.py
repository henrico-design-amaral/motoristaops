#!/usr/bin/env python3
"""Verify deployed bytes, SEO, removed legacy assets, and dashboard isolation."""
import concurrent.futures, hashlib, json, time, urllib.request
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
    assert manifest['release']=='landing-2026-10-23'
    if EXPECTED: assert manifest==EXPECTED,'Public manifest differs from build'
    def check(f):
        body,headers,_=get(BASE+f['path']+'?verify='+f['sha256'][:12])
        assert hashlib.sha256(body).hexdigest()==f['sha256'],f['path']+' hash mismatch'
        if f['path'].endswith('.woff2'):assert 'font' in headers.get('Content-Type',''),headers.get('Content-Type')
        return f['path']
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: checked=list(pool.map(check,manifest['files']))
    html,headers,_=get(BASE+'?verify='+str(time.time_ns()));html=html.decode()
    assert 'noindex' not in headers.get('X-Robots-Tag','').lower()
    for text in ['name="motoristaops-release" content="landing-2026-10-23"','rel="canonical" href="'+BASE+'"','Seu compromisso','id="o-carro"','id="quem-dirige"','Perguntas frequentes.','Preparar mensagem','Nada é enviado automaticamente.']:
        assert text in html,text
    for bad in ['noindex','/temp/','landing-v3','fonts.googleapis.com']:assert bad not in html,bad
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
