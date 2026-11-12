# Comando unificado Financeiro + MotoristaOPS — implementacao controlada

Data da auditoria: 11/11/2026
Estado: codigo de integracao em branch; PRODUCAO BLOQUEADA ate validacao de autenticacao, banco e QA.

## Fontes canônicas auditadas

1. MotoristaOPS: repo henrico-design-amaral/motoristaops, branch dashboard-stable, dominio dashboard.motoristaops.com.br, Astro estatico. A entrada diaria oficial esta em src/pages/fechamento.astro + src/scripts/day-close.ts. A rotina grava em daily_closings com owner_id + operation_date, quando autenticada no Supabase; offline salva fila local no navegador.
2. Financeiro: repo privado henrico-design-amaral/henrico-works, branch main, src/pages/dashboard/index.astro e scripts/sync-banco-mcp.mjs. Fonte de extrato: Banco MCP (Nubank/C6); Neon: henrico-finance. A pagina atual e estaticamente gerada e importa bankSnapshot.generated.json.
3. A versao do dominio MotoristaOPS e publicada por workflow da branch main que faz checkout da branch dashboard-stable. Nenhuma alteracao desta integracao deve disparar restauracao/publicacao sem autorizacao e QA.

## Bloqueadores confirmados

- O Supabase zlyqcfvwghjpytpqxtgc associado ao MotoristaOPS consta INACTIVE em 11/11/2026. A consulta as tabelas retornou "Database is possibly not accessible". Nao e possivel afirmar que os fechamentos sao sincronizados.
- O motor financeiro em henrico-works e estatico e nao possui API autenticada confirmada que possa ser chamada pelo dashboard operacional. O caminho /api/unified-finance nesta branch e um CONTRATO DE CONSUMO, nao um endpoint existente.
- Autenticacao/ownership cross-provider entre Supabase e Neon nao foram validados. Somente um JWT recebido no navegador nao basta para autorizar consultas ao Neon.
- O fechamento no ChatGPT ainda nao possui acao de escrita configurada contra a base canonica do painel. Conversa e memoria nao substituem resposta de persistencia.
- A fonte operacional atual mistura snapshot Excel publico com os registros de daily_closings. Sem revisao de proveniencia, nao mesclar automaticamente os dois totais nem completar dias que estao ausentes.

## Implementado nesta branch

- /comando/: UI para finance + operacao em unica navegacao, carregando apenas dados apos autenticacao.
- Operacao mensal: consulta filtrada por owner_id e data na tabela daily_closings; calculos com funcao unica summarizeOperation. Nao usa numeros sinteticos.
- Entrada diaria preservada na pagina /fechamento/ com sua fila local e logica atual; link direto pelo cockpit. Nao existe um segundo formulario concorrente.
- Dados financeiros indisponiveis por padrao; tela espera apenas JSON de uma API privada autenticada no mesmo origin. Nenhum snapshot real e incorporado no novo HTML.
- Regras contabilizaveis separadas no modulo src/lib/unified-ledger.mjs e testes de invariantes sem dependencia de rede.
- Gate de CI: verificacao de rota, teste contabil e revisao visual; producao nao foi acionada.

## Contrato de leitura financeira (nao implementado no servidor)

GET /api/unified-finance?month=YYYY-MM
Authorization: Bearer <access_token>

Obrigacoes do servidor:
- Validar token na autoridade emissora, expiração e vinculo de titular; autorizar SOMENTE os dados do usuario logado.
- Consultar Neon/Banco MCP server-side, sem expor credenciais, IDs bancarios, tokens, snapshots ou transacoes no HTML.
- Responder Cache-Control: private, no-store; negar origem/identidade invalidas; registrar logs sem payload sensivel.
- Entregar somente quando conciliado; campos nulos sao indisponiveis, nao zero.
- Retornar application/json com:
  { "status":"confirmed", "period":"YYYY-MM", "generatedAt":"ISO-8601", "bankBalanceTotal": number|null,
    "monthInflows": number|null, "monthOutflows":number|null, "monthNet":number|null,
    "workIncome":number|null, "familySupport":number|null, "reserveBalance":number|null,
    "upcomingDues":number|null }
- O cliente rejeita periodo divergente/status nao confirmado e exibe indisponivel.

## Contrato obrigatorio para atualizar pelo ChatGPT (a construir)

A mesma fonte persistente do fechamento manual deve receber o fechamento validado feito pelo chat.
Nao gravar logs diarios em commits GitHub nem em JSON estatico.

Etapas:
1. No chat, receber data da jornada, horas totais, receita Uber/99, quantidades de viagens, km, consumo, odometro e abastecimento (se informado). Ausencia e NULL, nunca zero inferido.
2. Distinguir producao operacional, dinheiro recebido, despesas pagas e consumo de combustivel. Particular Diego/escolar mensal: registrar KM/horas/servico do dia, MAS nao contabilizar o valor mensal como recebimento diario.
3. Validar intervalos, tipos numericos, data America/Sao_Paulo e coerencia da receita/custos. Mostrar campos faltantes quando impedirem a reconciliacao.
4. Reutilizar identificador estavel de owner e chave unica (owner_id, operation_date) ou event_id de fechamento; upsert idempotente, com versionamento/revisao e origem chatgpt_daily_close. Nao sobrescrever registro anterior sem rastro/auditoria.
5. A resposta da API de escrita precisa conter receipt_id, persisted_at, revision, status=committed. Somente entao anunciar "dashboard atualizado".
6. O painel le novamente a mesma tabela e exibe novo dia. Falha de persistencia deve ser comunicada como bloqueio, com dados preservados na conversa para posterior reenvio, sem alegar sincronizacao.
7. Confrontar pagamento Uber no extrato com producao operacional por data de trabalho, data de repasse e identificador de liquidacao; nao somar a ambos como receitas independentes.

### Regras de conciliacao

- Uber/99 registrado no fechamento: RECEITA PRODUZIDA; repasse bancario da plataforma: ENTRADA DE CAIXA. Sao visoes diferentes do mesmo fluxo.
- Ajuda familiar e transferencias internas nao sao trabalho. Movimento Nubank <-> C6 nao soma receita nem despesa.
- Pagamento de fatura de cartao nao deve contar a compra novamente. Investimento/resgate/caixinha nao equivale a gasto.
- Abastecimento pago e saida de caixa; combustivel consumido e custo operacional, sem dupla soma.
- Despesas nao associadas diretamente a corrida (parcela BV, seguro, PPF) sao compromissos pessoais/veiculares; sem alocacao diaria automatica que se confunda com pagamento.
- Regras de percentual das caixinhas MotoristaOPS, se usadas, devem ser versionadas e mantidas no escopo operacional. Reserva provisionada nao e saldo confirmado.
- Evolucao, variacao e tendencias so quando ha periodos comparaveis reais.
- Atualizar dashboard nao implica declarar "contas pagas"; status precisa de comprovante/confirmacao bancaria.

## Sequencia para entrega definitiva

1. Reativar ou migrar com segurança a fonte daily_closings (Supabase atualmente inativo); validar RLS, UPDATE + SELECT e identidade do usuario. Teste com uma conta propria e RLS negativa com outro usuario.
2. Escolher o backend unico para a versao consolidada (Neon ja ativo para financeiro ou outra arquitetura justificada) e executar migracao dos fechamentos com reconciliacao por data, sem perda nem duplicacao.
3. Implementar API de leitura financeira autenticada e endpoint/acesso MCP de escrita idempotente para fechamento ChatGPT. Registrar auditoria, erros e receipt.
4. Conectar o formulario e o ChatGPT ao MESMO writer e validar um fechamento real, comparando no painel e no banco.
5. Testar staging em desktop/mobile, captura sem dados reais, acessibilidade, autenticacao negada, backend offline, valores nulos, totais, duplicidade, mes de fronteira e integracao Banco MCP.
6. Somente apos gates de seguranca, aprovar merge/deploy; nao publicar cifras em HTML/JSON estatico.

A branch atual entrega a interface e as regras locais, mas NAO prova unificacao definitiva de dados nem atualizacao automatica por chat.
