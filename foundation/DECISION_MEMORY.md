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


## Propagação para o ecossistema

Toda decisão material registrada aqui é `ecosystem-visible` por padrão.

Classificar em `GLOBAL`, `DOMAIN`, `PROJECT`, `SURFACE` ou `TASK` conforme o padrão canônico do HenricoOPS.

Decisões GLOBAL/DOMAIN devem ser promovidas ao HenricoOPS. Decisões PROJECT/SURFACE permanecem MotoristaOPS, mas o mecanismo reutilizável deve subir quando houver.

Nunca copiar identidade, paleta, logo, pricing, facts ou regras comerciais específicas para outro projeto apenas porque nasceram aqui.
