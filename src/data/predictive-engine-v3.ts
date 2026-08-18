import { predictiveIntelligence } from './strategic-intelligence-v2';

const clamp=(v:number,min=0,max=100)=>Math.max(min,Math.min(max,v));
const max=(arr:number[])=>Math.max(...arr,1);
const weekdayMax=max(predictiveIntelligence.weekdayRanking.map(x=>x.profitPerHour));
const hourMax=max(predictiveIntelligence.hourRanking.map(x=>x.revenuePerRideHour));
const regionMax=max(predictiveIntelligence.regionRanking.map(x=>x.revenuePerRideHour));
const routeMax=max(predictiveIntelligence.routeRanking.map(x=>x.revenuePerRideHour));

export const weekdayScores=predictiveIntelligence.weekdayRanking.map(x=>({
  ...x,
  score:Math.round(clamp((x.profitPerHour/weekdayMax)*65 + Math.min(x.days/3,1)*20 + Math.min(x.revenuePerKm/3,1)*15)),
  confidence:x.days>=3?'média':x.days===2?'baixa-média':'baixa'
}));

export const hourScores=predictiveIntelligence.hourRanking.map(x=>({
  ...x,
  score:Math.round(clamp((x.revenuePerRideHour/hourMax)*65 + Math.min(x.rides/8,1)*20 + Math.min(x.revenuePerKm/3,1)*15)),
  confidence:x.rides>=8?'média':x.rides>=4?'baixa-média':'baixa'
}));

export const regionScores=predictiveIntelligence.regionRanking.map(x=>({
  ...x,
  score:Math.round(clamp((x.revenuePerRideHour/regionMax)*60 + Math.min(x.rides/6,1)*25 + Math.min(x.revenuePerKm/3,1)*15)),
  confidence:x.rides>=6?'média':x.rides>=3?'baixa-média':'baixa'
}));

export const routeScores=predictiveIntelligence.routeRanking.map(x=>({
  ...x,
  score:Math.round(clamp((x.revenuePerRideHour/routeMax)*55 + Math.min(x.rides/5,1)*25 + Math.min(x.revenuePerKm/3,1)*20)),
  confidence:x.rides>=5?'média':x.rides>=3?'baixa-média':'baixa'
}));

export const recommendedWindows=weekdayScores.slice(0,3).flatMap(day=>hourScores.slice(0,3).map(hour=>({
  weekday:day.label,
  hourBand:hour.key,
  score:Math.round(day.score*.55+hour.score*.45),
  confidence:day.confidence==='baixa'||hour.confidence==='baixa'?'baixa':'baixa-média',
  rationale:`Combina ${day.label} (${day.profitPerHour.toFixed(2)} R$/h de lucro histórico) com a faixa ${hour.key} (${hour.revenuePerRideHour.toFixed(2)} R$/h em corrida na amostra detalhada).`
}))).sort((a,b)=>b.score-a.score).slice(0,6);

export const predictiveSummary={
  model:'heuristic-v3',
  generatedAt:'2026-08-18',
  bestWindow:recommendedWindows[0],
  bestWeekday:weekdayScores[0],
  bestHour:hourScores[0],
  bestRegion:regionScores[0],
  bestRoute:routeScores[0],
  caveat:'Score de oportunidade ainda não inclui trânsito em tempo real/histórico persistido, clima, eventos, km vazio nem tempo ocioso. Ele serve para priorização experimental, não como garantia de ganho.',
  nextSignals:['tempo ocioso entre corridas','km sem passageiro','trânsito CET por faixa/região','chuva e temperatura','eventos e interdições','dinâmica/pedágios','dia útil/feriado','aeroportos e grandes polos']
} as const;
