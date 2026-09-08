export function parseCliTime(value, utcOffset = '-03:00', endOfDay = false) {
  if (!value) return null; if (/^\d+$/.test(value)) return Number(value);
  const candidate = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T${endOfDay ? '23:59:59' : '00:00:00'}${utcOffset}` : value;
  const ms = Date.parse(candidate); if (!Number.isFinite(ms)) throw new Error(`Data/hora inválida: ${value}`); return Math.floor(ms / 1000);
}
export function defaultSyncRange(utcOffset = '-03:00') { const now = new Date(); return { fromTime: Math.floor(now.getTime()/1000) - 48*3600, toTime: Math.floor(now.getTime()/1000) }; }
export function rangeFromTrips(trips) { const ts=[]; for (const trip of trips) { for (const v of [trip?.pickup?.timestamp, trip?.dropoff?.timestamp, trip?.drop_off?.timestamp]) if (Number.isFinite(Number(v))) ts.push(Number(v)); for (const c of trip?.status_changes||[]) if (Number.isFinite(Number(c?.timestamp))) ts.push(Number(c.timestamp)); } return ts.length ? { fromTime: Math.min(...ts), toTime: Math.max(...ts) } : null; }
