import { rideSequence } from './ride-matrix-august';
import { confirmedContextAugust, externalContextAugust, type ExternalContextEvidence, type ExternalSignalKind } from './external-context-august';

const minuteOfDay=(time:string)=>{const [h,m]=time.split(':').map(Number);return h*60+m;};
const regionMatches=(region:string,targets:string[])=>targets.some(target=>region.toLocaleLowerCase('pt-BR').includes(target.toLocaleLowerCase('pt-BR')) || target.toLocaleLowerCase('pt-BR').includes(region.toLocaleLowerCase('pt-BR')));
const signalApplies=(ride:typeof rideSequence[number],signal:ExternalContextEvidence)=>{
  if(ride.date!==signal.date || signal.status!=='confirmed') return false;
  const minute=minuteOfDay(ride.listedTime);
  if(signal.startMinute!==undefined && minute<signal.startMinute) return false;
  if(signal.endMinute!==undefined && minute>=signal.endMinute) return false;
  if(signal.regions.length===1 && signal.regions[0]==='São Paulo') return true;
  return regionMatches(ride.originRegion,signal.regions) || regionMatches(ride.destinationRegion,signal.regions);
};

export type ContextualWindow = {
  key:string;
  date:string;
  hourBand:string;
  originRegion:string;
  destinationRegion:string;
  rides:number;
  revenue:number;
  rideMin:number;
  km:number;
  estimatedGapMin:number;
  surgeRides:number;
  surgeValue:number;
  revenuePerRideHour:number;
  revenuePerKm:number;
  speedKmh:number;
  occupancyProxy:number;
  activeSignals:ExternalSignalKind[];
  activeSignalIds:string[];
  goodWindowProbabilityProxy:number;
};

const completed=rideSequence.filter(r=>r.status==='completed' && r.durationSec && r.distanceKm);

const rawWindows=Object.values(completed.reduce<Record<string,Omit<ContextualWindow,'revenuePerRideHour'|'revenuePerKm'|'speedKmh'|'occupancyProxy'|'activeSignals'|'activeSignalIds'|'goodWindowProbabilityProxy'>>>((acc,ride)=>{
  const key=`${ride.date}|${ride.hourBand}|${ride.originRegion}|${ride.destinationRegion}`;
  const x=acc[key]??{key,date:ride.date,hourBand:ride.hourBand,originRegion:ride.originRegion,destinationRegion:ride.destinationRegion,rides:0,revenue:0,rideMin:0,km:0,estimatedGapMin:0,surgeRides:0,surgeValue:0};
  x.rides+=1;x.revenue+=ride.value;x.rideMin+=(ride.durationSec??0)/60;x.km+=ride.distanceKm??0;x.estimatedGapMin+=ride.estimatedGapMin??0;
  if((ride.surge??0)>0){x.surgeRides+=1;x.surgeValue+=ride.surge??0;}
  acc[key]=x;return acc;
},{}));

const metricRows=rawWindows.map(row=>{
  const matchingSignals=confirmedContextAugust.filter(signal=>completed.some(ride=>ride.date===row.date && ride.hourBand===row.hourBand && ride.originRegion===row.originRegion && ride.destinationRegion===row.destinationRegion && signalApplies(ride,signal)));
  const rideHours=row.rideMin/60;
  const observedMin=row.rideMin+row.estimatedGapMin;
  return {...row,
    revenuePerRideHour:rideHours?row.revenue/rideHours:0,
    revenuePerKm:row.km?row.revenue/row.km:0,
    speedKmh:rideHours?row.km/rideHours:0,
    occupancyProxy:observedMin?row.rideMin/observedMin:0,
    activeSignals:[...new Set(matchingSignals.map(x=>x.signalKind))],
    activeSignalIds:matchingSignals.map(x=>x.id),
  };
});

const minMax=(values:number[])=>({min:Math.min(...values),max:Math.max(...values)});
const normalize=(value:number,range:{min:number;max:number})=>range.max===range.min?0.5:(value-range.min)/(range.max-range.min);
const rhRange=minMax(metricRows.map(x=>x.revenuePerRideHour));
const kmRange=minMax(metricRows.map(x=>x.revenuePerKm));
const occRange=minMax(metricRows.map(x=>x.occupancyProxy));

export const contextualWindows: ContextualWindow[]=metricRows.map(row=>{
  const surgeRate=row.rides?row.surgeRides/row.rides:0;
  const score=.45*normalize(row.revenuePerRideHour,rhRange)+.25*normalize(row.occupancyProxy,occRange)+.2*normalize(row.revenuePerKm,kmRange)+.1*surgeRate;
  return {...row,goodWindowProbabilityProxy:Math.max(0.05,Math.min(0.95,.15+.7*score))};
}).sort((a,b)=>b.goodWindowProbabilityProxy-a.goodWindowProbabilityProxy);

const baselineFor=(signal:ExternalContextEvidence,affected:ContextualWindow[])=>{
  const bands=[...new Set(affected.map(x=>x.hourBand))];
  return contextualWindows.filter(row=>row.date!==signal.date && bands.includes(row.hourBand) && row.activeSignalIds.length===0);
};
const avg=(rows:ContextualWindow[],pick:(row:ContextualWindow)=>number)=>rows.length?rows.reduce((s,row)=>s+pick(row),0)/rows.length:0;
const deltaPct=(a:number,b:number)=>b?((a-b)/b):null;

export const contextSignalImpact=confirmedContextAugust.map(signal=>{
  const affected=contextualWindows.filter(row=>row.activeSignalIds.includes(signal.id));
  const baseline=baselineFor(signal,affected);
  const affectedRph=avg(affected,x=>x.revenuePerRideHour), baselineRph=avg(baseline,x=>x.revenuePerRideHour);
  const affectedSpeed=avg(affected,x=>x.speedKmh), baselineSpeed=avg(baseline,x=>x.speedKmh);
  const affectedOccupancy=avg(affected,x=>x.occupancyProxy), baselineOccupancy=avg(baseline,x=>x.occupancyProxy);
  return {
    signalId:signal.id,date:signal.date,kind:signal.signalKind,label:signal.label,region:signal.region,timeWindow:signal.timeWindow,
    affectedWindows:affected.length,baselineWindows:baseline.length,
    revenuePerRideHour:affectedRph,speedKmh:affectedSpeed,occupancyProxy:affectedOccupancy,
    deltaRevenuePerRideHour:baseline.length?deltaPct(affectedRph,baselineRph):null,
    deltaSpeed:baseline.length?deltaPct(affectedSpeed,baselineSpeed):null,
    deltaOccupancy:baseline.length?deltaPct(affectedOccupancy,baselineOccupancy):null,
    evidenceConfidence:signal.confidence,
    interpretation:affected.length===0?'Sem janela operacional casada com o sinal.':baseline.length<2?'Há associação temporal/regional, mas baseline comparável ainda é insuficiente.':'Delta exploratório contra janelas da mesma faixa horária em outros dias sem sinal confirmado; não representa causalidade.'
  };
});

export const dynamicPricingImpact=(()=>{
  const surge=contextualWindows.filter(x=>x.surgeRides>0);
  const plain=contextualWindows.filter(x=>x.surgeRides===0);
  return {
    signalKind:'dynamic' as const,
    surgeWindows:surge.length,plainWindows:plain.length,
    surgeRevenuePerRideHour:avg(surge,x=>x.revenuePerRideHour),plainRevenuePerRideHour:avg(plain,x=>x.revenuePerRideHour),
    surgeRevenuePerKm:avg(surge,x=>x.revenuePerKm),plainRevenuePerKm:avg(plain,x=>x.revenuePerKm),
    surgeSpeedKmh:avg(surge,x=>x.speedKmh),plainSpeedKmh:avg(plain,x=>x.speedKmh),
    deltaRevenuePerRideHour:plain.length?deltaPct(avg(surge,x=>x.revenuePerRideHour),avg(plain,x=>x.revenuePerRideHour)):null,
    deltaRevenuePerKm:plain.length?deltaPct(avg(surge,x=>x.revenuePerKm),avg(plain,x=>x.revenuePerKm)):null,
    note:'Dinâmica é sinal observado no próprio histórico da Uber. O delta compara células com e sem preço dinâmico e continua sujeito a seleção de rota, horário e região.'
  };
})();

export const contextCoverage={
  totalSignals:externalContextAugust.length,
  confirmed:externalContextAugust.filter(x=>x.status==='confirmed').length,
  pending:externalContextAugust.filter(x=>x.status==='pending').length,
  notLocated:externalContextAugust.filter(x=>x.status==='not-located').length,
  kinds:['cet','accident','work','event','weather','airport','news'] as ExternalSignalKind[],
  populatedKinds:[...new Set(externalContextAugust.filter(x=>x.status==='confirmed').map(x=>x.signalKind))],
  note:'CET/acidente/obra/chuva/aeroporto ficam explicitamente pending ou not-located quando não há evidência histórica confiável; ausência de dado não é convertida em zero.'
} as const;

export const contextualModelMeta={
  version:'context-v1',
  probability:'goodWindowProbabilityProxy é um score heurístico normalizado (R$/h em corrida, ocupação proxy, R$/km e incidência de dinâmica). Não é probabilidade calibrada.',
  impact:'contextSignalImpact compara janelas afetadas com janelas da mesma faixa em outros dias sem sinal confirmado. Amostra pequena = interpretação exploratória.',
  occupancy:'occupancyProxy usa tempo em corrida / (tempo em corrida + intervalo estimado associado às corridas da célula). Não é ocupação GPS.'
} as const;
