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
  refreshedAt: '2026-08-17T22:00:00-03:00',
  lastCompleteClosing: '2026-08-11',
  latestEvidenceDate: '2026-08-17',
  supabaseStatus: 'ACTIVE_HEALTHY',
  supabaseCompleteThrough: '2026-08-11',
  missingClosingDates: ['2026-08-14', '2026-08-15']
} as const;
