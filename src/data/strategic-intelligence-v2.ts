import { currentClosings } from './current-ops';
import { days as legacyDays } from './motoristaops';
import { rides } from './ride-intelligence';
import { evidenceDays } from './dashboard-refresh';
import { completedAugustMatrixRides, daySequenceSummary, rideMatrix, rideMatrixMeta } from './ride-matrix-august';
import { contextByDate } from './external-context-august';

const weekdayNames: Record<string,string> = {Dom:'Domingo',Seg:'Segunda',Ter:'Terça',Qua:'Quarta',Qui:'Quinta',Sex:'Sexta',Sáb:'Sábado'};
const bandFor = (time:string) => { const h=Number(time.slice(0,2)); if(h<6)return '04–06'; if(h<9)return '06–09'; if(h<12)return '09–12'; if(h<15)return '12–15'; if(h<18)return '15–18'; if(h<21)return '18–21'; return '21–00'; };
const dayCode = (date:string) => ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][new Date(`${date}T12:00:00-03:00`).getDay()];

const normalizedLegacy = legacyDays.map(d=>({date:d.date,day:d.weekday,grossRevenue:d.gross,operationalProfit:d.profit,hoursOnline:d.hours,kmTotal:d.km,tripsTotal:d.trips}));
const normalizedCurrent = currentClosings.map(d=>({date:d.date,day:d.day,grossRevenue:d.grossRevenue,operationalProfit:d.operationalProfit,hoursOnline:d.hoursOnline,kmTotal:d.kmTotal,tripsTotal:d.tripsTotal}));
const dayMap = new Map(normalizedLegacy.map(d=>[d.date,d]));
normalizedCurrent.forEach(d=>dayMap.set(d.date,d));
const historicalDays = [...dayMap.values()].filter(d=>d.grossRevenue>0 && d.hoursOnline>0 && d.kmTotal>0);

const weekdayRanking = Object.values(historicalDays.reduce<Record<string,{key:string;days:number;revenue:number;profit:number;hours:number;km:number;trips:number}>>((acc,d)=>{const k=d.day; const x=acc[k]??{key:k,days:0,revenue:0,profit:0,hours:0,km:0,trips:0}; x.days++;x.revenue+=d.grossRevenue;x.profit+=d.operationalProfit;x.hours+=d.hoursOnline;x.km+=d.kmTotal;x.trips+=d.tripsTotal;acc[k]=x;return acc;},{})).map(x=>({...x,label:weekdayNames[x.key]??x.key,revenuePerHour:x.revenue/x.hours,profitPerHour:x.profit/x.hours,revenuePerKm:x.revenue/x.km,avgRevenue:x.revenue/x.days})).sort((a,b)=>b.profitPerHour-a.profitPerHour);

type DetailedRide={date:string;start:string;value:number;durationMin:number;distanceKm:number;originRegion:string;destinationRegion:string};
const historicalDetailed: DetailedRide[] = rides.filter(r=>r.status==='completed').map(r=>({date:r.date,start:r.start,value:r.value,durationMin:r.durationMin??0,distanceKm:r.distanceKm??0,originRegion:r.originRegion,destinationRegion:r.destinationRegion}));
const recoveredDetailed: DetailedRide[] = completedAugustMatrixRides.map(r=>({date:r.date,start:r.listedTime,value:r.value,durationMin:(r.durationSec??0)/60,distanceKm:r.distanceKm??0,originRegion:r.originRegion,destinationRegion:r.destinationRegion}));
const completed=[...historicalDetailed,...recoveredDetailed];

const hourRanking = Object.values(completed.reduce<Record<string,{key:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=bandFor(r.start);const x=acc[k]??{key:k,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin;x.km+=r.distanceKm;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

const routeRanking = Object.values(completed.reduce<Record<string,{key:string;origin:string;destination:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=`${r.originRegion} → ${r.destinationRegion}`;const x=acc[k]??{key:k,origin:r.originRegion,destination:r.destinationRegion,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin;x.km+=r.distanceKm;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0,avgTicket:x.revenue/x.rides})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

const regionRanking = Object.values(completed.reduce<Record<string,{key:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=r.originRegion;const x=acc[k]??{key:k,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin;x.km+=r.distanceKm;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

const sequenceFor=(date:string)=>daySequenceSummary.find(x=>x.date===date);
const contextLabel=(date:string)=>contextByDate(date).map(x=>x.label).join(' · ') || 'Sem contexto externo confirmado';

export const dailyContextReviews = [
  {date:'2026-08-13',day:dayCode('2026-08-13'),status:'reconstructed',trafficStatus:'sem ocorrência CET específica localizada',operational:'R$ 274,42 na Uber; 13 corridas; 112,34 km em corrida; 4h52 em viagem.',regions:'Taboão, Butantã, Osasco, Congonhas, Barueri, Morumbi e eixo oeste/sul.',review:`Sequência corrida a corrida reconstruída. Intervalo estimado entre registros: ${Math.round(sequenceFor('2026-08-13')?.estimatedGapMin??0)} min. A leitura agora separa tempo em viagem de lacunas observáveis entre os horários listados.`,sources:['Uber — histórico do dia','LAT.BUS 2026'],externalContext:contextLabel('2026-08-13')},
  {date:'2026-08-15',day:dayCode('2026-08-15'),status:'context-only',trafficStatus:'incidente confirmado',operational:'Sem fechamento operacional localizado.',regions:'Eixo Eusébio Matoso / Butantã / acesso centro.',review:'Ocorrência viária relevante permanece como contexto sem ser transformada em desempenho financeiro.',sources:['CET-SP / UOL — incidente na Av. Eusébio Matoso'],externalContext:'Contexto confirmado; sem fechamento do motorista para comparação.'},
  {date:'2026-08-16',day:dayCode('2026-08-16'),status:'reconstructed',trafficStatus:'evento regional confirmado',operational:'R$ 418,03 observados; 19 corridas + 1 cancelamento pago; 188,07 km em corrida; 5h42 em viagem.',regions:'Vila Sônia, Cotia, Centro, Ibirapuera, Santo Amaro, Saúde, Jardim Paulista e Lapa.',review:`Sequência corrida a corrida reconstruída. Intervalo estimado entre registros: ${Math.round(sequenceFor('2026-08-16')?.estimatedGapMin??0)} min. A Festa da Achiropita entra como contexto regional confirmado, sem atribuição causal automática.`,sources:['Uber — histórico do dia','Prefeitura/CET — Festa da Achiropita'],externalContext:contextLabel('2026-08-16')},
  {date:'2026-08-17',day:dayCode('2026-08-17'),status:'reconstructed',trafficStatus:'sem ocorrência oficial específica localizada',operational:'R$ 437,41 observados; 24 corridas + 1 cancelamento pago; 170,70 km em corrida; 8h18 em viagem.',regions:'Centro, Jardim Paulista, Santo Amaro, Vila Mariana, Jabaquara, Congonhas, Osasco e Carapicuíba.',review:`Sequência corrida a corrida reconstruída. Intervalo estimado entre registros: ${Math.round(sequenceFor('2026-08-17')?.estimatedGapMin??0)} min. Como alguns horários se sobrepõem às durações exibidas, o indicador é proxy de encadeamento e não telemetria GPS.`,sources:['Uber — histórico do dia'],externalContext:contextLabel('2026-08-17')}
] as const;

const latestEvidence = evidenceDays.filter(d=>d.platformRevenue).map(d=>({date:d.date,revenue:d.platformRevenue??0,rideHours:d.observedRideHours??0,rideKm:d.observedRideKm??0,trips:d.completedTrips??0}));
export const predictiveIntelligence = {
  generatedAt:'2026-08-18',model:'heuristic-v2',confidence:'exploratory',weekdayRanking,hourRanking,routeRanking,regionRanking,
  bestWeekday:weekdayRanking[0],bestHourBand:hourRanking[0],bestRoute:routeRanking[0],bestOriginRegion:regionRanking[0],
  daySequenceSummary,rideMatrix,
  sample:{completeDays:historicalDays.length,detailedRides:completed.length,detailedRideDates:[...new Set(completed.map(r=>r.date))],recoveredDetailedRides:recoveredDetailed.length,recentEvidenceDays:latestEvidence.length},
  matrixMeta:rideMatrixMeta,
  warnings:['Ranking de dia da semana usa fechamentos completos históricos disponíveis.','Horário, rota e região agora combinam o dataset detalhado anterior com 13, 16 e 17/08 reconstruídos corrida por corrida.','estimatedGapMin é proxy entre horários listados pela Uber; não deve ser lido como tempo ocioso GPS exato.','Contexto de trânsito só entra quando há fonte externa verificável; duração da corrida isolada não prova congestionamento.'],
  nextModel:['Adicionar km vazio e deslocamento até embarque.','Persistir CET/trânsito por data, faixa horária e região.','Cruzar chuva, eventos, acidentes, obras, feriados e dinâmica com eficiência.','Calibrar previsão com mais semanas e intervalo de confiança.']
} as const;
