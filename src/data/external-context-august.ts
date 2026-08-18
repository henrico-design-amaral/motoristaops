export type ExternalSignalKind = 'cet' | 'accident' | 'work' | 'event' | 'weather' | 'airport' | 'news';
export type ExternalSignalStatus = 'confirmed' | 'not-located' | 'pending';

export type ExternalContextEvidence = {
  id: string;
  date: string;
  type: 'event' | 'traffic' | 'weather' | 'news' | 'airport';
  signalKind: ExternalSignalKind;
  status: ExternalSignalStatus;
  region: string;
  regions: string[];
  corridors?: string[];
  timeWindow?: string;
  startMinute?: number;
  endMinute?: number;
  label: string;
  relevance: 'direct' | 'possible' | 'background' | 'unknown';
  severity: 0 | 1 | 2 | 3;
  confidence: 'high' | 'medium' | 'low' | 'unknown';
  note: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export const externalContextAugust: ExternalContextEvidence[] = [
  {
    id:'1308-latbus',date:'2026-08-13',type:'event',signalKind:'event',status:'confirmed',region:'São Paulo Expo · Água Funda',regions:['São Paulo Expo','Água Funda','Jabaquara'],corridors:['Rodovia dos Imigrantes'],timeWindow:'dia',
    label:'LAT.BUS 2026 — último dia',relevance:'background',severity:1,confidence:'high',
    note:'A feira LAT.BUS ocorreu de 11 a 13/08 no São Paulo Expo. Entra como sinal potencial de demanda no eixo Água Funda/Imigrantes; não é usada como explicação causal do resultado do dia.',
    sourceLabel:'LAT.BUS 2026',sourceUrl:'https://www.latbus2026.com.br/'
  },
  {
    id:'1308-cet',date:'2026-08-13',type:'traffic',signalKind:'cet',status:'not-located',region:'São Paulo',regions:['São Paulo'],
    label:'Ocorrência CET específica',relevance:'unknown',severity:0,confidence:'unknown',
    note:'Nenhuma ocorrência CET suficientemente específica e verificável foi localizada para os corredores percorridos. O estado permanece desconhecido em vez de inferir congestionamento pela duração das viagens.'
  },
  {
    id:'1308-weather',date:'2026-08-13',type:'weather',signalKind:'weather',status:'pending',region:'São Paulo',regions:['São Paulo'],
    label:'Chuva e condição meteorológica horária',relevance:'unknown',severity:0,confidence:'unknown',
    note:'A ingestão meteorológica horária ainda não foi reconciliada com fonte histórica confiável. O schema já reserva precipitação/condição por faixa sem preencher valor especulativo.'
  },
  {
    id:'1308-airport',date:'2026-08-13',type:'airport',signalKind:'airport',status:'pending',region:'Congonhas',regions:['Congonhas','Campo Belo'],
    label:'Operação de Congonhas',relevance:'possible',severity:0,confidence:'unknown',
    note:'Há corridas tocando Congonhas no dataset, mas atraso/cancelamento de voos histórico ainda não foi localizado em fonte que permita reconciliação horária. Aena é mantida como fonte operacional de referência.',
    sourceLabel:'Aena Brasil — Congonhas',sourceUrl:'https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html'
  },
  {
    id:'1608-achiropita',date:'2026-08-16',type:'event',signalKind:'event',status:'confirmed',region:'Bela Vista · Bixiga',regions:['Bela Vista','Bixiga','Centro','Sé','Consolação'],corridors:['Rua Treze de Maio','Rua Doutor Luís Barreto','Rua São Vicente'],timeWindow:'14:00–24:00',startMinute:840,endMinute:1440,
    label:'100ª Festa de Nossa Senhora Achiropita',relevance:'possible',severity:2,confidence:'high',
    note:'A CET informou interdições em todos os fins de semana de agosto, das 14h às 24h. A operação do motorista passou por Centro/Sé/Jardins no período; o efeito é medido como associação observada, não causalidade.',
    sourceLabel:'Prefeitura de São Paulo / CET',sourceUrl:'https://prefeitura.sp.gov.br/web/prefeitura-de-sao-paulo/w/confira-as-mudan%C3%A7as-no-tr%C3%A2nsito-da-bela-vista-para-100%C2%AA-festa-de-nossa-senhora-achiropita'
  },
  {
    id:'1608-election',date:'2026-08-16',type:'news',signalKind:'news',status:'confirmed',region:'São Paulo · cidade',regions:['São Paulo'],timeWindow:'dia',
    label:'Início da propaganda eleitoral 2026',relevance:'background',severity:1,confidence:'high',
    note:'16/08 marca o início legal da propaganda eleitoral, incluindo possibilidade de caminhadas, carreatas e comícios. É contexto de cidade e só deve ganhar peso quando houver evidência local de ato/evento na rota.',
    sourceLabel:'Tribunal Superior Eleitoral',sourceUrl:'https://www.tse.jus.br/legislacao/codigo-eleitoral/normas-editadas-pelo-tse/resolucao-n-23759-de-2-de-marco-de-2026-brasilia-df'
  },
  {
    id:'1608-weather',date:'2026-08-16',type:'weather',signalKind:'weather',status:'pending',region:'São Paulo',regions:['São Paulo'],
    label:'Chuva e condição meteorológica horária',relevance:'unknown',severity:0,confidence:'unknown',
    note:'Pendente de reconciliação com observação histórica horária. Não há valor preenchido por inferência.'
  },
  {
    id:'1608-airport',date:'2026-08-16',type:'airport',signalKind:'airport',status:'pending',region:'Congonhas',regions:['Congonhas','Campo Belo','Jardim Aeroporto'],
    label:'Operação de Congonhas',relevance:'possible',severity:0,confidence:'unknown',
    note:'O dia contém deslocamentos no eixo aeroporto, mas a situação operacional de voos por faixa ainda não foi reconciliada.',
    sourceLabel:'Aena Brasil — Congonhas',sourceUrl:'https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html'
  },
  {
    id:'1708-cet',date:'2026-08-17',type:'traffic',signalKind:'cet',status:'not-located',region:'São Paulo',regions:['São Paulo'],
    label:'Ocorrência CET específica',relevance:'unknown',severity:0,confidence:'unknown',
    note:'A busca atual não localizou ocorrência oficial específica que possa ser ligada com segurança às rotas de 17/08. A matriz conserva o campo como desconhecido.'
  },
  {
    id:'1708-weather',date:'2026-08-17',type:'weather',signalKind:'weather',status:'pending',region:'São Paulo',regions:['São Paulo'],
    label:'Chuva e condição meteorológica horária',relevance:'unknown',severity:0,confidence:'unknown',
    note:'Pendente de reconciliação com observação histórica horária. Não há valor preenchido por inferência.'
  },
  {
    id:'1708-airport',date:'2026-08-17',type:'airport',signalKind:'airport',status:'pending',region:'Congonhas',regions:['Congonhas','Campo Belo'],
    label:'Operação de Congonhas',relevance:'possible',severity:0,confidence:'unknown',
    note:'Há corrida para Congonhas no histórico, porém a situação de chegadas/partidas e atrasos do aeroporto ainda não foi reconstruída por faixa.',
    sourceLabel:'Aena Brasil — Congonhas',sourceUrl:'https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html'
  }
];

export const contextByDate = (date:string) => externalContextAugust.filter(item=>item.date===date);
export const confirmedContextAugust = externalContextAugust.filter(item=>item.status==='confirmed');
