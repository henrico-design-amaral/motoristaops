# Comando Unificado Financeiro + MotoristaOPS

Status auditado em 11/11/2026. Repositório motoristaops, branch de feature e PR #140 draft. SEM DEPLOY.

## Fontes verificadas

- Operação: Supabase MotoristaOPS restaurado, estado ACTIVE_HEALTHY. Tabela public.daily_closings com 8 fechamentos reais anteriores (julho a setembro), associados a um único usuário. Novos fechamentos usam a chave (owner_id, operation_date).
- Financeiro: Banco MCP/Open Finance, Nubank e C6, fonte de saldos e transações. Neon henrico-finance conserva dívidas, mas nesta auditoria apresentou 0 contas e 0 transações (13 dívidas). Não tratar Neon como histórico bancário completo.
- Projeção de leitura no Supabase: public.finance_monthly_readmodel, RLS SELECT por owner_id para authenticated, sem acesso anon e sem escrita pelo cliente. Não substitui fontes canônicas. Novembro/2026 possui 1 linha PARTIAL derivada do Banco MCP. Saldos, recebimentos Uber identificados e apoio familiar identificados são confirmados. Entradas líquidas, despesas classificadas, faturas, reserva e vencimentos ainda não foram conciliados: permanecem NULL.
- Interface Astro /comando/ lê exclusivamente tabelas autenticadas. Não publica dados privados no HTML/JSON estático.

## Writer ChatGPT implementado

- Função privada internal_ops.ingest_chat_daily_close(owner_id, date, payload_jsonb, idempotency_key, expected_revision). Invocável somente via administrador conectado ou serviço autorizado, não anon/authenticated. Executa como invocador, sem bypass voluntário de RLS.
- Escreve na MESMA tabela public.daily_closings usada pelo formulário /fechamento/, com source=api. Fonte do formulário corrigida para source=manual de acordo com o CHECK da base.
- Recebe idempotency_key estável no padrão chatgpt:AAAA-MM-DD:v1; repetição igual devolve o mesmo recibo e não duplica. Correção de dia preexistente exige revisão atual e chave v2 ou superior, preservando histórico.
- Gatilhos registram revisões e snapshots em internal_ops.daily_close_audit. Recibos privados em internal_ops.chat_closing_receipts; retorno inclui status, receipt_id, revision, persisted_at e already_recorded.
- Teste sintético em transação com ROLLBACK validou primeira escrita, replay idempotente e auditoria. A base permaneceu com os 8 registros originais; nenhum fechamento sintético ficou salvo.
- Nunca anunciar gravação antes de retorno status=committed e consulta de verificação da linha gravada.

## Dados do fechamento pelo chat

Campos numéricos obrigatórios explícitos: hours_online, km_total, trips_uber, trips_99, trips_private, revenue_uber, revenue_99, revenue_private, tips_extras, fuel_cost, food_cost, wash_cost, other_operational_cost. Campo ausente NÃO equivale a zero. Zero somente se confirmado. Datas em America/Sao_Paulo.

Opcionais: hours_in_ride, km_passenger, fuel_efficiency_km_l, fuel_price_reference, odometer_end_km, fuel_cash_paid, fuel_liters, shift, primary_platform, notes.

Particular mensal Diego/escolar: registrar KM e tempo mas NÃO receita mensal no fechamento diário. Receita particular avulsa recebida pode entrar. Abastecimento pago (caixa) e combustível consumido (custo operacional) são valores distintos e não devem ser somados duas vezes.

## Protocolo de execução em cada fechamento ChatGPT

1. Receber os dados do dia, calcular custo estimado apenas com premissas declaradas, validar campos essenciais e identificar fontes e incompletudes.
2. Pelo MCP Supabase confirmar proprietário do banco (auth.users e registros já existentes). Falhar se identificação ambígua; nunca publicar owner_id ou credenciais.
3. Invocar internal_ops.ingest_chat_daily_close usando owner_id verificado, data, payload completo, chave idempotente e revision quando for correção.
4. Confirmar receipt_id, revision, persisted_at; reler public.daily_closings pela mesma data/owner e conferir. Sem recibo, não declarar dashboard atualizado.
5. Consultar Banco MCP para atualizar projeção financeira somente com valores confirmados. Campos não conciliados como NULL e data_quality=partial. Sem novo snapshot, indicar desatualização.
6. O painel passa a ler as mesmas tabelas, sem commit de dados financeiros no GitHub.

ATENÇÃO: esta gravação acontece quando o ChatGPT realmente executa a ferramenta conectada no fechamento. Não existe monitoramento ou escrita automática de mensagens não processadas. A projeção bancária não possui job contínuo ativo.

## Segurança confirmada

- public.daily_closings e public.monthly_financial_summary sem grants de SELECT para anon.
- View mensal com security_invoker=true; RLS é aplicada à tabela base.
- public.set_updated_at recebeu search_path fixo.
- Tabela mensal RLS com SELECT autenticado por owner, sem INSERT/UPDATE para usuários.
- Schema internal_ops privado. As duas tabelas internas têm RLS sem políticas para usuários, deliberadamente sem acesso; lint INFO é esperado.
- Auditoria npm/security, teste de regras, TypeScript/Astro e build passaram em GitHub CI após atualização segura do lockfile.
- WARN Supabase: proteção contra senhas vazadas desativada, configuração de Auth externa pendente de revisão.

## Critérios pendentes antes do merge

1. Um fechamento REAL fornecido pelo usuário via ChatGPT precisa resultar em recibo e ser visualizado no painel após login. Não inventar fechamento para cumprir teste.
2. Validar sessão real e redirect de OTP no navegador, disponibilidade, RLS negativa, fluxo offline e dispositivos mobile.
3. Implantar sincronização financeira recorrente autenticada ou preservar refresh sob demanda com informação de atualização/staleness. Não afirmar que há sync contínuo.
4. Integrar detalhes de dívidas/cartões/acordos apenas com conciliação e proteção server-side; histórico bancário Neon ainda incompleto.
5. Validar CI final e smoke em staging após alterações de UI.
6. Só então retirar PR do draft e fazer merge em dashboard-stable: a branch de destino aciona deploy automático na Hostinger.

Arquivos: src/pages/comando.astro, src/scripts/unified-command.ts, src/lib/unified-ledger.mjs, src/pages/fechamento.astro, src/scripts/day-close.ts, db/*.sql e scripts/test-unified-ledger.mjs.

Estado: código, banco e writer preparados e parcialmente verificados; deploy final e fechamento real ainda não comprovados.
