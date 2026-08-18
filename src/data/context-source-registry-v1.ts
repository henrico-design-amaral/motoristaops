export type ContextSourceStatus = 'confirmed-data' | 'source-found' | 'access-blocked' | 'not-located' | 'pending-reconciliation';

export type ContextSourceRecord = {
  id: string;
  kind: 'weather' | 'cet' | 'airport' | 'event' | 'news';
  date?: string;
  region: string;
  source: string;
  sourceUrl: string;
  status: ContextSourceStatus;
  usableNow: boolean;
  timeGranularity: 'hour' | 'window' | 'day' | 'month' | 'unknown';
  note: string;
};

export const contextSourceRegistryV1: ContextSourceRecord[] = [
  {
    id:'weather-cge',kind:'weather',region:'São Paulo',source:'CGE Prefeitura de São Paulo',sourceUrl:'https://cge.prefeitura.sp.gov.br/v3/noticias.jsp',status:'source-found',usableNow:false,timeGranularity:'hour',
    note:'Fonte oficial prioritária para chuva, temperatura, umidade, rajadas e alagamentos. O portal mantém notícias e estações automáticas, mas os registros específicos de 13, 16 e 17/08/2026 ainda não foram reconciliados em série horária no dataset.'
  },
  {
    id:'weather-inmet',kind:'weather',region:'São Paulo',source:'INMET',sourceUrl:'https://tempo.inmet.gov.br/CondicoesTempoRegistradas',status:'source-found',usableNow:false,timeGranularity:'day',
    note:'Fonte oficial complementar. A página de condições registradas expõe temperatura, umidade e chuva por capital; o recorte histórico necessário ainda precisa ser extraído para os dias-alvo antes de virar feature operacional.'
  },
  {
    id:'cet-1608-achiropita',kind:'cet',date:'2026-08-16',region:'Bela Vista · Bixiga',source:'Prefeitura de São Paulo / CET',sourceUrl:'https://prefeitura.sp.gov.br/web/prefeitura-de-sao-paulo/w/confira-as-mudan%C3%A7as-no-tr%C3%A2nsito-da-bela-vista-para-100%C2%AA-festa-de-nossa-senhora-achiropita',status:'confirmed-data',usableNow:true,timeGranularity:'window',
    note:'Interdições confirmadas em todos os fins de semana de agosto, das 14h às 24h, no entorno da Rua Treze de Maio, Rua Doutor Luís Barreto e Rua São Vicente. Já pode ser casado com janelas que passam por Bela Vista/Centro.'
  },
  {
    id:'cet-1308-specific',kind:'cet',date:'2026-08-13',region:'corredores percorridos',source:'Prefeitura de São Paulo / CET',sourceUrl:'https://prefeitura.sp.gov.br/web/secretaria_executiva_de_transporte_e_mobilidade_urbana/noticias',status:'not-located',usableNow:false,timeGranularity:'unknown',
    note:'Nenhuma ocorrência oficial específica foi localizada para os corredores do dia com nível de detalhe suficiente para associação temporal/regional. O estado permanece desconhecido.'
  },
  {
    id:'cet-1708-specific',kind:'cet',date:'2026-08-17',region:'corredores percorridos',source:'Prefeitura de São Paulo / CET',sourceUrl:'https://prefeitura.sp.gov.br/web/secretaria_executiva_de_transporte_e_mobilidade_urbana/noticias',status:'not-located',usableNow:false,timeGranularity:'unknown',
    note:'Nenhuma ocorrência oficial específica foi localizada para os corredores do dia com nível de detalhe suficiente. Não é interpretado como trânsito normal.'
  },
  {
    id:'airport-aena-flight-search',kind:'airport',region:'Congonhas',source:'Aena Brasil — informações de voos',sourceUrl:'https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html',status:'source-found',usableNow:false,timeGranularity:'hour',
    note:'A fonte oficial permite pesquisa por data e faixa horária, mas o histórico dos dias-alvo ainda não foi materializado em um dataset reproduzível para chegadas, partidas, atrasos e cancelamentos.'
  },
  {
    id:'airport-aena-pdo',kind:'airport',region:'Congonhas',source:'Aena Brasil — PDO operações realizadas/canceladas',sourceUrl:'https://www.aenabrasil.com.br/pt/corporativo/monitoramento_slot.html',status:'access-blocked',usableNow:false,timeGranularity:'day',
    note:'A Aena informa publicamente que disponibiliza PDO de operações realizadas/canceladas. O arquivo subjacente redireciona para SharePoint com autenticação, então o dataset não pôde ser ingerido automaticamente nesta etapa.'
  },
  {
    id:'event-1308-latbus',kind:'event',date:'2026-08-13',region:'São Paulo Expo · Água Funda',source:'LAT.BUS 2026',sourceUrl:'https://www.latbus2026.com.br/',status:'confirmed-data',usableNow:true,timeGranularity:'day',
    note:'Último dia da feira LAT.BUS 2026 no São Paulo Expo. Entra como sinal de demanda potencial no eixo Água Funda/Imigrantes, sem atribuição causal automática.'
  }
];

export const sourceReadinessSummary = {
  total: contextSourceRegistryV1.length,
  usableNow: contextSourceRegistryV1.filter(x=>x.usableNow).length,
  confirmedData: contextSourceRegistryV1.filter(x=>x.status==='confirmed-data').length,
  sourceFound: contextSourceRegistryV1.filter(x=>x.status==='source-found').length,
  accessBlocked: contextSourceRegistryV1.filter(x=>x.status==='access-blocked').length,
  notLocated: contextSourceRegistryV1.filter(x=>x.status==='not-located').length,
  byKind: ['weather','cet','airport','event','news'].map(kind=>({
    kind,
    total: contextSourceRegistryV1.filter(x=>x.kind===kind).length,
    usable: contextSourceRegistryV1.filter(x=>x.kind===kind && x.usableNow).length
  }))
} as const;
