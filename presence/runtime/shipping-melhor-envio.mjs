import { createHmac, timingSafeEqual, createHash } from 'node:crypto';

function text(value, field) {
  const v = String(value ?? '').trim();
  if (!v) throw new Error(`Missing ${field}`);
  return v;
}

function melhorEnvioBaseUrl(environment = 'sandbox') {
  if (environment === 'sandbox') return 'https://sandbox.melhorenvio.com.br';
  if (environment === 'production') return 'https://melhorenvio.com.br';
  throw new Error('Invalid Melhor Envio environment');
}

function apiHeaders(accessToken, userAgent) {
  const token = text(accessToken, 'accessToken');
  const agent = text(userAgent, 'userAgent');
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': agent
  };
}

function postalCode(value, field) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!/^\d{8}$/.test(digits)) throw new Error(`Invalid ${field}`);
  return digits;
}

function positiveNumber(value, field) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) throw new Error(`Invalid ${field}`);
  return number;
}

function normalizeVolumes(volumes) {
  if (!Array.isArray(volumes) || volumes.length < 1) throw new Error('At least one volume is required');
  return volumes.map((volume, index) => {
    const result = {
      width: positiveNumber(volume?.width, `volumes[${index}].width`),
      height: positiveNumber(volume?.height, `volumes[${index}].height`),
      length: positiveNumber(volume?.length, `volumes[${index}].length`),
      weight: positiveNumber(volume?.weight, `volumes[${index}].weight`)
    };
    if (volume?.insurance != null) {
      const insurance = Number(volume.insurance);
      if (!Number.isFinite(insurance) || insurance < 0) throw new Error(`Invalid volumes[${index}].insurance`);
      result.insurance = insurance;
    }
    return result;
  });
}

function normalizeOrderIds(orderIds) {
  if (!Array.isArray(orderIds) || orderIds.length < 1) throw new Error('At least one Melhor Envio order ID is required');
  return orderIds.map((id, index) => text(id, `orderIds[${index}]`));
}

export function buildMelhorEnvioQuoteRequest({
  environment = 'sandbox',
  accessToken,
  userAgent,
  fromPostalCode,
  toPostalCode,
  volumes
}) {
  return {
    method: 'POST',
    endpoint: `${melhorEnvioBaseUrl(environment)}/api/v2/me/shipment/calculate`,
    headers: apiHeaders(accessToken, userAgent),
    body: {
      from: { postal_code: postalCode(fromPostalCode, 'fromPostalCode') },
      to: { postal_code: postalCode(toPostalCode, 'toPostalCode') },
      volumes: normalizeVolumes(volumes)
    }
  };
}

export function buildMelhorEnvioCartRequest({
  environment = 'sandbox',
  accessToken,
  userAgent,
  shipment
}) {
  if (!shipment || typeof shipment !== 'object' || Array.isArray(shipment)) {
    throw new Error('Invalid shipment');
  }
  if (!Number.isInteger(Number(shipment.service)) || Number(shipment.service) <= 0) {
    throw new Error('Invalid shipment.service');
  }
  if (!shipment.from || typeof shipment.from !== 'object') throw new Error('Missing shipment.from');
  if (!shipment.to || typeof shipment.to !== 'object') throw new Error('Missing shipment.to');

  const volumes = normalizeVolumes(shipment.volumes);
  return {
    method: 'POST',
    endpoint: `${melhorEnvioBaseUrl(environment)}/api/v2/me/cart`,
    headers: apiHeaders(accessToken, userAgent),
    body: {
      ...shipment,
      service: Number(shipment.service),
      volumes
    }
  };
}

function buildOrdersRequest(path, {
  environment = 'sandbox',
  accessToken,
  userAgent,
  orderIds
}) {
  return {
    method: 'POST',
    endpoint: `${melhorEnvioBaseUrl(environment)}${path}`,
    headers: apiHeaders(accessToken, userAgent),
    body: { orders: normalizeOrderIds(orderIds) }
  };
}

export function buildMelhorEnvioCheckoutRequest(input) {
  return buildOrdersRequest('/api/v2/me/shipment/checkout', input);
}

export function buildMelhorEnvioGenerateRequest(input) {
  return buildOrdersRequest('/api/v2/me/shipment/generate', input);
}

export function buildMelhorEnvioTrackingRequest(input) {
  return buildOrdersRequest('/api/v2/me/shipment/tracking', input);
}

export function buildMelhorEnvioPrintRequest({
  mode = 'private',
  ...input
}) {
  if (!['private', 'public'].includes(mode)) throw new Error('Invalid print mode');
  const request = buildOrdersRequest('/api/v2/me/shipment/print', input);
  request.body.mode = mode;
  return request;
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
