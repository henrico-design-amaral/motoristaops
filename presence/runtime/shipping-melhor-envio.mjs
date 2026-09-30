import { createHmac, timingSafeEqual, createHash } from 'node:crypto';

function text(value, field) {
  const v = String(value ?? '').trim();
  if (!v) throw new Error(`Missing ${field}`);
  return v;
}

export function verifyMelhorEnvioSignature(rawBody, signature, secret) {
  const body = String(rawBody ?? '');
  const received = text(signature, 'x-me-signature');
  const key = text(secret, 'secret');

  const expected = createHmac('sha256', key).update(body).digest('base64');
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function hashShippingWebhook(rawBody) {
  return createHash('sha256').update(String(rawBody ?? '')).digest('hex');
}

export function mapMelhorEnvioEvent(event) {
  switch (String(event ?? '').trim()) {
    case 'order.created':
    case 'order.pending':
      return 'PENDING';
    case 'order.released':
      return 'LABEL_PURCHASED';
    case 'order.generated':
      return 'READY_FOR_CARRIER';
    case 'order.received':
      return 'IN_TRANSIT';
    case 'order.posted':
      return 'POSTED';
    case 'order.delivered':
      return 'DELIVERED';
    case 'order.undelivered':
      return 'DELIVERY_FAILED';
    case 'order.paused':
      return 'ACTION_REQUIRED';
    case 'order.suspended':
      return 'SUSPENDED';
    case 'order.cancelled':
      return 'CANCELLED';
    default:
      return 'UNKNOWN';
  }
}

export function shipmentStatusToOrderState(status) {
  switch (status) {
    case 'LABEL_PURCHASED': return 'LABEL_PURCHASED';
    case 'READY_FOR_CARRIER': return 'READY_FOR_CARRIER';
    case 'POSTED': return 'POSTED';
    case 'IN_TRANSIT': return 'IN_TRANSIT';
    case 'DELIVERED': return 'DELIVERED';
    default: return null;
  }
}

export function normalizeMelhorEnvioWebhook({ rawBody, signature }) {
  const raw = String(rawBody ?? '');
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new Error('Invalid webhook JSON');
  }

  const event = text(payload.event, 'event');
  const data = payload.data;
  if (!data || typeof data !== 'object') throw new Error('Missing data');
  const externalOrderId = text(data.id, 'data.id');
  const shipmentStatus = mapMelhorEnvioEvent(event);
  if (shipmentStatus === 'UNKNOWN') throw new Error(`Unsupported Melhor Envio event: ${event}`);

  return {
    provider: 'melhor_envio',
    event,
    externalOrderId,
    shipmentStatus,
    orderState: shipmentStatusToOrderState(shipmentStatus),
    protocol: data.protocol ? String(data.protocol) : null,
    trackingCode: data.tracking ? String(data.tracking) : null,
    trackingUrl: data.tracking_url ? String(data.tracking_url).trim() : null,
    postedAt: data.posted_at || null,
    deliveredAt: data.delivered_at || null,
    signature: text(signature, 'x-me-signature'),
    payloadHash: hashShippingWebhook(raw),
    payload
  };
}
