import { supabase } from '../lib/supabase';

type ClosingPayload = {
  operation_date:string;
  shift:string;
  primary_platform:string;
  hours_online:number;
  hours_in_ride:number|null;
  km_total:number;
  km_passenger:number|null;
  trips_uber:number;
  trips_99:number;
  trips_private:number;
  revenue_uber:number;
  revenue_99:number;
  revenue_private:number;
  tips_extras:number;
  fuel_cost:number;
  food_cost:number;
  wash_cost:number;
  other_operational_cost:number;
  fuel_efficiency_km_l:number|null;
  fuel_price_reference:number|null;
  notes:string;
  source:string;
};
type QueueEntry={operation_date:string;payload:ClosingPayload;queuedAt:string;lastError?:string};

const $=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T|null;
const form=$<HTMLFormElement>('day-close-form');
const login=$<HTMLElement>('close-login');
const loginForm=$<HTMLFormElement>('close-login-form');
const authState=$<HTMLElement>('close-auth-state');
const closeState=authState?.parentElement as HTMLElement|null;
const message=$<HTMLElement>('close-message');
const syncButton=$<HTMLButtonElement>('sync-day-close');
const brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const draftKey='motoristaops:closing-draft';
const queueKey='motoristaops:closing-queue:v1';
let userId='';
let draftLoaded=false;
let syncing=false;

const num=(name:string)=>Number((form?.elements.namedItem(name) as HTMLInputElement|null)?.value||0)||0;
const text=(id:string,value:string)=>{const node=$(id);if(node)node.textContent=value;};

function notify(value:string,kind:'ok'|'error'='ok'){
  if(!message)return;
  message.hidden=false;
  message.dataset.kind=kind;
  message.textContent=value;
}

function preview(){
  if(!form)return;
  const gross=num('revenue_uber')+num('revenue_99')+num('revenue_private')+num('tips_extras');
  const cost=num('fuel_cost')+num('food_cost')+num('wash_cost')+num('other_operational_cost');
  const profit=gross-cost;
  const hours=num('hours_online');
  const km=num('km_total');
  const trips=num('trips_uber')+num('trips_99')+num('trips_private');
  text('close-gross',brl.format(gross));
  text('close-cost',brl.format(cost));
  text('close-profit',brl.format(profit));
  text('close-rph',hours?`${brl.format(gross/hours)}/h`:'—');
  text('close-pph',hours?`${brl.format(profit/hours)}/h`:'—');
  text('close-rpk',km?`${brl.format(gross/km)}/km`:'—');
  text('close-trips',String(trips));
}

function setToday(){
  if(!form)return;
  const field=form.elements.namedItem('operation_date') as HTMLInputElement|null;
  if(field&&!field.value)field.value=new Date().toISOString().slice(0,10);
}

function loadDraft(){
  if(draftLoaded||!form)return;
  const raw=localStorage.getItem(draftKey);
  if(!raw)return;
  try{
    const draft=JSON.parse(raw);
    Object.entries(draft).forEach(([key,val])=>{
      if(key==='createdAt')return;
      const field=form.elements.namedItem(key) as HTMLInputElement|HTMLTextAreaElement|null;
      if(field&&val!==null&&val!==undefined)field.value=String(val);
    });
    const note=$('draft-note');
    if(note)note.hidden=false;
    draftLoaded=true;
  }catch{
    localStorage.removeItem(draftKey);
  }
}

function payload():ClosingPayload|null{
  if(!form)return null;
  const data=new FormData(form);
  return {
    operation_date:String(data.get('operation_date')),
    shift:String(data.get('shift')||''),
    primary_platform:String(data.get('primary_platform')||''),
    hours_online:num('hours_online'),
    hours_in_ride:num('hours_in_ride')||null,
    km_total:num('km_total'),
    km_passenger:num('km_passenger')||null,
    trips_uber:Math.trunc(num('trips_uber')),
    trips_99:Math.trunc(num('trips_99')),
    trips_private:Math.trunc(num('trips_private')),
    revenue_uber:num('revenue_uber'),
    revenue_99:num('revenue_99'),
    revenue_private:num('revenue_private'),
    tips_extras:num('tips_extras'),
    fuel_cost:num('fuel_cost'),
    food_cost:num('food_cost'),
    wash_cost:num('wash_cost'),
    other_operational_cost:num('other_operational_cost'),
    fuel_efficiency_km_l:num('fuel_efficiency_km_l')||null,
    fuel_price_reference:num('fuel_price_reference')||null,
    notes:String(data.get('notes')||''),
    source:'dashboard_day_close'
  };
}

function validate(p:ClosingPayload){
  const issues:string[]=[];
  if(!p.operation_date)issues.push('data');
  if(!(p.hours_online>0))issues.push('horas online');
  if(!(p.km_total>0))issues.push('km total');
  const gross=p.revenue_uber+p.revenue_99+p.revenue_private+p.tips_extras;
  if(!(gross>0))issues.push('receita');
  const trips=p.trips_uber+p.trips_99+p.trips_private;
  if(!(trips>0))issues.push('corridas');
  return issues;
}

function readQueue():QueueEntry[]{
  try{
    const parsed=JSON.parse(localStorage.getItem(queueKey)||'[]');
    return Array.isArray(parsed)?parsed.filter(x=>x&&typeof x.operation_date==='string'&&x.payload):[];
  }catch{
    localStorage.removeItem(queueKey);
    return [];
  }
}

function writeQueue(rows:QueueEntry[]){
  localStorage.setItem(queueKey,JSON.stringify(rows));
  renderMode();
}

function queueLocal(p:ClosingPayload,lastError?:string){
  const rows=readQueue().filter(row=>row.operation_date!==p.operation_date);
  rows.push({
    operation_date:p.operation_date,
    payload:{...p,source:'dashboard_day_close_offline'},
    queuedAt:new Date().toISOString(),
    ...(lastError?{lastError}: {})
  });
  writeQueue(rows.sort((a,b)=>a.operation_date.localeCompare(b.operation_date)));
}

function removeQueuedDate(operationDate:string){
  const rows=readQueue().filter(row=>row.operation_date!==operationDate);
  writeQueue(rows);
}

function clearDraft(){
  localStorage.removeItem(draftKey);
  draftLoaded=false;
  const note=$('draft-note');
  if(note)note.hidden=true;
}

function renderMode(){
  if(form)form.hidden=false;
  if(login)login.hidden=Boolean(userId);
  const pending=readQueue().length;
  if(authState){
    authState.textContent=userId
      ? pending?`sessão autenticada · ${pending} pendente(s)`:'sessão autenticada · sincronização ativa'
      : pending?`modo local · ${pending} pendente(s)`:'modo local · salvamento neste dispositivo';
  }
  if(closeState)closeState.dataset.mode=userId&&!pending?'synced':'local';
  if(syncButton){
    syncButton.hidden=pending===0;
    syncButton.textContent=pending?`Sincronizar pendentes (${pending})`:'Sincronizar pendentes';
  }
}

async function syncQueue(showFeedback=true){
  if(syncing)return;
  const rows=readQueue();
  if(!rows.length){
    renderMode();
    if(showFeedback)notify('Nenhum fechamento pendente de sincronização.','ok');
    return;
  }
  if(!userId){
    renderMode();
    if(showFeedback)notify('Os fechamentos estão seguros neste dispositivo. Entre na conta quando o backend estiver disponível para sincronizar.','error');
    return;
  }
  syncing=true;
  if(syncButton)syncButton.disabled=true;
  try{
    const records=rows.map(row=>({...row.payload,owner_id:userId,source:'dashboard_day_close_sync'}));
    const {error}=await supabase.from('daily_closings').upsert(records,{onConflict:'owner_id,operation_date'});
    if(error)throw error;
    writeQueue([]);
    if(showFeedback)notify(`${records.length} fechamento(s) sincronizado(s) com sucesso.`,'ok');
  }catch(error:any){
    const reason=String(error?.message||'backend indisponível');
    writeQueue(rows.map(row=>({...row,lastError:reason})));
    if(showFeedback)notify('Sincronização ainda indisponível. Os fechamentos continuam salvos neste dispositivo.','error');
  }finally{
    syncing=false;
    if(syncButton)syncButton.disabled=false;
    renderMode();
  }
}

async function auth(){
  try{
    const {data:{session}}=await supabase.auth.getSession();
    userId=session?.user.id||'';
  }catch{
    userId='';
  }
  setToday();
  loadDraft();
  preview();
  renderMode();
  if(userId)void syncQueue(false);
}

form?.addEventListener('input',preview);
form?.addEventListener('reset',()=>setTimeout(()=>{
  localStorage.removeItem(draftKey);
  draftLoaded=false;
  const note=$('draft-note');
  if(note)note.hidden=true;
  setToday();
  preview();
},0));

form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const p=payload();
  if(!p)return;
  const issues=validate(p);
  if(issues.length){
    notify(`Complete antes de salvar: ${issues.join(', ')}.`,'error');
    return;
  }

  const button=$<HTMLButtonElement>('save-day-close');
  if(button){button.disabled=true;button.textContent='Salvando…';}

  try{
    if(!userId){
      queueLocal(p);
      clearDraft();
      notify('Fechamento salvo neste dispositivo. Sincronização pendente até a conta/backend voltar.','ok');
      return;
    }

    const {error}=await supabase.from('daily_closings').upsert(
      {...p,owner_id:userId},
      {onConflict:'owner_id,operation_date'}
    );
    if(error)throw error;
    removeQueuedDate(p.operation_date);
    clearDraft();
    notify('Fechamento salvo e conciliado com sucesso.','ok');
  }catch(error:any){
    queueLocal(p,String(error?.message||'backend indisponível'));
    clearDraft();
    notify('Backend indisponível: fechamento salvo localmente sem perda de dados. Sincronização pendente.','ok');
  }finally{
    if(button){button.disabled=false;button.textContent='Salvar fechamento completo';}
    renderMode();
  }
});

syncButton?.addEventListener('click',()=>void syncQueue(true));

loginForm?.addEventListener('submit',async event=>{
  event.preventDefault();
  const email=String(new FormData(loginForm).get('email')||'');
  try{
    const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.href}});
    notify(error
      ? 'A autenticação está indisponível no momento. O fechamento continua funcionando em modo local.'
      : 'Link de acesso enviado para o seu e-mail.',
      error?'error':'ok'
    );
  }catch{
    notify('A autenticação está indisponível no momento. O fechamento continua funcionando em modo local.','error');
  }
});

window.addEventListener('online',()=>{if(userId)void syncQueue(false);});
supabase.auth.onAuthStateChange((_event,session)=>{
  userId=session?.user.id||'';
  renderMode();
  if(userId)void syncQueue(false);
});

void auth();
