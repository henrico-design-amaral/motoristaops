type LiveTrafficSnapshot = {
  collectedAt?: string;
  status?: string;
  totalKm?: number;
  regions?: Record<string, number>;
  corridors?: Array<{ name?: string; speedKmh?: number }>;
  error?: string;
};

const endpoint='https://raw.githubusercontent.com/henrico-design-amaral/motoristaops/main/public/live-traffic.json';
const text=(id:string,value:string)=>{const node=document.getElementById(id);if(node)node.textContent=value;};
const fmt=(value:number|undefined)=>Number.isFinite(value)?`${Number(value).toFixed(0)} km`:'—';
const strongest=(regions:Record<string,number>|undefined)=>{
  const rows=Object.entries(regions??{}).sort((a,b)=>b[1]-a[1]);
  return rows[0]??null;
};
const ageLabel=(iso?:string)=>{
  if(!iso)return 'sem timestamp';
  const age=Math.max(0,Date.now()-new Date(iso).getTime());
  const min=Math.round(age/60000);
  if(min<2)return 'agora';
  if(min<60)return `há ${min} min`;
  return `há ${Math.round(min/60)} h`;
};

async function hydrate(){
  try{
    const response=await fetch(`${endpoint}?t=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data=await response.json() as LiveTrafficSnapshot;
    const pressure=strongest(data.regions);
    text('live-total',fmt(data.totalKm));
    text('live-region',pressure?pressure[0]:'—');
    text('live-region-value',pressure?fmt(pressure[1]):'sem leitura regional');
    text('live-age',ageLabel(data.collectedAt));
    text('live-status',data.status==='ok'?'CET conectado':data.error?'último snapshot preservado':'snapshot disponível');
    const regionRoot=document.getElementById('live-regions');
    if(regionRoot && data.regions){
      regionRoot.innerHTML=Object.entries(data.regions).map(([name,value])=>`<div><span>${name}</span><strong>${Number(value).toFixed(0)} km</strong></div>`).join('');
    }
  }catch(error){
    text('live-status','trânsito temporariamente indisponível');
    text('live-age','último snapshot não carregou');
  }
}

hydrate();
setInterval(hydrate,60000);
