import React from 'react';
import {useLocale} from './Locale.jsx';
import {legalIdentity} from './legal-identity.mjs';

const translations={
  pt:{
    title:'Privacidade e seus dados',
    details:'Ao abrir o WhatsApp, os dados que você colocou na mensagem preparada podem ser processados pela plataforma antes do envio. A conversa com a MotoristaOPS só acontece quando você envia a mensagem.',
    statistics:'As estatísticas do site são opcionais. Você pode aceitar, rejeitar ou revogar a medição a qualquer momento, sem impedir a solicitação de orçamento.',
    privacy:'Política de Privacidade',terms:'Termos de Uso',cancel:'Cancelamento e Reembolso',preferences:'Preferências de cookies',
    business:'Identificação empresarial',address:'Endereço cadastral',contact:'Atendimento e direitos de dados'
  },
  en:{
    title:'Privacy and your data',
    details:'Opening WhatsApp may share the pre-filled request with the platform even before you send the message. Your message reaches MotoristaOPS only when you decide to send it.',
    statistics:'Site analytics are optional. You can accept, reject or withdraw analytics consent at any time without affecting quote requests.',
    privacy:'Privacy Policy',terms:'Terms of Use',cancel:'Cancellations and Refunds',preferences:'Cookie preferences',
    business:'Business identification',address:'Registered business address',contact:'Support and privacy requests'
  },
  es:{
    title:'Privacidad y tus datos',
    details:'Al abrir WhatsApp, los datos preparados pueden ser procesados por la plataforma incluso antes de que envíes el mensaje. MotoristaOPS solo recibe el mensaje cuando decides enviarlo.',
    statistics:'Las estadísticas son opcionales. Puedes aceptar, rechazar o revocar el consentimiento en cualquier momento sin impedir las solicitudes de presupuesto.',
    privacy:'Política de Privacidad',terms:'Términos de Uso',cancel:'Cancelación y Reembolsos',preferences:'Preferencias de cookies',
    business:'Identificación empresarial',address:'Dirección comercial registrada',contact:'Atención y solicitudes de datos'
  }
};
export function Privacy(){
  const {locale}=useLocale();
  const l=translations[locale] || translations.pt;
  return <section className="container privacy-notice" id="privacidade" aria-labelledby="privacy-title">
    <h3 id="privacy-title">{l.title}</h3>
    <p>{l.details}</p>
    <p>{l.statistics}</p>
    <nav className="mops-legal-links" aria-label={l.title}>
      <a href="/privacidade/">{l.privacy}</a>
      <a href="/termos-de-uso/">{l.terms}</a>
      <a href="/cancelamento/">{l.cancel}</a>
      <button type="button" className="mops-cookie-settings-trigger" data-cookie-settings>{l.preferences}</button>
    </nav>
    <div className="mops-company-identity" aria-label={l.business}>
      <p><strong>{l.business}:</strong> {legalIdentity.registeredName} · CNPJ {legalIdentity.cnpj}</p>
      <p><strong>{l.address}:</strong> {legalIdentity.address}</p>
      <p><strong>{l.contact}:</strong> <a href={legalIdentity.contactUrl} target="_blank" rel="noopener noreferrer">{legalIdentity.contactPhone} (WhatsApp)</a></p>
    </div>
  </section>;
}
