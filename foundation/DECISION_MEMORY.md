# Decision Memory

## Objetivo

Impedir redescoberta, repetição de perguntas e regressão para regras superadas.

## Estados

- **CANONICAL** — obrigatório.
- **APPROVED** — validado para o escopo indicado.
- **EXPERIMENTAL** — pode ser testado; não governa produção geral.
- **DEPRECATED** — preservado por histórico; não usar.
- **REJECTED** — não reutilizar como solução.
- **BLOCKED** — depende de evidência/asset/decisão.
- **HISTORICAL** — contexto sem autoridade atual.

## Precedência

Decisão atual > canonical mais recente > sistema de marca > protocolo de domínio > baseline aprovado > curadoria > histórico > referência externa.

## Registro de correção

Quando o operador corrige uma entrega:

1. identificar se é erro local ou regra reutilizável;
2. localizar a fonte que deveria ter evitado o erro;
3. atualizar a fonte, gate ou failure memory;
4. invalidar versões contraditórias;
5. aplicar a nova regra na próxima execução semelhante.

Não depender apenas da memória conversacional para uma correção estrutural.

## Política anti-stale

Se uma fonte antiga divergir do canon atual:

- não reconciliar por média;
- não escolher a mais detalhada;
- marcar a antiga como histórica/deprecated;
- seguir a autoridade mais recente.

### Regra V12
"Brand Book V12" é uma referência inválida oriunda de documentação antiga. O único nome correto é **Brand Book V2**.

## Reuso

Não perguntar novamente por uma decisão já resolvida se a tarefa estiver dentro do mesmo domínio e nenhuma decisão mais recente a tiver revogado.

## Regra comercial — família

**CANONICAL · PROJECT / MotoristaOPS**

A regra oficial de preço família está em `foundation/FAMILY_PRICING_RULE.md`.

Resumo obrigatório: quando Henrico classificar explicitamente um atendimento como família, calcular primeiro o preço comercial normal e depois um valor família sem margem comercial, cobrindo custos do veículo, tempo dedicado e variação operacional. Família não significa gratuito; valor abaixo do custo é cortesia pessoal, não preço do serviço.

## Propagação para o ecossistema

Toda decisão material registrada aqui é `ecosystem-visible` por padrão.

Classificar em `GLOBAL`, `DOMAIN`, `PROJECT`, `SURFACE` ou `TASK` conforme o padrão canônico do HenricoOPS.

Decisões GLOBAL/DOMAIN devem ser promovidas ao HenricoOPS. Decisões PROJECT/SURFACE permanecem MotoristaOPS, mas o mecanismo reutilizável deve subir quando houver.

Nunca copiar identidade, paleta, logo, pricing, facts ou regras comerciais específicas para outro projeto apenas porque nasceram aqui.


## Seção do novo carro na landing

**APPROVED · SURFACE / landing MotoristaOPS · 2026-10-22**

O proprietário aprovou a versão revisada da seção do Omoda 5 Luxury cinza e autorizou sua aplicação na página pública. Localização editorial: imediatamente após serviços e antes dos argumentos de agendamento no desktop; após serviços e antes da chamada final no mobile. A sequência apresenta primeiro a necessidade atendida, depois o veículo e então a decisão de contato; não implica resultado de conversão mensurado.

Fonte de implementação e evidências: `source/vehicle/README.md`, `source/vehicle/section.html` e `design-qa.md`. As informações atuais do veículo informadas pelo proprietário prevalecem sobre referências históricas ao HB20 para esta seção. Imagens fornecidas continuam identificadas como conceituais. Películas antivandalismo e PPF integral permanecem como preparação prevista até confirmação. Hero, demais textos, metadados, identidade e dashboard são invariantes deste release.

## Correção de largura e proporções da seção do carro

**CANONICAL · SURFACE / landing MotoristaOPS · 2026-10-22**

O proprietário rejeitou a publicação anterior por proporções e largura diferentes da referência. Essa revisão supera o aceite visual anterior. A seção deve compartilhar `.container` (1440 px e mesmos gutters) com o site; galeria e cards não podem ultrapassar as bordas de Serviços por margens negativas. Usar a mesma imagem fornecida, sem redesenhar carro/interior; escala uniforme medida na área útil da referência. Conferir sempre o módulo no contexto das seções adjacentes e nas larguras do site, além da captura isolada. Evidências da correção em `design-qa.md` e `source/vehicle/layout-validation-2026-10-22.json`. Fonte Instrument Sans, fatos confirmados, status previsto e demais invariantes permanecem.

## Substituição integral da landing aprovada

**CANONICAL · SURFACE / landing MotoristaOPS · 2026-10-23**

O operador aprovou a nova landing e autorizou a substituição completa da página pública, sem manter cópia antiga ou ambiente de backup da landing na hospedagem. Fonte única: `source/landing/`; `source/parts`, versões alternativas e workflows legados de promoção foram retirados. Git permanece apenas como infraestrutura técnica já utilizada; não criar branch ou cópia extra de backup. O dashboard e o Brand System são superfícies independentes e permanecem.

Contrato aprovado: somente Instrument Sans (normal/itálico, pesos 400–700, largura 100), nenhum texto editável abaixo de 12 CSS px. Manter hero com identidade e outfit aprovados; “Quem dirige” usa exclusivamente o retrato original, nunca o corpo inteiro. Os textos introdutórios de Serviços, Carro, Processo e FAQ ficam alinhados à direita. Manter remoções dos CTAs do cabeçalho, hero, encerramento do processo e apresentação pessoal. Preservar contato final, links dos serviços e WhatsApp flutuante. Formulário prepara mensagem organizada e revisável; abrir o WhatsApp não envia automaticamente nem confirma reserva.

Omoda 5 Luxury cinza é o veículo apresentado nesta landing; as composições são identificadas como conceituais/ilustrativas, sem pretensão de fotografia documental. PPF e película permanecem previstos. As restrições de hero/textos invariáveis do release anterior de 2026-10-22 estão superadas por esta substituição integral. As regras gerais de outras superfícies não são alteradas.

## Motion na landing

**APPROVED · SURFACE / landing MotoristaOPS · 2026-10-26**

O operador solicitou aplicar todas as sete sugestões: entrada da hero por linhas; cards de serviços em grupos; linha e números no processo; transições da galeria e fechamento do ampliador; abertura/recolhimento da FAQ; resumo de mensagem preparada; aparição/recolhimento contextual do WhatsApp. Sem redesenhar o layout, imagens, rosto/corpo, tipografia ou conteúdo aprovado. A linha do processo acompanha a grade existente, inclusive as duas colunas em telas menores.

Implementação nativa CSS/Web Animations, sem nova biblioteca. Respeitar `prefers-reduced-motion` também quando a preferência muda durante uma animação. Conteúdo pré-renderizado permanece visível e indexável sem a camada de motion. Galeria por teclado e fechamento por Escape são imediatos; foco é devolvido ao disparador. Formulário continua preparando mensagem revisável, sem envio nem reserva automáticos.

Especificação: `source/landing/MOTION.md`.
