import { supabase } from '../lib/supabase';
import { addImportHistory } from '../lib/import-history';

type PreviewRow = { operation_date: string; platform?: string | null; hours_online?: number | null; km_total?: number | null; trips?: number; gross_revenue?: number };
type IgnoredRow = { operation_date: string; reason?: string | null };
type PreviewResponse = { ok: true; mode: 'preview'; file_hash: string; rows_read: number; eligible: number; ignored: number; preview: PreviewRow[]; ignored_preview: IgnoredRow[] };
type CommitResponse = { ok: true; mode: 'commit'; imported: number; inserted: number; updated: number; ignored: number; job_id: string };

type ErrorResponse = { error?: string };

const fileInput = document.querySelector<HTMLInputElement>('#spreadsheet-file');
const previewButton = document.querySelector<HTMLButtonElement>('#spreadsheet-preview');
const commitButton = document.querySelector<HTMLButtonElement>('#spreadsheet-commit');
const fileName = document.querySelector<HTMLElement>('#spreadsheet-file-name');
const result = document.querySelector<HTMLElement>('#spreadsheet-result');
const previewPanel = document.querySelector<HTMLElement>('#spreadsheet-preview-panel');
const previewRows = document.querySelector<HTMLElement>('#spreadsheet-preview-rows');
const ignoredRows = document.querySelector<HTMLElement>('#spreadsheet-ignored-rows');
const loginBox = document.querySelector<HTMLElement>('#spreadsheet-login');
const workspace = document.querySelector<HTMLElement>('#spreadsheet-workspace');
const authStatus = document.querySelector<HTMLElement>('#spreadsheet-auth-status');
const loginForm = document.querySelector<HTMLFormElement>('#spreadsheet-login-form');

let selectedFile: File | null = null;
let previewHash = '';
let previewEligible = 0;

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char] ?? char));

function show(message: string, kind: 'ok' | 'error' = 'ok') {
  if (!result) return;
  result.hidden = false;
  result.dataset.kind = kind;
  result.textContent = message;
}

function setBusy(busy: boolean) {
  if (previewButton) previewButton.disabled = busy || !selectedFile;
  if (commitButton) commitButton.disabled = busy || !selectedFile || !previewHash || previewEligible === 0;
  if (fileInput) fileInput.disabled = busy;
}

function renderPreview(payload: PreviewResponse) {
  previewHash = payload.file_hash;
  previewEligible = payload.eligible;
  document.querySelector('#spreadsheet-eligible')!.textContent = String(payload.eligible);
  document.querySelector('#spreadsheet-ignored')!.textContent = String(payload.ignored);
  document.querySelector('#spreadsheet-read')!.textContent = String(payload.rows_read);
  if (previewRows) previewRows.innerHTML = payload.preview.length ? payload.preview.map(row => `
    <tr><td>${esc(row.operation_date?.split('-').reverse().join('/'))}</td><td>${esc(row.platform || '—')}</td><td>${row.hours_online == null ? '—' : number.format(row.hours_online)}</td><td>${row.km_total == null ? '—' : number.format(row.km_total)}</td><td>${number.format(row.trips ?? 0)}</td><td>${money.format(row.gross_revenue ?? 0)}</td></tr>`).join('') : '<tr><td colspan="6">Nenhuma linha elegível.</td></tr>';
  if (ignoredRows) ignoredRows.innerHTML = payload.ignored_preview.length ? payload.ignored_preview.map(row => `
    <tr><td>${esc(row.operation_date?.split('-').reverse().join('/'))}</td><td>${esc(row.reason || 'dados incompletos')}</td></tr>`).join('') : '<tr><td colspan="2">Nenhuma linha ignorada.</td></tr>';
  if (previewPanel) previewPanel.hidden = false;
  show(`${payload.eligible} fechamento(s) elegível(is) e ${payload.ignored} linha(s) protegida(s) contra importação incompleta.`);
  setBusy(false);
}

async function invoke(mode: 'preview' | 'commit') {
  if (!selectedFile) return;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { show('Sessão necessária para importar a planilha.', 'error'); return; }
  const form = new FormData();
  form.set('file', selectedFile);
  form.set('mode', mode);
  if (mode === 'commit') form.set('expected_hash', previewHash);
  const response = await fetch('https://zlyqcfvwghjpytpqxtgc.supabase.co/functions/v1/import-motoristaops-excel', {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.access_token}`, apikey: 'sb_publishable_2PC9q_Nmiscn00aHFo16Dw_XbsmGbe7' },
    body: form,
  });
  const payload = await response.json() as PreviewResponse | CommitResponse | ErrorResponse;
  if (!response.ok || !('ok' in payload)) throw new Error(('error' in payload && payload.error) || 'Importação não concluída.');
  return payload;
}

fileInput?.addEventListener('change', () => {
  selectedFile = fileInput.files?.[0] ?? null;
  previewHash = '';
  previewEligible = 0;
  if (fileName) fileName.textContent = selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado.';
  if (previewPanel) previewPanel.hidden = true;
  if (result) result.hidden = true;
  setBusy(false);
});

previewButton?.addEventListener('click', async () => {
  setBusy(true);
  try {
    const payload = await invoke('preview');
    if (payload && payload.mode === 'preview') renderPreview(payload);
  } catch (error) {
    previewHash = '';
    previewEligible = 0;
    show(error instanceof Error ? error.message : 'Falha ao gerar prévia.', 'error');
    setBusy(false);
  }
});

commitButton?.addEventListener('click', async () => {
  if (!selectedFile || !previewHash || previewEligible === 0) return;
  if (!confirm(`Confirmar a conciliação de ${previewEligible} fechamento(s) revisado(s)? Linhas incompletas permanecerão ignoradas.`)) return;
  setBusy(true);
  try {
    const payload = await invoke('commit');
    if (!payload || payload.mode !== 'commit') return;
    addImportHistory({ source:'excel', fileName:selectedFile.name, status:payload.ignored ? 'partial' : 'success', importedCount:payload.imported, skippedCount:payload.ignored, errorCount:0, message:`${payload.inserted} inserido(s), ${payload.updated} atualizado(s), ${payload.ignored} ignorado(s).` });
    show(`Importação confirmada: ${payload.inserted} novo(s), ${payload.updated} atualizado(s) e ${payload.ignored} ignorado(s).`);
    previewHash = '';
    previewEligible = 0;
    if (commitButton) commitButton.disabled = true;
  } catch (error) {
    addImportHistory({ source:'excel', fileName:selectedFile.name, status:'error', importedCount:0, skippedCount:0, errorCount:1, message:error instanceof Error ? error.message : 'Falha na importação.' });
    show(error instanceof Error ? error.message : 'Falha ao confirmar importação.', 'error');
    setBusy(false);
  }
});

loginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const email = String(new FormData(loginForm).get('email') || '').trim();
  if (!email) return;
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.href } });
  show(error ? error.message : 'Link de acesso enviado para seu e-mail.', error ? 'error' : 'ok');
});

async function refreshAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (authStatus) authStatus.textContent = session ? 'Sessão ativa' : 'Login necessário';
  if (loginBox) loginBox.hidden = Boolean(session);
  if (workspace) workspace.hidden = !session;
  setBusy(false);
}

supabase.auth.onAuthStateChange(() => { void refreshAuth(); });
void refreshAuth();
