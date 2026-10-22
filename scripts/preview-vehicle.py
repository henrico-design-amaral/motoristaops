#!/usr/bin/env python3
"""Assemble the landing preview only; never deploy or modify the live site.

Usage: python3 scripts/preview-vehicle.py --assets /path/to/assets \
  --vendor /path/to/vendor --output /path/to/preview.html
The assets directory contains the existing approved landing images. Vendor
contains fonts.css (with local/data URLs) and lucide.js 0.574.0.
"""
import argparse
import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def assemble():
    html = ''.join(p.read_text() for p in sorted((ROOT / 'source/parts').glob('*.htmlfrag')))
    html = html.replace('/assets/henrico-profile.png', '/assets/henrico-profile.webp')
    html = html.replace('5511953970704', '5511988329725')
    start = html.index('  <section style="padding:clamp(64px,8vw,124px) 0; background:radial-gradient')
    end = html.index('  <footer data-comment-anchor="footer"', start)
    html = html[:start] + html[end:]
    return html.replace('src="/landing-v3/hero-motoristaops-v4.webp"', 'src="/assets/hero-claude.avif"').replace('src="/landing-v3/logo-header-v3.svg"', 'src="/assets/logo-claude.avif"')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--assets', required=True, type=Path)
    parser.add_argument('--vendor', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--focus-vehicle', action='store_true', help='Open the preview at the new section; does not change production fragments')
    args = parser.parse_args()
    html = assemble()
    for asset in set(re.findall(r'/assets/[\w.-]+', html)):
        # Only rendered local assets; metadata URLs remain exactly as production.
        if f'"{asset}"' not in html and f"'{asset}'" not in html:
            continue
        p = args.assets / asset.rsplit('/', 1)[1]
        mime = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
        uri = f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()
        html = html.replace(f'"{asset}"', f'"{uri}"').replace(f"'{asset}'", f"'{uri}'")
    html = html.replace('<link rel="stylesheet" href="/web/assets/presence.css">', '<style>' + (ROOT / 'presence/web/assets/presence.css').read_text() + '</style>')
    html = re.sub(r'<link[^>]*href="https://fonts.googleapis.com/css2[^>]*>', '<style>' + (args.vendor / 'fonts.css').read_text() + '</style>', html)
    html = html.replace('<script src="https://unpkg.com/lucide@0.574.0" crossorigin="anonymous"></script>', '<script>' + (args.vendor / 'lucide.js').read_text().replace('</script', '<\\/script') + '</script>')
    # Favicon resolves to the approved local logo, with no preview network request.
    logo = 'data:image/avif;base64,' + base64.b64encode((args.assets / 'logo-claude.avif').read_bytes()).decode()
    html = html.replace('href="/landing-v3/logo-oficial.svg"', f'href="{logo}"')
    if args.focus_vehicle:
        focus = """<script>window.addEventListener('load',async()=>{await document.fonts.ready;const mobile=matchMedia('(max-width:780px)').matches;const section=document.getElementById(mobile?'mobile-novo-carro':'novo-carro');if(section)window.scrollTo({top:section.getBoundingClientRect().top+window.scrollY-(mobile?20:80),behavior:'instant'});});</script>"""
        html = html.replace('</body>', focus + '</body>')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(html)
    print(args.output)


if __name__ == '__main__':
    main()
