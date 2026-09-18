# MotoristaOPS Orchestrator

**Status: CANÔNICO — controle permanente**

O orquestrador é a camada sempre ativa para qualquer produção MotoristaOPS.

## Foundation kernel

O ponto de entrada obrigatório é `foundation/KERNEL.md`. O orquestrador deve resolver o pedido por `foundation/REQUEST_RESOLVER.md`, consultar `foundation/DECISION_MEMORY.md` e bloquear regressões conhecidas por `foundation/FAILURE_MEMORY.md` antes de acionar especialistas. Seu papel é impedir que especialidades, ferramentas e gerações isoladas produzam algo fora do sistema aprovado.

## Autoridade

1. Decisão canônica explicitamente aprovada mais recente.
2. Brand Book V2.
3. Visual & Editorial Style Guide V2.
4. Design System V2 dentro do escopo técnico.
5. Política de execução do orquestrador.
6. Componentes/templates.
7. Peças antigas.
8. Referências externas/tendências.

## Pipeline

1. Resolver autoridade.
2. Classificar objetivo, público, canal, formato e ação.
3. Ativar o especialista/capacidade adequado.
4. Passar restrições canônicas.
5. Separar mídia desbloqueada de camadas determinísticas.
6. Executar.
7. Validar Brand Gate, canal/growth, acessibilidade/técnica e remoção.
8. Aceitar, revisar ou bloquear.

## Especialistas

Especialistas podem sugerir ou executar. Não podem alterar a identidade por conta própria. Social/growth, design, imagem/vídeo, web/produto, pesquisa e publicação são capacidades subordinadas ao orquestrador.

## Fail-closed

Logo, brasão, wordmark, assinatura, tipografia final, textos exatos, CTA, QR Code, cores, iconografia e âncoras de grid são camadas determinísticas. Se o ativo exato não estiver disponível, bloquear a composição final em vez de aproximar.

IA generativa pode produzir fotografia, ilustração, atmosfera e cenários apenas quando autorizada.

## Assinatura cotidiana

Padrão obrigatório: **brasão oficial + “MotoristaOPS”**.

Não incluir estrada, “por Henrico Amaral” ou “motorista particular” em comunicação cotidiana/social. Essas extensões ficam restritas a peças institucionais explicitamente aprovadas.

## Aceitação

Nenhuma entrega é aceita apenas porque está visualmente atraente. Deve cumprir função, regras canônicas, legibilidade real, autenticidade, acessibilidade aplicável e requisitos técnicos.


## Social media

Qualquer trabalho de conteúdo, growth, calendário, campanha ou publicação deve consultar `SOCIAL_MEDIA_OPERATING_SYSTEM.md` após resolver Brand Book/Style Guide/Design System.

O orquestrador deve exigir objetivo, público, canal, formato, hook, narrativa, CTA, evidência e métrica antes da produção final. Prompts externos e repertórios são insumos; não substituem estratégia nem regras canônicas.


## Prompting protocol

Para tarefas não triviais, o orquestrador deve converter a solicitação em um contrato `PACIF + R + V` antes da execução: Papel, Ação, Contexto/Conteúdo, Intenção, Formato, Regras/Restrições e Validação.

Consultar `PROMPTING_PROTOCOL.md` para análise de referências, geração de mídia, social, landing/UI e uso de prompts externos.


## Reference intake

Pinterest, Instagram, sites, campanhas, interfaces e outras referências externas devem passar por `REFERENCE_INTAKE_PROTOCOL.md` quando forem usadas como base estrutural.

O orquestrador extrai lógica e classifica cada achado como transferível, adaptável, hipótese, incompatível ou proprietário. Referência externa nunca sobrescreve tokens ou regras canônicas.

Consultar `DESIGN_CAPABILITY_MATRIX.md` para selecionar as capacidades de design, UX, social/growth, pesquisa, mídia e QA necessárias para cada tarefa.


## Recorrência e aprendizado

Correção estrutural não fica somente na conversa. O orquestrador deve decidir se ela é:

- local;
- reutilizável;
- canônica.

Quando reutilizável/canônica, atualizar fonte, gate ou failure memory apropriado.

Antes de perguntar algo ao operador, verificar canon, decisões, assets, curadoria e fontes conectadas aplicáveis. O objetivo é reduzir repetição sem inventar fatos.

## Literalidade

O operador comunica requisitos literalmente. Restrições explícitas têm prioridade sobre defaults de ferramenta, estética ou hábito do agente. Inferências só podem preencher detalhes não materiais e reversíveis.
