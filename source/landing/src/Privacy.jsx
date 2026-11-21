import React from 'react';
import {useLocale} from './Locale.jsx';

const labels = {
  pt: {
    title: 'Privacidade e cookies',
    description: 'Ao abrir o WhatsApp, você decide se envia os dados do trajeto. As estatísticas do Google Analytics só são habilitadas com sua autorização.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    settings: 'Preferências de cookies',
    nav: 'Informações legais'
  },
  en: {
    title: 'Privacy and cookies',
    description: 'When you open WhatsApp, you decide whether to send the journey details. Google Analytics is enabled only with your permission.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    settings: 'Cookie preferences',
    nav: 'Legal information'
  },
  es: {
    title: 'Privacidad y cookies',
    description: 'Al abrir WhatsApp, tú decides si envías los datos del trayecto. Google Analytics solo se activa con tu permiso.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    settings: 'Preferencias de cookies',
    nav: 'Información legal'
  }
};
export function Privacy() {
  const {locale} = useLocale();
  const l = labels[locale] || labels.pt;
  return <section className="container privacy-notice" id="privacidade" aria-labelledby="privacy-title">
    <h3 id="privacy-title">{l.title}</h3>
    <p>{l.description}</p>
    <nav className="mops-legal-links" aria-label={l.nav}>
      <a href="/privacidade/">{l.privacy}</a>
      <a href="/termos-de-uso/">{l.terms}</a>
      <button className="mops-cookie-settings-trigger" type="button" data-cookie-settings>{l.settings}</button>
    </nav>
  </section>;
}
