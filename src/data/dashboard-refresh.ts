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
    observedMinimum: true,
    note: 'Evidência parcial: o print final confirma pelo menos R$ 34,96 em duas corridas visíveis (R$ 15,64 e R$ 19,32), mas há uma corrida anterior cortada no topo. Não tratar como fechamento diário completo.'
  },
  {
    date: '2026-08-13',
    dateBR: '13/08/2026',
    label: 'Qui',
    status: 'evidence-only',
    platformRevenue: 237.23,
    paidEntries: 10,
    completedTrips: 10,
    unpaidCancellations: 1,
    note: 'Sequência de prints de 04:01 a 10:49 fecha a lista do dia: dez corridas pagas somando R$ 237,23 e um cancelamento sem pagamento. Horas totais, km rodados do veículo, particular e custos ainda não foram confirmados.'
  },
  {
    date: '2026-08-14',
    dateBR: '14/08/2026',
    label: 'Sex',
    status: 'missing',
    note: 'Nenhum fechamento ou sequência de ganhos confirmada foi localizada. O painel deve mostrar a lacuna, não assumir zero.'
  },
  {
    date: '2026-08-15',
    dateBR: '15/08/2026',
    label: 'Sáb',
    status: 'missing',
    note: 'Nenhum fechamento ou sequência de ganhos confirmada foi localizada. O painel deve mostrar a lacuna, não assumir zero.'
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
    note: 'Sequência completa de prints encerra em “Fim das atividades”: 19 corridas concluídas, uma taxa de cancelamento paga de R$ 3,91 e um cancelamento sem pagamento. Total observado no app: R$ 418,03. Falta consolidar horas, km totais e custos.'
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
    note: 'Fechamento de ganhos localizado até “Fim das atividades”: 24 corridas concluídas, uma taxa de cancelamento paga de R$ 4,19 e um cancelamento sem pagamento. Total observado no app: R$ 437,41. Ainda falta o fechamento operacional com horas, km, combustível e demais receitas/custos.'
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
  refreshedAt: '2026-08-17T21:40:00-03:00',
  lastCompleteClosing: '2026-08-11',
  latestEvidenceDate: '2026-08-17',
  supabaseStatus: 'ACTIVE_HEALTHY',
  supabaseCompleteThrough: '2026-07-30',
  missingClosingDates: ['2026-08-14', '2026-08-15']
} as const;
