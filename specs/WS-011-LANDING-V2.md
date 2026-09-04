# WS-011 — Landing MotoristaOPS V2

Status: ACTIVE / LOOP ITERATIVO
Updated: 2026-09-03

## Problema
Construir a nova landing do MotoristaOPS sem herdar arquitetura visual ou técnica da V1, mantendo a identidade oficial e transformando a direção aprovada em uma interface real, responsiva e validável.

## Objetivo
Criar uma landing pública premium, específica ao serviço real de motorista particular, com clareza, confiança, respiro editorial e conversão para contato direto.

## Autoridades
1. Brand Book V12 e assets oficiais.
2. `DESIGN.md`.
3. decisões aprovadas na work session.
4. referência visual aprovada em 2026-09-03 como direção, não como print a ser incorporado.

## Escopo deste loop
- Header.
- Hero com carro apenas nesta seção.
- Benefícios principais.
- Serviços.
- Como funciona.
- Qualidade operacional.
- Experiência e diferenciais sem depoimentos inventados.
- Quem dirige, com foto real.
- CTA final e footer.
- Responsividade desktop/mobile.
- A11Y básica conforme `A11Y.md`.

## Non-goals
- Não criar dashboard.
- Não publicar produção.
- Não inventar telefone, reviews, métricas ou clientes.
- Não criar galeria do carro.
- Não regenerar logo ou identidade.
- Não reutilizar código da V1.

## Critérios de aceitação
- `MotoristaOPS` escrito corretamente em toda a página.
- Champagne, Noite, Grafite e Marfim respeitados por função.
- Carro restrito à Hero.
- Seção `Quem dirige` usa foto real fornecida.
- Hierarquia editorial, respiro e detalhes gráficos coerentes com Brand Book V12.
- CTA claro sem dados inventados.
- Sem overflow horizontal em 390px e 1440px.
- Navegação e foco por teclado visíveis.
- `prefers-reduced-motion` respeitado.
- Screenshot desktop e mobile revisados antes de consolidar.

## Loop 1 — Estrutura executável
- Página completa em HTML/CSS/JS sem dependências herdadas da V1.
- Carro restrito à Hero.
- Seção `Quem dirige` com retrato real.
- Desktop e mobile inspecionados visualmente.
- Resultado: arquitetura aprovada para refino; ainda não baseline.

## Loop 2 — Hierarquia e respiro
- Header e lockup reduzidos para ganhar área útil.
- Hero recalibrada para maior clareza de título, texto e composição carro/copy.
- Seções receberam mais respiro, grid editorial discreto e linhas de percurso.
- Cards receberam detalhe, contraste e estados de hover mais sutis.
- Assets convertidos para WebP para reduzir peso sem alterar a fonte visual.
- Motion progressivo via IntersectionObserver, respeitando `prefers-reduced-motion`.

## Loop 3 — Iconografia e QA estrutural
- Glifos genéricos substituídos por sprite SVG outline coerente.
- Serviços, benefícios e qualidade operacional passam a compartilhar linguagem iconográfica.
- QA estrutural: IDs únicos, anchors internos válidos, assets existentes, alts presentes, CSS balanceado e sem referências PNG legadas.
- Nenhum dado comercial inventado foi introduzido.

## Loop 4 — Paridade e QA confiável
- Tipografia continua declarada como Instrument Sans com fallbacks seguros; a estratégia de carregamento da fonte permanece pendente para não introduzir dependência externa sem decisão de produção.
- Tentativas de QA visual em navegador isolado foram bloqueadas por política do ambiente para URLs locais e `file://`; o resultado não foi marcado como PASS.
- QA estrutural anterior permanece válido.
- Assets raster WebP permanecem completos no local; sincronização binária com GitHub segue pendente porque o conector disponível não aceita arquivo local/binário diretamente pelo endpoint de contents.
- O Drive recebeu pasta e documento de checkpoint da WS-011.

### Gate do Loop 4
`PARTIAL PASS` — código, estrutura, documentação e Drive comprovados; QA visual fresco e paridade dos binários no GitHub ainda pendentes.

## Próximo loop
- Resolver a paridade dos assets sem criar workaround frágil.
- Executar QA visual comparativo em desktop/tablet/mobile em renderizador confiável.
- Ajustar ritmo tipográfico e recortes finais somente a partir de evidência visual válida.
- Conectar CTA ao fluxo real somente quando o canal/URL canônico for resolvido.
