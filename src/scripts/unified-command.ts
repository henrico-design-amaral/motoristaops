import { supabase } from '../lib/supabase';
import { summarizeOperation, modelAllocations } from '../lib/unified-ledger.mjs';

type DailyClosing = {
  operation_date: string;
  source?: string | null;
  revenue_uber?: number | null;
  revenue_99?: number | null;
  revenue_private?: number | null;
  tips_extras?: number | null;
  fuel_cost?: number | null;
  food_cost?: number | null;
  wash_cost?: number | null;
  other_operational_cost?: number | null;
  trips_uber?: number | null;
  trips_99?: number | null;
  trips_private?: number | null;
  hours_online?: number | null;
  km_total?: number | null;
  fuel_cash_paid?: number | null;
  fuel_liters?: number | null;
  odometer_end_km?: number | null;
};
type PrivateFinance = {
  competence_month: string;
  source_as_of: string;
  data_quality: 'partial' | 'confirmed';
  source_label: string;
  bank_balance_total: number | null;
  month_inflows: number | null;
  month_outflows: number | null;
  month_net: number | null;
  work_income: number | null;
  family_support: number | null;
  reserve_balance: number | null;
  upcoming_dues: number | null;
};
const byId = (id: string) => document.getElementById(id);
const fmtMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtNum = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const values = new Map<string, string>();
let masked = false;
let refreshing = false;
let authUserId: string | null = null;

function saoPauloToday() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const d = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return d.year + '-' + d.month + '-' + d.day;
}
const today = saoPauloToday();
const month = today.slice(0, 7);
function text(id: string, value: string) { const el = byId(id); if (el) el.textContent = value; }
function privateValue(id: string, value: string) {
  values.set(id, value);
  text(id, masked ? '••••' : value);
}
function numberOrNull(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
function currencyOrDash(value: number | null | undefined) { return value === null || value === undefined ? '—' : fmtMoney.format(value); }
function errorMessage(message: string) {
  const el = byId('uc-error');
  if (!el) return;
  el.hidden = false;
  el.textContent = message;
}
function clearError() {
  const el = byId('uc-error');
  if (el) { el.hidden = true; el.textContent = ''; }
}
function setAuth(loggedIn: boolean) {
  if (byId('uc-auth-panel')) byId('uc-auth-panel')!.hidden = loggedIn;
  if (byId('uc-private')) byId('uc-private')!.hidden = !loggedIn;
  const refresh = byId('uc-refresh') as HTMLButtonElement | null;
  if (refresh) refresh.disabled = !loggedIn;
  if (byId('uc-privacy')) byId('uc-privacy')!.hidden = !loggedIn;
  if (!loggedIn) {
    authUserId = null;
    values.clear();
    text('uc-sync-status', 'Acesso privado');
  }
}
function renderTrend(rows: DailyClosing[]) {
  const root = byId('uc-trend');
  if (!root) return;
  root.replaceChildren();
  if (masked) { root.textContent = 'Gráfico oculto por privacidade.'; return; }
  const days = [...rows].sort((a, b) => a.operation_date.localeCompare(b.operation_date)).slice(-10);
  const gross = (row: DailyClosing) =>
    (Number(row.revenue_uber) || 0) + (Number(row.revenue_99) || 0) +
    (Number(row.revenue_private) || 0) + (Number(row.tips_extras) || 0);
  const peak = Math.max(1, ...days.map(gross));
  if (days.length === 0) { root.textContent = 'Nenhum fechamento confirmado neste periodo.'; return; }
  for (const day of days) {
    const item = document.createElement('div');
    item.className = 'uc-trend-day';
    const bar = document.createElement('span');
    bar.className = 'uc-trend-bar';
    bar.style.setProperty('--uc-bar-height', String(Math.max(2, gross(day) / peak * 85)) + 'px');
    bar.title = day.operation_date + ': ' + fmtMoney.format(gross(day));
    const label = document.createElement('small');
    label.textContent = day.operation_date.slice(8, 10) + '/' + day.operation_date.slice(5, 7);
    item.append(bar, label);
    root.append(item);
  }
}
function renderClosings(rows: DailyClosing[]) {
  const root = byId('uc-close-rows');
  if (!root) return;
  root.replaceChildren();
  const latest = [...rows].sort((a, b) => b.operation_date.localeCompare(a.operation_date)).slice(0, 10);
  if (!latest.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td'); td.colSpan = 6;
    td.textContent = 'Nenhum fechamento registrado no banco neste periodo.';
    tr.append(td); root.append(tr);
    return;
  }
  for (const day of latest) {
    const gross = (Number(day.revenue_uber) || 0) + (Number(day.revenue_99) || 0) +
      (Number(day.revenue_private) || 0) + (Number(day.tips_extras) || 0);
    const cost = (Number(day.fuel_cost) || 0) + (Number(day.food_cost) || 0) +
      (Number(day.wash_cost) || 0) + (Number(day.other_operational_cost) || 0);
    const trips = (Number(day.trips_uber) || 0) + (Number(day.trips_99) || 0) + (Number(day.trips_private) || 0);
    const cells = [
      day.operation_date.slice(8, 10) + '/' + day.operation_date.slice(5, 7),
      day.source || 'Fechamento', String(trips),
      fmtMoney.format(gross), fmtMoney.format(cost), fmtMoney.format(gross - cost)
    ];
    const tr = document.createElement('tr');
    for (let i = 0; i < cells.length; i++) {
      const td = document.createElement('td');
      td.textContent = i >= 3 && masked ? '••••' : cells[i];
      tr.append(td);
    }
    root.append(tr);
  }
}
let fetchedClosings: DailyClosing[] = [];
async function loadOperation(userId: string) {
  const result = await supabase.from('daily_closings')
    .select('operation_date,source,revenue_uber,revenue_99,revenue_private,tips_extras,fuel_cost,food_cost,wash_cost,other_operational_cost,trips_uber,trips_99,trips_private,hours_online,km_total,fuel_cash_paid,fuel_liters,odometer_end_km')
    .eq('owner_id', userId).gte('operation_date', month + '-01').lte('operation_date', today)
    .order('operation_date', { ascending: false });
  if (result.error) throw result.error;
  fetchedClosings = (result.data || []) as DailyClosing[];
  const s = summarizeOperation(fetchedClosings, month);
  if (s.days === 0) {
    for (const id of ['uc-ops-gross','uc-ops-profit','uc-ops-uber','uc-ops-trips',
      'uc-ops-hour','uc-ops-profit-hour','uc-ops-km','uc-ops-private','uc-ops-fuel-cash','uc-ops-odometer',
      'uc-alloc-car','uc-alloc-ppf','uc-alloc-other','uc-alloc-free']) privateValue(id, '—');
    text('uc-ops-distance','Nenhum fechamento no periodo');
    text('uc-source-driver','MotoristaOPS: sem fechamentos completos no periodo');
    renderTrend([]);
    renderClosings([]);
    return;
  }
  privateValue('uc-ops-gross', currencyOrDash(s.operationalRevenue));
  privateValue('uc-ops-profit', currencyOrDash(s.operationalProfit));
  privateValue('uc-ops-uber', currencyOrDash(s.uber));
  privateValue('uc-ops-trips', String(s.trips));
  privateValue('uc-ops-hour', currencyOrDash(s.revenuePerHour));
  privateValue('uc-ops-profit-hour', currencyOrDash(s.profitPerHour));
  privateValue('uc-ops-km', currencyOrDash(s.revenuePerKm));
  privateValue('uc-ops-private', currencyOrDash(s.privateProduced));
  const budget = modelAllocations(s.operationalRevenue);
  const allocs: Array<[string, number]> = [['uc-alloc-car',budget.car],['uc-alloc-ppf',budget.ppf],
    ['uc-alloc-other',budget.other],['uc-alloc-free',budget.free]];
  for (const [id, value] of allocs) privateValue(id,currencyOrDash(value));
  const paidFuelRecords = fetchedClosings.filter(r => r.fuel_cash_paid !== null && r.fuel_cash_paid !== undefined);
  const paidFuelTotal = paidFuelRecords.reduce((sum, row) => sum + (Number(row.fuel_cash_paid) || 0), 0);
  privateValue('uc-ops-fuel-cash', paidFuelRecords.length ? fmtMoney.format(paidFuelTotal) : '—');
  const lastOdometer = [...fetchedClosings].sort((a,b)=>b.operation_date.localeCompare(a.operation_date))
    .find(r=>r.odometer_end_km !== null && r.odometer_end_km !== undefined);
  privateValue('uc-ops-odometer', lastOdometer ? fmtNum.format(Number(lastOdometer.odometer_end_km))+' km' : '—');
  text('uc-ops-distance', fmtNum.format(s.hours) + 'h online · ' + fmtNum.format(s.km) + ' km · ' + s.days + ' dia(s)');
  text('uc-source-driver', 'MotoristaOPS: ' + s.days + ' fechamento(s) obtido(s) da conta autenticada');
  renderTrend(fetchedClosings); renderClosings(fetchedClosings);
}
async function loadPrivateFinance(userId: string): Promise<boolean> {
  // Authenticated projection only. Banking data never enters the static HTML or public JSON.
  try {
    const { data, error } = await supabase.from('finance_monthly_readmodel')
      .select('competence_month,source_as_of,data_quality,source_label,bank_balance_total,month_inflows,month_outflows,month_net,work_income,family_support,reserve_balance,upcoming_dues')
      .eq('owner_id', userId).eq('competence_month', month + '-01')
      .maybeSingle();
    if (error || !data) throw error ?? new Error('Resumo financeiro nao publicado');
    const finance = data as PrivateFinance;
    if (finance.competence_month !== month + '-01'
      || !['partial','confirmed'].includes(finance.data_quality)) {
      throw new Error('Periodo ou proveniencia nao validados');
    }
    const entries: Array<[string, number | null]> = [
      ['uc-bank-balance',finance.bank_balance_total],
      ['uc-bank-inflows',finance.month_inflows],
      ['uc-bank-outflows',finance.month_outflows],
      ['uc-bank-net',finance.month_net],
      ['uc-bank-work',finance.work_income],
      ['uc-bank-family',finance.family_support],
      ['uc-bank-reserve',finance.reserve_balance],
      ['uc-bank-dues',finance.upcoming_dues]
    ];
    for (const [id, value] of entries) privateValue(id,currencyOrDash(numberOrNull(value)));
    const asOf = new Date(finance.source_as_of);
    const validTime = Number.isFinite(asOf.valueOf());
    const stale = !validTime || Date.now() - asOf.getTime() > 24 * 60 * 60 * 1000;
    text('uc-bank-state',stale ? 'Snapshot desatualizado' :
      finance.data_quality === 'partial' ? 'Dados parciais' : 'Conciliado');
    text('uc-bank-balance-note',
      validTime ? 'Leitura de ' + asOf.toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}) :
        'Data da leitura nao confirmada');
    text('uc-source-bank', 'Financeiro: ' + finance.source_label +
      ' · ' + (finance.data_quality === 'partial' ? 'classificacao parcial' : 'conciliado'));
    return true;
  } catch {
    text('uc-bank-state', 'Fonte indisponivel');
    text('uc-source-bank', 'Financeiro: nenhum resumo autenticado disponivel');
    for (const id of ['uc-bank-balance','uc-bank-inflows','uc-bank-outflows','uc-bank-net',
      'uc-bank-work','uc-bank-family','uc-bank-reserve','uc-bank-dues']) privateValue(id,'—');
    return false;
  }
}
async function refresh() {
  if (refreshing) return;
  refreshing = true;
  clearError();
  text('uc-sync-status', 'Consultando fontes');
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) { setAuth(false); return; }
    authUserId = user.id;
    setAuth(true);
    await loadOperation(user.id);
    const financeOK = await loadPrivateFinance(user.id);
    text('uc-sync-status', financeOK ? 'Operacao e resumo financeiro consultados' : 'Operacao consultada · financeiro pendente');
  } catch {
    text('uc-sync-status', 'Fonte indisponivel');
    errorMessage('Nao foi possivel confirmar os fechamentos no backend. Nenhum dado foi inferido ou preenchido manualmente.');
  } finally { refreshing = false; }
}

text('uc-period', month.slice(5, 7) + '/' + month.slice(0, 4) + ' · ate ' + today.slice(8, 10) + '/' + today.slice(5, 7));
byId('uc-refresh')?.addEventListener('click', () => void refresh());
byId('uc-privacy')?.addEventListener('click', () => {
  masked = !masked;
  text('uc-privacy', masked ? 'Mostrar valores' : 'Ocultar valores');
  for (const [id, value] of values.entries()) text(id, masked ? '••••' : value);
  renderClosings(fetchedClosings);
  renderTrend(fetchedClosings);
});
byId('uc-login-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();
  const form = byId('uc-login-form') as HTMLFormElement;
  const email = String(new FormData(form).get('email') || '').trim();
  if (!email) return;
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email, options: { emailRedirectTo: window.location.href }
    });
    if (error) throw error;
    text('uc-sync-status', 'Link solicitado · confira seu e-mail');
  } catch {
    errorMessage('Autenticacao indisponivel. O projeto MotoristaOPS precisa estar ativo para permitir entrada e salvamento.');
  }
});
supabase.auth.onAuthStateChange((_event, session) => {
  if (!session) setAuth(false);
  else if (session.user.id !== authUserId) void refresh();
});
void refresh();
