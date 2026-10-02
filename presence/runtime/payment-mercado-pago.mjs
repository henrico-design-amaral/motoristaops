import { createHmac, timingSafeEqual } from 'node:crypto';

function nonEmpty(value, field) {
  const v = String(value ?? '').trim();
  if (!v) throw new Error(`Missing ${field}`);
  return v;
}

function httpsUrl(value, field) {
  const raw = nonEmpty(value, field);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid URL: ${field}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Only https URLs are allowed: ${field}`);
  return url.toString();
}

export function centsToAmount(cents) {
  if (!Number.isInteger(cents) || cents < 0) throw new Error('amountCents must be a non-negative integer');
  return (cents / 100).toFixed(2);
}

export function buildMercadoPagoCheckoutProOrder(input) {
  const orderId = nonEmpty(input.motoristaOpsOrderId, 'motoristaOpsOrderId');
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(orderId)) {
    throw new Error('motoristaOpsOrderId must be 1-64 letters, numbers, hyphens or underscores');
  }

  const title = nonEmpty(input.title, 'title');
  const amount = centsToAmount(input.amountCents);
  const idempotencyKey = nonEmpty(input.idempotencyKey, 'idempotencyKey');
  if (idempotencyKey.length > 128) throw new Error('idempotencyKey must be at most 128 characters');

  const successUrl = httpsUrl(input.successUrl, 'successUrl');
  const failureUrl = httpsUrl(input.failureUrl, 'failureUrl');
  const pendingUrl = httpsUrl(input.pendingUrl, 'pendingUrl');
  const buyerEmail = input.buyerEmail ? nonEmpty(input.buyerEmail, 'buyerEmail') : null;

  const body = {
    type: 'online',
    processing_mode: 'manual',
    total_amount: amount,
    external_reference: orderId,
    description: title,
    expiration_time: input.expirationTime || 'P1D',
    items: [{
      title,
      unit_price: amount,
      quantity: 1,
      unit_measure: 'unit',
      total_amount: amount
    }],
    config: {
      online: {
        success_url: successUrl,
        failure_url: failureUrl,
        pending_url: pendingUrl,
        auto_return: 'approved'
      }
    }
  };

  if (buyerEmail) body.payer = { email: buyerEmail };

  return {
    endpoint: 'https://api.mercadopago.com/v1/orders',
    headers: {
      'Content-Type': 'application/json',
      'X-Idempotency-Key': idempotencyKey
    },
    body
  };
}

export function mapMercadoPagoOrderStatus(status, detail) {
  const s = String(status ?? '').trim().toLowerCase();
  const d = String(detail ?? '').trim().toLowerCase();

  if (s === 'created') return 'CREATED';
  if (s === 'processing') return 'PROCESSING';
  if (s === 'action_required') return 'ACTION_REQUIRED';
  if (s === 'failed') return 'FAILED';
  if (s === 'canceled') return 'CANCELED';
  if (s === 'refunded') return 'REFUNDED';

  if (s === 'processed') {
    if (d === 'accredited') return 'APPROVED';
    if (d === 'refunded') return 'REFUNDED';
    if (d === 'partially_refunded') return 'PARTIALLY_REFUNDED';
  }

  return 'UNKNOWN';
}

export function paymentAuthorizesOrderProgress(paymentStatus) {
  return paymentStatus === 'APPROVED';
}

export function buildMercadoPagoGetOrderRequest(orderId) {
  const id = nonEmpty(orderId, 'orderId');
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new Error('Invalid Mercado Pago order ID');
  return {
    endpoint: `https://api.mercadopago.com/v1/orders/${encodeURIComponent(id)}`,
    headers: {
      Accept: 'application/json'
    }
  };
}

export function verifyMercadoPagoWebhookSignature({ xSignature, xRequestId, dataId, secret }) {
  const signature = nonEmpty(xSignature, 'x-signature');
  const requestId = nonEmpty(xRequestId, 'x-request-id');
  const resourceId = nonEmpty(dataId, 'data.id').toLowerCase();
  const key = nonEmpty(secret, 'secret');

  const parts = Object.fromEntries(
    signature.split(',').map((part) => {
      const [name, ...rest] = part.trim().split('=');
      return [name, rest.join('=')];
    })
  );

  const ts = nonEmpty(parts.ts, 'x-signature.ts');
  const received = nonEmpty(parts.v1, 'x-signature.v1').toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(received)) return false;

  const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;
  const expected = createHmac('sha256', key).update(manifest).digest('hex');

  const a = Buffer.from(received, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function normalizeMercadoPagoOrderWebhook({ body, headers = {}, query = {} }) {
  if (!body || typeof body !== 'object') throw new Error('Invalid webhook body');
  if (body.type !== 'order') throw new Error('Unsupported webhook type');

  const externalOrderId = nonEmpty(body?.data?.id, 'body.data.id');
  const action = nonEmpty(body.action, 'body.action');
  const externalEventId = nonEmpty(body.id, 'body.id');

  const lowerHeaders = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [String(key).toLowerCase(), value])
  );

  const xSignature = nonEmpty(lowerHeaders['x-signature'], 'x-signature');
  const xRequestId = nonEmpty(lowerHeaders['x-request-id'], 'x-request-id');

  const queryDataId = String(query['data.id'] ?? query.data_id ?? externalOrderId).trim();
  if (queryDataId && queryDataId !== externalOrderId) {
    throw new Error('Webhook order ID mismatch');
  }

  return {
    provider: 'mercado_pago',
    externalEventId,
    externalOrderId,
    action,
    signature: {
      xSignature,
      xRequestId,
      dataId: externalOrderId
    },
    payload: body
  };
}
