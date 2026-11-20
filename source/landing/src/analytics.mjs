// Basic consent mode. The site does not load the Google tag before opt-in.
const ID = 'G-ZQZ76XPPLP';
const preference = 'motoristaops.analytics';
let allowed = false;
let started = false;

function tag() {
  (window.dataLayer ??= []).push(arguments);
}

export function savedPermission() {
  try { return localStorage.getItem(preference) === 'yes'; }
  catch { return false; }
}

export function setPermission(value, persist = true) {
  if (persist) {
    try { localStorage.setItem(preference, value ? 'yes' : 'no'); } catch {}
  }
  allowed = value;
  window['ga-disable-'+ID] = !value;
  if (!value) {
    if (started) {
      tag('consent','update',{analytics_storage:'denied'});
      // Unload enhanced measurement listeners as well as disabling this stream.
      window.location.reload();
    }
    return;
  }
  if (started) return;
  started = true;
  tag('consent','default',{
    analytics_storage:'granted', ad_storage:'denied',
    ad_user_data:'denied', ad_personalization:'denied'
  });
  tag('js',new Date());
  const landing = new URL(location.pathname,location.origin);
  const query = new URLSearchParams(location.search);
  for (const key of ['gclid','wbraid','gbraid']) {
    const id=query.get(key);
    if (id && /^[A-Za-z0-9_-]+$/.test(id)) landing.searchParams.set(key,id);
  }
  tag('config',ID,{
    allow_google_signals:false, allow_ad_personalization_signals:false,
    page_location:landing.href
  });
  const script = document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(script);
}

export function recordContact(source) {
  if (allowed) tag('event','whatsapp_click',{send_to:ID,cta_location:source});
}

export function observeContacts(root) {
  root.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href]');
    if(event.defaultPrevented || !link || link.origin!=='https://wa.me' || link.pathname!=='/5511988329725') return;
    recordContact(link.closest('#servicos') ? 'servicos' : 'contato');
  });
}
