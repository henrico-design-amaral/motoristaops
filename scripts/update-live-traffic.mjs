import fs from 'node:fs/promises';

const OUT='public/live-traffic.json';
const CET_URL='https://www.cetsp.com.br/';

const clean=(s='')=>s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const num=(v)=>v===undefined||v===null?null:Number(String(v).replace(',','.'));

async function previous(){try{return JSON.parse(await fs.readFile(OUT,'utf8'));}catch{return null;}}

function parseZone(text,name){
  const re=new RegExp(`${name}[\\s\\S]{0,220}?(\\d+(?:[.,]\\d+)?)\\s*km[\\s\\S]{0,120}?(\\d+(?:[.,]\\d+)?)\\s*%`,'i');
  const m=text.match(re);
  return {name,slowKm:m?num(m[1]):null,sharePct:m?num(m[2]):null};
}

function parseBusSpeeds(text){
  const block=(text.match(/Olho Vivo[\s\S]{0,500}/i)||[''])[0];
  const values=[...block.matchAll(/(\d+(?:[.,]\d+)?)\s*km\/h/gi)].map(m=>num(m[1])).filter(v=>Number.isFinite(v));
  return {bairroCentroKmh:values[1]??values[0]??null,centroBairroKmh:values[0]??null};
}

function derive(zones){
  const valid=zones.filter(z=>Number.isFinite(z.slowKm));
  const totalSlowKm=valid.reduce((s,z)=>s+z.slowKm,0);
  const worst=[...valid].sort((a,b)=>(b.slowKm??0)-(a.slowKm??0))[0]??null;
  const pressure=totalSlowKm>=350?'muito alto':totalSlowKm>=220?'alto':totalSlowKm>=120?'moderado':totalSlowKm>0?'baixo':'indisponível';
  return {totalSlowKm:Number(totalSlowKm.toFixed(1)),worstZone:worst?.name??null,pressure};
}

const now=new Date();
const prior=await previous();
try{
  const res=await fetch(CET_URL,{headers:{'user-agent':'MotoristaOPS/1.0 (+https://github.com/henrico-design-amaral/motoristaops)'},redirect:'follow'});
  if(!res.ok) throw new Error(`CET HTTP ${res.status}`);
  const html=await res.text();
  const text=clean(html);
  const zones=['Norte','Oeste','Centro','Leste','Sul'].map(name=>parseZone(text,name));
  if(zones.every(z=>z.slowKm===null)) throw new Error('CET regional congestion values not parsed');
  const bus=parseBusSpeeds(text);
  const data={
    schemaVersion:1,
    source:{id:'cet-home',label:'CET-SP · Trânsito Agora',url:CET_URL,kind:'official'},
    fetchedAt:now.toISOString(),
    sourceObservedAt:(text.match(/São Paulo,\s*([^|]{6,40}?)(?=Rodízio|Norte)/i)||[])[1]?.trim()??null,
    status:'live',
    expectedRefreshMinutes:5,
    zones,
    busCorridorSpeed:bus,
    derived:derive(zones),
    notes:['Leitura automatizada da página pública Trânsito Agora da CET-SP.','Os valores regionais representam quilômetros de lentidão publicados pela CET no momento da coleta.','A coleta pode atrasar se o agendamento do GitHub Actions sofrer fila.'],
    error:null
  };
  await fs.mkdir('public',{recursive:true});
  await fs.writeFile(OUT,JSON.stringify(data,null,2)+'\n');
  console.log(JSON.stringify(data));
}catch(error){
  const data={...(prior??{schemaVersion:1,zones:[],busCorridorSpeed:{bairroCentroKmh:null,centroBairroKmh:null},derived:{totalSlowKm:0,worstZone:null,pressure:'indisponível'}}),fetchedAt:now.toISOString(),status:'stale',error:String(error?.message??error)};
  await fs.mkdir('public',{recursive:true});
  await fs.writeFile(OUT,JSON.stringify(data,null,2)+'\n');
  console.error(data.error);
  process.exitCode=0;
}
