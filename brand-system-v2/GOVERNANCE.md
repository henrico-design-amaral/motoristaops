# MotoristaOPS V2 — Governança

## Regra-mãe

Tudo que foi aprovado no Brand Book V2 é obrigatório para qualquer produção MotoristaOPS, independentemente da escala da entrega.

## Precedência

1. Decisão canônica mais recente explicitamente aprovada.
2. Brand Book V2.
3. Visual & Editorial Style Guide.
4. Design System dentro do escopo técnico.
5. Componentes e templates.
6. Peças antigas.
7. Referências externas.

## Brand Gate

Toda produção deve verificar estratégia, linguagem, identidade visual, autenticidade, requisitos técnicos, acessibilidade e uma rodada final de remoção.

## Exceções

Devem ser deliberadas, justificadas e registradas. Uma exceção não cria precedente automaticamente.

## Agentes e automações

IA, agentes, templates e ferramentas são executores dentro do sistema. Não podem substituir regras canônicas por preferências próprias, defaults da ferramenta ou tendências de mercado.

## Orquestrador permanente

O Sheldon/MotoristaOPS Orchestrator é a camada de controle obrigatória para qualquer trabalho MotoristaOPS. Ele não substitui Brand Book, Style Guide ou Design System; resolve a autoridade canônica, classifica a tarefa, ativa a capacidade especialista adequada, injeta as restrições vigentes e valida o resultado antes de aceitar ou publicar.

Fluxo obrigatório:

1. Resolver a decisão canônica mais recente.
2. Identificar objetivo, público, canal, formato e ação desejada.
3. Selecionar especialistas/ferramentas por função.
4. Separar mídia generativa de camadas determinísticas.
5. Executar.
6. Aplicar Brand Gate, gate de canal/growth, acessibilidade/técnica e rodada de remoção.
7. Aceitar, revisar ou bloquear.

Ferramenta, template, especialista, tendência ou conveniência nunca prevalece sobre a fonte da verdade.

### Assinatura cotidiana

Em produção diária/social, a assinatura padrão é exclusivamente **brasão oficial + “MotoristaOPS”**. Estrada, “por Henrico Amaral” e “motorista particular” ficam restritos a contextos institucionais explicitamente autorizados. A assinatura é camada determinística e não deve ser redesenhada por IA generativa.


## Infraestrutura base

MotoristaOPS funciona como projeto de referência para a infraestrutura do ecossistema.

O kernel em `foundation/` governa processo, interpretação, decisão, curadoria, execução, QA e aprendizado. Ele é sempre ativo, mas não substitui regras específicas de marca.

Futuros projetos podem herdar o kernel conforme `foundation/PROJECT_BOOTSTRAP.md`; não podem herdar por acidente a identidade MotoristaOPS.

### Literalidade e memória
- pedidos explícitos são literal-first;
- inferência é controlada;
- decisões aprovadas são reutilizadas;
- correções recorrentes viram gates;
- informação já disponível deve ser recuperada antes de ser solicitada novamente.
