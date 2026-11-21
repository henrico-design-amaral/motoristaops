(function () {
  'use strict';
  const key = 'motoristaops.analytics';
  const locale = /^en\b/i.test(document.documentElement.lang) ? 'en' : /^es\b/i.test(document.documentElement.lang) ? 'es' : 'pt';
  const translations = {
    pt: {
      title: 'Sua privacidade importa',
      description: 'Usamos armazenamento essencial para lembrar sua escolha. Com sua autorização, o Google Analytics mede visitas e cliques no WhatsApp. Você pode continuar sem autorizar a medição.',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      reject: 'Rejeitar opcionais',
      accept: 'Aceitar estatísticas',
      customize: 'Preferências',
      essential: 'Necessários',
      essentialDescription: 'Mantêm a preferência de privacidade e o funcionamento básico.',
      alwaysOn: 'Sempre ativos',
      analytics: 'Estatísticas opcionais',
      analyticsDescription: 'Autoriza Google Analytics para medir uso do site e cliques de contato; não confirma mensagens ou reservas.',
      save: 'Salvar escolhas',
      back: 'Voltar',
      label: 'Escolhas de privacidade e cookies'
    },
    en: {
      title: 'Your privacy matters',
      description: 'We use essential storage to remember your choice. With your permission, Google Analytics measures visits and WhatsApp contact clicks. You can continue without analytics.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      reject: 'Reject optional',
      accept: 'Allow analytics',
      customize: 'Preferences',
      essential: 'Essential',
      essentialDescription: 'Keep your privacy choice and basic site functions working.',
      alwaysOn: 'Always on',
      analytics: 'Optional analytics',
      analyticsDescription: 'Allows Google Analytics to measure visits and contact clicks; this does not confirm messages or bookings.',
      save: 'Save preferences',
      back: 'Back',
      label: 'Privacy and cookie choices'
    },
    es: {
      title: 'Tu privacidad importa',
      description: 'Usamos almacenamiento esencial para recordar tu elección. Con tu permiso, Google Analytics mide visitas y clics de contacto por WhatsApp. Puedes continuar sin analítica.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      reject: 'Rechazar opcionales',
      accept: 'Aceptar estadísticas',
      customize: 'Preferencias',
      essential: 'Necesarios',
      essentialDescription: 'Guardan tu elección de privacidad y permiten el funcionamiento básico.',
      alwaysOn: 'Siempre activos',
      analytics: 'Estadísticas opcionales',
      analyticsDescription: 'Autoriza Google Analytics para medir visitas y clics de contacto, no mensajes ni reservas confirmadas.',
      save: 'Guardar preferencias',
      back: 'Volver',
      label: 'Opciones de privacidad y cookies'
    }
  };
  const t = translations[locale];
  function readChoice() {
    try {
      const value = localStorage.getItem(key);
      return value === 'yes' || value === 'no' ? value : null;
    } catch {
      return null;
    }
  }
  const panel = document.createElement('section');
  panel.className = 'mops-cookie-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-label', t.label);
  panel.innerHTML = [
    '<div class="mops-cookie-content">',
    '<p class="mops-cookie-title">' + t.title + '</p>',
    '<p class="mops-cookie-description">' + t.description + '</p>',
    '<div class="mops-cookie-legal"><a href="/privacidade/">' + t.privacy + '</a><a href="/termos-de-uso/">' + t.terms + '</a></div>',
    '<div class="mops-cookie-preferences" hidden>',
    '<div class="mops-cookie-option"><div><strong>' + t.essential + '</strong><small>' + t.essentialDescription + '</small></div><span>' + t.alwaysOn + '</span></div>',
    '<label class="mops-cookie-option"><div><strong>' + t.analytics + '</strong><small>' + t.analyticsDescription + '</small></div><input type="checkbox" class="mops-cookie-analytics"></label>',
    '</div>',
    '<div class="mops-cookie-actions">',
    '<button type="button" class="mops-cookie-secondary" data-cookie-action="reject">' + t.reject + '</button>',
    '<button type="button" class="mops-cookie-text" data-cookie-action="customize">' + t.customize + '</button>',
    '<button type="button" class="mops-cookie-primary" data-cookie-action="accept">' + t.accept + '</button>',
    '<button type="button" class="mops-cookie-primary" data-cookie-action="save" hidden>' + t.save + '</button>',
    '<button type="button" class="mops-cookie-text" data-cookie-action="back" hidden>' + t.back + '</button>',
    '</div></div>'
  ].join('');
  const prefBox = panel.querySelector('.mops-cookie-preferences');
  const optionalBox = panel.querySelector('.mops-cookie-analytics');
  const actions = Object.fromEntries(['reject','customize','accept','save','back'].map(name => [name,panel.querySelector('[data-cookie-action="'+name+'"]')]));
  function showPreferences(show) {
    prefBox.hidden = !show;
    actions.customize.hidden = show;
    actions.accept.hidden = show;
    actions.back.hidden = !show;
    actions.save.hidden = !show;
    if (show) optionalBox.checked = readChoice() === 'yes';
  }
  function openPreferences() {
    showPreferences(true);
    panel.hidden = false;
    optionalBox.focus();
  }
  function save(analytics) {
    try { localStorage.setItem(key, analytics ? 'yes' : 'no'); } catch {}
    window.dispatchEvent(new CustomEvent('motoristaops:consent-changed', {detail:{analytics}}));
    panel.hidden = true;
    showPreferences(false);
  }
  actions.reject.addEventListener('click', () => save(false));
  actions.accept.addEventListener('click', () => save(true));
  actions.customize.addEventListener('click', () => showPreferences(true));
  actions.back.addEventListener('click', () => showPreferences(false));
  actions.save.addEventListener('click', () => save(optionalBox.checked));
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape' && readChoice() !== null) panel.hidden = true;
  });
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-cookie-settings]');
    if (trigger) {
      event.preventDefault();
      openPreferences();
    }
  });
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    const analytics = readChoice() === 'yes';
    window.dispatchEvent(new CustomEvent('motoristaops:consent-changed', {detail:{analytics}}));
    panel.hidden = readChoice() !== null;
  });
  panel.hidden = readChoice() !== null;
  document.body.appendChild(panel);
})();
