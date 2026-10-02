import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'src', 'data', 'motoristaops.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const near = (a, b, tolerance = 0.02) =>
  Number.isFinite(Number(a)) && Number.isFinite(Number(b)) && Math.abs(Number(a) - Number(b)) <= tolerance;

assert(data.meta?.app === 'MotoristaOps', 'meta.app inválido');
assert(Array.isArray(data.daily) && data.daily.length >= 10, 'histórico diário insuficiente');

const daily = Array.isArray(data.daily) ? [...data.daily].filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x?.date ?? '')).sort((a,b)=>a.date.localeCompare(b.date)) : [];
assert(daily.length > 0, 'nenhum fechamento datado encontrado');

const latest = daily.at(-1);
if (latest) {
  assert(data.latestDay?.date === latest.date, `latestDay divergente: esperado ${latest.date}, recebido ${data.latestDay?.date}`);
  const activeMonth = latest.date.slice(0,7);
  const monthRows = daily.filter(x => x.date.startsWith(activeMonth));
  const sum = key => monthRows.reduce((total,row)=>total+(Number(row[key])||0),0);
  const trips = Math.trunc(sum('tripsTotal'));

  assert(data.meta?.month === activeMonth, `meta.month divergente: ${data.meta?.month}`);
  assert(data.monthly?.month === activeMonth, `monthly.month divergente: ${data.monthly?.month}`);
  assert(data.monthly?.daysWorked === monthRows.length, `dias trabalhados divergentes: esperado ${monthRows.length}, recebido ${data.monthly?.daysWorked}`);
  assert(near(data.monthly?.grossRevenue, sum('grossRevenue')), `receita mensal divergente: esperado ${sum('grossRevenue').toFixed(2)}, recebido ${data.monthly?.grossRevenue}`);
  assert(near(data.monthly?.operationalProfit, sum('operationalProfit')), `lucro mensal divergente: esperado ${sum('operationalProfit').toFixed(2)}, recebido ${data.monthly?.operationalProfit}`);
  assert(near(data.monthly?.operationalExpense, sum('operationalExpense')), `despesa mensal divergente: esperado ${sum('operationalExpense').toFixed(2)}, recebido ${data.monthly?.operationalExpense}`);
  assert(data.monthly?.trips === trips, `corridas mensais divergentes: esperado ${trips}, recebido ${data.monthly?.trips}`);
  assert(data.latestDay?.grossRevenue >= 0, 'receita do último fechamento inválida');
}

if (errors.length) {
  console.error('VALIDAÇÃO FALHOU');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OK: snapshot MotoristaOPS validado dinamicamente até ${data.latestDay?.date ?? 'data desconhecida'}.`);
