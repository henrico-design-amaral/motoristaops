export type LiveZone={name:string;slowKm:number|null;sharePct:number|null};
export type LiveTraffic={status?:string;zones?:LiveZone[];derived?:{totalSlowKm?:number|null;worstZone?:string|null;pressure?:string}};

export const LIVE_ADJUSTMENT_POLICY={
  version:'live-adjustment-v1',
  neutralZoneSharePct:20,
  trafficShareWeight:.35,
  maxTrafficPenalty:-10,
  maxTrafficBonus:5,
  weekdayWeight:.08,
  hourBandWeight:.12,
  weatherAffectsScore:false,
  airportAffectsScore:false,
  note:'Ajuste operacional de curto prazo. Não substitui nem reescreve score histórico.'
} as const;

const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));

export const macroForRegion=(region:string)=>{
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

export const currentHourBand=(date=new Date())=>{const h=date.getHours();if(h<6)return '04–06';if(h<9)return '06–09';if(h<12)return '09–12';if(h<15)return '12–15';if(h<18)return '15–18';if(h<21)return '18–21';return '21–00';};
export const currentWeekday=(date=new Date())=>['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'][date.getDay()];

export function trafficAdjustmentFor(region:string,traffic:LiveTraffic){
  const macro=macroForRegion(region);
  const zone=macro?(traffic.zones??[]).find(z=>z.name===macro):undefined;
  const share=zone?.sharePct;
  const adjustment=Number.isFinite(share)?clamp((LIVE_ADJUSTMENT_POLICY.neutralZoneSharePct-Number(share))*LIVE_ADJUSTMENT_POLICY.trafficShareWeight,LIVE_ADJUSTMENT_POLICY.maxTrafficPenalty,LIVE_ADJUSTMENT_POLICY.maxTrafficBonus):0;
  return {macro,share:share??null,adjustment};
}

export function adjustedOperationalScore(args:{baseScore:number;region:string;traffic:LiveTraffic;weekdayScore:number;hourScore:number}){
  const traffic=trafficAdjustmentFor(args.region,args.traffic);
  const temporal=(args.weekdayScore-50)*LIVE_ADJUSTMENT_POLICY.weekdayWeight+(args.hourScore-50)*LIVE_ADJUSTMENT_POLICY.hourBandWeight;
  const adjusted=Math.round(clamp(args.baseScore+traffic.adjustment+temporal,0,100));
  return {...traffic,temporalAdjustment:temporal,adjusted};
}
