# MotoristaOps — Project Control

## Objetivo

Operar o ecossistema MotoristaOps como uma estrutura integrada de presença pública, operação do motorista e distribuição de conteúdo. O produto possui frentes distintas, com objetivos próprios, mas conectadas pela mesma marca, dados, identidade e estratégia.

O MotoristaOps deve permitir que Henrico seja encontrado, compreendido e contratado na frente pública; que a rotina profissional seja registrada, analisada e melhorada na frente operacional; e que a presença digital seja distribuída de forma consistente na frente de Social Media.

## Fonte de verdade

- Código: repositório `henrico-design-amaral/motoristaops`
- Produção: branch `main`
- Governança versionada atual: `PROJECT_CONTROL.md`, `AGENTS.md`, `HANDOFF.md`
- Plano de migração de domínio: `docs/domain-migration.md`
- Documentos citados pela governança, mas atualmente ausentes da árvore versionada: `TASKS.md`, `DECISIONS.md`, `DESIGN.md` e `docs/orchestrator/LOOP_EXECUTION.md`
- GitHub é a fonte de verdade do código; Drive pode ser entrada/espelho operacional para mídias e documentos.

## Arquitetura oficial do MotoristaOps

### Domínios canônicos

- Landing Page pública: `https://www.motoristaops.com.br/`
- Domínio raiz: `https://motoristaops.com.br/` com redirecionamento permanente para `https://www.motoristaops.com.br/`
- Dashboard operacional: `https://dashboard.motoristaops.com.br/`
- GitHub Pages permanece apenas como origem legada/fallback durante a migração e não é o endereço canônico final.
- Endereços anteriores em `henrico.works` deixam de ser destinos canônicos do MotoristaOps.

### 1. Landing Page — Motorista

Frente pública e comercial, com prioridade atual levemente superior às demais até que sua experiência, publicação e conversão estejam claramente validadas.

Responsabilidades:

- apresentar Henrico Amaral como motorista particular e motorista de aplicativo;
- comunicar o posicionamento `Levando pessoas, cuidando de histórias.`;
- concentrar links e pontos de contato relevantes;
- converter interesse em contato direto, principalmente pelo WhatsApp;
- apresentar serviços como corridas particulares, aeroportos, rodoviárias, reuniões, eventos, compromissos e viagens;
- sustentar confiança por meio de comunicação clara, atendimento direto, discrição, cuidado, pontualidade e experiência real nas ruas;
- funcionar como destino principal para QR Codes, cartão, Google, Instagram e demais pontos de descoberta;
- permitir que a pessoa salve o contato, acesse as redes sociais e encontre com facilidade a avaliação no Google quando os links oficiais estiverem cadastrados;
- manter linguagem visual minimalista, premium, autoral e de alto impacto, sem excesso de conteúdo ou estética promocional genérica;
- preservar coerência com o ecossistema `henrico.works`, sem criar uma identidade paralela desconectada.

Direção de produto e visual:

- minimalista, mas não neutra;
- gerar impacto com hierarquia, tipografia, contraste, ritmo, espaço e narrativa, não com excesso de elementos;
- tipografia limpa, sóbria, simples e de leitura imediata, na linha de Helvetica/Verdana/sans-serif funcional, evitando grafismos tipográficos desnecessários;
- dourado deve ser elegante e mais opaco, nunca amarelo vivo ou metálico exagerado;
- o preto deve seguir a identidade escura já definida, evitando preto puro quando possível;
- cada bloco deve justificar sua presença e contribuir para confiança, conexão ou conversão;
- mobile é uma experiência de primeira classe;
- WhatsApp deve permanecer fixo ou persistentemente acessível, como ação principal;
- Google/avaliações e redes sociais devem ganhar destaque suficiente para gerar prova social e conexão, sem competir com o CTA principal;
- o endereço público definitivo é `www.motoristaops.com.br`;
- a Landing Page não deve depender de rotas internas do Dashboard nem permanecer subordinada a `/motorista/` na arquitetura final.

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

Escopo estratégico já definido para evolução do dashboard:

- dashboards executivo, financeiro, operacional, estratégico, tributário, manutenção e combustível;
- metas, previsões, sazonalidade, comparação Uber x 99, horários, regiões/mapas e fluxo de caixa;
- despesas, patrimônio, custo/km, lucro líquido, reservas e impostos;
- OCR/IA assistiva e recomendações;
- fechamentos diário, semanal, mensal e anual;
- Excel bidirecional, PDFs Uber/99, prints, anexos, histórico, filtros, busca, múltiplos veículos, backup, auditoria e configurações.

Regras de dados:

- nenhum vídeo da Uber deve ser enviado a terceiros pelo importador;
- processamento de vídeo/OCR permanece local salvo decisão explícita posterior;
- nenhum dado importado é persistido sem revisão humana;
- deduplicação, datas, valores e origem precisam ser rastreáveis;
- o dashboard não deve ser subordinado à Landing Page: é uma frente de primeira classe com ciclo próprio de evolução;
- o endereço operacional definitivo é `dashboard.motoristaops.com.br`;
- a migração do Dashboard deve preservar todas as rotas e funcionalidades operacionais antes do corte de DNS.

### 3. Social Media — Motorista

Frente de distribuição, presença e relacionamento que alimenta a descoberta da Landing Page e reforça o posicionamento do serviço. Crescimento nas redes sociais é objetivo explícito desta frente.

Responsabilidades:

- Instagram e demais canais sociais definidos para o serviço de motorista;
- conteúdos de apresentação, bastidores, rotina, experiência, confiança e serviço;
- comunicação de ocasiões de uso: aeroportos, reuniões, eventos, viagens e corridas particulares;
- peças digitais coerentes com a identidade da Landing Page, cartão, placa e materiais do carro;
- reaproveitamento responsável de conteúdo entre canais sem transformar a marca em feed genérico;
- direcionamento de tráfego para a Landing Page e para o WhatsApp;
- incentivo a avaliações no Google como prova social quando o link oficial estiver cadastrado;
- consistência de tom, slogan, assinatura visual e proposta de valor;
- crescimento de conexão e reconhecimento, não apenas volume de postagem.

Princípio editorial:

Social Media não é uma frente isolada de postagem. Ela existe para ampliar confiança, presença e descoberta, conduzindo o usuário para contato ou para a Landing Page. O conteúdo deve parecer extensão da experiência do motorista, não publicidade de varejo.

## Relação entre as frentes

- Landing Page vende, apresenta e organiza o serviço público.
- Social Media gera descoberta, recorrência, conexão e contexto para a marca pública.
- Dashboard administra, mede e melhora a operação que sustenta a promessa pública.
- As três frentes compartilham identidade e estratégia, mas não compartilham necessariamente a mesma interface ou densidade de informação.
- Mudanças em uma frente não devem provocar regressões nas outras.

## Estratégia de migração de domínio

A migração para `motoristaops.com.br` deve seguir uma sequência reversível:

1. registrar a arquitetura canônica e o plano de migração;
2. separar os artefatos de build/deploy da Landing Page e do Dashboard;
3. publicar e validar os dois destinos na infraestrutura de hospedagem sem alterar DNS público;
4. validar links, assets, rotas, HTTPS, mobile, smoke tests e ausência de regressões;
5. apontar `www.motoristaops.com.br` para a Landing Page e `dashboard.motoristaops.com.br` para o Dashboard;
6. configurar `motoristaops.com.br` para redirecionamento permanente a `www.motoristaops.com.br`;
7. manter GitHub Pages como fallback durante a janela de estabilização;
8. somente após estabilidade comprovada, configurar redirecionamentos das URLs legadas.

DNS não deve ser alterado antes da validação dos dois destinos de produção.

## Prioridade atual

Executar a migração de arquitetura e domínio sem degradar Landing Page ou Dashboard. O trabalho visual e funcional continua separado da mudança de infraestrutura.

### Landing Page — próximo foco

1. preparar build independente para `www.motoristaops.com.br`;
2. eliminar dependência canônica da rota `/motorista/`;
3. validar arquitetura de URL e links internos;
4. validar desktop e mobile;
5. manter WhatsApp persistente;
6. consolidar pontos de contato, redes sociais e avaliações;
7. publicar no destino novo antes do corte de DNS;
8. validar conversão e estabilidade após o cutover.

### Dashboard — próximo foco

1. preparar build independente para `dashboard.motoristaops.com.br`;
2. preservar todas as rotas operacionais existentes;
3. manter funcionando enquanto a Landing Page é migrada;
4. continuar histórico/importação Uber;
5. melhorar parser e clareza de confiança/duplicatas;
6. integrar anexos ao fechamento diário;
7. continuar sincronização com a planilha MotoristaOps;
8. preservar e evoluir leitura financeira e estratégica.

### Social Media — próximo foco

1. consolidar os canais e links oficiais usados pela Landing Page;
2. organizar pilares de conteúdo alinhados ao serviço real;
3. manter identidade visual e verbal coerente com a Landing Page e materiais do carro;
4. reforçar Google/avaliações e redes sociais como elementos de confiança;
5. usar `www.motoristaops.com.br` e o WhatsApp como destinos de conversão após o cutover.

## Regras centrais

- Nunca trabalhar diretamente na `main`.
- Uma branch por objetivo.
- Um PR por escopo.
- Não misturar governança e implementação funcional no mesmo PR.
- Mudanças seguem branch → validação → PR → merge.
- Antes de implementar, revisar escopo, governança existente, referências e risco de regressão.
- Antes de concluir layout, executar Visual QA Gate para container, grid, tipografia, espaçamento, hierarquia, responsividade, contraste, consistência e screenshots desktop/mobile.
- Nenhuma frente pode ser degradada para acelerar outra.
- Não reaproveitar código experimental ou legado apenas por conveniência.
- Se uma parte estiver ruim, corrigir ou refazer somente aquela parte com precisão, sem reescrever o restante do projeto.
- Não realizar cutover de DNS no mesmo PR que introduz a separação inicial de build/deploy.
- Toda migração de infraestrutura deve manter caminho explícito de rollback.

## Critério de qualidade

MotoristaOps deve ser funcional, controlado e visualmente inevitável. Na frente pública, isso significa uma experiência minimalista, memorável e capaz de gerar conexão imediata. Na frente operacional, significa clareza, confiabilidade e capacidade real de decisão. Na frente social, significa consistência, reconhecimento e ligação direta com o serviço real.
