import { regionScores, hourScores, weekdayScores } from '../data/predictive-engine-v3';
import { adjustedOperationalScore, currentHourBand, currentWeekday, type LiveTraffic } from '../data/live-adjustment';

type LiveContext={
  collectedAt?:string;
  status?:string;
  traffic?:LiveTraffic;
  weather?:{status?:string;temperatureC?:number|null;humidityPct?:number|null;precipitationMm?:number|null;raining?:boolean|null};
  airport?:{status?:string;operationalSignal?:string|null};
};

const endpoint='https://raw.githubusercontent.com/henrico-design-amaral/motoristaops/live-data/public/live-context.json';
const text=(id:string,value:string)=>{const node=document.getElementById(id);if(node)node.textContent=value;};
const fmtKm=(value:number|undefined|null)=>Number.isFinite(value)?`${Number(value).toFixed(0)} km`:'—';
const ageLabel=(iso?:string)=>{if(!iso)return 'sem timestamp';const age=Math.max(0,Date.now()-new Date(iso).getTime());const min=Math.round(age/60000);if(min<2)return 'agora';if(min<60)return `há ${min} min`;return `há ${Math.round(min/60)} h`;};

function buildAdaptive(data:LiveContext){
  const currentBand=currentHourBand();
  const currentDay=currentWeekday();
  const dayScore=weekdayScores.find(x=>x.label===currentDay)?.score??50;
  const hourScore=hourScores.find(x=>x.key===currentBand)?.score??50;
  const rows=regionScores.slice(0,10).map(region=>({...region,...adjustedOperationalScore({baseScore:region.score,region:region.key,traffic:data.traffic??{},weekdayScore:dayScore,hourScore})})).sort((a,b)=>b.adjusted-a.adjusted);
  return {rows,currentBand,currentDay,dayScore,hourScore};
}

function ensureLiveDecision(data:LiveContext){
  const host=document.querySelector('.live-section .live-grid');
  if(!host)return;
  let card=document.getElementById('live-adaptive-card');
  if(!card){card=document.createElement('article');card.id='live-adaptive-card';card.className='live-intel';host.appendChild(card);}
  const adaptive=buildAdaptive(data);
  const best=adaptive.rows[0];
  const rain=data.weather?.raining===true;
  const weather=data.weather?.status==='live'?`${data.weather.temperatureC?.toFixed?.(0)??'—'}°C${rain?' · chuva':''}`:'clima indisponível';
  card.innerHTML=`<span>Prioridade operacional agora</span><strong style="display:block;font-size:1.45rem;margin:8px 0">${best?.key??'amostra insuficiente'}</strong><small>${best?.macro??'sem macrozona CET'} · score ajustado ${best?.adjusted??'—'}/100</small><p style="color:#8f9398;line-height:1.55">Base histórica ${best?.score??'—'} · ajuste CET ${best?`${best.adjustment>=0?'+':''}${best.adjustment.toFixed(1)}`:'—'} · ${adaptive.currentDay} ${adaptive.currentBand} · ${weather}.</p><a href="./previsao" style="font-size:.72rem">abrir previsão completa →</a>`;
}

async function hydrate(){
  try{
    const response=await fetch(`${endpoint}?t=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data=await response.json() as LiveContext;
    const traffic=data.traffic;
    const zones=traffic?.zones??[];
    const worst=traffic?.derived?.worstZone;
    const worstZone=zones.find(z=>z.name===worst);
    text('live-total',fmtKm(traffic?.derived?.totalSlowKm));
    text('live-region',worst??'—');
    text('live-region-value',worstZone?fmtKm(worstZone.slowKm):'sem leitura regional');
    text('live-age',ageLabel(data.collectedAt));
    text('live-status',traffic?.status==='live'?'CET conectado':'último snapshot indisponível');
    const regionRoot=document.getElementById('live-regions');
    if(regionRoot && zones.length){regionRoot.innerHTML=zones.map(z=>`<div><span>${z.name}</span><strong>${fmtKm(z.slowKm)}</strong></div>`).join('');}
    ensureLiveDecision(data);
  }catch{
    text('live-status','contexto live temporariamente indisponível');
    text('live-age','último snapshot não carregou');
  }
}

hydrate();
setInterval(hydrate,60000);