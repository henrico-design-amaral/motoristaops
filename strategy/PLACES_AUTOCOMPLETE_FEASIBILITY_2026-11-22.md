# MotoristaOPS — viabilidade de autocomplete Google Maps nos formulários

**Data:** 2026-11-22 (America/Sao_Paulo)  
**Marca/superfície:** MotoristaOPS — site oficial `www.motoristaops.com.br`, home desktop e home mobile V4.  
**Status:** `FEASIBLE / IMPLEMENTATION_NOT_STARTED / BILLING_NOT_AUTHORIZED / CLOUD_ACCESS_UNVERIFIED`.  
**Base canônica observada:** GitHub `henrico-design-amaral/motoristaops`, main `e6e6ca2ffceabf304b378e42b5ef445ab40b8cc2`.  
**Decisão:** preparar integração progressiva; **não** publicar carregamento da API Google nem cadastrar credenciais ou habilitar faturamento sem infraestrutura e autorização verificadas. Preservar layout, Brand Book V2, comunicação executiva e fallback manual.

## Diagnóstico factual da base atual

- Desktop: `source/landing/src/TripForm.jsx`. Dois inputs nativos obrigatórios, `name="origem"` e `name="destino"`; submit chama `prepareTripRequest` de `src/trip-request.mjs`. Após validação, cria uma mensagem para `wa.me/5511988329725`; não envia automaticamente.
- Mobile: `source/landing/public/mobile/index.html`. Dois inputs nativos obrigatórios, `name="origem"` e `name="destino"`, preparação local de texto e revisão antes do WhatsApp. A mesma URL oficial tem roteamento por UA em `scripts/mobile-router.php`; desktop e mobile usam implementações de formulário diferentes.
- Build público: `source/landing/scripts/build.mjs` e `source/landing/public/assets/`; o alvo é a Hostinger via workflow `.github/workflows/deploy-landing-hostinger.yml`.
- Nenhuma credencial nem ativação de **Google Maps JavaScript API + Places API (New)** foi comprovada nas fontes do projeto consultadas. Links públicos para Google Maps ou Google Business **não** comprovam habilitação do Google Maps Platform.
- O texto atual de `/privacidade/` descreve WhatsApp e Analytics opt-in, mas não explicita que o autocomplete transmitirá ao Google os trechos digitados nas buscas de origem/destino; revisar antes da ativação.

## Viabilidade

**Técnica: SIM.** A documentação atual do Google prevê o `PlaceAutocompleteElement` da **Maps JavaScript API + Places API (New)**, com sugestões de endereços e estabelecimentos e seleção por `gmp-select`; `placePrediction.toPlace().fetchFields({fields:['formattedAddress']})` devolve um endereço para a solicitação. Também existe a `AutocompleteSuggestion.fetchAutocompleteSuggestions()` para usar os inputs atuais em uma interface personalizada, mas com mais trabalho de acessibilidade, marca Google e controle de sessão.

**Recomendação para o projeto:** prototipar primeiro o widget oficial `PlaceAutocompleteElement` nos dois campos de cada versão, respeitando Instrument Sans/contraste e a experiência touch. Se o widget não se ajustar sem degradar a identidade ou os campos nativos, avaliar o método `AutocompleteSuggestion` com lista acessível e a atribuição Google obrigatória. **Não usar** `google.maps.places.Autocomplete` legado: indisponível para novos clientes desde 2025-03-01.

**Experiência proposta:** ao preencher Origem/Destino, digitar nome de local ou endereço → ver sugestões contextuais → selecionar → completar o texto do campo → revisar orçamento → abrir WhatsApp por ação explícita. Manter digitação manual sem obrigar escolha Google. Caso de aeroporto/hotel/condomínio deve permitir complementar terminal, portaria, número, andar, bloco e referência, sem supor que previsão equivale a local de embarque confirmado.

**Região:** priorizar São Paulo e Brasil por viés; não bloquear cidades fora do município, pois a oferta contempla viagens programadas. Qualquer restrição `includedRegionCodes: ['br']` exige confirmar que serviços internacionais estão fora de escopo. Sem geolocalização precisa obrigatória.

## Precificação — fonte oficial em 2026-11-22

Segundo tabela de preços Google Maps Platform (USD, global), **Places API (New)**:
- `Autocomplete Requests`: franquia **10.000 solicitações/mês**, depois **US$ 2,83 por 1.000** até o primeiro nível de volume (100.000).
- `Place Details Essentials`: franquia **10.000 solicitações/mês**, depois **US$ 5,00 por 1.000** até o primeiro nível de volume.
- Franquias não significam ausência de necessidade de faturamento; ele é obrigatório. Outras utilizações da conta/projeto podem consumir as franquias.
- Sessões devem usar token exclusivo por interação/seleção; com encerramento por Place Details Essentials, o Google pode cobrar as **primeiras 12** solicitações de autocomplete de cada sessão e o Place Details separado; não afirmar que a sessão inteira é gratuita.
- Exemplo **ilustrativo, não demanda real**: 500 solicitações de orçamento completas/mês × 2 campos × 5 pesquisas = **5.000 Autocomplete Requests** e 500 × 2 = **1.000 Place Details Essentials**. Se nenhuma outra demanda consumir as franquias, ambos ficam dentro das respectivas quotas gratuitas; abandono ou várias correções podem aumentar consultas. Não projetar fatura garantida.
- Alertas de orçamento **não** interrompem cobranças automaticamente; limitar quotas operacionais e verificar custos no Console.

Fontes oficiais:
- https://developers.google.com/maps/documentation/javascript/place-autocomplete-new
- https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
- https://developers.google.com/maps/documentation/javascript/reference/places-widget
- https://developers.google.com/maps/billing-and-pricing/pricing
- https://developers.google.com/maps/documentation/places/web-service/session-pricing
- https://developers.google.com/maps/api-security-best-practices
- https://developers.google.com/maps/billing-and-pricing/manage-costs
- https://developers.google.com/maps/documentation/javascript/policies

## Pré-requisitos de ativação

1. Projeto Google Cloud de propriedade do operador e faturamento habilitado **por ação explícita do titular**. Não executar esta etapa a partir de chat sem permissão e acesso reais.
2. APIs ativas: **Maps JavaScript API** e **Places API (New)**; escolher uma **browser API key** específica da MotoristaOPS.
3. Restringir por **Websites HTTP referrers** do domínio `https://www.motoristaops.com.br/*` (e domínios exatos adicionais somente se efetivamente utilizados) e restringir por APIs citadas. A chave de navegador aparece para o cliente na rede — restringir é essencial; **não** compartilhar chave no chat, em documentação pública ou em logs de CI.
4. Definir orçamento de uso e alertas, além de quotas de taxa para evitar abuso; o número viável depende de expectativa de tráfego e do consumo já existente no projeto.
5. Revisar `/privacidade/` para informar que a pesquisa de endereço feita pelo visitante é encaminhada ao Google, com link à política do fornecedor, sem caracterizar a consulta como medição GA4. Reavaliar necessidade de tratamento jurídico/LGPD antes do deploy.
6. Chave/ativação apenas por configuração segura de build/deploy, com **feature flag desativada como padrão**. Nenhuma API Google deverá carregar sem a configuração expressamente validada.

## Implementação prevista (sem ativação nesta decisão)

- Compartilhar um módulo de autocomplete acessível entre desktop React e HTML mobile, mantendo o `name` e os valores dos inputs originais para o fluxo existente.
- Carregamento adiado até o usuário interagir com Origem/Destino; campo continua utilizável se API, rede, quota, chave ou consentimento operacional falhar.
- Usar token de sessão **por campo e interação**; solicitar só `formattedAddress` via `fetchFields`, sem campos Pro/Enterprise sem motivo. Preservar a denominação do lugar na apresentação quando necessário.
- Permitir edição manual após a escolha e invalidar corretamente o resumo preparado se qualquer endereço mudar; nunca calcular nem prometer tarifa automática nesta etapa.
- Testar teclado, leitor de tela, toque, resultados de busca para bairros, hotéis, aeroportos e endereços com números, sem resultado, resultados ambíguos, queda do Google, limites de API e sessões abandonadas.
- Testar desktop PT/EN/ES e mobile V4, SEO/canonical inalterados, formulário válido e controle de analytics separado. **Proibido enviar mensagens de teste a clientes**.
- Implantar via PR isolado, `npm ci`, `npm run build`, `npm test`, Playwright em viewports mobile/desktop e validação HTTP pós-deploy. Sem evidência de API funcional e faturamento aprovado, reportar `NOT_ACTIVE`.

## Conclusão

`GO_TECHNICAL / NO_GO_ACTIVATION_UNTIL_CLOUD_BILLING_AND_KEY`.

O ganho de praticidade é uma **hipótese de UX plausível**, não um resultado medido. Sucesso real deve ser aferido por taxa de preenchimento/conclusão, erro de endereço, tempo de preenchimento e custo por orçamento, com comparação e consentimento adequados.

**Executado neste registro:** leitura do código e da documentação oficial, estimativa com premissas e planejamento de integração. **Não executado:** criação de chave, faturamento, chamadas pagas, código de autocomplete, teste de Google Places real ou deploy.
