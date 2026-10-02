export type EvidenceDay = {
  date: string;
  dateBR: string;
  label: string;
  status: 'complete' | 'evidence-only' | 'missing';
  platformRevenue?: number;
  paidEntries?: number;
  completedTrips?: number;
  paidCancellations?: number;
  unpaidCancellations?: number;
  observedRideKm?: number;
  observedRideHours?: number;
  observedMinimum?: boolean;
  observedTotalKm?: number;
  observedWorkHours?: number;
  odometerKm?: number;
  excludeFromPredictive?: boolean;
  note: string;
};

export const evidenceDays: EvidenceDay[] = [
  {
    date: '2026-08-12',
    dateBR: '12/08/2026',
    label: 'Qua',
    status: 'evidence-only',
    platformRevenue: 34.96,
    paidEntries: 2,
    completedTrips: 2,
    unpaidCancellations: 0,
    observedRideKm: 11.25,
    observedRideHours: 0.52,
    observedMinimum: true,
    note: 'Evidência mínima confirmada no fim do histórico: pelo menos R$ 34,96, 2 corridas, 11,25 km em corrida e 31min12s em viagem. Existe uma corrida anterior cortada no topo do print; por isso estes números continuam sendo mínimos observados e não fechamento integral.'
  },
  {
    date: '2026-08-13',
    dateBR: '13/08/2026',
    label: 'Qui',
    status: 'evidence-only',
    platformRevenue: 274.42,
    paidEntries: 13,
    completedTrips: 13,
    unpaidCancellations: 2,
    observedRideKm: 112.34,
    observedRideHours: 4.8733,
    note: 'Sequência completa de prints de 04:01 a 12:09, encerrada em “Fim das atividades”: 13 corridas pagas somando R$ 274,42, 112,34 km em corrida e 4h52min24s em viagem, além de 2 cancelamentos sem pagamento. Quilometragem total do carro, horas online, 99, particular e custos só entram quando houver fechamento operacional inequívoco.'
  },
  {
    date: '2026-08-14',
    dateBR: '14/08/2026',
    label: 'Sex',
    status: 'missing',
    note: 'Nenhum fechamento inequívoco ou sequência de ganhos confirmada foi localizada. O painel mantém a lacuna em vez de assumir zero.'
  },
  {
    date: '2026-08-15',
    dateBR: '15/08/2026',
    label: 'Sáb',
    status: 'missing',
    note: 'Nenhum fechamento inequívoco ou sequência de ganhos confirmada foi localizada. O painel mantém a lacuna em vez de assumir zero.'
  },
  {
    date: '2026-08-16',
    dateBR: '16/08/2026',
    label: 'Dom',
    status: 'evidence-only',
    platformRevenue: 418.03,
    paidEntries: 20,
    completedTrips: 19,
    paidCancellations: 1,
    unpaidCancellations: 1,
    observedRideKm: 188.07,
    observedRideHours: 5.7025,
    note: 'Sequência completa de prints encerra em “Fim das atividades”: 19 corridas concluídas somando R$ 414,12, mais R$ 3,91 de cancelamento pago, total de R$ 418,03 no app; 188,07 km em corridas e 5h42min09s em viagem. Há também 1 cancelamento sem pagamento. Horas online, km totais do veículo e custos ainda não foram confirmados.'
  },
  {
    date: '2026-08-17',
    dateBR: '17/08/2026',
    label: 'Seg',
    status: 'evidence-only',
    platformRevenue: 437.41,
    paidEntries: 25,
    completedTrips: 24,
    paidCancellations: 1,
    unpaidCancellations: 1,
    observedRideKm: 170.70,
    observedRideHours: 8.3039,
    note: 'Sequência completa de 17/08 até “Fim das atividades”: 24 corridas concluídas somando R$ 433,22, mais R$ 4,19 de cancelamento pago, total observado de R$ 437,41; 170,70 km em corridas e 8h18min14s em viagem. Há 1 cancelamento sem pagamento. Faltam apenas km totais do veículo, horas online, combustível e eventuais receitas fora da Uber para o fechamento operacional completo.'
  },
  {
    date:'2026-09-17',dateBR:'17/09/2026',label:'Qui',status:'evidence-only',platformRevenue:146.61,completedTrips:3,observedTotalKm:74.4,observedWorkHours:4.8333,odometerKm:95767,observedMinimum:true,
    note:'Receita observada: Uber R$ 31,61 em 3 viagens + particular R$ 65,00 + documentos R$ 50,00. 74,4 km, 4h50 e consumo 6,6 km/L. Ainda não reconciliado como fechamento canônico.'
  },
  {
    date:'2026-09-18',dateBR:'18/09/2026',label:'Sex',status:'evidence-only',platformRevenue:434.24,completedTrips:17,observedTotalKm:168.8,observedWorkHours:8.75,observedMinimum:true,
    note:'Receita observada: Uber R$ 319,24 em 17 viagens + particular R$ 65,00 + documentos R$ 50,00. 168,8 km, 8h45 e consumo 7,4 km/L. Custos ainda não reconciliados.'
  },
  {
    date:'2026-09-19',dateBR:'19/09/2026',label:'Sáb',status:'evidence-only',platformRevenue:548.65,completedTrips:30,observedTotalKm:267.4,observedWorkHours:11.2,odometerKm:96222,
    note:'Dois turnos observados. Manhã: R$ 249,77 em 17 viagens; noite: R$ 298,88 em 13 viagens. Total R$ 548,65, 267,4 km e 11h12. Reconciliar custos e sobreposição de odômetro antes do lucro.'
  },
  {
    date:'2026-09-20',dateBR:'20/09/2026',label:'Dom',status:'evidence-only',platformRevenue:216.48,completedTrips:11,observedTotalKm:101.9,observedWorkHours:5.1,odometerKm:96324,
    note:'Uber R$ 216,48 em 11 viagens; 5h06 totais, 101,9 km e consumo 5,4 km/L. Abastecimento R$ 110,85 registrado como caixa; fechamento operacional ainda não reconciliado.'
  },
  {
    date:'2026-09-23',dateBR:'23/09/2026',label:'Qua',status:'evidence-only',platformRevenue:453.16,completedTrips:24,observedTotalKm:215.1,observedWorkHours:9.1167,odometerKm:96705,
    note:'Uber R$ 260,72 em 14 viagens + 99 R$ 127,44 em 8 + particular R$ 65,00. 215,1 km e 9h07. Pendente de custo operacional consolidado.'
  },
  {
    date:'2026-09-26',dateBR:'26/09/2026',label:'Sáb',status:'evidence-only',platformRevenue:454.88,completedTrips:17,observedTotalKm:268.2,observedWorkHours:9.1667,odometerKm:97124,observedMinimum:true,
    note:'Uber R$ 454,88; pelo menos 17 viagens e 7h35 no app. 268,2 km, 9h10, consumo 9,1 km/L. Abastecimento pós-turno de gasolina registrado separadamente.'
  },
  {
    date:'2026-09-27',dateBR:'27/09/2026',label:'Dom',status:'evidence-only',platformRevenue:342.59,observedTotalKm:138.5,observedWorkHours:5.9333,odometerKm:97341,excludeFromPredictive:true,
    note:'Uber R$ 342,59. Jornada contém 72,5 km e 1h57 de uso pessoal; por isso o registro fica fora do ranking preditivo até separação operacional.'
  },
  {
    date:'2026-09-28',dateBR:'28/09/2026',label:'Seg',status:'evidence-only',platformRevenue:280.25,completedTrips:11,observedTotalKm:122.2,observedWorkHours:6.8167,odometerKm:97464,
    note:'Uber R$ 215,25 em 9 viagens + particular R$ 65,00. 122,2 km e 6h49 totais. Abastecimento R$ 89,69. Pendente de reconciliação de custo consumido.'
  },
  {
    date:'2026-09-29',dateBR:'29/09/2026',label:'Ter',status:'evidence-only',platformRevenue:236.93,completedTrips:11,observedRideKm:63.35,observedRideHours:3.2394,observedTotalKm:93,observedWorkHours:6,odometerKm:97587,
    note:'Uber R$ 171,93 em 9 viagens + particular R$ 65,00; 63,35 km e 3h14min22s com passageiro. 93 km totais, lavagem R$ 21,00 e abastecimento R$ 83,89.'
  },
  {
    date:'2026-09-30',dateBR:'30/09/2026',label:'Qua',status:'evidence-only',platformRevenue:352.80,completedTrips:18,observedRideKm:102.29,observedRideHours:5.4247,observedTotalKm:245,observedWorkHours:13.3333,odometerKm:97834,excludeFromPredictive:true,
    note:'Jornada mista: Uber R$ 257,80 em 15 viagens + particulares R$ 95,00. 245 km e 13h20 totais incluem cerca de 1h/7 km pessoais e ~4h na Alpina; não comparar diretamente com dias operacionais puros.'
  }
];

export const privatePricingPolicy = {
  version: 'v1',
  effectiveFrom: '2026-08-16',
  basePerKm: 4.5,
  scheduledMinimum: 70,
  reservationFee: 15,
  waitingToleranceMin: 10,
  waitingPerMin: 1,
  additionalScheduledStop: 10,
  specialHours: '22h–6h',
  specialHoursSurchargePct: 20,
  tollsAndParking: 'valor integral',
  routeChange: 'recalcular quando houver alteração relevante',
  noShow: 'pode chegar a 100% do serviço',
  emptyReturnRule: 'não considerar retorno vazio quando a operação continua após o desembarque'
} as const;

export const privatePipeline = [
  {
    serviceDate: '2026-09-15',
    label: 'CASV',
    appointment: '07:30',
    provisionalPickup: '06:00',
    destination: 'Av. José Maria Whitaker, 370',
    informedDistanceKm: 21.5,
    quotedValue: 110,
    status: 'Orçamento enviado',
    trafficReviewAround: '08/09/2026'
  },
  {
    serviceDate: '2026-09-21',
    label: 'Consulado dos EUA',
    appointment: '07:00',
    provisionalPickup: '05:30',
    destination: 'Rua Henri Dunant, 500',
    informedDistanceKm: 13.5,
    quotedValue: 85,
    status: 'Orçamento enviado',
    trafficReviewAround: '14/09/2026'
  }
] as const;

export const dataHealth = {
  refreshedAt: '2026-10-02T14:23:00-03:00',
  lastCompleteClosing: '2026-09-16',
  latestEvidenceDate: '2026-09-30',
  supabaseStatus: 'INACTIVE_LIMIT',
  supabaseCompleteThrough: '2026-09-16',
  canonicalSheetThrough: '2026-09-16',
  sourceStatus: 'PARCIAL_RECONCILIAR',
  backendBlockingReason: 'Supabase motoristaops inativo; reativação bloqueada pelo limite de 2 projetos free ativos na organização.',
  missingClosingDates: ['2026-09-17','2026-09-18','2026-09-19','2026-09-20','2026-09-23','2026-09-26','2026-09-27','2026-09-28','2026-09-29','2026-09-30'],
  historicalMissingDates: ['2026-08-14','2026-08-15']
} as const;
