# MotoristaOPS — Origem e Destino com Google Maps Places (New)

**Escopo:** homepage desktop React e homepage mobile HTML V4, mesma URL pública.
**Situação desta implementação:** `IMPLEMENTED_WITH_FEATURE_GATE / NOT_ACTIVE_BY_DEFAULT`. A API só carrega após habilitação explícita e uma chave de navegador válida; não há configuração do Google Cloud criada por este PR.

## Referências primárias

- Viabilidade aprovada: `strategy/PLACES_AUTOCOMPLETE_FEASIBILITY_2026-11-22.md`.
- https://developers.google.com/maps/documentation/javascript/place-autocomplete-data
- https://developers.google.com/maps/documentation/javascript/load-maps-js-api
- https://developers.google.com/maps/documentation/javascript/policies
- https://developers.google.com/maps/api-security-best-practices
- https://developers.google.com/maps/billing-and-pricing/pricing

## Arquitetura e comportamento

- Módulo único `src/places-autocomplete.mjs` e CSS `src/places-autocomplete.css`.
- Desktop: `src/TripForm.jsx` injeta sugestões nos campos já existentes, com refs e callback para invalidar o orçamento preparado.
- Mobile: `public/mobile/index.html` injeta o mesmo módulo nos campos já existentes. A mensagem permanece preparada localmente e só abre o WhatsApp em ato do usuário.
- JavaScript: `AutocompleteSuggestion.fetchAutocompleteSuggestions()` (Places API New), token único por interação/campo, 350 ms de debounce, mínimo 3 caracteres, máximo 5 resultados, `locationBias` aproximado do centro de São Paulo (sem pedir geolocalização), `region: 'br'` como preferência e não restrição.
- Seleção chama `prediction.toPlace().fetchFields({fields:['formattedAddress']})` (Essentials). O rótulo da previsão mantém o nome do local, como aeroportos e hotéis, sem requisitar `displayName` (campo de nível mais alto).
- Dropdown com `role=combobox/listbox/option`, teclado ArrowUp/Down/Enter/Escape, anúncio de resultados, marca de atribuição textual **Google Maps** a 12px, que deve ser legível e não traduzida. Em telas pequenas, espaço insuficiente para logo completo.
- Manutenção da digitação manual: script ausente, internet indisponível, cobrança/quota desativada, consulta sem resultados ou API falhando não impedem que o usuário continue usando o formulário.
- Nenhum cálculo de preço, rota ou reserva automática. Sem armazenar consulta ou Place ID no backend. O texto digitado só vai ao Google quando a busca estiver habilitada e o usuário escrever 3 ou mais caracteres nos campos.
- A política de privacidade descreve essa comunicação opcional com o provedor, separada do Google Analytics de estatísticas opt-in.

## Feature flag no build — desativada por padrão

O build gera `dist/assets/places-config.json` com:

```json
{"enabled":false,"browserKey":""}
```

Essa configuração desativada é a única esperada na ausência de habilitação autorizada. O arquivo é público, e **chaves de navegador são visíveis para o visitante quando a API estiver ativa**: restrições Google Cloud são obrigatórias.

### Passos de ativação futura, somente pelo operador

1. Criar ou selecionar projeto Google Cloud sob o titular; aprovar faturamento e limite aceitável de custo. Ativar `Maps JavaScript API` e `Places API (New)`.
2. Criar uma chave de **navegador** exclusiva, restrita por HTTP referrer ao(s) host(s) corretos, no mínimo `https://www.motoristaops.com.br/*`, e restringir às duas APIs necessárias. Não usar uma chave de servidor.
3. Configurar quotas e alertas de custo no Google Cloud. Alertas não bloqueiam cobranças; controlar uso pelo Console.
4. No GitHub Actions, salvar essa chave como secret `MOPS_PLACES_BROWSER_KEY` e definir a variável `MOPS_PLACES_ENABLED` com o valor exato `true`. Nenhum valor real deve ser adicionado aos arquivos Git, PRs, issues, logs ou conversas.
5. Executar o workflow `Deploy MotoristaOPS landing only` já existente. Ele envia os novos assets, config e testa hashes de arquivos. Em caso de `true` sem chave em formato válido, o build falha em vez de ativar sem configuração.
6. Testar **em domínio real** no navegador mobile e desktop, com quota restrita, para seleção de rua, CEP, aeroporto, hotel, condomínio e bairro; verificar a marca Google Maps e ausência de mensagens automáticas.
7. Validar billing real e eventos de contato, respeitando a privacidade. A existência do arquivo de configuração ou do script por si só não comprova chamadas corretas de API.
8. Se o Google se tornar indisponível ou custo exceder o limite aprovado, alterar a variável `MOPS_PLACES_ENABLED` para `false` e redeploy; o formulário volta a operar manualmente sem mudar HTML.

### Verificação técnica sem chave

```sh
cd source/landing
npm ci
npm run build
npm test
```

O teste de contrato inclui a configuração desativada, a preservação dos campos, conversão de nomes/endereço, sessão simulada Places New, teclado e ausência de nova consulta ao selecionar. Sem chave válida, **não** declarar teste contra dados Google reais.

## Pendências do operador / aceite

- `GOOGLE_CLOUD_BILLING: NOT_VERIFIED`
- `BROWSER_API_KEY_AND_RESTRICTIONS: NOT_VERIFIED`
- `LIVE_GOOGLE_PLACES_RESPONSES: NOT_TESTED`
- `REAL_USAGE_COST: NOT_MEASURED`
- `PRODUCTION_ENABLED: FALSE` até decisão de ativação autorizada

**Não solicitar a chave no chat.** Use o campo Secrets do GitHub para o deploy. O benefício de redução de erro/tempo de preenchimento é hipótese de UX até medição observacional real.
