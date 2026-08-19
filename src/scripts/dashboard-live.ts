import { regionScores, hourScores, weekdayScores } from '../data/predictive-engine-v3';

type Zone={name:string;slowKm:number|null;sharePct:number|null};
type LiveContext={
  collectedAt?:string;
  status?:string;
  traffic?:{status?:string;zones?:Zone[];derived?:{totalSlowKm?:number|null;worstZone?:string|null;pressure?:string}};
  weather?:{status?:string;temperatureC?:number|null;humidityPct?:number|null;precipitationMm?:number|null;raining?:boolean|null};
  airport?:{status?:string;operationalSignal?:string|null};
};

const endpoint='https://raw.githubusercontent.com/henrico-design-amaral/motoristaops/live-data/public/live-context.json';
const text=(id:string,value:string)=>{const node=document.getElementById(id);if(node)node.textContent=value;};
const fmtKm=(value:number|undefined|null)=>Number.isFinite(value)?`${Number(value).toFixed(0)} km`:'—';
const ageLabel=(iso?:string)=>{if(!iso)return 'sem timestamp';const age=Math.max(0,Date.now()-new Date(iso).getTime());const min=Math.round(age/60000);if(min<2)return 'agora';if(min<60)return `há ${min} min`;return `há ${Math.round(min/60)} h`;};
const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));

const macroFor=(region:string)=>{
  const r=region.toLocaleLowerCase('pt-BR');
  const rules:[string,string[]][]=[
    ['Oeste',['butant','pinheiros','perdizes','lapa','leopoldina','sônia','raposo','rio pequeno','jaguar','pacaembu','consola','jardins','jardim paulista']],
    ['Sul',['santo amaro','campo belo','congonhas','jabaquara','saúde','moema','vila mariana','ibirapuera','vila andrade','campo limpo','morumbi','chácara santo antônio']],
    ['Centro',['centro','sé','república','santa efigênia','pari','bela vista','higienópolis']],
    ['Norte',['santana','tucuruvi','casa verde','freguesia','jaçanã','vila maria']],
    ['Leste',['tatuapé','mooca','itaquera','penha','aricanduva','são mateus','guaianases','vila prudente']]
  ];
  return rules.find(([,tokens])=>tokens.some(token=>r.includes(token)))?.[0]??null;
};

const hourBandNow=()=>{const h=new Date().getHours();if(h<6)return '04–06';if(h<9)return '06–09';if(h<12)return '09–12';if(h<15)return '12–15';if(h<18)return '15–18';if(h<21)return '18–21';return '21–00';};
const weekdayNow=()=>['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'][new Date().getDay()];

function buildAdaptive(data:LiveContext){
  const zones=data.traffic?.zones??[];
  const zoneMap=new Map(zones.map(z=>[z.name,z]));
  const currentBand=hourBandNow();
  const currentDay=weekdayNow();
  const dayScore=weekdayScores.find(x=>x.label===currentDay)?.score??50;
  const hourScore=hourScores.find(x=>x.key===currentBand)?.score??50;
  const rows=regionScores.slice(0,10).map(region=>{
    const macro=macroFor(region.key);
    const share=macro?zoneMap.get(macro)?.sharePct:null;
    const trafficAdjustment=Number.isFinite(share)?clamp((20-Number(share))*0.35,-10,5):0;
    const temporalAdjustment=((dayScore-50)*0.08)+((hourScore-50)*0.12);
    const adjusted=Math.round(clamp(region.score+trafficAdjustment+temporalAdjustment,0,100));
    return {...region,macro,share,trafficAdjustment,adjusted};
  }).sort((a,b)=>b.adjusted-a.adjusted);
  return {rows,currentBand,currentDay,dayScore,hourScore};
}

function ensureLiveDecision(data:LiveContext){
  const host=document.querySelector('.live-section .live-grid');
  if(!host)return;
  let card=document.getElementById('live-adaptive-card');
  if(!card){
    card=document.createElement('article');
    card.id='live-adaptive-card';
    card.className='live-intel';
    host.appendChild(card);
  }
  const adaptive=buildAdaptive(data);
  const best=adaptive.rows[0];
  const rain=data.weather?.raining===true;
  const weather=data.weather?.status==='live'?`${data.weather.temperatureC?.toFixed?.(0)??'—'}°C${rain?' · chuva':''}`:'clima indisponível';
  card.innerHTML=`<span>Prioridade operacional agora</span><strong style="display:block;font-size:1.45rem;margin:8px 0">${best?.key??'amostra insuficiente'}</strong><small>${best?.macro??'sem macrozona CET'} · score ajustado ${best?.adjusted??'—'}/100</small><p style="color:#8f9398;line-height:1.55">Base histórica ${best?.score??'—'} · ajuste CET ${best?`${best.trafficAdjustment>=0?'+':''}${best.trafficAdjustment.toFixed(1)}`:'—'} · ${adaptive.currentDay} ${adaptive.currentBand} · ${weather}.</p><a href="./previsao" style="font-size:.72rem">abrir previsão completa →</a>`;
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