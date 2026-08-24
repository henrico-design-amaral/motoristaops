# MotoristaOps — Project Control

## Objetivo

Operar o ecossistema MotoristaOps como uma estrutura integrada de presença pública, operação do motorista e distribuição de conteúdo. O produto possui frentes distintas, com objetivos próprios, mas conectadas pela mesma marca, dados, identidade e estratégia.

O MotoristaOps deve permitir que Henrico seja encontrado, compreendido e contratado na frente pública; que a rotina profissional seja registrada, analisada e melhorada na frente operacional; e que a presença digital seja distribuída de forma consistente na frente de Social Media.

## Fonte de verdade

- Código: repositório `henrico-design-amaral/motoristaops`.
- Produção: branch `main`.
- Contrato de contexto: `PROJECT_CONTEXT.md`.
- Bootstrap de executores: `AGENTS.md` e `CLAUDE.md`.
- Continuidade: `HANDOFF.md`.
- Trabalho ativo: `TASKS.md`.
- Decisões duráveis: `DECISIONS.md`.
- Autoridade/contrato visual: `DESIGN.md`.
- Loop de execução: `docs/orchestrator/LOOP_EXECUTION.md`.
- Plano de domínio: `docs/domain-migration.md`.
- GitHub é a fonte de verdade do código e da governança versionada; Google Drive é autoridade complementar para materiais/referências/documentos deliberadamente mantidos fora do Git conforme o registry do HenricoOPS.

Chat, provider memory e auto-memory não substituem essas autoridades.

## Arquitetura oficial do MotoristaOps

### Domínios canônicos

- Landing Page pública: `https://www.motoristaops.com.br/`.
- Domínio raiz: `https://motoristaops.com.br/` com redirecionamento permanente para `https://www.motoristaops.com.br/`.
- Dashboard operacional: `https://dashboard.motoristaops.com.br/`.
- GitHub Pages não é autoridade de publicação e seu workflow full-build legado foi aposentado.
- Endereços anteriores em `henrico.works` não são destinos canônicos do MotoristaOps.

### 1. Landing Page — Motorista

Frente pública e comercial.

Responsabilidades:

- apresentar Henrico Amaral como motorista particular e motorista de aplicativo;
- comunicar o posicionamento `Levando pessoas, cuidando de histórias.`;
- concentrar links e pontos de contato relevantes;
- converter interesse em contato direto, principalmente pelo WhatsApp;
- apresentar serviços como corridas particulares, aeroportos, rodoviárias, reuniões, eventos, compromissos e viagens;
- sustentar confiança por comunicação clara, discrição, cuidado, pontualidade e experiência real;
- funcionar como destino principal para QR Codes, cartão, Google, Instagram e descoberta pública;
- manter linguagem visual minimalista, premium, autoral e de alto impacto, sem excesso de conteúdo ou estética promocional genérica;
- preservar coerência com o ecossistema sem assumir identidade ou layout de outro projeto.

Direção:

- minimalista, mas não neutra;
- impacto por hierarquia, tipografia, contraste, ritmo, espaço e narrativa;
- mobile como experiência de primeira classe;
- WhatsApp persistentemente acessível como ação principal;
- prova social e redes sem competir com o CTA principal;
- endereço definitivo `www.motoristaops.com.br`;
- a Landing não depende de rotas internas do Dashboard.

A escolha concreta de logo, tipografia, paleta, composição, imagens e assinatura visual deve ser resolvida por `DESIGN.md` e pelas autoridades atuais apontadas por ele. Direções históricas não vencem decisões visuais posteriores.

### 2. Dashboard — MotoristaOps

Frente operacional, financeira e estratégica do trabalho como motorista.

Responsabilidades:

- fechamento diário;
- receitas por plataforma e corridas particulares;
- horas online e em corrida;
- quilômetros totais e com passageiro;
- despesas operacionais e pessoais relevantes;
- abastecimentos, consumo, custo de combustível e veículo;
- metas, eficiência e indicadores de desempenho;
- importação assistida de dados da Uber;
- histórico e rastreabilidade das importações;
- anexos e prints relevantes ao fechamento;
- integração/sincronização com a planilha MotoristaOps;
- leitura estratégica da operação e evolução histórica.

Escopo estratégico:

- dashboards executivo, financeiro, operacional, estratégico, tributário, manutenção e combustível;
- metas, previsões, sazonalidade, comparação Uber x 99, horários, regiões/mapas e fluxo de caixa;
- despesas, patrimônio, custo/km, lucro líquido, reservas e impostos;
- OCR/IA assistiva e recomendações;
- fechamentos diário, semanal, mensal e anual;
- Excel bidirecional, PDFs Uber/99, anexos, histórico, filtros, busca, múltiplos veículos, backup, auditoria e configurações.

Regras:

- o dashboard **não exige autenticação/login por padrão**, conforme `DECISIONS.md`; ausência de login não é defeito;
- nenhum vídeo da Uber deve ser enviado a terceiros pelo importador;
- processamento de vídeo/OCR permanece local salvo decisão explícita posterior;
- nenhum dado importado é persistido sem revisão humana;
- deduplicação, datas, valores e origem precisam ser rastreáveis;
- o Dashboard é uma frente de primeira classe e não é subordinado à Landing;
- endereço definitivo `dashboard.motoristaops.com.br`;
- mudanças de infraestrutura devem preservar rotas e funcionalidades operacionais.

### 3. Social Media — Motorista

Frente de distribuição, presença e relacionamento.

Responsabilidades:

- conteúdos de apresentação, bastidores, rotina, experiência, confiança e serviço;
- comunicação das ocasiões de uso do serviço;
- peças coerentes com a identidade pública aprovada;
- reaproveitamento responsável sem transformar a marca em feed genérico;
- tráfego para Landing/WhatsApp;
- consistência verbal e visual;
- crescimento de conexão e reconhecimento, não apenas volume.

Social Media amplia confiança e descoberta. Não é uma identidade independente nem uma extensão visual do Dashboard.

## Relação entre as frentes

- Landing apresenta, organiza e converte.
- Social gera descoberta, recorrência e conexão.
- Dashboard administra, mede e melhora a operação.
- As frentes compartilham estratégia e brand anchors, mas não precisam compartilhar interface ou densidade.
- Mudanças em uma frente não devem provocar regressões nas outras.

## Contrato operacional de contexto

Antes de qualquer tarefa relevante:

1. resolver projeto/superfície e autoridade atual;
2. resolver output modality;
3. resolver estágio atual e próximo permitido;
4. registrar escopo e non-goals;
5. resolver `DESIGN.md` para trabalho visual;
6. resolver decisão e baseline aprovada quando aplicável;
7. executar apenas o estágio autorizado;
8. validar antes de commit/PR/release;
9. persistir decisão/handoff quando o estado durável mudar.

Exploração não implica implementação. Implementação não implica publicação. Aprovação de uma seção não autoriza redesign das demais.

## Estratégia de domínio/publicação

- Landing e Dashboard usam builds/artefatos separados.
- O workflow canônico de deploy por domínios é a autoridade de publicação.
- Deploy é manual/controlado e deve executar validação de dados, análise estática, security gate, build e smoke test.
- GitHub Pages full-build e o deploy Hostinger full-build legado não devem ser restaurados como atalhos.
- Alterações de DNS/publicação precisam manter rollback e não devem ser misturadas com redesign ou feature não relacionada.

## Regras centrais

- Nunca trabalhar diretamente na `main`.
- Uma branch por objetivo e um PR por escopo.
- Não misturar governança e implementação funcional no mesmo PR.
- Mudanças seguem branch -> validação -> PR -> merge.
- Resolver contexto, modalidade e estágio antes de implementar.
- Antes de visual, resolver autoridade visual; HVS é quality floor, não estética padrão.
- Artefato visual aprovado usado como fonte exige fidelidade declarada e validação contra a baseline.
- Antes de concluir UI, executar gates aplicáveis e QA visual desktop/mobile.
- Nenhuma frente pode ser degradada para acelerar outra.
- Corrigir/refazer somente o escopo autorizado com precisão.
- Toda migração de infraestrutura deve manter rollback.

## Critério de qualidade

MotoristaOps deve ser funcional, controlado e visualmente inevitável. Na frente pública, isso significa experiência memorável, específica e capaz de gerar conexão. Na frente operacional, clareza e capacidade real de decisão. Na frente social, consistência e ligação com o serviço real. A qualidade deve ser reproduzível entre executores a partir de contexto durável, não de memória de conversa.
