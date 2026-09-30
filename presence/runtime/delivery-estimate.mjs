function asDate(value, field) {
  const raw = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) throw new Error(`Invalid date: ${field}`);
  const date = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${field}`);
  return date;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function holidaySet(holidays = []) {
  return new Set(holidays.map((value) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && value.date) return String(value.date);
    throw new Error('Invalid holiday entry');
  }));
}

export function isBusinessDay(dateValue, holidays = []) {
  const date = dateValue instanceof Date ? new Date(dateValue) : asDate(dateValue, 'date');
  const day = date.getUTCDay();
  const closed = holidaySet(holidays);
  return day !== 0 && day !== 6 && !closed.has(iso(date));
}

export function nextBusinessDay(dateValue, holidays = []) {
  let date = dateValue instanceof Date ? new Date(dateValue) : asDate(dateValue, 'date');
  while (!isBusinessDay(date, holidays)) {
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return iso(date);
}

export function addBusinessDays(dateValue, businessDays, holidays = []) {
  if (!Number.isInteger(businessDays) || businessDays < 0) {
    throw new Error('businessDays must be a non-negative integer');
  }

  let date = dateValue instanceof Date ? new Date(dateValue) : asDate(dateValue, 'date');
  if (!isBusinessDay(date, holidays)) {
    date = asDate(nextBusinessDay(date, holidays), 'normalizedDate');
  }

  let remaining = businessDays;
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (isBusinessDay(date, holidays)) remaining -= 1;
  }
  return iso(date);
}

function laterDate(a, b) {
  return a >= b ? a : b;
}

export function calculateDeliveryWindow(input) {
  const holidays = input.holidays || [];
  const graphicsReady = nextBusinessDay(input.graphicsReadyDate, holidays);
  const stockReady = nextBusinessDay(input.stockReadyDate, holidays);
  const assemblyMin = input.assemblyMinBusinessDays ?? 2;
  const assemblyMax = input.assemblyMaxBusinessDays ?? 3;
  const carrierMin = input.carrierMinBusinessDays;
  const carrierMax = input.carrierMaxBusinessDays;

  if (!Number.isInteger(assemblyMin) || !Number.isInteger(assemblyMax) || assemblyMin < 0 || assemblyMax < assemblyMin) {
    throw new Error('Invalid assembly business-day range');
  }
  if (!Number.isInteger(carrierMin) || !Number.isInteger(carrierMax) || carrierMin < 0 || carrierMax < carrierMin) {
    throw new Error('Invalid carrier business-day range');
  }

  const fulfillmentReady = laterDate(graphicsReady, stockReady);
  const dispatchMin = addBusinessDays(fulfillmentReady, assemblyMin, holidays);
  const dispatchMax = addBusinessDays(fulfillmentReady, assemblyMax, holidays);
  const deliveryMin = addBusinessDays(dispatchMin, carrierMin, holidays);
  const deliveryMax = addBusinessDays(dispatchMax, carrierMax, holidays);

  return {
    fulfillmentReadyDate: fulfillmentReady,
    dispatchMinDate: dispatchMin,
    dispatchMaxDate: dispatchMax,
    deliveryMinDate: deliveryMin,
    deliveryMaxDate: deliveryMax,
    assemblyMinBusinessDays: assemblyMin,
    assemblyMaxBusinessDays: assemblyMax,
    carrierMinBusinessDays: carrierMin,
    carrierMaxBusinessDays: carrierMax
  };
}
