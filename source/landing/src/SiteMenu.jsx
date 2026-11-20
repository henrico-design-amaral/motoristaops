import React, {useEffect, useRef} from 'react';
import {useLocale} from './Locale.jsx';

const sections = [
  ['servicos','Serviços'], ['veiculos','Veículos'], ['processo','Como funciona'],
  ['quem-dirige','Quem atende'], ['avaliacoes','Avaliações'], ['duvidas','Dúvidas'],
  ['orcamento','Orçamento']
];

export function SiteMenu() {
  const {t} = useLocale();
  const menu = useRef(null);
  useEffect(() => {
    const closeOutside = event => {
      if (!menu.current.contains(event.target)) menu.current.open = false;
    };
    document.addEventListener('pointerdown',closeOutside);
    return () => document.removeEventListener('pointerdown',closeOutside);
  }, []);
  const links = sections.map(([id,label]) => <a key={id} href={'#'+id}>{t(label)}</a>);
  return <nav className="site-menu" aria-label={t('Navegação principal')}>
    <div className="desktop-links">{links}</div>
    <details ref={menu} onKeyDown={event=>{
      if(event.key==='Escape' && menu.current.open) {
        menu.current.open=false;
        menu.current.querySelector('summary').focus();
      }
    }}>
      <summary>{t('Menu')}</summary>
      <div className="mobile-links" onClick={event=>{
        if(event.target.closest('a')) menu.current.open=false;
      }}>{links}</div>
    </details>
  </nav>;
}
