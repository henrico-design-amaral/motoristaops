import messages from './messages.json' with {type:'json'};

export const languages = [
  {code:'pt',lang:'pt-BR',og:'pt_BR',path:'/',name:'Português',short:'PT'},
  {code:'en',lang:'en',og:'en_US',path:'/en/',name:'English',short:'EN'},
  {code:'es',lang:'es',og:'es_ES',path:'/es/',name:'Español',short:'ES'}
];
export const language = code => languages.find(item=>item.code===code)||languages[0];
export const localeFromPath = pathname => /^\/en(?:\/|$)/.test(pathname)?'en':/^\/es(?:\/|$)/.test(pathname)?'es':'pt';

export function createTranslator(locale='pt') {
  const code=language(locale).code;
  return (source,values={}) => {
    const text=code==='pt'?source:messages[source]?.[code];
    if(text===undefined)throw new Error(`Missing ${code} translation: ${source}`);
    return text.replace(/\{(\w+)\}/g,(match,key)=>String(values[key]??match));
  };
}
