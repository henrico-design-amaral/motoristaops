# MotoristaOPS — Brand System V2

**Status:** documentação canônica consolidada em 18/09/2026.

## Arquivos principais

- `index.html` — hub da documentação.
- `brandbook-v2.html` — Brand Book V2 completo.
- `style-guide-v2.html` — Visual & Editorial Style Guide.
- `design-system-v2.html` — Design System, tokens e componentes de referência.
- `tokens/tokens.css` — tokens CSS para implementação.
- `tokens/tokens.dtcg.json` — base de tokens no formato DTCG 2025.10.
- `assets/components.css` — componentes CSS de referência.
- `/landing-v3/logo-oficial.svg` — ativo oficial fornecido no projeto.
- `boards.html` — versão visual 16:9 das principais regras.
- `playground.html` — demonstração prática e responsiva dos componentes.
- `ASSET_REGISTRY.md` — registro das versões oficiais e integridade de ativos.
- `GOVERNANCE.md` — regra-mãe, precedência e Brand Gate.
- `ORCHESTRATOR.md` — camada permanente de controle, roteamento de especialistas e fail-closed.
- `SOCIAL_MEDIA_OPERATING_SYSTEM.md` — estratégia de conteúdo, formatos nativos, hooks, CTA, growth, analytics e aprendizado.
- `PROMPTING_PROTOCOL.md` — contrato PACIF+RV para briefing, referências, IA, social e produto.

## Regra de governança

Toda nova produção MotoristaOPS deve herdar o Brand Book V2. Style Guide, Design System, templates, automações e agentes podem detalhar regras, mas não contradizê-las.

## Limitações declaradas

A documentação não afirma validações que ainda dependem de contexto de produção: prova CMYK/Pantone, safe areas atuais das plataformas, conformidade WCAG de produtos implementados, opacidade final de watermark e stress test perceptual contínuo.

## Tipografia no HTML

Os HTMLs referenciam Instrument Sans e Bebas Neue por Google Fonts e incluem fallbacks do sistema. Nenhum arquivo de fonte é distribuído neste pacote.

## Renders

Os boards rasterizados usam fontes locais de fallback apenas na renderização estática, pois arquivos de fonte não são distribuídos. Os HTMLs apontam para Instrument Sans e Bebas Neue pela web e preservam fallbacks.