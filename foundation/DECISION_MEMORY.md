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

## Interior e proteções realizadas do Omoda 5 Luxury

**APPROVED · SURFACE / landing MotoristaOPS · 2026-10-27**

O operador aprovou a prévia estática `motoristaops-secao-carro.png` e autorizou aplicar somente a seção do carro. Preservar a mesma grade `.container` e as demais seções da landing, inclusive hero, serviços, processo, retrato, avaliações, FAQ e formulário. A galeria passa a incluir painel/cabine, bancos dianteiros, banco traseiro e teto solar da versão Luxury, usando as fotos identificadas no anúncio da Personalité Automóveis. Manter marcas d’água originais, sem gerar ou redesenhar o interior. A foto externa aprovada permanece.

O proprietário confirmou como realizados: PPF Full interno e externo brilhante; película antivandalismo PS20; nano cerâmica G5/G20; vitrificação Full de couros, bancos, plásticos e rodas; Anti-Trinco para o para-brisa. Esta confirmação supera o status anterior de PPF/película como preparação prevista. Na seção do carro, remover notas visíveis de imagens conceituais, ficha técnica e link de consulta, conforme pedido explícito. A origem das fotos e o contexto da versão ficam documentados em `source/landing/VEHICLE.md`. Só Instrument Sans, textos de no mínimo 12 CSS px; galeria com teclado, foco e motion reduzido preservados.


## Travas visuais atuais — identidade, fonte, paleta, veículo e motor

**CANONICAL · PROJECT / MotoristaOPS · 2026-10-28**

- Logo/identidade: nenhum componente pode ser alterado, redesenhado, vetorizado, aproximado ou derivado. Usar somente assets oficiais e variantes oficiais já existentes; horizontal e simplificada apenas quando houver arquivo canônico exato.
- Tipografia: somente Instrument Sans em produção MotoristaOPS. Nenhuma outra família é permitida.
- Veículo vigente: Omoda 5 Luxury cinza. HB20 é histórico e não pode ser tratado como operação atual.
- Paleta: Noite #070709, Grafite #151518, Champagne #C79C5B, Champagne Sombra #947546, Marfim #F3EFE4, Pedra #A6A39E, Âmbar de Percurso #F0B44D. Valores fixos; claro/escuro/mesclado recombinam sem alterar tons.
- Produção de imagens: GPT Images diretamente no ChatGPT; sem vetor e sem Canva. Magnific somente como exceção extraordinária, com tentativa prévia do GPT Images e justificativa registrada.
- Se asset, fonte, paleta ou mídia real do veículo não puderem ser preservados fielmente, o resultado fica PENDENTE/BLOCKED.

Essas regras prevalecem sobre referências antigas conflitantes sem apagar o histórico.

## Padrão de post simples com evento protagonista — aprovação 29/10/2026

**APPROVED · PROJECT / MotoristaOPS · 2026-10-29**

O operador aprovou o arranjo editorial dos oito exemplos recentes de BTS, GP de São Paulo, FENATRAN e E-MOB (modos claro/escuro), qualificando-o como discreto, limpo, fácil de reproduzir e **um dos padrões oficiais** para posts simples, conteúdo e eventos.

A aprovação é de uma **composição dentro de `single_static`**, não de um formato adicional, de uma identidade nova, nem da substituição dos outros padrões aprovados. O evento ou contexto real é protagonista; o carro não é obrigatório. Quando o carro aparecer, utilizar somente mídia real aprovada do **Omoda 5 Luxury cinza**. Conservar marca, tipografia, paleta e CTA canônicos.

**Fonte operacional:** `SOCIAL_EDITORIAL.md` §6A, `editorial/PADRAO_POST_SIMPLES_EVENTO_2026-10-29.md` e `brand-system-v2/SOCIAL_MEDIA_OPERATING_SYSTEM.md` §14A.

**Limite:** o usuário aprovou a linguagem/composição, mas as imagens geradas contêm camadas que podem não corresponder a arquivos oficiais (logo, letreiros e tipografia); elas não são liberação automática para uso/publicação literal. Cada nova peça deve passar pelo QA oficial e pelo `editorial/EDITORIAL_FORMAT_LOCK.json`. Nenhum conteúdo foi publicado por esta decisão.


## Landing multilíngue

**REQUESTED · SURFACE / landing MotoristaOPS · 2026-11-06**

O operador solicitou analisar o site atual e adicionar inglês e espanhol. Manter português em `/` e oferecer `/en/` e `/es/`, com seletor acessível, conteúdo pré-renderizado, SEO e mensagens do WhatsApp no idioma da página. Preservar assets, identidade, fatos comerciais e isolamento do dashboard. A tradução do site não cria promessa de fluência no atendimento. Implementação e evidências: `source/landing/I18N.md`.


## Consolidação editorial dos 13 anexos — 06/11/2026

**CANONICAL · PROJECT / MotoristaOPS · 2026-11-06 — APROVAÇÃO DE ARQUITETURA, NÃO DE IMAGEM FINAL.** O operador apresentou oito postagens únicas de BTS, GP de São Paulo, Fenatran e E-MOB (quatro pares claro/escuro), um carrossel de três lugares, um post G4 Valley, três painéis comparativos e uma transcrição reforçando “contexto primeiro”. Determinou formalização durável no ecossistema.

Decisão: composições de evento com título forte, fotografia contexto protagonista, informações confirmadas, benefício de deslocamento, CTA em texto simples e assinatura final são **referência prioritária** para `single_static`; carrossel narrativo preserva abertura/conteúdo/fechamento. O sistema continua com somente três famílias e os mesmos locks V2. Imagens geradas e colagens são `REFERENCE_ONLY`, inclusive quando exibirem marca, carro, data, telefone ou venue. Não criar IA para Henrico/Omoda, não usar logos sintetizados, fontes substitutas ou botão/WhatsApp incorreto. Não houve publicação/autorização de novo formato. Evidência: `editorial/REFERENCE_PACK_2026-11-06.md` + inventário SHA-256 em JSON. Mudanças posteriores exigem aprovação explícita e versão registrada.


## Header mínimo fixo R02

**APPROVED · SURFACE / landing MotoristaOPS · 2026-11-06**

O operador aprovou a prévia R02 e autorizou publicação. Usar header fixo e escuro, logo oficial e texto São Paulo e Região à esquerda, seletor em cápsula PT/EN/ES à direita. Sem ícone de localização, divisor ou rótulo visível Idioma. Preservar conteúdo, assets e isolamento do dashboard; traduzir a região em cada idioma. Contrato: `source/landing/HEADER.md`.


## Reposicionamento executivo e transição comercial

**CANONICAL · PROJECT / MotoristaOPS · 2026-11-13**

Origem: decisão explícita de Henrico Amaral após sua mentoria, no pedido “Reposicionamento da marca”, acompanhado de oito URLs de referência e dos gatilhos HENRICOOPS::REF, SYNC e CALIBRATE.

Decisão: comunicar e operar progressivamente como motorista/transporte executivo; preservar a marca e tornar a comunicação mais minimalista, objetiva e premium; evoluir primeiro o site, depois WhatsApp Business e demais comunicações; priorizar Google/Perfil da Empresa e avaliar anúncios na busca, mantendo Instagram profissional e LinkedIn em relacionamento seletivo.

Experiência: retirar organizador na operação executiva; durante a transição ele pode continuar no trabalho por aplicativo. Manter água e itens de bordo necessários ao atendimento. Produzir fotos próprias do carro e retrato mais cordial, sem alterar identidade humana por IA. Preparar identificação digital com nome, foto real, veículo, placa confirmada e contato de quem conduzirá.

Catálogo: o operador autorizou incluir diferentes veículos disponíveis com parceiros. Exceção de escopo SURFACE / catálogo WhatsApp: outras categorias podem aparecer quando houver parceiro e veículo reais confirmados, fotografia autorizada, identificação de operação parceira e disponibilidade sob consulta. Não interpretar como frota própria, substituição visual do Omoda, blindagem ou disponibilidade garantida. Extensão futura à landing exige o mesmo lastro e revisão da versão.

Preservados: logo e variantes oficiais, Instrument Sans, tokens, aparência de Henrico e Omoda 5 Luxury cinza como veículo atual de Henrico. Não alterar categoria ou lettering dentro do asset oficial; usar descritor executivo nos textos editáveis.

Supera: prioridade editorial/profissional anterior de LinkedIn na lista de superfícies e a orientação de comunicação centrada no trabalho por aplicativo descrita pelo operador. Não revoga fatos, formatos editoriais ou gates de publicação. O novo briefing registra separadamente propostas ainda não aprovadas: cinco serviços principais, CTA na abertura, nova arquitetura e copy, plano de mídia e catálogo de categorias específicas.

Autoridade e evidências: `strategy/EXECUTIVE_REPOSITIONING_2026-11-13.md` e `strategy/EXECUTIVE_REFERENCE_PACK_2026-11-13.json`. Persistência documental não significa site redesenhado/publicado, WhatsApp configurado, fotos produzidas, crachá entregue ou anúncios ativados.

Propagação: PROJECT + SURFACE, ecosystem-visible por autoridade versionada. Não transformar preferências da MotoristaOPS ou hipóteses de canal em regra global de outros projetos. Revisão: novas decisões do operador e resultados reais de atendimentos/campanhas.
