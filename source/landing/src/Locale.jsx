import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {createTranslator,language,languages} from './i18n.mjs';

const LocaleContext=createContext();
export function LocaleProvider({locale,children}) {
  const value=useMemo(()=>({locale:language(locale).code,t:createTranslator(locale)}),[locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export const useLocale=()=>useContext(LocaleContext);

export function LanguageSelector() {
  const {locale,t}=useLocale();
  const [hash,setHash]=useState('');
  useEffect(()=>{
    const update=()=>setHash(window.location.hash);
    update();window.addEventListener('hashchange',update);
    return()=>window.removeEventListener('hashchange',update);
  },[]);
  return <nav className="language-selector" aria-label={t('Selecionar idioma')}>
    {languages.map(item=><a key={item.code} href={item.path+hash} lang={item.lang} hrefLang={item.lang} title={item.name} aria-label={item.name} aria-current={locale===item.code?'page':undefined}><span aria-hidden="true">{item.short}</span><span className="language-name">{item.name}</span></a>)}
  </nav>;
}
