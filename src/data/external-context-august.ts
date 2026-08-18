export type ExternalContextEvidence = {
  date: string;
  type: 'event' | 'traffic' | 'weather' | 'news';
  status: 'confirmed' | 'not-located' | 'pending';
  region: string;
  timeWindow?: string;
  label: string;
  relevance: 'direct' | 'possible' | 'background' | 'unknown';
  note: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export const externalContextAugust: ExternalContextEvidence[] = [
  {
    date:'2026-08-13',type:'event',status:'confirmed',region:'São Paulo Expo · Rodovia dos Imigrantes',timeWindow:'dia',
    label:'LAT.BUS 2026 — último dia',relevance:'background',
    note:'A feira LAT.BUS ocorreu de 11 a 13/08 no São Paulo Expo. O evento entra como sinal de demanda potencial, mas não há evidência suficiente para atribuir a ele o resultado operacional de 13/08.',
    sourceLabel:'LAT.BUS 2026',sourceUrl:'https://www.latbus2026.com.br/'
  },
  {
    date:'2026-08-13',type:'traffic',status:'not-located',region:'São Paulo',
    label:'Trânsito histórico CET',relevance:'unknown',
    note:'Nenhuma ocorrência CET suficientemente específica e verificável foi localizada para os corredores percorridos neste dia. Manter como desconhecido em vez de inferir congestionamento pelas durações.'
  },
  {
    date:'2026-08-16',type:'event',status:'confirmed',region:'Bela Vista · Bixiga',timeWindow:'14:00–24:00',
    label:'100ª Festa de Nossa Senhora Achiropita',relevance:'possible',
    note:'A CET informou interdições em todos os fins de semana de agosto durante a festa. Em 16/08, a operação passou por Centro/Sé/Jardins; o evento é contexto regional relevante, mas seu impacto financeiro ou de tempo não é tratado como causalidade comprovada.',
    sourceLabel:'Prefeitura de São Paulo / CET',sourceUrl:'https://prefeitura.sp.gov.br/web/prefeitura-de-sao-paulo/w/confira-as-mudan%C3%A7as-no-tr%C3%A2nsito-da-bela-vista-para-100%C2%AA-festa-de-nossa-senhora-achiropita'
  },
  {
    date:'2026-08-17',type:'traffic',status:'not-located',region:'São Paulo',
    label:'Trânsito histórico CET',relevance:'unknown',
    note:'A busca atual não encontrou ocorrência oficial específica que possa ser ligada com segurança às rotas de 17/08. A matriz conserva o campo como desconhecido até haver evidência por corredor/faixa.'
  }
];

export const contextByDate = (date:string) => externalContextAugust.filter(item=>item.date===date);
