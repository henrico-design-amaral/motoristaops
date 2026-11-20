import React, {useEffect, useState} from 'react';
import {useLocale} from './Locale.jsx';
import {savedPermission,setPermission} from './analytics.mjs';

export function Privacy() {
  const {t} = useLocale();
  const [consent,setConsent] = useState(false);
  useEffect(()=>setConsent(savedPermission()),[]);
  return <section className="container privacy-notice" id="privacidade" aria-labelledby="privacy-title">
    <h3 id="privacy-title">{t('Privacidade e medição')}</h3>
    <p>{t('Ao abrir o WhatsApp, os dados do trajeto seguem para esse serviço para preparar a conversa. Você revisa e envia a mensagem. Para falar sobre seus dados, use o contato de Henrico nesta página.')}</p>
    <label><input type="checkbox" checked={consent} onChange={event=>{
      setConsent(event.target.checked);
      setPermission(event.target.checked);
    }}/>{t('Permitir cookies de medição do Google Analytics')}</label>
    <p>{t('Com sua autorização, medimos visitas e aberturas do WhatsApp. Os campos do orçamento ficam fora desses eventos. Você pode mudar sua escolha aqui.')}</p>
  </section>;
}
