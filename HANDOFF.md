# MotoristaOps — Handoff

## Estado atual

A `main` contém a arquitetura canônica de publicação por domínios próprios:

- `www.motoristaops.com.br` publica somente a Landing Page pública;
- `dashboard.motoristaops.com.br` publica o dashboard operacional;
- o build canônico é gerado por `npm run build:domains`;
- o deploy autorizado é `.github/workflows/deploy-domains-hostinger.yml`.

Os workflows legados de GitHub Pages e de publicação integral em Hostinger foram aposentados em 23/08/2026 por risco de exposição do build operacional completo.

## Branch ativa

`main`

## Autoridade de publicação

Somente `.github/workflows/deploy-domains-hostinger.yml` deve publicar produção. Novos caminhos de deploy precisam preservar explicitamente a separação entre artefato público (`dist-public`) e operacional (`dist-dashboard`).

## Privacidade e dados

O dataset operacional ainda existe no repositório e é consumido pelo dashboard. Não publicar esse dataset no artefato público da Landing Page. A próxima correção estrutural de privacidade deve mover os dados operacionais para uma fonte privada/autenticada antes de removê-los do repositório público, evitando quebra do dashboard.

## Precificação operacional

A política canônica de precificação é a V3 registrada em:

- `docs/operations/PRICING_POLICY_V3.md`;
- `docs/operations/PROPOSALS_TABLE_V3.md`;
- decisão `D-008` em `DECISIONS.md`.

Base operacional oficial: **Rua Mario Latorre, 245 — Parque Pinheiros — Taboão da Serra/SP — CEP 06767-230**.

Parâmetros centrais: R$ 4,50/km com passageiro, mínimo agendado de R$ 70, reserva de R$ 15, 10 km de mobilização incluídos por extremidade aplicável, R$ 3/km de mobilização excedente, tolerância de 10 min, espera a R$ 1/min e recorrência com desconto máximo de 8% após o cálculo técnico completo.

A localização circunstancial do motorista não substitui a base como referência de orçamento. Viagens longas e retornos vazios relevantes exigem cálculo do ciclo operacional completo para evitar subprecificação.

## Próximo ciclo técnico

1. Migrar o dataset operacional para armazenamento privado/autenticado.
2. Remover `public/data/motoristaops.json` e demais duplicações públicas após a migração.
3. Garantir autenticação/autorização no dashboard antes de considerar os dados privados.
4. Manter `domain-builds.yml` como gate de separação de artefatos.
5. Aplicar branch protection/ruleset e required checks em `main` assim que a configuração estiver disponível pela superfície administrativa.

## PRs superseded

- PR #18 (`feat/dashboard-strategic-intelligence`) foi fechada sem merge em 23/08/2026 porque sua base ficou anterior ao estado canônico atual. Qualquer conteúdo útil deve ser reconciliado a partir de `main`.

## Critério de retomada

Antes de editar publicação, dados ou infraestrutura, validar que nenhum artefato público contém rotas operacionais ou dados financeiros reais e executar os gates de qualidade existentes.

Antes de emitir orçamento particular, usar a Política de Precificação V3 e registrar a memória técnica do cálculo, ainda que a proposta externa seja simplificada.
