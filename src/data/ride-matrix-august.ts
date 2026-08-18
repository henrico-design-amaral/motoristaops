export type MatrixRideStatus = 'completed' | 'cancelled-paid' | 'cancelled-unpaid';

export type MatrixRide = {
  id: string;
  date: string;
  listedTime: string;
  category: 'Uber X' | 'Prioridade';
  value: number;
  durationSec?: number;
  distanceKm?: number;
  originRegion: string;
  destinationRegion: string;
  surge?: number;
  toll?: number;
  status: MatrixRideStatus;
};

export const augustMatrixRides: MatrixRide[] = [
  // 13/08 — 13 corridas pagas + 2 cancelamentos sem pagamento
  {id:'1308-0401',date:'2026-08-13',listedTime:'04:01',category:'Prioridade',value:10.83,durationSec:431,distanceKm:3.55,originRegion:'Taboão da Serra',destinationRegion:'Jardim Cambará',status:'completed'},
  {id:'1308-0416',date:'2026-08-13',listedTime:'04:16',category:'Uber X',value:16.29,durationSec:681,distanceKm:7.87,originRegion:'Raposo Tavares',destinationRegion:'Vila Sônia',status:'completed'},
  {id:'1308-0422',date:'2026-08-13',listedTime:'04:22',category:'Uber X',value:8.96,durationSec:403,distanceKm:3.76,originRegion:'Jardim das Vertentes',destinationRegion:'Rio Pequeno',status:'completed'},
  {id:'1308-0453',date:'2026-08-13',listedTime:'04:53',category:'Uber X',value:16.16,durationSec:743,distanceKm:6.07,originRegion:'Butantã',destinationRegion:'Parque Continental · Osasco',surge:2.5,status:'completed'},
  {id:'1308-0514',date:'2026-08-13',listedTime:'05:14',category:'Uber X',value:0,originRegion:'Vila Adalgisa',destinationRegion:'Vila Adalgisa',status:'cancelled-unpaid'},
  {id:'1308-0515',date:'2026-08-13',listedTime:'05:15',category:'Uber X',value:12.95,durationSec:546,distanceKm:6.89,originRegion:'Vila Lageado',destinationRegion:'Pinheiros',status:'completed'},
  {id:'1308-0555',date:'2026-08-13',listedTime:'05:55',category:'Uber X',value:25.67,durationSec:1187,distanceKm:8.84,originRegion:'Rio Pequeno',destinationRegion:'Morumbi',status:'completed'},
  {id:'1308-0630',date:'2026-08-13',listedTime:'06:30',category:'Uber X',value:47.12,durationSec:3397,distanceKm:19.79,originRegion:'Vila Osasco · Osasco',destinationRegion:'Congonhas',status:'completed'},
  {id:'1308-0729',date:'2026-08-13',listedTime:'07:29',category:'Uber X',value:56.99,durationSec:3780,distanceKm:21.05,originRegion:'Campo Belo',destinationRegion:'Vila Yara · Osasco',status:'completed'},
  {id:'1308-0945',date:'2026-08-13',listedTime:'09:45',category:'Uber X',value:17.96,durationSec:1457,distanceKm:9.15,originRegion:'Bela Vista · Osasco',destinationRegion:'Parque Imperial · Barueri',status:'completed'},
  {id:'1308-1049',date:'2026-08-13',listedTime:'10:49',category:'Uber X',value:24.30,durationSec:2108,distanceKm:11.46,originRegion:'Taboão da Serra',destinationRegion:'Vila Andrade',status:'completed'},
  {id:'1308-1130',date:'2026-08-13',listedTime:'11:30',category:'Uber X',value:9.58,durationSec:743,distanceKm:4.25,originRegion:'Vila Andrade',destinationRegion:'Campo Limpo',status:'completed'},
  {id:'1308-1147',date:'2026-08-13',listedTime:'11:47',category:'Prioridade',value:14.81,durationSec:1070,distanceKm:5.23,originRegion:'Parque Esmeralda',destinationRegion:'Vila Maracanã',status:'completed'},
  {id:'1308-1206',date:'2026-08-13',listedTime:'12:06',category:'Prioridade',value:0,originRegion:'Vila Franca',destinationRegion:'Vila Franca',status:'cancelled-unpaid'},
  {id:'1308-1209',date:'2026-08-13',listedTime:'12:09',category:'Uber X',value:12.80,durationSec:998,distanceKm:4.43,originRegion:'Vila Plana',destinationRegion:'Parque Esmeralda',status:'completed'},

  // 16/08 — 19 corridas + 1 cancelamento pago + 1 cancelamento sem pagamento
  {id:'1608-0911',date:'2026-08-16',listedTime:'09:11',category:'Uber X',value:3.91,originRegion:'Vila Andrade',destinationRegion:'Vila Andrade',status:'cancelled-paid'},
  {id:'1608-0917',date:'2026-08-16',listedTime:'09:17',category:'Uber X',value:20.98,durationSec:1037,distanceKm:13.39,originRegion:'Jardim Santo Antônio',destinationRegion:'Jardim Paulista',status:'completed'},
  {id:'1608-0937',date:'2026-08-16',listedTime:'09:37',category:'Uber X',value:30.36,durationSec:1587,distanceKm:17.29,originRegion:'Jardim Paulista',destinationRegion:'Vila Água Funda',status:'completed'},
  {id:'1608-1012',date:'2026-08-16',listedTime:'10:12',category:'Uber X',value:16.24,durationSec:979,distanceKm:8.37,originRegion:'Vila do Encontro',destinationRegion:'Vila Clementino',status:'completed'},
  {id:'1608-1032',date:'2026-08-16',listedTime:'10:32',category:'Uber X',value:16.27,durationSec:1196,distanceKm:7.25,originRegion:'Saúde',destinationRegion:'Itaim Bibi',status:'completed'},
  {id:'1608-1055',date:'2026-08-16',listedTime:'10:55',category:'Uber X',value:14.37,durationSec:695,distanceKm:6.45,originRegion:'Santo Amaro',destinationRegion:'Jardim Prudência',status:'completed'},
  {id:'1608-1110',date:'2026-08-16',listedTime:'11:10',category:'Uber X',value:11.59,durationSec:685,distanceKm:4.99,originRegion:'Vila Constância',destinationRegion:'Campo Belo',status:'completed'},
  {id:'1608-1129',date:'2026-08-16',listedTime:'11:29',category:'Uber X',value:31.16,durationSec:1333,distanceKm:16.79,originRegion:'Jardim Aeroporto',destinationRegion:'Vila Leopoldina',status:'completed'},
  {id:'1608-1158',date:'2026-08-16',listedTime:'11:58',category:'Prioridade',value:44.64,durationSec:1954,distanceKm:20.61,originRegion:'Vila Leopoldina',destinationRegion:'Jardim Passárgada I · Cotia',surge:3.5,status:'completed'},
  {id:'1608-1229',date:'2026-08-16',listedTime:'12:29',category:'Uber X',value:25.43,durationSec:1152,distanceKm:13.07,originRegion:'Cotia',destinationRegion:'Vila Sônia',surge:4,status:'completed'},
  {id:'1608-1308',date:'2026-08-16',listedTime:'13:08',category:'Uber X',value:24.05,durationSec:1748,distanceKm:10.16,originRegion:'Vila Sônia',destinationRegion:'Moema',surge:3.5,status:'completed'},
  {id:'1608-1351',date:'2026-08-16',listedTime:'13:51',category:'Uber X',value:0,originRegion:'Parque Ibirapuera',destinationRegion:'Parque Ibirapuera',status:'cancelled-unpaid'},
  {id:'1608-1355',date:'2026-08-16',listedTime:'13:55',category:'Uber X',value:23.39,durationSec:1015,distanceKm:9.54,originRegion:'Ibirapuera',destinationRegion:'Centro',surge:1.25,status:'completed'},
  {id:'1608-1414',date:'2026-08-16',listedTime:'14:14',category:'Uber X',value:23.38,durationSec:1220,distanceKm:5.53,originRegion:'Sé',destinationRegion:'Jardins',surge:2,status:'completed'},
  {id:'1608-1439',date:'2026-08-16',listedTime:'14:39',category:'Prioridade',value:13.79,durationSec:433,distanceKm:3.80,originRegion:'Consolação',destinationRegion:'Pacaembu',surge:2.25,status:'completed'},
  {id:'1608-1503',date:'2026-08-16',listedTime:'15:03',category:'Uber X',value:12.08,durationSec:685,distanceKm:2.70,originRegion:'Consolação',destinationRegion:'Perdizes',status:'completed'},
  {id:'1608-1523',date:'2026-08-16',listedTime:'15:23',category:'Uber X',value:17.13,durationSec:427,distanceKm:3.28,originRegion:'Sumaré',destinationRegion:'Lapa',status:'completed'},
  {id:'1608-1539',date:'2026-08-16',listedTime:'15:39',category:'Uber X',value:31.35,durationSec:1950,distanceKm:19.78,originRegion:'Lapa',destinationRegion:'Cotia',status:'completed'},
  {id:'1608-1620',date:'2026-08-16',listedTime:'16:20',category:'Uber X',value:21.63,durationSec:963,distanceKm:12.44,originRegion:'Cotia',destinationRegion:'Raposo Tavares',status:'completed'},
  {id:'1608-1652',date:'2026-08-16',listedTime:'16:52',category:'Prioridade',value:21.72,durationSec:838,distanceKm:8.90,originRegion:'Raposo Tavares',destinationRegion:'Vila Sônia',surge:3.25,status:'completed'},
  {id:'1608-1712',date:'2026-08-16',listedTime:'17:12',category:'Uber X',value:14.56,durationSec:632,distanceKm:3.73,originRegion:'Vila Sônia',destinationRegion:'Vila Sônia',status:'completed'},

  // 17/08 — 24 corridas + 1 cancelamento pago + 1 cancelamento sem pagamento
  {id:'1708-0409',date:'2026-08-17',listedTime:'04:09',category:'Uber X',value:9.56,durationSec:432,distanceKm:4.24,originRegion:'Rio Pequeno',destinationRegion:'Vila Antônio',status:'completed'},
  {id:'1708-0411',date:'2026-08-17',listedTime:'04:11',category:'Prioridade',value:29.03,durationSec:1151,distanceKm:16.08,originRegion:'Raposo Tavares',destinationRegion:'Carapicuíba',toll:3.7,status:'completed'},
  {id:'1708-0445',date:'2026-08-17',listedTime:'04:45',category:'Uber X',value:16.30,durationSec:1279,distanceKm:9.88,originRegion:'Carapicuíba',destinationRegion:'Osasco',status:'completed'},
  {id:'1708-0509',date:'2026-08-17',listedTime:'05:09',category:'Uber X',value:27.58,durationSec:1246,distanceKm:15.27,originRegion:'Jardim Wilson · Osasco',destinationRegion:'Jardim Paulista',status:'completed'},
  {id:'1708-0539',date:'2026-08-17',listedTime:'05:39',category:'Uber X',value:11.44,durationSec:727,distanceKm:4.49,originRegion:'Jardim Paulista',destinationRegion:'Higienópolis',status:'completed'},
  {id:'1708-0543',date:'2026-08-17',listedTime:'05:43',category:'Uber X',value:23.96,durationSec:1823,distanceKm:12.09,originRegion:'República',destinationRegion:'Congonhas',status:'completed'},
  {id:'1708-0633',date:'2026-08-17',listedTime:'06:33',category:'Uber X',value:4.19,originRegion:'Campo Belo',destinationRegion:'Campo Belo',status:'cancelled-paid'},
  {id:'1708-0705',date:'2026-08-17',listedTime:'07:05',category:'Uber X',value:23.18,durationSec:1861,distanceKm:7.37,originRegion:'Jabaquara',destinationRegion:'Saúde',surge:5,status:'completed'},
  {id:'1708-0732',date:'2026-08-17',listedTime:'07:32',category:'Uber X',value:25.00,durationSec:2562,distanceKm:8.41,originRegion:'Vila Mariana',destinationRegion:'Chácara Santo Antônio',surge:3.75,status:'completed'},
  {id:'1708-0826',date:'2026-08-17',listedTime:'08:26',category:'Uber X',value:11.62,durationSec:621,distanceKm:2.24,originRegion:'Santo Amaro',destinationRegion:'Santo Amaro',surge:4,status:'completed'},
  {id:'1708-0836',date:'2026-08-17',listedTime:'08:36',category:'Uber X',value:14.61,durationSec:795,distanceKm:2.67,originRegion:'Santo Amaro',destinationRegion:'Santo Amaro',surge:6.5,status:'completed'},
  {id:'1708-0851',date:'2026-08-17',listedTime:'08:51',category:'Uber X',value:45.47,durationSec:3840,distanceKm:17.79,originRegion:'Santo Amaro',destinationRegion:'Pari',surge:4.75,status:'completed'},
  {id:'1708-1000',date:'2026-08-17',listedTime:'10:00',category:'Prioridade',value:12.26,durationSec:717,distanceKm:1.34,originRegion:'Pari',destinationRegion:'Santa Efigênia',status:'completed'},
  {id:'1708-1022',date:'2026-08-17',listedTime:'10:22',category:'Prioridade',value:14.83,durationSec:803,distanceKm:5.17,originRegion:'Centro',destinationRegion:'Jardim Paulista',status:'completed'},
  {id:'1708-1056',date:'2026-08-17',listedTime:'10:56',category:'Uber X',value:25.76,durationSec:1547,distanceKm:13.49,originRegion:'Jardim Paulista',destinationRegion:'Vila Maracanã',status:'completed'},
  {id:'1708-1117',date:'2026-08-17',listedTime:'11:17',category:'Uber X',value:14.22,durationSec:1266,distanceKm:7.00,originRegion:'Jardim Germânia',destinationRegion:'Morumbi',status:'completed'},
  {id:'1708-1155',date:'2026-08-17',listedTime:'11:55',category:'Prioridade',value:12.54,durationSec:301,distanceKm:1.58,originRegion:'Vila Sônia',destinationRegion:'Vila Sônia',status:'completed'},
  {id:'1708-1302',date:'2026-08-17',listedTime:'13:02',category:'Uber X',value:24.37,durationSec:1590,distanceKm:12.91,originRegion:'Jardim Parque Morumbi · Vila Andrade',destinationRegion:'Ibirapuera',status:'completed'},
  {id:'1708-1328',date:'2026-08-17',listedTime:'13:28',category:'Uber X',value:7.63,durationSec:538,distanceKm:2.06,originRegion:'Vila Mariana',destinationRegion:'Mirandópolis',status:'completed'},
  {id:'1708-1344',date:'2026-08-17',listedTime:'13:44',category:'Uber X',value:11.38,durationSec:727,distanceKm:4.20,originRegion:'Saúde',destinationRegion:'Vila Mariana',status:'completed'},
  {id:'1708-1359',date:'2026-08-17',listedTime:'13:59',category:'Uber X',value:6.10,durationSec:471,distanceKm:1.11,originRegion:'Vila Mariana',destinationRegion:'Bela Vista',status:'completed'},
  {id:'1708-1412',date:'2026-08-17',listedTime:'14:12',category:'Uber X',value:0,originRegion:'Jardim Paulista',destinationRegion:'Jardim Paulista',status:'cancelled-unpaid'},
  {id:'1708-1415',date:'2026-08-17',listedTime:'14:15',category:'Uber X',value:11.33,durationSec:956,distanceKm:2.95,originRegion:'Bela Vista',destinationRegion:'Jardim Paulista',status:'completed'},
  {id:'1708-1436',date:'2026-08-17',listedTime:'14:36',category:'Uber X',value:13.00,durationSec:1081,distanceKm:3.46,originRegion:'Jardim Paulista',destinationRegion:'Pinheiros',status:'completed'},
  {id:'1708-1510',date:'2026-08-17',listedTime:'15:10',category:'Prioridade',value:31.25,durationSec:2442,distanceKm:9.72,originRegion:'Butantã',destinationRegion:'Morumbi',status:'completed'},
  {id:'1708-1547',date:'2026-08-17',listedTime:'15:47',category:'Uber X',value:10.80,durationSec:1118,distanceKm:5.18,originRegion:'Vila Progredior',destinationRegion:'Taboão da Serra',status:'completed'},
];

const minuteOfDay = (time: string) => { const [h,m] = time.split(':').map(Number); return h * 60 + m; };
const bandFor = (time: string) => { const h=Number(time.slice(0,2)); if(h<6)return '04–06'; if(h<9)return '06–09'; if(h<12)return '09–12'; if(h<15)return '12–15'; if(h<18)return '15–18'; if(h<21)return '18–21'; return '21–00'; };

export const completedAugustMatrixRides = augustMatrixRides.filter(r => r.status === 'completed');

export const rideSequence = ['2026-08-13','2026-08-16','2026-08-17'].flatMap(date => {
  const day = augustMatrixRides.filter(r => r.date === date).sort((a,b)=>minuteOfDay(a.listedTime)-minuteOfDay(b.listedTime));
  return day.map((ride,index) => {
    const previous = [...day.slice(0,index)].reverse().find(x=>x.status==='completed' && x.durationSec);
    const previousEnd = previous ? minuteOfDay(previous.listedTime) + (previous.durationSec ?? 0) / 60 : null;
    const rawGap = previousEnd === null ? null : minuteOfDay(ride.listedTime) - previousEnd;
    const estimatedGapMin = rawGap === null ? null : Math.max(0, rawGap);
    return {
      ...ride,
      hourBand: bandFor(ride.listedTime),
      estimatedGapMin,
      sequenceState: rawGap === null ? 'first-record' : rawGap <= 0 ? 'overlap-or-queued' : 'observed-gap',
    } as const;
  });
});

export const daySequenceSummary = ['2026-08-13','2026-08-16','2026-08-17'].map(date => {
  const rows = rideSequence.filter(r=>r.date===date);
  const completed = rows.filter(r=>r.status==='completed');
  const revenue = rows.reduce((s,r)=>s+r.value,0);
  const rideMin = completed.reduce((s,r)=>s+(r.durationSec??0)/60,0);
  const rideKm = completed.reduce((s,r)=>s+(r.distanceKm??0),0);
  const estimatedGapMin = completed.reduce((s,r)=>s+(r.estimatedGapMin??0),0);
  const first = rows[0]; const last = rows.at(-1);
  const observedSpanMin = first && last ? minuteOfDay(last.listedTime)-minuteOfDay(first.listedTime)+(last.durationSec??0)/60 : 0;
  return {date,revenue,completedTrips:completed.length,rideMin,rideKm,estimatedGapMin,observedSpanMin,temporalOccupancy:observedSpanMin?rideMin/observedSpanMin:0,revenuePerRideHour:rideMin?revenue/(rideMin/60):0,revenuePerRideKm:rideKm?revenue/rideKm:0};
});

export const rideMatrix = Object.values(completedAugustMatrixRides.reduce<Record<string,{key:string;date:string;hourBand:string;originRegion:string;destinationRegion:string;rides:number;revenue:number;rideMin:number;km:number}>>((acc,r)=>{
  const hourBand=bandFor(r.listedTime); const key=`${r.date}|${hourBand}|${r.originRegion}|${r.destinationRegion}`;
  const x=acc[key]??{key,date:r.date,hourBand,originRegion:r.originRegion,destinationRegion:r.destinationRegion,rides:0,revenue:0,rideMin:0,km:0};
  x.rides++; x.revenue+=r.value; x.rideMin+=(r.durationSec??0)/60; x.km+=r.distanceKm??0; acc[key]=x; return acc;
},{})).map(x=>({...x,revenuePerRideHour:x.rideMin?x.revenue/(x.rideMin/60):0,revenuePerKm:x.km?x.revenue/x.km:0}));

export const rideMatrixMeta = {
  dates:['2026-08-13','2026-08-16','2026-08-17'],
  completedTrips:completedAugustMatrixRides.length,
  method:'Histórico de ganhos da Uber reconstruído corrida por corrida. Intervalo estimado usa o horário listado menos o horário listado anterior + duração; valores negativos viram zero e são marcados como overlap-or-queued.',
  limitation:'O horário exibido pela Uber não é tratado como telemetria GPS. estimatedGapMin é proxy de encadeamento entre registros, não tempo ocioso exato do motorista.'
} as const;
