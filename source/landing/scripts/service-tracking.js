(function () {
  'use strict';
  const ID = 'G-ZQZ76XPPLP';
  const pref = 'motoristaops.analytics';
  const input = document.getElementById('seo-analytics-consent');
  if (!input) return;
  let enabled = false;
  let initialized = false;
  try { enabled = localStorage.getItem(pref) === 'yes'; } catch {}
  input.checked = enabled;
  function gtag() { (window.dataLayer ??= []).push(arguments); }
  function begin() {
    if (initialized || !enabled) return;
    initialized = true;
    window['ga-disable-' + ID] = false;
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
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
  input.addEventListener('change', function () {
    enabled = input.checked;
    try { localStorage.setItem(pref, enabled ? 'yes' : 'no'); } catch {}
    if (enabled) begin();
    else {
      window['ga-disable-' + ID] = true;
      if (initialized) location.reload();
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
