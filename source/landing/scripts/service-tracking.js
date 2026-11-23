(function () {
  'use strict';
  const ID = 'G-ZQZ76XPPLP';
  const pref = 'motoristaops.analytics';
  let enabled = false;
  let initialized = false;
  try { enabled = localStorage.getItem(pref) === 'yes'; } catch {}
  function gtag() { (window.dataLayer ??= []).push(arguments); }
  function begin() {
    if (initialized || !enabled) return;
    initialized = true;
    window['ga-disable-' + ID] = false;
    // Google Consent Mode v2 - basic: no Google script or network calls before opt-in.
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('set','ads_data_redaction',true);
    gtag('js', new Date());
    const current = new URL(location.pathname, location.origin);
    const query = new URLSearchParams(location.search);
    for (const key of ['gclid', 'wbraid', 'gbraid']) {
      const value = query.get(key);
      if (value && /^[A-Za-z0-9_-]+$/.test(value)) current.searchParams.set(key, value);
    }
    gtag('config', ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: current.href
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(script);
  }
  if (enabled) begin();
  window.addEventListener('motoristaops:consent-changed', function (event) {
    enabled = event.detail?.analytics === true;
    window['ga-disable-' + ID] = !enabled;
    if (enabled) begin();
    else if (initialized) {
      gtag('consent','update',{analytics_storage:'denied'});
      location.reload();
    }
  });
  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[data-whatsapp-service][href]');
    if (!link || event.defaultPrevented) return;
    const url = new URL(link.href, location.origin);
    if (url.hostname !== 'wa.me' || url.pathname !== '/5511988329725') return;
    if (enabled && initialized) {
      gtag('event', 'whatsapp_click', {
        send_to: ID,
        cta_location: 'pagina_servico',
        service_slug: link.dataset.whatsappService || ''
      });
    }
  });
})();
