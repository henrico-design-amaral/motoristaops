# MotoristaOPS — Google Places Autocomplete: implementação e entrega

**Data de verificação:** 2026-11-25 (America/Sao_Paulo)  
**Superfície:** página inicial oficial desktop e mobile V4, `https://www.motoristaops.com.br/`  
**Estado comprovado:** `CODE_IMPLEMENTED_AND_PUBLISHED / FEATURE_DISABLED / GOOGLE_CLOUD_NOT_VERIFIED`  
**Commit de produção observado:** `600477a49c9d2882df77df9b65b956082d1c056d`

## Decisão e escopo autorizado

Pedido do operador: integrar autocomplete do Google Maps nos campos Origem e Destino, tanto na versão web/desktop quanto na versão mobile, mantendo a identidade MotoristaOPS, o layout e o fluxo de orçamento via WhatsApp. Não houve aprovação de ativação de faturamento no Google Cloud, criação de credenciais, alteração de quotas ou envio de mensagens.

## Execução efetiva

1. `source/landing/src/places-autocomplete.mjs`: módulo progressivo compartilhado para a Places API (New), com predições sob demanda, token por sessão e campo, 350 ms de debounce, mínimo 3 caracteres, máximo 5 sugestões, prioridade regional aproximada de São Paulo (sem geolocalização) e seleção por teclado/toque. Seleção solicita somente `formattedAddress` (Place Details Essentials) e preenche a entrada original.
2. `source/landing/src/TripForm.jsx`: conecta origem/destino React aos novos controladores, com invalidação da mensagem preparada.
3. `source/landing/public/mobile/index.html`: conecta origem/destino V4 ao mesmo módulo; preserva obrigatórios, revisão local e abertura explícita do WhatsApp.
4. `source/landing/src/places-autocomplete.css`: sugestões com a paleta V2 (Noite, Grafite, Marfim e Champagne Sombra) e atribuição de Google Maps conforme exigências do fornecedor; sem alterar a marca, logo ou hero.
5. `source/landing/scripts/build.mjs` e workflow Hostinger: geram e publicam `/assets/places-config.json`, `/assets/places-autocomplete.js` e CSS. Flag desligada se não configurada, falha de build quando `MOPS_PLACES_ENABLED=true` sem chave com formato válido.
6. `source/landing/scripts/legal-pages.mjs`: política e termos descrevem envio do texto digitado ao Google se as sugestões forem ativadas; processamento separado do GA4.
7. `source/landing/tests/places-autocomplete.test.mjs`: simulação de API para seleção, teclado, toque, sessões novas após alteração, não duplicação de consultas e cancelamento antes da busca quando o usuário sai do campo.

## Trilha auditável

- PR principal: https://github.com/henrico-design-amaral/motoristaops/pull/170
- Brand Book V2: https://github.com/henrico-design-amaral/motoristaops/pull/171
- Proteção de custo/blur: https://github.com/henrico-design-amaral/motoristaops/pull/172
- Último deploy: https://github.com/henrico-design-amaral/motoristaops/actions/runs/45624210714 — **success**.
- Gate de produção registrou: `PASS: 56 published files verified byte-for-byte; canonical SEO, old-asset removal and dashboard operational markers confirmed.`
- Aquisição pública `Firecrawl` com `maxAge:0` verificou `https://www.motoristaops.com.br/assets/places-config.json` retornando HTTP 200, `enabled:false` e `browserKey:""` (sem expor qualquer credencial). Verificou também HTTP 200 para CSS e HTML mobile contendo `/assets/places-autocomplete.js`.
- Testes CI: `validate`, `verify` e `foundation-gate` com conclusão `success` nos três PRs. Não há evidência de resposta real da Google Places API porque o projeto Cloud e a chave não foram ativados.

## Estado: o que não pode ser afirmado

- `LIVE_GOOGLE_PLACES_ACTIVE: FALSE`. A experiência pública atual permanece **manual** até nova ativação.
- `CLOUD_BILLING_APPROVED: UNVERIFIED`.
- `API_KEY_RESTRICTIONS: UNVERIFIED`.
- `REAL_GOOGLE_PREDICTIONS_TESTED: FALSE`.
- `ACTUAL_API_SPEND: NOT_OBSERVED`. Como a flag pública está false, a implementação não inicia requisições ao Google Maps; isso não permite afirmar que outros serviços eventualmente faturados do Google Cloud tenham custo zero.
- `UX_BENEFIT: HYPOTHESIS` até métricas reais comparáveis de preenchimento.
- Nenhum WhatsApp foi enviado automaticamente ou em teste, e a landing desktop/mobile original continua operando com entrada manual.

## Passos autorizativos para ativação real

**Bloqueio material:** projeto Google Cloud e faturamento não observados; não ativar API paga como consequência implícita da implementação de código.

1. Titular habilita a cobrança e as duas APIs necessárias (`Maps JavaScript API` e `Places API (New)`) no projeto Google Cloud, aprova orçamento máximo e configura quotas/alertas.
2. Titular cria chave de navegador restrita por `https://www.motoristaops.com.br/*` e por APIs; nunca colar a chave em chat ou commit.
3. Após autorização, salvar a chave em GitHub Actions Secret `MOPS_PLACES_BROWSER_KEY` e configurar a variável `MOPS_PLACES_ENABLED=true`.
4. Reexecutar o deploy, verificar configuração pública ativada, respostas reais da Places API, seleção desktop e mobile, falhas/rede, marca Google, campo manual, privacidade, console de cobranças e segurança da chave.
5. Confirmar o aceite humano e registrar consumo/custo real. Se problemas, mudar `MOPS_PLACES_ENABLED=false` e executar novo deploy.

**Conclusão:** implementação técnica **entregue, integrada ao código e publicada**, mas integração externa **não ativada** por requisito de faturamento e credencial controlados pelo titular. `CANONICAL_CONTEXT_AVAILABLE / EXECUTED_CHATGPT_NATIVE`. Não foram invocados executores locais/subagentes e não houve instalação de SDK de terceiros.
