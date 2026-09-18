# Learning & Recurrence Loop

## Objetivo

Fazer o sistema melhorar com uso real e impedir que o operador precise corrigir a mesma classe de erro novamente.

## Ciclo

`SIGNAL -> CLASSIFY -> ROOT CAUSE -> UPDATE -> VERIFY -> PROPAGATE -> OBSERVE`

### SIGNAL
Origem possível:
- correção do operador;
- QA;
- métrica;
- falha de ferramenta;
- regressão;
- referência;
- mudança de contexto.

### CLASSIFY
- local;
- reutilizável;
- canônico;
- experimental;
- erro de execução;
- erro de sistema.

### ROOT CAUSE
Perguntar internamente:
- a regra não existia?
- existia e não foi carregada?
- existia e foi interpretada errado?
- a ferramenta não suportava?
- o gate não detectava?
- a fonte estava stale?

### UPDATE
Corrigir o nível mais baixo capaz de impedir repetição:
- copy/local;
- Pattern Master;
- protocolo;
- gate;
- lock;
- Decision Memory;
- Failure Memory;
- canon.

### VERIFY
Reproduzir o cenário ou usar validação equivalente.

### PROPAGATE
Toda decisão material deve ser classificada segundo o padrão global do HenricoOPS:
`GLOBAL | DOMAIN | PROJECT | SURFACE | TASK`.

- GLOBAL/DOMAIN: promover para `henrico-design-amaral/henricoops:governance/ECOSYSTEM_DECISION_PROPAGATION_STANDARD.md` e herdar nos projetos aplicáveis.
- PROJECT/SURFACE: manter a regra MotoristaOPS scoped, mas registrar o aprendizado portátil no HenricoOPS quando existir.
- TASK: manter local, salvo promoção explícita ou evidência recorrente.

A MotoristaOPS é proving ground de infraestrutura; aprendizado portátil não pode permanecer somente neste repositório.

### OBSERVE
Monitorar próximas execuções semelhantes.

## Regra de ouro

**Nenhuma correção estrutural deve sobreviver somente no histórico da conversa.**

## Métrica interna de qualidade

A recorrência é ruim quando:
- o operador repete uma regra existente;
- uma falha classificada reaparece;
- o agente pede informação recuperável;
- a saída precisa de correção por identidade já documentada.

Esses eventos devem gerar manutenção do sistema, não apenas nova tentativa.
