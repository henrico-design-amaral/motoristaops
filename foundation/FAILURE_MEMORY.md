# Failure Memory

Erros recorrentes conhecidos deixam de ser "feedback" e passam a ser bloqueios de produção.

## FM-001 — identidade generativa
**Falha:** IA redesenha brasão/logo/assinatura.
**Gate:** identidade protegida só em camada determinística.

## FM-002 — assinatura cotidiana errada
**Falha:** estrada, "por Henrico Amaral" ou "motorista particular" em post cotidiano.
**Gate:** somente brasão oficial + MotoristaOPS.

## FM-003 — assinatura pequena demais
**Falha:** selo ilegível em mobile.
**Gate:** 44–48 CSS px de altura perceptiva no preview de 390 px; escala de exportação derivada.

## FM-004 — microcopy e ruído
**Falha:** textos laterais, labels minúsculos e informação sem função.
**Gate:** remover ou aumentar; nenhum conteúdo essencial abaixo da leitura confortável no celular.

## FM-005 — identidade pesada
**Falha:** marca compete com a mensagem.
**Gate:** cotidiano usa L1/L2; L3 é institucional/deliberado.

## FM-006 — carro incorreto
**Falha:** veículo histórico, sedã genérico ou carro de luxo inventado usado como operação real.
**Gate:** quando representar operação real, usar o **Omoda 5 Luxury cinza** vigente, com mídia real/aprovada. HB20 é histórico. IA não falsifica evidência.

## FM-007 — motorista genérico
**Falha:** chauffeur de terno, corpo/rosto inventado, protagonismo excessivo.
**Gate:** Henrico real quando necessário; sem terno/gravata como default; operador discreto.

## FM-008 — black-and-gold automático
**Falha:** Noite + Champagne usados como fórmula universal.
**Gate:** modo cromático por função; Marfim é superfície estrutural prioritária em informação.

## FM-009 — arte antes da estratégia
**Falha:** produção visual antes de objetivo/hook/narrativa/CTA.
**Gate:** estratégia e texto primeiro.

## FM-010 — referência vira cópia
**Falha:** peça externa vira layout/template.
**Gate:** Reference Intake obrigatório.

## FM-011 — V12
**Falha:** tratar "Brand Book V12" como versão real.
**Gate:** não existe V12; somente Brand Book V2.

## FM-012 — pedir novamente o que já está resolvido
**Falha:** operador repete decisões existentes.
**Gate:** buscar canon, contexto, Drive/curadoria e decisão anterior antes de perguntar.

## Atualização

Adicionar um item quando uma correção explícita revelar risco reutilizável. Não adicionar preferências locais como regra global sem evidência.

## FM-013 — seção do carro fora da grade da landing
**Falha:** QA isolada aprovou max-width maior que o restante do site, margens negativas e escala da imagem diferente da referência.
**Gate SURFACE / landing:** reutilizar `.container`; medir bordas da galeria contra a grade de Serviços em desktop/mobile; comparar a referência e a captura na mesma escala; capturar contexto com a seção anterior. Não declarar fidelidade por ausência de overflow apenas.

**Complemento FM-013:** em QA tipográfica, `document.fonts.status = loaded` e `fonts.check` não provam que a folha externa foi carregada. Conferir a folha e evitar usar um screenshot em fallback como evidência de equivalência de fonte. O layout também deve suportar fallback sem texto sobre ícones.


## FM-014 — tipografia fora do canon
**Falha:** usar Bebas Neue, Inter, fallback visual ou qualquer outra família em produção MotoristaOPS.
**Gate:** somente Instrument Sans. Se a ferramenta não preservar a família, bloquear/PENDENTE em vez de substituir.

## FM-015 — paleta derivada
**Falha:** clarear, escurecer, aproximar, recolorir ou criar variações dos tokens oficiais.
**Gate:** usar somente os valores canônicos exatos; modo claro/escuro/mesclado muda combinação, não os tons.

## FM-016 — identidade ou variante recriada
**Falha:** redesenhar, vetorizar, recompor ou derivar logo/brasão/wordmark/assinatura.
**Gate:** somente asset oficial e variante oficial já existente; horizontal/simplificada apenas quando houver arquivo canônico exato.

## FM-017 — veículo histórico tratado como atual
**Falha:** HB20 ou veículo genérico aparece como carro vigente.
**Gate:** veículo atual = Omoda 5 Luxury cinza; usar mídia real/aprovada e bloquear IA que regenere o carro.
