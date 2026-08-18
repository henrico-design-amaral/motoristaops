import { currentClosings } from './current-ops';
import { rideIntelligence } from './ride-intelligence';

const validDays = currentClosings.filter((row) => row.grossRevenue > 0 && row.hoursOnline > 0 && row.kmTotal > 0);
const metric = (row: (typeof validDays)[number]) => ({
  ...row,
  revenuePerHour: row.grossRevenue / row.hoursOnline,
  profitPerHour: row.operationalProfit / row.hoursOnline,
  revenuePerKm: row.grossRevenue / row.kmTotal,
  profitPerKm: row.operationalProfit / row.kmTotal,
  privateShare: row.grossRevenue ? row.revenuePrivate / row.grossRevenue : 0
});
const rankedDays = validDays.map(metric);
const groupDays = Object.values(rankedDays.reduce<Record<string,{day:string,days:number,revenue:number,profit:number,hours:number,km:number}>>((acc,row)=>{
  const item=acc[row.day] ?? {day:row.day,days:0,revenue:0,profit:0,hours:0,km:0};
  item.days+=1; item.revenue+=row.grossRevenue; item.profit+=row.operationalProfit; item.hours+=row.hoursOnline; item.km+=row.kmTotal; acc[row.day]=item; return acc;
},{})).map(item=>({...item,revenuePerHour:item.hours?item.revenue/item.hours:0,profitPerHour:item.hours?item.profit/item.hours:0,revenuePerKm:item.km?item.revenue/item.km:0})).sort((a,b)=>b.revenuePerHour-a.revenuePerHour);

const hourBands = rideIntelligence.byHourBand.filter(item=>item.rides>=2).sort((a,b)=>(b.revenuePerHour??0)-(a.revenuePerHour??0));
const regions = rideIntelligence.byOriginRegion.filter(item=>item.rides>=2).sort((a,b)=>(b.revenuePerHour??0)-(a.revenuePerHour??0));

export const strategicIntelligence = {
  generatedAt:'2026-08-17',
  fuelReference:3.22,
  bestRevenueDay:[...rankedDays].sort((a,b)=>b.grossRevenue-a.grossRevenue)[0],
  bestRevenuePerHourDay:[...rankedDays].sort((a,b)=>b.revenuePerHour-a.revenuePerHour)[0],
  bestRevenuePerKmDay:[...rankedDays].sort((a,b)=>b.revenuePerKm-a.revenuePerKm)[0],
  worstRevenuePerHourDay:[...rankedDays].sort((a,b)=>a.revenuePerHour-b.revenuePerHour)[0],
  weekdayRanking:groupDays,
  hourRanking:hourBands,
  regionRanking:regions,
  sampleNotice:`Horários e regiões usam ${rideIntelligence.sample.completed} corridas concluídas de ${rideIntelligence.sample.dates.join(' e ')}. O ranking diário usa ${rankedDays.length} fechamentos recentes completos.`,
  trafficContext:{status:'planned',label:'Contexto de trânsito',description:'Camada preparada para cruzar CET-SP, ocorrências, obras, eventos e notícias com data, horário e região. Evidência será classificada como confirmada ou estimada.'}
};
