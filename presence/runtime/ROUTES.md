# Rotas — MotoristaOPS Presença

## Produção planejada

| Rota | Responsabilidade |
|---|---|
| `/` | site MotoristaOPS atual — preservar |
| `/presenca` | landing comercial do produto |
| `/painel` | autenticação, onboarding e acompanhamento |
| `/{slug}` | landing pública do motorista |

## Regra de segurança

A raiz atual não deve ser alterada para acomodar o produto.

As novas superfícies precisam entrar de forma aditiva no deploy.

## Estratégia inicial

O repositório atual publica HTML estático na Hostinger. A primeira versão de Presença pode manter essa característica:

- `/presenca` — página estática comercial;
- `/painel` — shell web que conversa com Supabase;
- `/{slug}` — shell público que resolve o slug e consulta apenas dados publicados.

A implementação dinâmica deve ser isolada de `source/parts/**` até passar pelos gates.

## Restrição do deploy atual

O workflow vigente usa mirror com delete no bundle público. Portanto, nenhum novo diretório deve ser publicado antes de o pipeline incluir explicitamente as superfícies Presença no bundle final.

Não criar arquivos diretamente no servidor para contornar o pipeline.
