const workspace=document.getElementById('import-workspace');
const authWarning=document.getElementById('import-auth-warning');
const log=document.getElementById('import-log');
const base=import.meta.env.BASE_URL||'/';
const keepWorkspaceOpen=()=>{if(workspace)workspace.hidden=false;if(authWarning)authWarning.hidden=true;};
keepWorkspaceOpen();
if(workspace)new MutationObserver(keepWorkspaceOpen).observe(workspace,{attributes:true,attributeFilter:['hidden']});

function show(message:string,kind:'ok'|'error'='ok'){if(!log)return;log.hidden=false;log.dataset.kind=kind;log.textContent=message;}

document.getElementById('prepare-closing-draft')?.addEventListener('click',()=>{
  const rows=[...document.querySelectorAll<HTMLTableRowElement>('#uber-review-rows tr[data-index]')];
  const selected=rows.filter(row=>(row.querySelector<HTMLInputElement>('input[data-field="selected"]')?.checked??false));
  if(!selected.length){show('Selecione pelo menos uma linha para levar ao fechamento.','error');return;}
  if(selected.length>1)show('Mais de uma linha selecionada: o fechamento abrirá a primeira. As demais permanecem apenas na revisão desta tela.','ok');
  const row=selected[0];
  const date=row.querySelector<HTMLInputElement>('input[data-field="operation_date"]')?.value||'';
  const revenue=row.querySelector<HTMLInputElement>('input[data-field="revenue_uber"]')?.value||'';
  const trips=row.querySelector<HTMLInputElement>('input[data-field="trips_uber"]')?.value||'';
  if(!date||!revenue){show('Informe pelo menos data e receita antes de continuar.','error');return;}
  sessionStorage.setItem('motoristaops:closing-draft',JSON.stringify({operation_date:date,primary_platform:'Uber',revenue_uber:revenue,trips_uber:trips||0,notes:'Rascunho criado a partir de gravação Uber/OCR. Confirmar horas, km e custos antes do fechamento.'}));
  window.location.href=`${base}${base.endsWith('/')?'':'/'}fechamento/`.replace(/\/+/g,'/');
});