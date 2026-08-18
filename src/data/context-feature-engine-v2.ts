import { contextualWindows } from './context-signal-matrix';
import { externalContextAugust, type ExternalSignalKind } from './external-context-august';

export type ContextFeatureKind = ExternalSignalKind | 'dynamic' | 'airport-route';
export type FeatureState = 'observed' | 'confirmed' | 'pending' | 'not-located' | 'unknown';

export type ContextFeatureVector = {
  key: string;
  date: string;
  hourBand: string;
  originRegion: string;
  destinationRegion: string;
  revenuePerRideHour: number;
  revenuePerKm: number;
  speedKmh: number;
  occupancyProxy: number;
  rides: number;
  features: Record<ContextFeatureKind, FeatureState>;
  activeFeatures: ContextFeatureKind[];
  contextCompleteness: number;
  recommendationScore: number;
};

const featureKinds: ContextFeatureKind[] = ['cet','accident','work','event','weather','airport','news','dynamic','airport-route'];
const externalKinds: ExternalSignalKind[] = ['cet','accident','work','event','weather','airport','news'];
const airportTokens = ['congonhas','campo belo','jardim aeroporto','aeroporto'];

const regionMatches = (value:string,target:string) => {
  const a=value.toLocaleLowerCase('pt-BR');
  const b=target.toLocaleLowerCase('pt-BR');
  return a.includes(b) || b.includes(a);
};

const minuteRangeForBand=(band:string)=>{
  const [start,end]=band.split('–').map(Number);
  return {start:start*60,end:(end===0?24:end)*60};
};

const signalOverlapsWindow=(signal:typeof externalContextAugust[number],row:typeof contextualWindows[number])=>{
  if(signal.date!==row.date) return false;
  const band=minuteRangeForBand(row.hourBand);
  if(signal.startMinute!==undefined && signal.startMinute>=band.end) return false;
  if(signal.endMinute!==undefined && signal.endMinute<=band.start) return false;
  if(signal.regions.length===1 && signal.regions[0]==='São Paulo') return true;
  return signal.regions.some(region=>regionMatches(row.originRegion,region)||regionMatches(row.destinationRegion,region));
};

const stateForExternal=(kind:ExternalSignalKind,row:typeof contextualWindows[number]):FeatureState=>{
  const candidates=externalContextAugust.filter(signal=>signal.signalKind===kind && signalOverlapsWindow(signal,row));
  if(candidates.some(x=>x.status==='confirmed')) return 'confirmed';
  if(candidates.some(x=>x.status==='pending')) return 'pending';
  if(candidates.some(x=>x.status==='not-located')) return 'not-located';
  return 'unknown';
};

const minMax=(values:number[])=>({min:Math.min(...values),max:Math.max(...values)});
const normalize=(value:number,range:{min:number;max:number})=>range.max===range.min?0.5:(value-range.min)/(range.max-range.min);
const rphRange=minMax(contextualWindows.map(x=>x.revenuePerRideHour));
const rpkRange=minMax(contextualWindows.map(x=>x.revenuePerKm));
const speedRange=minMax(contextualWindows.map(x=>x.speedKmh));
const occRange=minMax(contextualWindows.map(x=>x.occupancyProxy));

export const contextFeatureVectors: ContextFeatureVector[] = contextualWindows.map(row=>{
  const features={} as Record<ContextFeatureKind,FeatureState>;
  externalKinds.forEach(kind=>{features[kind]=stateForExternal(kind,row);});
  features.dynamic=row.surgeRides>0?'observed':'unknown';
  features['airport-route']=airportTokens.some(token=>regionMatches(row.originRegion,token)||regionMatches(row.destinationRegion,token))?'observed':'unknown';
  const activeFeatures=featureKinds.filter(kind=>features[kind]==='confirmed'||features[kind]==='observed');
  const knownExternal=externalKinds.filter(kind=>features[kind]!=='unknown').length;
  const contextCompleteness=knownExternal/externalKinds.length;
  const score=.4*normalize(row.revenuePerRideHour,rphRange)+.25*normalize(row.occupancyProxy,occRange)+.2*normalize(row.revenuePerKm,rpkRange)+.15*normalize(row.speedKmh,speedRange);
  return {...row,features,activeFeatures,contextCompleteness,recommendationScore:Math.max(0,Math.min(1,score))};
}).sort((a,b)=>b.recommendationScore-a.recommendationScore);

const avg=(rows:ContextFeatureVector[],pick:(row:ContextFeatureVector)=>number)=>rows.length?rows.reduce((sum,row)=>sum+pick(row),0)/rows.length:0;
const deltaPct=(a:number,b:number)=>b?((a-b)/b):null;

const comparableBaseline=(feature:ContextFeatureKind,affected:ContextFeatureVector[])=>{
  const bands=[...new Set(affected.map(x=>x.hourBand))];
  return contextFeatureVectors.filter(row=>bands.includes(row.hourBand) && !row.activeFeatures.includes(feature));
};

export const signalImpactMatrix = featureKinds.map(feature=>{
  const affected=contextFeatureVectors.filter(row=>row.activeFeatures.includes(feature));
  const baseline=comparableBaseline(feature,affected);
  const affectedRph=avg(affected,x=>x.revenuePerRideHour);
  const baselineRph=avg(baseline,x=>x.revenuePerRideHour);
  const affectedSpeed=avg(affected,x=>x.speedKmh);
  const baselineSpeed=avg(baseline,x=>x.speedKmh);
  const affectedOcc=avg(affected,x=>x.occupancyProxy);
  const baselineOcc=avg(baseline,x=>x.occupancyProxy);
  const affectedRpk=avg(affected,x=>x.revenuePerKm);
  const baselineRpk=avg(baseline,x=>x.revenuePerKm);
  const sampleOk=affected.length>=3 && baseline.length>=3;
  return {
    feature,
    affectedWindows:affected.length,
    baselineWindows:baseline.length,
    affectedRevenuePerRideHour:affectedRph,
    affectedSpeedKmh:affectedSpeed,
    affectedOccupancyProxy:affectedOcc,
    affectedRevenuePerKm:affectedRpk,
    deltaRevenuePerRideHour:baseline.length?deltaPct(affectedRph,baselineRph):null,
    deltaSpeed:baseline.length?deltaPct(affectedSpeed,baselineSpeed):null,
    deltaOccupancy:baseline.length?deltaPct(affectedOcc,baselineOcc):null,
    deltaRevenuePerKm:baseline.length?deltaPct(affectedRpk,baselineRpk):null,
    evidenceGrade:sampleOk?'directional':affected.length?'weak':'none',
    usableForRecommendation:sampleOk,
    note:sampleOk?'Sinal com amostra mínima para leitura direcional. Ainda não representa causalidade.':affected.length?'Sinal observado, mas amostra insuficiente para alterar recomendação.':'Sem janela casada com o sinal.'
  };
});

export const contextReadiness = featureKinds.map(feature=>{
  const states=contextFeatureVectors.map(row=>row.features[feature]);
  return {
    feature,
    observed:states.filter(x=>x==='observed'||x==='confirmed').length,
    pending:states.filter(x=>x==='pending').length,
    notLocated:states.filter(x=>x==='not-located').length,
    unknown:states.filter(x=>x==='unknown').length,
    coverage:states.length?states.filter(x=>x!=='unknown').length/states.length:0
  };
}).sort((a,b)=>b.coverage-a.coverage);

export const contextFeatureModelMeta = {
  version:'context-feature-v2',
  unit:'janela operacional = data × faixa horária × origem × destino',
  recommendation:'recommendationScore usa apenas desempenho observado (R$/h em corrida, ocupação proxy, R$/km e velocidade). Sinais externos não alteram o score enquanto não houver amostra mínima comparável.',
  impact:'signalImpactMatrix compara janelas com sinal contra janelas da mesma faixa horária sem o sinal. Só marca usableForRecommendation com pelo menos 3 janelas afetadas e 3 de baseline.',
  completeness:'contextCompleteness mede quantos tipos externos têm estado conhecido na janela; pending e not-located contam como estado conhecido, mas não como ocorrência.'
} as const;
