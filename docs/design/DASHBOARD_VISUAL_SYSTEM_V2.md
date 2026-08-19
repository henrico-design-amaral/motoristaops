# MotoristaOPS — Dashboard Visual System v2

## Objetivo

Transformar o cockpit em uma interface de decisão operacional clara, calma e densa apenas onde a informação exige. A referência não é um painel “cheio de cards”; é uma central de comando editorial: primeiro a decisão, depois a evidência, depois o detalhe.

## Princípios

1. **Uma decisão dominante por viewport.** O usuário deve entender em poucos segundos: onde trabalhar, quando sair e se o dia está valendo a pena.
2. **Hierarquia máxima de três níveis.** Primário = decisão/ação. Secundário = contexto/indicador. Terciário = auditoria/metadado.
3. **Dourado sinaliza; não decora.** Champagne aparece em ação, seleção, oportunidade, rota e destaque numérico. Nunca como grande massa de fundo.
4. **Superfícies por função, não por variedade estética.** Base, superfície, superfície elevada e alerta são suficientes.
5. **Inter é a voz operacional.** Números, tabelas, labels e controles usam Inter. Manrope fica reservado a títulos-chave e momentos de marca.
6. **Dados alinhados como dados.** Valores numéricos usam `font-variant-numeric: tabular-nums` e alinhamento consistente.
7. **O estado da informação é visível.** Confirmado, estimado, pendente, indisponível e live não podem depender apenas de cor.
8. **Mobile é uma decisão diferente, não desktop empilhado.** Navegação compacta, resumo primeiro, detalhe progressivo e cards de leitura curta.

## Paleta oficial

| Token | HEX | Uso |
| --- | --- | --- |
| Noite | `#0B0C0D` | fundo dominante |
| Grafite | `#181A1D` | painéis e superfícies |
| Carvão | `#2B2E32` | bordas, divisores e controles |
| Champagne | `#C8A96B` | seleção, ação e sinalização |
| Areia | `#DED2BC` | texto secundário quente |
| Marfim | `#F2EFE9` | texto principal |

Cores semânticas ficam dessaturadas para não competir com Champagne:
- sucesso: `#8EAA95`;
- atenção: `#C8A96B`;
- risco: `#C88478`;
- informação: `#8D9EAD`.

## Tipografia

### Famílias
- **Manrope**: títulos principais, nome da plataforma e chamadas de decisão.
- **Inter**: todo o sistema operacional, números, tabelas, labels, filtros e textos de apoio.

### Escala desktop
- Display/hero: `clamp(2.75rem, 5vw, 5.25rem)`; máximo visual ~84 px.
- H1 de página profunda: `clamp(2.5rem, 4.5vw, 4.5rem)`.
- H2 de seção: `clamp(1.75rem, 2.8vw, 2.75rem)`.
- H3/card title: `1rem–1.25rem`.
- KPI principal: `1.75rem–2.5rem`.
- Corpo: `0.875rem–1rem`.
- Label/metadado: **mínimo 0.6875rem / 11 px**, preferencial 12 px.

### Escala mobile
- Hero: `clamp(2.05rem, 10vw, 3.2rem)`.
- H2: `1.65rem–2.1rem`.
- KPI: `1.5rem–2rem`.
- Corpo: **mínimo 0.875rem / 14 px** para conteúdo contínuo.
- Label: **mínimo 0.6875rem / 11 px**; evitar conteúdo essencial abaixo disso.

### Regras
- Títulos: line-height `0.95–1.05`, tracking negativo moderado.
- Corpo: line-height `1.55–1.7`.
- Labels uppercase: tracking `0.10–0.14em`.
- Números: tabular nums.

## Espaçamento

Escala-base: `4, 8, 12, 16, 24, 32, 48, 64, 96`.

- Espaço interno de card padrão: 20–24 px desktop, 16–18 px mobile.
- Gap de dashboard: 12–16 px.
- Separação entre seções: 64–88 px desktop, 44–56 px mobile.
- Hero deve ter mais ar que qualquer outra seção.

## Grid

### Desktop amplo
- rail: 232–248 px;
- conteúdo: máximo 1480 px;
- grid-base: 12 colunas;
- decisão principal: 7–8 colunas;
- contexto secundário: 4–5 colunas.

### Tablet
- rail reduzido/compacto;
- grids de 2 colunas;
- prioridade preservada.

### Mobile
- 1 coluna;
- navegação horizontal sticky;
- KPIs críticos em 2 colunas quando couberem sem truncamento;
- detalhe histórico depois da decisão e do live.

## Superfícies

### Level 0 — Canvas
Noite puro. Sem textura decorativa constante.

### Level 1 — Panel
Grafite ou mistura mínima com Noite. Borda Carvão 1 px.

### Level 2 — Elevated decision
Mesmo sistema, com borda Champagne de baixa opacidade e leve contraste tonal; sem glow.

### Level 3 — Alert/status
Usa cor semântica na borda/ponto/label, nunca bloco saturado inteiro.

## Raios

- cards: 12–16 px;
- controles: 8–10 px;
- pills/status: 999 px apenas para estado curto;
- evitar excesso de cartões arredondados encaixados dentro de cartões arredondados.

## Componentes

### Executive strip
Máximo de 5 indicadores. Cada indicador deve ter label, valor e contexto em três linhas. Valores devem alinhar pela linha de base.

### Decision card
Um por viewport principal. Deve conter:
- recomendação;
- score/confiança;
- por quê;
- ação principal;
- origem do dado.

### Metric card
Não recebe destaque visual se for apenas número de suporte. Evitar gradiente por padrão.

### Ranking
Usar linha compacta, posição, nome, evidência curta e score. Não transformar cada item em card.

### Live context
Status + idade do dado + valor + fonte. Estado stale deve ser textual, não só cromático.

### Review diário
Datas funcionam como âncora visual. Texto deve ser reduzido a: resultado, contexto e conclusão. Detalhe longo vai para página de inteligência.

## Comportamento

- Hover só para elementos realmente interativos.
- Animações entre 160–240 ms.
- Nada deve deslocar layout ao hidratar dado live.
- Skeleton/placeholder deve reservar a altura final.
- Focus visível em todos os links/controles.
- `prefers-reduced-motion` deve remover movimento não essencial.

## Loop visual obrigatório

1. **Hierarchy pass** — conferir o que chama atenção primeiro, segundo e terceiro.
2. **Density pass** — remover bordas/cards desnecessários e texto repetido.
3. **Typography pass** — procurar qualquer texto essencial abaixo do mínimo.
4. **Color pass** — Champagne só onde há decisão, ação, seleção ou oportunidade.
5. **Alignment pass** — números, títulos, margens, grids e baselines.
6. **Responsive pass** — 1440, 1024, 768, 390 px.
7. **Contrast/state pass** — estados não podem depender apenas de cor.
8. **Visual QA pass** — screenshots desktop/mobile e correção antes de merge.

## Critério de aceite da home

A home está aprovada quando:
- a pergunta “onde/quando trabalhar?” domina a primeira dobra;
- decisão e contexto live aparecem antes do histórico detalhado;
- não há texto essencial ilegível no mobile;
- métricas secundárias não competem com a recomendação;
- o sistema parece Motorista Ops sem cair em estética genérica preto+dourado;
- o mesmo conjunto de tokens pode ser reutilizado em Trânsito, Previsão e Inteligência.
