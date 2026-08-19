import fs from 'node:fs/promises';

const OUT=process.argv[2]??'public/live-context.json';
const HISTORY=process.argv[3]??'public/live-context-history.jsonl';
const CET_URL='https://www.cetsp.com.br/';
const WEATHER_URL='https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&timezone=America%2FSao_Paulo';
const AENA_URL='https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html';

const clean=(s='')=>s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const num=(v)=>v===undefined||v===null?null:Number(String(v).replace(',','.'));
const now=new Date();

function parseZone(text,name){
  const re=new RegExp(`${name}[\\s\\S]{0,220}?(\\d+(?:[.,]\\d+)?)\\s*km[\\s\\S]{0,120}?(\\d+(?:[.,]\\d+)?)\\s*%`,'i');
  const m=text.match(re);
  return {name,slowKm:m?num(m[1]):null,sharePct:m?num(m[2]):null};
}

function parseBusSpeeds(text){
  const block=(text.match(/Olho Vivo[\s\S]{0,500}/i)||[''])[0];
  const values=[...block.matchAll(/(\d+(?:[.,]\d+)?)\s*km\/h/gi)].map(m=>num(m[1])).filter(v=>Number.isFinite(v));
  return {centroBairroKmh:values[0]??null,bairroCentroKmh:values[1]??values[0]??null};
}

function deriveTraffic(zones){
  const valid=zones.filter(z=>Number.isFinite(z.slowKm));
  const totalSlowKm=valid.reduce((s,z)=>s+z.slowKm,0);
  const worst=[...valid].sort((a,b)=>(b.slowKm??0)-(a.slowKm??0))[0]??null;
  const pressure=totalSlowKm>=350?'muito alto':totalSlowKm>=220?'alto':totalSlowKm>=120?'moderado':totalSlowKm>0?'baixo':'indisponível';
  return {totalSlowKm:Number(totalSlowKm.toFixed(1)),worstZone:worst?.name??null,pressure};
}

async function collectTraffic(){
  try{
    const response=await fetch(CET_URL,{headers:{'user-agent':'MotoristaOPS/2.0 (+https://github.com/henrico-design-amaral/motoristaops)'},redirect:'follow'});
    if(!response.ok) throw new Error(`CET HTTP ${response.status}`);
    const text=clean(await response.text());
    const zones=['Norte','Oeste','Centro','Leste','Sul'].map(name=>parseZone(text,name));
    if(zones.every(z=>z.slowKm===null)) throw new Error('CET regional congestion values not parsed');
    return {status:'live',source:{id:'cet-home',label:'CET-SP · Trânsito Agora',url:CET_URL,kind:'official'},zones,busCorridorSpeed:parseBusSpeeds(text),derived:deriveTraffic(zones),error:null};
  }catch(error){
    return {status:'unavailable',source:{id:'cet-home',label:'CET-SP · Trânsito Agora',url:CET_URL,kind:'official'},zones:[],busCorridorSpeed:{centroBairroKmh:null,bairroCentroKmh:null},derived:{totalSlowKm:null,worstZone:null,pressure:'indisponível'},error:String(error?.message??error)};
  }
}

async function collectWeather(){
  try{
    const response=await fetch(WEATHER_URL,{headers:{'user-agent':'MotoristaOPS/2.0'},redirect:'follow'});
    if(!response.ok) throw new Error(`Weather HTTP ${response.status}`);
    const json=await response.json();
    const c=json.current??{};
    return {status:'live',source:{id:'open-meteo',label:'Open-Meteo · São Paulo',url:'https://open-meteo.com/',kind:'weather-api'},observedAt:c.time??null,temperatureC:num(c.temperature_2m),humidityPct:num(c.relative_humidity_2m),precipitationMm:num(c.precipitation),rainMm:num(c.rain),weatherCode:num(c.weather_code),windKmh:num(c.wind_speed_10m),raining:(num(c.rain)??0)>0||(num(c.precipitation)??0)>0,error:null};
  }catch(error){
    return {status:'unavailable',source:{id:'open-meteo',label:'Open-Meteo · São Paulo',url:'https://open-meteo.com/',kind:'weather-api'},observedAt:null,temperatureC:null,humidityPct:null,precipitationMm:null,rainMm:null,weatherCode:null,windKmh:null,raining:null,error:String(error?.message??error)};
  }
}

async function collectAirport(){
  try{
    const response=await fetch(AENA_URL,{headers:{'user-agent':'MotoristaOPS/2.0'},redirect:'follow'});
    return {status:response.ok?'source-live':'source-unavailable',source:{id:'aena-cgh',label:'Aena Brasil · Congonhas',url:AENA_URL,kind:'official'},operationalSignal:null,note:'A fonte pública está monitorada, mas chegadas/partidas ainda não são convertidas em sinal quantitativo sem parser reproduzível.',httpStatus:response.status,error:response.ok?null:`Aena HTTP ${response.status}`};
  }catch(error){
    return {status:'source-unavailable',source:{id:'aena-cgh',label:'Aena Brasil · Congonhas',url:AENA_URL,kind:'official'},operationalSignal:null,note:'Fonte cadastrada; leitura quantitativa ainda indisponível.',httpStatus:null,error:String(error?.message??error)};
  }
}

const [traffic,weather,airport]=await Promise.all([collectTraffic(),collectWeather(),collectAirport()]);
const snapshot={schemaVersion:2,collectedAt:now.toISOString(),expectedRefreshMinutes:5,status:traffic.status==='live'||weather.status==='live'?'live':'degraded',traffic,weather,airport,governance:{trafficCanAdjustLivePriority:true,weatherCanAdjustLivePriority:false,airportCanAdjustLivePriority:false,note:'Somente trânsito regional CET pode ajustar prioridade operacional nesta versão, com impacto limitado. Clima e aeroporto ficam visíveis até existir calibração histórica.'}};
await fs.mkdir(new URL('.',`file://${OUT.startsWith('/')?OUT:`${process.cwd()}/${OUT}`}`).pathname,{recursive:true}).catch(()=>{});
await fs.writeFile(OUT,JSON.stringify(snapshot,null,2)+'\n');

let lines=[];
try{lines=(await fs.readFile(HISTORY,'utf8')).trim().split('\n').filter(Boolean);}catch{}
const compact={collectedAt:snapshot.collectedAt,traffic:{status:traffic.status,totalSlowKm:traffic.derived.totalSlowKm,worstZone:traffic.derived.worstZone,pressure:traffic.derived.pressure,zones:traffic.zones},weather:{status:weather.status,temperatureC:weather.temperatureC,precipitationMm:weather.precipitationMm,raining:weather.raining,humidityPct:weather.humidityPct},airport:{status:airport.status}};
lines.push(JSON.stringify(compact));
lines=lines.slice(-2016);
await fs.writeFile(HISTORY,lines.join('\n')+'\n');
console.log(JSON.stringify(snapshot));