const DAY_SECONDS = 86400;
const sleep = ms => ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
export function paymentWindows(fromTime, toTime) {
  if (!Number.isFinite(fromTime) || !Number.isFinite(toTime) || fromTime > toTime) throw new Error('Intervalo de pagamentos inválido.');
  const windows = []; let cursor = Math.floor(fromTime); const end = Math.floor(toTime);
  while (cursor <= end) { const windowEnd = Math.min(end, cursor + (10 * DAY_SECONDS) - 1); windows.push([cursor, windowEnd]); cursor = windowEnd + 1; }
  return windows;
}
export class UberDriverClient {
  constructor({ accessToken, baseUrl, requestDelayMs = 150, maxRetries = 3 }) { this.accessToken = accessToken; this.baseUrl = baseUrl.replace(/\/$/, ''); this.requestDelayMs = requestDelayMs; this.maxRetries = maxRetries; }
  async request(pathname, query = {}) {
    const url = new URL(`${this.baseUrl}${pathname}`);
    for (const [key, value] of Object.entries(query)) if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      await sleep(this.requestDelayMs);
      const response = await fetch(url, { headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json', 'Accept-Language': 'pt_BR' } });
      const text = await response.text(); let payload; try { payload = text ? JSON.parse(text) : {}; } catch { payload = { raw: text }; }
      if (response.ok) return payload;
      if ((response.status === 429 || response.status >= 500) && attempt < this.maxRetries) { await sleep(500 * (2 ** attempt)); continue; }
      throw new Error(`Uber API ${pathname} falhou (${payload?.code || payload?.error || response.status}): ${payload?.message || payload?.error_description || response.statusText}`);
    }
  }
  getProfile() { return this.request('/partners/me'); }
  getTripsPage({ offset = 0, limit = 50, fromTime, toTime } = {}) { return this.request('/partners/trips', { offset, limit, from_time: fromTime, to_time: toTime }); }
  async getAllTrips({ fromTime, toTime, limit = 50, onPage } = {}) {
    const trips = []; let offset = 0; let total = null;
    while (true) { const page = await this.getTripsPage({ offset, limit, fromTime, toTime }); const items = Array.isArray(page.trips) ? page.trips : []; total = Number.isFinite(Number(page.count)) ? Number(page.count) : total; trips.push(...items); onPage?.({ offset, received: items.length, total }); if (!items.length) break; offset += items.length; if ((total !== null && offset >= total) || (items.length < limit && total === null)) break; }
    return { count: total ?? trips.length, trips };
  }
  getPaymentsPage({ offset = 0, limit = 50, fromTime, toTime } = {}) { return this.request('/partners/payments', { offset, limit, from_time: fromTime, to_time: toTime }); }
  async getPaymentsWindow({ fromTime, toTime, limit = 50 } = {}) {
    const payments = []; let offset = 0; let total = null;
    while (true) { const page = await this.getPaymentsPage({ offset, limit, fromTime, toTime }); const items = Array.isArray(page.payments) ? page.payments : []; total = Number.isFinite(Number(page.count)) ? Number(page.count) : total; payments.push(...items); if (!items.length) break; offset += items.length; if ((total !== null && offset >= total) || (items.length < limit && total === null)) break; }
    return payments;
  }
  async getAllPayments({ fromTime, toTime, onWindow } = {}) {
    const payments = []; const windows = paymentWindows(fromTime, toTime);
    for (let index = 0; index < windows.length; index += 1) { const [a,b] = windows[index]; onWindow?.({ index: index + 1, total: windows.length, fromTime: a, toTime: b }); payments.push(...await this.getPaymentsWindow({ fromTime: a, toTime: b })); }
    return { count: payments.length, payments, windows: windows.length };
  }
}
