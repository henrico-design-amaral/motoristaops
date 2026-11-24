/**
 * Only keep the source origin for analytics attribution. Query strings and
 * referrer paths may contain personal information unrelated to our service.
 * This function never returns the raw document.referrer.
 */
export function safeAnalyticsReferrer(input) {
  try {
    const url = new URL(String(input));
    return (url.protocol === 'https:' || url.protocol === 'http:') ? url.origin + '/' : '';
  } catch { return ''; }
}
