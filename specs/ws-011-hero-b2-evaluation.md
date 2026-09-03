# MotoristaOPS V2 — WS-011 Hero B2 Evaluation

Status: RECOMMENDED CANDIDATE / HUMAN APPROVAL REQUIRED
Date: 2026-09-03
Scope: Hero photography direction + Header composition

## Curadoria das três direções fotográficas recentes

### A — terminal / aeroporto
Decision: REJECT FOR HERO.

Why:
- forte leitura de `transfer/aeroporto stock`;
- contexto muito específico para representar a proposta inteira;
- aparência mais promocional que autoral;
- bom material futuro para seção de Serviços/Aeroportos, não para abertura principal.

### B — rua urbana noturna
Decision: ADVANCE.

Why:
- maior coerência com a direção `Night route` já recomendada;
- metrópole sugerida sem depender de ponto turístico;
- carro no terço direito e área negativa segura à esquerda;
- contraste natural para a paleta MotoristaOPS;
- comunica deslocamento real, presença e rotina sem precisar fingir luxo.

Risk:
- a representação gerada do HB20 é próxima, mas ainda não é prova documental do veículo real; detalhes de farol, grade e carroceria precisam de refinamento/fidelidade antes de baseline final.

### C — hotel moderno
Decision: REJECT FOR HERO.

Why:
- desloca a marca para uma leitura de hotelaria/luxo executivo não necessária;
- aproxima a comunicação de `transfer premium` genérico;
- contradiz a regra de evitar cenário de luxo falso como principal argumento visual.

## Candidate B2
Local artifact: `apps/landing/hero-candidate-v0.2/`.

Composition:
- Header oficial em wordmark-only crop derivado do master logo;
- eyebrow `MOTORISTA PARTICULAR`;
- H1 `Levando pessoas, cuidando de histórias.`;
- supporting copy curta;
- CTA WhatsApp primário + `Ver serviços` secundário;
- quatro microbenefícios no rodapé da Hero;
- fotografia urbana noturna full-bleed com carro no terço direito.

## QA
Rendered with Chromium/Playwright via embedded local assets.

Desktop 1600x900: PASS estrutural e visual candidate.
Mobile 390x844: PASS estrutural e reflow candidate.
320px: no horizontal overflow.
H1 count: 1.
Navigation semantic: present.

Contrast checks against `#070709`:
- Marfim `#F3EFE4`: 17.52:1.
- Champagne `#C79C5B`: 7.99:1.
- Muted `#B8B2A8`: 9.56:1.

## Recommendation
Adotar **B / Night route** como direção visual da Hero e usar B2 como composição-base da próxima iteração.

This is NOT baseline yet.

Human gate remains for:
1. approve B direction;
2. approve/reject B2 composition;
3. authorize final vehicle-fidelity pass;
4. only then freeze `Hero baseline v1`.
