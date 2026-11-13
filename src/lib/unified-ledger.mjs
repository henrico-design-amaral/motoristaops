// MotoristaOPS + Financeiro: domain totals. No bank movements are included here.
const amount = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) throw new TypeError('Valor operacional invalido');
  return parsed;
};
const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
const sum = (rows, field) => round(rows.reduce((acc, row) => acc + amount(row[field]), 0));

export function summarizeOperation(rows, month) {
  if (!/^\d{4}-\d{2}$/.test(month)) throw new TypeError('Mes invalido');
  const period = rows.filter((row) => String(row.operation_date || '').startsWith(month + '-'));
  const dates = new Set();
  for (const row of period) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(row.operation_date))) throw new TypeError('Data invalida');
    if (dates.has(row.operation_date)) throw new Error('Fechamento duplicado: ' + row.operation_date);
    dates.add(row.operation_date);
  }
  const uber = sum(period, 'revenue_uber');
  const app99 = sum(period, 'revenue_99');
  const privateProduced = sum(period, 'revenue_private');
  const extras = sum(period, 'tips_extras');
  const fuelConsumption = sum(period, 'fuel_cost');
  const food = sum(period, 'food_cost');
  const wash = sum(period, 'wash_cost');
  const otherCosts = sum(period, 'other_operational_cost');
  const operationalRevenue = round(uber + app99 + privateProduced + extras);
  const operationalCost = round(fuelConsumption + food + wash + otherCosts);
  const hours = sum(period, 'hours_online');
  const km = sum(period, 'km_total');
  const trips = sum(period, 'trips_uber') + sum(period, 'trips_99') + sum(period, 'trips_private');
  return {
    month, days: period.length, uber, app99, privateProduced, extras,
    operationalRevenue, operationalCost, operationalProfit: round(operationalRevenue - operationalCost),
    hours, km: round(km), trips,
    revenuePerHour: hours > 0 ? round(operationalRevenue / hours) : null,
    profitPerHour: hours > 0 ? round((operationalRevenue - operationalCost) / hours) : null,
    revenuePerKm: km > 0 ? round(operationalRevenue / km) : null,
    tripsPerHour: hours > 0 ? round(trips / hours) : null
  };
}

// Bank transfers, card payments and deposits are bank facts, NOT new driver revenue.
// Private service production is operational accrual until an actual bank receipt is reconciled.
// Fuel consumption is an operational cost; fueling cash payments must not be added to it.
export function classifyBankMovement(row) {
  if (row.internalTransfer === true || row.assetTransfer === true || row.cardPayment === true)
    return 'balance_movement';
  if (row.familySupport === true) return 'family_support';
  if (row.workIncome === true) return 'work_receipt';
  return 'other_cash_movement';
}

// The 24/11/35/30 rule is a scenario, never a booked transfer or bank balance.
export function modelAllocations(confirmedRevenue) {
  const total = amount(confirmedRevenue);
  const car = round(total * 0.24);
  const ppf = round(total * 0.11);
  const other = round(total * 0.35);
  // The remainder absorbs rounding so the scenario always reconciles exactly.
  const free = round(total - car - ppf - other);
  return { car, ppf, other, free, total };
}
