# MotoristaOPS V2 — Landing Header Contract v0.1

Status: VISUAL CANDIDATE READY / NOT BASELINE
Surface: Landing pública
Stage: WS-011 — high-fidelity candidate
Parent: `landing-section-contracts-v0.1.md`

## Goal
Dar reconhecimento imediato da marca, orientação mínima e acesso direto à conversão principal sem competir com a Hero.

## Protected decisions
- usar asset oficial do wordmark; não redesenhar a marca em CSS/texto;
- `MotoristaOPS` permanece unido;
- navegação inicial curta: `Serviços`, `Como funciona`, `Quem dirige`;
- CTA de maior prioridade: `WhatsApp`;
- sem toggle de idioma/tema no bootstrap V2;
- sem menu denso, barra utilitária ou linguagem de produto SaaS;
- Header deve funcionar como moldura da Hero, não como bloco visual independente.

## Desktop candidate
- altura alvo: 88–92 px;
- wordmark à esquerda;
- navegação alinhada à direita;
- CTA WhatsApp separado visualmente por contorno champagne;
- fundo escuro translúcido apenas o suficiente para leitura sobre a fotografia;
- divisor inferior discreto.

## Mobile candidate
- altura alvo: 70–72 px;
- wordmark compacto à esquerda;
- links intermediários podem ocultar no primeiro bootstrap;
- CTA WhatsApp permanece visível;
- menu/hamburger só entra quando a navegação real exigir; não criar controle sem necessidade.

## Accessibility
- header semanticamente em `<header>` com `<nav aria-label>`;
- foco visível em links e CTA;
- alvos de toque >= 42 px no candidate atual, promover para 44 px onde a implementação final permitir;
- CTA não pode receber URL de WhatsApp não confirmada; enquanto o registry estiver bloqueado, é visual apenas.

## Visual evidence — candidate B2
Local candidate: `apps/landing/hero-candidate-v0.2/`.

QA executado em 320, 390, 768, 1440 e 1600 CSS px:
- sem overflow horizontal;
- um único H1;
- nav semântica presente;
- CTA presente;
- header 72 px em mobile, 78 px tablet e 92 px desktop;
- contraste de marfim/champagne sobre `#070709` acima de AA.

## Gate
Header está tecnicamente pronto para acompanhar a direção de Hero escolhida, mas não vira baseline isoladamente antes da aprovação visual conjunta de Header + Hero na WS-011.
