# MotoristaOPS V2 — Landing Public Data Registry v0.1

Status: ACTIVE / ZERO-INVENTION GATE
Purpose: impedir que dados antigos, conflitantes ou não verificados sejam publicados por conveniência de layout.

## Authority states
- `CONFIRMED`: decisão humana atual ou asset/projeto atual sem conflito.
- `CANDIDATE`: fonte existente, mas requer reconciliação.
- `BLOCKED`: conflito/material ambiguity; não publicar.
- `VERIFY-AT-RELEASE`: dado volátil que precisa de evidência fresca no gate de publicação.

## Identity
| Field | Value | State | Notes |
|---|---|---|---|
| Brand | MotoristaOPS | CONFIRMED | escrever unido |
| Category | MOTORISTA PARTICULAR | CONFIRMED | categoria pública |
| Signature | por Henrico Amaral | CONFIRMED | quando aplicável |
| Slogan | Levando pessoas, cuidando de histórias. | CONFIRMED | aprovado |
| Driver | Henrico Amaral | CONFIRMED | pessoa responsável pelo serviço |

## Vehicle
| Field | Value | State | Notes |
|---|---|---|---|
| Current vehicle | HB20 preto | CONFIRMED | fotos reais no pacote atual |
| Hero representation | veículo real / representação fiel | CONFIRMED RULE | não substituir por carro premium diferente |
| Plate | não publicar legível | CONFIRMED RULE | privacidade |

## Service taxonomy
- Aeroportos e rodoviárias — CONFIRMED.
- Reuniões e compromissos — CONFIRMED.
- Eventos — CONFIRMED.
- Viagens/deslocamentos particulares — CONFIRMED.
- Espera/acompanhamento — CONFIRMED only when aligned with current commercial policy.

## Geography
| Field | Value | State | Notes |
|---|---|---|---|
| Public service region | São Paulo e região | CANDIDATE | exists in V1 profile; do not over-specify coverage until release verification |
| Operational base address | private/operational | DO NOT PUBLISH BY DEFAULT | base is relevant to pricing, not automatically public landing copy |

## Contact — WhatsApp
### Candidate A
- Display: `(11) 95397-0704`
- wa.me: `5511953970704`
- Source: current `main/src/data/driver-profile.ts` in V1.

### Candidate B
- wa.me: `5511984240398`
- Source: current `main/src/pages/temp.astro` noindex/temp implementation in V1.

**State: BLOCKED — conflicting current repository sources.**

Rule: CTA labels may be designed, but production `href` remains unset until one number is confirmed as canonical.

## Instagram
### Existing V1 profile source
- `@henrico.driver.amaral`

### Current MotoristaOPS direction
- `@motoristaops` is the intended brand channel from recent project decisions.

**State: CANDIDATE / VERIFY LINK BEFORE RELEASE.**

Rule: V2 should not silently reintroduce the old personal/driver handle simply because it exists in code.

## Google Business / Maps
- V1 source contains short Maps URL: `https://maps.app.goo.gl/aCAXYqSYsQDSt7teA`.
- Public search did not independently resolve a MotoristaOPS listing during current audit.

**State: BLOCKED / VERIFY OWNERSHIP + CURRENT LISTING.**

## Reviews
- Public search did not produce a trustworthy MotoristaOPS review source.
- Generated/mock reviews are forbidden.

**State: BLOCKED.**

Production rule: omit Social Proof section if verified review data is unavailable at release.

## Uber rating / trip count
- V1 current data file contains rating `4,99`.
- Rating is volatile and can change.
- Trip-count claims are also time-sensitive.

**State: VERIFY-AT-RELEASE.**

Rule: publish only with fresh screenshot/export or other current evidence approved for public use.

## Legal/footer data
| Field | State |
|---|---|
| Public email | UNRESOLVED |
| Public phone display | BLOCKED with WhatsApp conflict |
| Privacy page | NOT CREATED / do not fake link |
| Terms page | NOT CREATED / do not fake link |
| CNPJ/MEI | OUT OF LANDING UNTIL BUSINESS REGISTRATION DECISION IS FINAL |

## Release gate
Before public deploy, every visible external link, contact datum, rating, review, legal destination and volatile claim must be `CONFIRMED` or freshly `VERIFY-AT-RELEASE`. Anything still `BLOCKED` is removed from the release rather than filled with a placeholder.
