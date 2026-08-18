import { currentClosings } from './current-ops';
import { days as legacyDays } from './motoristaops';
import { rides } from './ride-intelligence';
import { evidenceDays } from './dashboard-refresh';

const weekdayNames: Record<string,string> = {Dom:'Domingo',Seg:'Segunda',Ter:'Terça',Qua:'Quarta',Qui:'Quinta',Sex:'Sexta',Sáb:'Sábado'};
const bandFor = (time:string) => { const h=Number(time.slice(0,2)); if(h<6)return '04–06'; if(h<9)return '06–09'; if(h<12)return '09–12'; if(h<15)return '12–15'; if(h<18)return '15–18'; if(h<21)return '18–21'; return '21–00'; };
const dayCode = (date:string) => ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][new Date(`${date}T12:00:00-03:00`).getDay()];

const normalizedLegacy = legacyDays.map(d=>({date:d.date,day:d.weekday,grossRevenue:d.gross,operationalProfit:d.profit,hoursOnline:d.hours,kmTotal:d.km,tripsTotal:d.trips}));
const normalizedCurrent = currentClosings.map(d=>({date:d.date,day:d.day,grossRevenue:d.grossRevenue,operationalProfit:d.operationalProfit,hoursOnline:d.hoursOnline,kmTotal:d.kmTotal,tripsTotal:d.tripsTotal}));
const dayMap = new Map(normalizedLegacy.map(d=>[d.date,d]));
normalizedCurrent.forEach(d=>dayMap.set(d.date,d));
const historicalDays = [...dayMap.values()].filter(d=>d.grossRevenue>0 && d.hoursOnline>0 && d.kmTotal>0);

const weekdayRanking = Object.values(historicalDays.reduce<Record<string,{key:string;days:number;revenue:number;profit:number;hours:number;km:number;trips:number}>>((acc,d)=>{const k=d.day; const x=acc[k]??{key:k,days:0,revenue:0,profit:0,hours:0,km:0,trips:0}; x.days++;x.revenue+=d.grossRevenue;x.profit+=d.operationalProfit;x.hours+=d.hoursOnline;x.km+=d.kmTotal;x.trips+=d.tripsTotal;acc[k]=x;return acc;},{})).map(x=>({...x,label:weekdayNames[x.key]??x.key,revenuePerHour:x.revenue/x.hours,profitPerHour:x.profit/x.hours,revenuePerKm:x.revenue/x.km,avgRevenue:x.revenue/x.days})).sort((a,b)=>b.profitPerHour-a.profitPerHour);

const completed = rides.filter(r=>r.status==='completed');
const hourRanking = Object.values(completed.reduce<Record<string,{key:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=bandFor(r.start);const x=acc[k]??{key:k,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin??0;x.km+=r.distanceKm??0;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

const routeRanking = Object.values(completed.reduce<Record<string,{key:string;origin:string;destination:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=`${r.originRegion} → ${r.destinationRegion}`;const x=acc[k]??{key:k,origin:r.originRegion,destination:r.destinationRegion,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin??0;x.km+=r.distanceKm??0;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0,avgTicket:x.revenue/x.rides})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

const regionRanking = Object.values(completed.reduce<Record<string,{key:string;rides:number;revenue:number;duration:number;km:number}>>((acc,r)=>{const k=r.originRegion;const x=acc[k]??{key:k,rides:0,revenue:0,duration:0,km:0};x.rides++;x.revenue+=r.value;x.duration+=r.durationMin??0;x.km+=r.distanceKm??0;acc[k]=x;return acc;},{})).filter(x=>x.rides>=2).map(x=>({...x,revenuePerRideHour:x.duration?x.revenue/(x.duration/60):0,revenuePerKm:x.km?x.revenue/x.km:0})).sort((a,b)=>b.revenuePerRideHour-a.revenuePerRideHour);

export const dailyContextReviews = [
  {date:'2026-08-13',day:dayCode('2026-08-13'),status:'partial',trafficStatus:'a pesquisar',operational:'R$ 274,42 na Uber; 13 corridas; 112,34 km em corrida; 4h52 em viagem.',regions:'Osasco, Barueri, Campo Belo, Morumbi, Butantã, Taboão da Serra e eixo oeste/sul aparecem na sequência recuperada.',review:'Dia com boa produção absoluta e deslocamentos metropolitanos relevantes. Falta cruzar o tempo fora de corrida e o trânsito histórico para separar demanda forte de ineficiência por congestionamento.',sources:['Uber — histórico do dia'],externalContext:'CET-SP/noticiário histórico ainda não reconciliado.'},
  {date:'2026-08-15',day:dayCode('2026-08-15'),status:'context-only',trafficStatus:'incidente confirmado',operational:'Sem fechamento operacional localizado.',regions:'Eixo Eusébio Matoso / Butantã / acesso centro.',review:'Houve ocorrência viária relevante na zona oeste: caminhão tombado na Av. Eusébio Matoso, com faixa de ônibus interditada e impacto em linhas que atendem Campo Limpo, João XXIII, Butantã e centro. Esse tipo de evento deve entrar como variável contextual mesmo em dia sem fechamento.',sources:['CET-SP / UOL — incidente na Av. Eusébio Matoso'],externalContext:'Confirmado em fonte jornalística com informação atribuída à CET.'},
  {date:'2026-08-16',day:dayCode('2026-08-16'),status:'partial',trafficStatus:'evento regional confirmado',operational:'R$ 418,03 observados; 19 corridas + 1 cancelamento pago; 188,07 km em corrida; 5h42 em viagem.',regions:'Vila Sônia, Raposo Tavares, Cotia, centro, Ibirapuera, Santo Amaro, Saúde e Jardim Paulista.',review:'Domingo de alta produção. A Festa da Achiropita gerava interdições na Bela Vista nos fins de semana de agosto; o efeito precisa ser cruzado com horários e corridas que passaram pelo centro para medir se houve bônus de demanda ou perda de produtividade.',sources:['Uber — histórico do dia','Prefeitura/CET — Festa da Achiropita'],externalContext:'Contexto viário regional confirmado; impacto causal ainda não confirmado.'},
  {date:'2026-08-17',day:dayCode('2026-08-17'),status:'partial',trafficStatus:'em enriquecimento',operational:'R$ 437,41 observados; 24 corridas + 1 cancelamento pago; 170,70 km em corrida; 8h18 em viagem.',regions:'Centro, Jardim Paulista, Santo Amaro, Vila Mariana, Jabaquara, Congonhas, Osasco e Carapicuíba.',review:'Maior receita observada entre os dias recentes ainda não fechados. O tempo em corrida é alto, então o próximo indicador-chave é tempo ocioso entre viagens e velocidade média por corredor/região. Isso permitirá distinguir um dia realmente eficiente de um dia apenas longo.',sources:['Uber — histórico do dia'],externalContext:'CET-SP, incidentes, eventos e notícias do dia ainda precisam ser anexados por faixa e região.'}
] as const;

const latestEvidence = evidenceDays.filter(d=>d.platformRevenue).map(d=>({date:d.date,revenue:d.platformRevenue??0,rideHours:d.observedRideHours??0,rideKm:d.observedRideKm??0,trips:d.completedTrips??0}));
export const predictiveIntelligence = {
  generatedAt:'2026-08-18',
  model:'heuristic-v1',
  confidence:'exploratory',
  weekdayRanking,
  hourRanking,
  routeRanking,
  regionRanking,
  bestWeekday:weekdayRanking[0],
  bestHourBand:hourRanking[0],
  bestRoute:routeRanking[0],
  bestOriginRegion:regionRanking[0],
  sample:{completeDays:historicalDays.length,detailedRides:completed.length,detailedRideDates:[...new Set(completed.map(r=>r.date))],recentEvidenceDays:latestEvidence.length},
  warnings:['Ranking de dia da semana usa fechamentos completos históricos disponíveis.','Ranking de horário, rota e região usa apenas corridas detalhadas já importadas em ride-intelligence.ts; a confiança sobe quando 13, 16 e 17/08 entrarem corrida a corrida.','Contexto de trânsito não deve ser inferido apenas pela duração da corrida: CET, ocorrências, eventos e notícias precisam ser persistidos como evidência externa.'],
  nextModel:['Adicionar tempo ocioso entre corridas e km sem passageiro.','Persistir congestionamento/CET por data, faixa horária e região.','Cruzar eventos, chuva, acidentes, obras e calendário com demanda e R$/h.','Gerar previsão de melhor janela de trabalho com intervalo de confiança, não apenas ranking histórico.']
} as const;
